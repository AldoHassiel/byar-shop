import { memo, useEffect, useMemo, useState } from "react";
import TarjetaProducto from "./TarjetaProducto";
import { apiProductos } from "@/api/productos.api";
import type { Producto } from "@/types/productos";

interface SeguirViendoProps {
  idCategorias: number[];
  productosExcluir?: number | number[];
  titulo?: string;
  limite?: number;
}

function SeguirViendo({
  idCategorias,
  productosExcluir,
  titulo = "Seguir viendo",
  limite = 5,
}: SeguirViendoProps) {
  const [productosRecomendados, setProductosRecomendados] = useState<
    Producto[]
  >([]);
  const [cargando, setCargando] = useState(true);

  const idsExcluir = useMemo(() => {
    if (!productosExcluir) return new Set<number>();
    return new Set(
      Array.isArray(productosExcluir) ? productosExcluir : [productosExcluir],
    );
  }, [productosExcluir]);

  useEffect(() => {
    const obtenerProductosPorCategorias = async () => {
      if (idCategorias.length === 0) {
        setCargando(false);
        return;
      }
      setCargando(true);
      try {
        const todosLosProductos: Producto[] = [];

        for (const idCategoria of idCategorias) {
          const datos = await apiProductos.obtenerTodos(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            idCategoria,
            undefined,
            1,
            10,
          );
          if (datos) todosLosProductos.push(...datos.productos);
        }

        const productosFinales = Array.from(
          new Map(
            todosLosProductos
              .filter((p) => !idsExcluir.has(p.id))
              .map((item) => [item.id, item]),
          ).values(),
        ).slice(0, limite);

        setProductosRecomendados(productosFinales);
      } catch (error) {
        console.error("Error al obtener recomendaciones:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductosPorCategorias();
  }, [idCategorias.join(","), idsExcluir, limite]);

  if (cargando) {
    return <div className="text-center py-8">Cargando recomendaciones...</div>;
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl text-gray-500 px-45">{titulo}</h2>
      <div className="mt-5 flex gap-5 justify-center overflow-x-auto flex-wrap">
        {productosRecomendados.length > 0 ? (
          productosRecomendados.map((prod) => (
            <TarjetaProducto key={prod.id} producto={prod} />
          ))
        ) : (
          <p className="text-gray-500">No hay productos disponibles</p>
        )}
      </div>
    </section>
  );
}

export default memo(SeguirViendo);
