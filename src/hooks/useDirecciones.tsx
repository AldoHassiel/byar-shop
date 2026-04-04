import { apiDirecciones } from "@/api/direcciones.api";
import { useAutenticacion } from "@/global/AuthContexto";
import type { Direccion, Direcciones } from "@/types/direcciones";
import { useEffect, useState } from "react";

export default function useDirecciones() {
  const [direcciones, setDirecciones] = useState<Direcciones[]>([]);
  const [cargando, setCargando] = useState(false);

  const { usuario } = useAutenticacion();

  const obtenerDirecciones = async (mostrarNotificacion: boolean = false) => {
    if (!usuario) return;

    setCargando(true);
    const resultado = await apiDirecciones.obtenerDirecciones(
      usuario?.id,
      mostrarNotificacion,
    );
    if (resultado) setDirecciones(resultado);
    setCargando(false);
  };

  const crearDireccion = async (
    datos: Direccion,
    mostrarNotificacion: boolean = true,
  ) => {
    if (!usuario) return;

    setCargando(true);
    const resultado = await apiDirecciones.crearDireccion(
      usuario?.id,
      datos,
      mostrarNotificacion,
    );
    if (resultado) recargar();
    setCargando(false);
  };

  const editarDireccion = async (
    datos: Direccion,
    mostrarNotificacion: boolean = true,
  ) => {
    if (!usuario) return;

    setCargando(true);
    const resultado = await apiDirecciones.editarDireccion(
      usuario?.id,
      datos,
      mostrarNotificacion,
    );
    if (resultado) recargar();
    setCargando(false);
  };

  const establecerPredeterminada = async (
    id_direccion: number,
    mostrarNotificacion: boolean = true,
  ) => {
    if (!usuario) return;

    setCargando(true);
    const resultado = await apiDirecciones.establecerPredeterminada(
      usuario?.id,
      id_direccion,
      mostrarNotificacion,
    );
    if (resultado) recargar();
    setCargando(false);
  };

  const eliminarDireccion = async (
    id_direccion: number,
    mostrarNotificacion: boolean = true,
  ) => {
    if (!usuario) return;

    setCargando(true);
    const resultado = await apiDirecciones.eliminarDireccion(
      usuario?.id,
      id_direccion,
      mostrarNotificacion,
    );
    if (resultado) recargar();
    setCargando(false);
  };

  const obtenerInfoCP = async (
    codigo_postal: string | number,
    mostrarNotificacion: boolean = false,
  ) => {
    if (!usuario) return;
    const resultado = await apiDirecciones.obtenerInfoCP(
      codigo_postal,
      mostrarNotificacion,
    );

    if (!resultado || resultado.length <= 0) return undefined;

    return resultado[0];
  };

  const recargar = async () => {
    if (!usuario) return;

    const resultado = await apiDirecciones.obtenerDirecciones(
      usuario?.id,
      false,
    );
    if (resultado) setDirecciones(resultado);
  };

  useEffect(() => {
    obtenerDirecciones();
  }, []);

  return {
    direcciones,
    cargando,
    obtenerDirecciones,
    crearDireccion,
    editarDireccion,
    establecerPredeterminada,
    eliminarDireccion,
    obtenerInfoCP,
  };
}
