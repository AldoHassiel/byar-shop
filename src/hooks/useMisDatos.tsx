import { apiMisDatos } from "@/api/mis-datos.api";
import { useAutenticacion } from "@/global/AuthContexto";
import type { MisDatos } from "@/types/mis-datos";
import { useEffect, useState } from "react";

export default function useMisDatos() {
  const { usuario, setUsuario, cerrarSesion } = useAutenticacion();
  const [datos, setDatos] = useState<MisDatos | null>(null);
  const [cargando, setCargando] = useState(false);

  const obtener = async () => {
    if (!usuario) return;
    setCargando(true);
    const respuesta = await apiMisDatos.obtener(usuario.id);
    if (respuesta) setDatos(respuesta);
    setCargando(false);
  };

  const editarDatosGenerales = async (nuevosDatos: MisDatos) => {
    if (!usuario) return;
    setCargando(true);
    const respuesta = await apiMisDatos.editarDatosGenerales(
      usuario.id,
      nuevosDatos,
      true,
    );
    if (respuesta) {
      setDatos((prev) => (prev ? { ...prev, ...nuevosDatos } : prev));
      setUsuario((prev) =>
        prev ? { ...prev, nombre: nuevosDatos.nombre } : prev,
      );
    }
    setCargando(false);
    return respuesta;
  };

  const editarCorreo = async (correo: string) => {
    if (!usuario) return;
    setCargando(true);
    const respuesta = await apiMisDatos.editarCorreo(usuario.id, correo, true);
    if (respuesta) setDatos((prev) => (prev ? { ...prev, correo } : prev));
    setCargando(false);
    return respuesta;
  };

  const editarPwd = async (pwd: string) => {
    if (!usuario) return;
    setCargando(true);
    const respuesta = await apiMisDatos.editarPwd(usuario.id, pwd, true);
    setCargando(false);
    return respuesta;
  };

  const eliminarCuenta = async () => {
    if (!usuario) return;
    setCargando(true);
    const respuesta = await apiMisDatos.eliminarCuenta(usuario.id, true);
    
    if (respuesta) {
      cerrarSesion();
    }
    
    setCargando(false);
    return respuesta;
  };

  useEffect(() => {
    if (!usuario) return;
    setCargando(true);
    apiMisDatos.obtener(usuario.id).then((respuesta) => {
      if (respuesta) setDatos(respuesta);
      setCargando(false);
    });
  }, [usuario?.id]);

  return {
    datos,
    cargando,
    obtener,
    editarDatosGenerales,
    editarCorreo,
    editarPwd,
    eliminarCuenta,
  };
}
