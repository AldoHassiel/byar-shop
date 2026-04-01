import ModalEliminar from "@/components/modales/ModalEliminar";
import ModalProducto from "@/components/modales/ModalProducto";
import { Spinner } from "@/components/ui/spinner";
import useProductos from "@/hooks/useProductos";
import { Trash } from "lucide-react";

export default function GestionProductos() {
  const {
    productos,
    producto,
    cargando,
    obtenerUno,
    crearProducto,
    editarProducto,
    eliminarProducto,
  } = useProductos();

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl">Productos</h2>
        <ModalProducto accion={crearProducto} />
      </div>

      {cargando ? (
        <div className="flex justify-center items-center h-full">
          <Spinner className="size-8 text-byar" />
        </div>
      ) : (
        <div className="space-y-4 mt-5">
          {productos?.map((p) => (
            <section
              key={p.id}
              className="bg-fondogris rounded-2xl flex items-center px-4 py-3 gap-4 "
            >
              <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                {p.imagen_url ? (
                  <img
                    src={p.imagen_url}
                    alt="Imagen del producto"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
              </div>
              <table className="w-full text-sm">
                <colgroup>
                  <col className="w-[25%]" />
                  <col className="w-[25%]" />
                  <col className="w-[25%]" />
                  <col className="w-[25%]" />
                </colgroup>
                <thead>
                  <tr className="text-gray-800 font-semibold">
                    <th className="text-left pb-1 border-b border-gray-300">
                      Nombre
                    </th>
                    <th className="text-center pb-1 border-b border-gray-300">
                      Precio
                    </th>
                    <th className="text-center pb-1 border-b border-gray-300">
                      Stock
                    </th>
                    <th className="text-center pb-1 border-b border-gray-300">
                      Opciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-600">
                    <td className="py-3 align-middle truncate">{p.nombre}</td>
                    <td className="py-3 align-middle text-center whitespace-nowrap">
                      MXN {p.precio}
                    </td>
                    <td className="py-3 align-middle text-center">{p.stock}</td>
                    <td className="py-3 align-middle text-center">
                      <div className="flex gap-4 justify-center items-center">
                        <ModalProducto
                          editar
                          accion={editarProducto}
                          productoId={p.id}
                          obtenerDetalle={obtenerUno}
                          detalle={producto?.id === p.id ? producto : null}
                        />
                        <ModalEliminar
                          titulo="Eliminar producto"
                          descripcion={`¿Estas seguro que deseas eliminar el producto ${p.nombre}?`}
                          nombreResaltado={p.nombre}
                          accion={() => eliminarProducto(p.id)}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
