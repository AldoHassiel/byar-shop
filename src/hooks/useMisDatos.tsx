import { apiMisDatos } from "@/api/mis-datos.api";
import { useAutenticacion } from "@/global/AuthContexto";
import type { MisDatos } from "@/types/mis-datos";
import { useEffect, useState } from "react";

export default function useMisDatos() {
  const { usuario, setUsuario, cerrarSesion } = useAutenticacion();
  const [datos, setDatos] = useState<MisDatos | null>(null);
  const [cargando, setCargando] = useState(false);

  const actualizarUsuarioSesion = (cambios: Partial<MisDatos>) => {
    setUsuario((prev) => {
      if (!prev) return prev;

      const actualizado = {
        ...prev,
        ...cambios,
      };

      localStorage.setItem("usuario", JSON.stringify(actualizado));
      return actualizado;
    });
  };

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
      const datosActualizados = await apiMisDatos.obtener(usuario.id);

      if (datosActualizados) {
        setDatos(datosActualizados);
        actualizarUsuarioSesion({
          nombre: datosActualizados.nombre,
          apellidos: datosActualizados.apellidos,
          telefono: datosActualizados.telefono,
          correo: datosActualizados.correo,
        });
      } else {
        setDatos((prev) => (prev ? { ...prev, ...nuevosDatos } : prev));
        actualizarUsuarioSesion({
          nombre: nuevosDatos.nombre,
          apellidos: nuevosDatos.apellidos,
          telefono: nuevosDatos.telefono,
          correo: nuevosDatos.correo,
        });
      }
    }
    setCargando(false);
    return respuesta;
  };

  const editarCorreo = async (correo: string, pwdActual: string) => {
    if (!usuario) return;
    setCargando(true);
    const respuesta = await apiMisDatos.editarCorreo(
      usuario.id,
      correo,
      pwdActual,
      true,
    );
    if (respuesta) {
      const datosActualizados = await apiMisDatos.obtener(usuario.id);

      if (datosActualizados) {
        setDatos(datosActualizados);
        actualizarUsuarioSesion({
          nombre: datosActualizados.nombre,
          apellidos: datosActualizados.apellidos,
          telefono: datosActualizados.telefono,
          correo: datosActualizados.correo,
        });
      } else {
        setDatos((prev) => (prev ? { ...prev, correo } : prev));
        actualizarUsuarioSesion({ correo });
      }
    }
    setCargando(false);
    return respuesta;
  };

  const editarPwd = async (pwd: string, pwdActual: string) => {
    if (!usuario) return;
    setCargando(true);
    const respuesta = await apiMisDatos.editarPwd(
      usuario.id,
      pwd,
      pwdActual,
      true,
    );
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
