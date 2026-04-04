import useMisDatos from "@/hooks/useMisDatos";
import { useEffect, useState, type FormEvent } from "react";

export default function MisDatos() {
  const { datos, cargando, editarDatosGenerales } = useMisDatos();
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    if (!datos) return;

    setNombre(datos.nombre ?? "");
    setApellidos(datos.apellidos ?? "");
    setTelefono(datos.telefono ?? "");
  }, [datos]);

  const handleSubmit = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

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
            onChange={(evento) => setNombre(evento.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Apellido(s)</span>
          <input
            type="text"
            className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-byar focus:ring focus:ring-byar/50"
            value={apellidos}
            onChange={(evento) => setApellidos(evento.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Telefono</span>
          <input
            type="text"
            className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-byar focus:ring focus:ring-byar/50"
            value={telefono}
            onChange={(evento) => setTelefono(evento.target.value)}
          />
        </label>

        <div className="flex items-end">
          <button
            type="submit"
            className="rounded-md bg-byar px-4 py-2 text-white shadow-sm hover:bg-byar/90 focus:outline-none focus:ring-2 focus:ring-byar focus:ring-offset-2"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </>
  );
}
