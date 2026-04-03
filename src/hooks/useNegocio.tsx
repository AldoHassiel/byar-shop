import { apiNegocio } from "@/api/negocio.api";
import type {
  EditarDatosNegocio,
  EditarImagenesNegocio,
  Negocio,
} from "@/types/negocio";
import { useEffect, useState } from "react";

export default function useNegocio() {
  const [negocio, setNegocio] = useState<Negocio>();
  const [cargando, setCargando] = useState(false);

  const recargar = async () => {
    const respuesta = await apiNegocio.obtenerDatos();
    if (respuesta) setNegocio(respuesta);
  };

  const obtenerDatosNegocio = async () => {
    setCargando(true);
    const respuesta = await apiNegocio.obtenerDatos();
    if (respuesta) setNegocio(respuesta);
    setCargando(false);
  };

  const editarDatosNegocio = async (
    datos: EditarDatosNegocio,
    imagenes?: EditarImagenesNegocio,
    mostrarNotificacion: boolean = true,
  ) => {
    setCargando(true);
    const respuesta = await apiNegocio.editar(
      datos,
      imagenes,
      mostrarNotificacion,
    );
    if (respuesta) recargar();
    setCargando(false);
  };

  useEffect(() => {
    obtenerDatosNegocio();
  }, []);

  return { negocio, cargando, obtenerDatosNegocio, editarDatosNegocio };
}
