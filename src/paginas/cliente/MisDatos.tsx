import useMisDatos from "@/hooks/useMisDatos";
import ModalCorreo from "@/components/modales/ModalCorreo";
import ModalEliminarCuenta from "@/components/modales/ModalEliminarCuenta";
import ModalPwd from "@/components/modales/ModalPwd";
import { Button } from "@/components/ui/button";
import { LockIcon, MailIcon, Trash } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

export default function MisDatos() {
  const {
    datos,
    cargando,
    editarDatosGenerales,
    editarCorreo,
    editarPwd,
    eliminarCuenta,
  } = useMisDatos();

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    if (!datos) return;
    setNombre(datos.nombre ?? "");
    setApellidos(datos.apellidos ?? "");
    setTelefono(datos.telefono ?? "");
  }, [datos]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editarDatosGenerales({
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      telefono: telefono.trim() === "" ? null : telefono.trim(),
      correo: datos?.correo ?? "",
    });
  };

  if (cargando && !datos) {
    return <p className="text-2xl">Cargando...</p>;
  }

  return (
    <>
      <h2 className="text-4xl">Mis Datos</h2>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Nombre</span>
          <input
            type="text"
            className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-byar focus:ring focus:ring-byar/50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Apellido(s)</span>
          <input
            type="text"
            className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-byar focus:ring focus:ring-byar/50"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Telefono</span>
          <input
            type="text"
            className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-byar focus:ring focus:ring-byar/50"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </label>

        <div className="flex items-end">
          <Button
            type="submit"
            variant="pink"
            disabled={cargando}
            className="h-10 w-full rounded-md"
          >
            Guardar cambios
          </Button>
        </div>
      </form>

      <h2 className="text-4xl mt-5 mb-5">Cuenta y contraseña</h2>

      <section className="mt-5 flex flex-col gap-3">
        <div className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MailIcon className="h-5 w-5 text-gray-500" />
            <span>{datos?.correo}</span>
          </div>
          <ModalCorreo correoActual={datos?.correo ?? ""} accion={editarCorreo} />
        </div>

        <div className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LockIcon className="h-5 w-5 text-gray-500" />
            <span>Cambiar contraseña</span>
          </div>
          <ModalPwd accion={editarPwd} />
        </div>

        <ModalEliminarCuenta
          accion={eliminarCuenta}
          trigger={
            <button
              type="button"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm flex items-center gap-3 hover:border-red-300 focus:outline-none focus:ring focus:ring-red-200"
            >
              <Trash className="h-5 w-5 text-gray-500" />
              <span className="text-red-500 font-medium">Eliminar cuenta</span>
            </button>
          }
        />
      </section>
    </>
  );
}