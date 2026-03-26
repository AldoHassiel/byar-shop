import SeguirViendo from "@/components/SeguirViendo";
import { Button } from "@/components/ui/button";
import SelectorCantidad from "@/components/SelectorCantidad";
import useProductos from "@/hooks/useProductos";
import { useParams } from "react-router";
import { useState } from "react";

export default function DetalleProductos() {
  const { id } = useParams();
  const { producto, cargando } = useProductos(Number(id));
  const [cantidad, setCantidad] = useState(1);

  if (cargando) return <p>Cargando detalle producto</p>;

  return (
    <div className="bg-fondogris px-10 py-10 mt-20">
      <section className="flex gap-8 px-50">
        <div className="bg-white rounded-2xl p-8 flex items-center justify-center shrink-0">
          <img
            src={producto?.imagen_url}
            alt="Imagen del producto"
            className="max-w-sm max-h-96 object-contain"
          />
        </div>

        <div className="flex flex-col gap-6 flex-1">
          <div className="bg-white rounded-2xl p-8">
            <p className="text-sm text-gray-500 mb-2">
              {producto?.nombre_marca}
            </p>
            <h1 className="text-4xl font-bold mb-4">{producto?.nombre}</h1>

            <div className="mb-6">
              <data value={producto?.precio} className="text-3xl text-black">
                MXN {producto?.precio}
              </data>
            </div>

            <div className="mb-6">
              <h2 className="font-bold text-lg mb-2">Descripción</h2>
              <p className="text-base text-gray-700">{producto?.descripcion}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <div className="mb-6 text-center">
              <p className="text-lg font-semibold mb-2">Stock disponible</p>
              <p className="text-xl">{producto?.stock}</p>
            </div>

            <div className="space-y-3 text-center">
              <SelectorCantidad
                cantidad={cantidad}
                setCantidad={setCantidad}
                stock={producto?.stock || 0}
              />

              <Button className="w-full p-6 text-lg font-semibold">
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <SeguirViendo
          idCategorias={producto?.id_categoria ? [producto.id_categoria] : []}
          productoExcluir={Number(id)}
          titulo="Seguir viendo"
          limite={5}
        />
      </section>
    </div>
  );
}
