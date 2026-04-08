import ModalCategoria from "@/components/modales/ModalCategoria";
import ModalEliminar from "@/components/modales/ModalEliminar";
import ModuloVacio from "@/components/ModuloVacio";
import { Spinner } from "@/components/ui/spinner";
import useCategorias from "@/hooks/useCategorias";

export default function GestionCategorias() {
  const {
    categorias,
    cargando,
    crearCategoria,
    editarCategoria,
    eliminarCategoria,
  } = useCategorias();

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl">Categorías</h2>
        <ModalCategoria accion={crearCategoria} />
      </div>

      {(cargando || !categorias) && (
        <div className="flex justify-center items-center h-full">
          <Spinner className="size-8 text-byar" />
        </div>
      )}

      {categorias.length === 0 && !cargando && (
        <ModuloVacio modulo="categorías" />
      )}

      <div className="space-y-4 mt-5">
        {categorias?.map((c) => (
          <section
            key={c.id}
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
                  <th className="text-center pb-1 border-b border-gray-300">
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
                  <td className="py-3 align-middle truncate text-center">
                    {c.nombre}
                  </td>
                  <td className="py-3 align-middle text-center truncate max-w-0 px-2">
                    {c.descripcion ? c.descripcion : "Sin descripción"}
                  </td>
                  <td className="py-3 align-middle text-center">
                    {c.cant_producto}
                  </td>
                  <td className="py-3 align-middle text-center">
                    <div className="flex gap-4 justify-center items-center">
                      <ModalCategoria
                        editar
                        categoria={c}
                        accion={editarCategoria}
                      />
                      <ModalEliminar
                        titulo="Eliminar categoría"
                        descripcion={`¿Estas seguro que deseas eliminar la categoría ${c.nombre}?`}
                        nombreResaltado={c.nombre}
                        accion={() => eliminarCategoria(c.id)}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        ))}
      </div>
    </>
  );
}
