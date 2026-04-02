import ModalEliminar from "@/components/modales/ModalEliminar";
import ModalMarca from "@/components/modales/ModalMarca";
import { Spinner } from "@/components/ui/spinner";
import useMarcas from "@/hooks/useMarca";

export default function GestionMarcas() {
  const { marcas, cargandoMarcas, crearMarca, editarMarca, eliminarMarca } =
    useMarcas();

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl">Marcas</h2>
        <ModalMarca accion={crearMarca}/>
      </div>

      {cargandoMarcas ? (
        <div className="flex justify-center items-center h-full">
          <Spinner className="size-8 text-byar" />
        </div>
      ) : (
        <div className="space-y-4 mt-5">
          {marcas?.map((m) => (
            <section
              key={m.id}
              className="bg-fondogris rounded-2xl flex items-center px-4 py-3 gap-4 "
            >
              <table className="w-full text-sm table-fixed">
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
                      Descripción
                    </th>
                    <th className="text-center pb-1 border-b border-gray-300">
                      Productos
                    </th>
                    <th className="text-center pb-1 border-b border-gray-300">
                      Opciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-600">
                    <td className="py-3 align-middle truncate">{m.nombre}</td>
                    <td className="py-3 align-middle text-center truncate max-w-0 px-2">
                      {m.descripcion ? m.descripcion : "Sin descripción"}
                    </td>
                    <td className="py-3 align-middle text-center">
                      {m.cant_producto}
                    </td>
                    <td className="py-3 align-middle text-center">
                      <div className="flex gap-4 justify-center items-center">
                        <ModalMarca accion={editarMarca} editar marca={m}/>
                        <ModalEliminar
                          titulo="Eliminar marca"
                          descripcion={`¿Estas seguro que deseas eliminar la marca ${m.nombre}?`}
                          nombreResaltado={m.nombre}
                          accion={() => eliminarMarca(m.id)}
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
