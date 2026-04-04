import ModalDirecciones from "@/components/modales/ModalDirecciones";
import ModalEliminar from "@/components/modales/ModalEliminar";
import { Spinner } from "@/components/ui/spinner";
import useDirecciones from "@/hooks/useDirecciones";
import { CircleSmallIcon } from "lucide-react";

export default function MisDirecciones() {
  const {
    direcciones,
    cargando,
    crearDireccion,
    editarDireccion,
    eliminarDireccion,
    establecerPredeterminada,
    obtenerInfoCP,
  } = useDirecciones();

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl">Mis direcciones</h2>
        <ModalDirecciones
          accion={crearDireccion}
          obtenerInfoCP={obtenerInfoCP}
        />
      </div>

      {cargando ? (
        <div className="flex justify-center items-center h-full">
          <Spinner className="size-8 text-byar" />
        </div>
      ) : (
        <div className="space-y-4 mt-5">
          {direcciones?.map((d) => (
            <article className="bg-fondogris rounded-2xl w-full grid grid-cols-12 justify-between items-center px-4 py-3 gap-4">
              <div className="col-span-8">
                <div>
                  <span>{`${d.calle} ${d.numero_exterior}, ${d.especificaciones}`}</span>
                </div>
                <div className="text-gray-600">
                  <span>{`${d.codigo_postal} ${d.colonia}, ${d.estado}`}</span>
                </div>
              </div>
              <div className="col-span-2">
                {d.es_predeterminada ? (
                  <span className="block text-center text-gray-600">
                    Predeterminada
                  </span>
                ) : (
                  <div className="flex justify-center">
                    <CircleSmallIcon
                      className="cursor-pointer"
                      onClick={() => establecerPredeterminada(d.id)}
                    />
                  </div>
                )}
              </div>
              <div className="col-span-2 flex gap-4 justify-center items-center">
                <ModalDirecciones
                  editar
                  direccion={d}
                  accion={editarDireccion}
                  obtenerInfoCP={obtenerInfoCP}
                />
                <ModalEliminar
                  titulo="Eliminar dirección"
                  descripcion={`¿Estas seguro que deseas eliminar esta dirección?`}
                  accion={() => eliminarDireccion(d.id)}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
