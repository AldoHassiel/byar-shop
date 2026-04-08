import ModalEliminar from "@/components/modales/ModalEliminar";
import ModalSubcategoria from "@/components/modales/ModalSubcategoria";
import { Spinner } from "@/components/ui/spinner";
import useCategorias from "@/hooks/useCategorias";
import useSubcategorias from "@/hooks/useSubcategorias";

export default function GestionSubcategorias() {
  const {
    subCategoriasNormal,
    cargandoSubcategorias,
    crearSubcategoria,
    editarSubcategoria,
    eliminarSubcategoria,
  } = useSubcategorias({ sinArbol: true });

  const { categorias } = useCategorias();

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl">Subcategorías</h2>
        <ModalSubcategoria accion={crearSubcategoria} categorias={categorias} />
      </div>

      {cargandoSubcategorias ? (
        <div className="flex justify-center items-center h-full">
          <Spinner className="size-8 text-byar" />
        </div>
      ) : (
        <div className="space-y-4 mt-5">
          {subCategoriasNormal?.map((s) => (
            <section
              key={s.id}
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
                      {s.nombre}
                    </td>
                    <td className="py-3 align-middle text-center truncate max-w-0 px-2">
                      {s.descripcion ? s.descripcion : "Sin descripción"}
                    </td>
                    <td className="py-3 align-middle text-center">
                      {s.cant_producto}
                    </td>
                    <td className="py-3 align-middle text-center">
                      <div className="flex gap-4 justify-center items-center">
                        <ModalSubcategoria
                          editar
                          subcategoria={s}
                          accion={editarSubcategoria}
                          categorias={categorias}
                        />
                        <ModalEliminar
                          titulo="Eliminar subcategoría"
                          descripcion={`¿Estas seguro que deseas eliminar la subcategoría ${s.nombre}?`}
                          nombreResaltado={s.nombre}
                          accion={() => eliminarSubcategoria(s.id)}
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
