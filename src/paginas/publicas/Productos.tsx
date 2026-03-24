import useProductos from "@/hooks/useProductos";
import useCategorias from "@/hooks/useCategorias";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

export default function Productos() {
  const { productos, cargando, obtenerTodos } = useProductos();
  const [precioMin, setPrecioMin] = useState<number | undefined>();
  const [precioMax, setPrecioMax] = useState<number | undefined>();
  const [idMarca, setIdMarca] = useState<number | undefined>();
  const { categorias, cargandoCategorias, obtenerCategorias } = useCategorias();
  const [idCategoria, setIdCategoria] = useState<number | undefined>();


  useEffect(() => {
    obtenerTodos(
      undefined,
      undefined,
      precioMin,
      precioMax,
      idMarca,
      idCategoria
    );
  }, [precioMin, precioMax, idMarca, idCategoria]);

  if (cargando) return <p>Cargando...</p>;

  return (
    <>
      <div className="flex gap-2 p-4">
        <input
          type="number"
          placeholder="Precio mínimo"
          className="border p-2 rounded w-40"
          onChange={(e) =>
            setPrecioMin(e.target.value ? Number(e.target.value) : undefined)
          }
        />

        {/*Precio máximo */}
        <input
          type="number"
          placeholder="Precio máximo"
          className="border p-2 rounded w-40"
          onChange={(e) =>
            setPrecioMax(e.target.value ? Number(e.target.value) : undefined)
          }
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setIdMarca(Number(e.target.value) || undefined)}
        >
          <option value="">Todas las marcas</option>
          <option value="1">Nike</option>
          <option value="2">Adidas</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setIdCategoria(Number(e.target.value) || undefined)}
        >
          <option value="">Todas las categorías</option>

          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>


      </div>

      <div className="grid grid-cols-4 gap-4 p-4">
        {productos.map((producto) => (
          <Card key={producto.id}>
            {producto.imagen_url && (
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                className="w-full h-full object-cover"
              />
            )}

            <CardContent className="space-y-1">
              <p className="text-lg font-bold">
                MNX {producto.precio}
              </p>

              <p className="text-sm">
                {producto.nombre}
              </p>

              <p className="text-xs text-muted-foreground">
                {producto.nombre_marca || "Sin marca"}
              </p>
            </CardContent>

            <CardFooter className="flex gap-2">
              <button className="w-full bg-pink-500 text-white py-2 rounded cursor-pointer">
                Agregar al carrito
              </button>
              <button className="p-2 border rounded cursor-pointer"
              >
                ❤️
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}