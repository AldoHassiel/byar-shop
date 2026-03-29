import { apiAuth } from "@/api/auth.api";
import type { InicioSesion } from "@/types/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ContextoAutenticacionTipo {
  usuario: InicioSesion | null;
  cargando: boolean;
  iniciarSesion: (correo: string, pwd: string) => Promise<boolean>;
  registrarCuenta: (
    nombre: string,
    apellidos: string,
    correo: string,
    pwd: string,
  ) => Promise<boolean>;

  cerrarSesion: () => void;
}

export const ContextoAutenticacion =
  createContext<ContextoAutenticacionTipo | null>(null);

interface Props {
  children: ReactNode;
}

export function ProveedorAutenticacion({ children }: Props) {
  const [usuario, setUsuario] = useState<InicioSesion>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  const iniciarSesion = async (correo: string, pwd: string) => {
    setCargando(true);
    const respuesta = await apiAuth.inciarSesion(correo, pwd, true);
    if (respuesta?.estado) {
      setUsuario(respuesta.datos[0]);
      localStorage.setItem("usuario", JSON.stringify(respuesta.datos[0]));
    }
    setCargando(false);
    return respuesta?.estado;
  };

  const registrarCuenta = async (
    nombre: string,
    apellidos: string,
    correo: string,
    pwd: string,
  ) => {
    setCargando(true);
    const respuesta = await apiAuth.registrarCuenta(
      nombre,
      apellidos,
      correo,
      pwd,
      true,
    );
    if (respuesta?.estado) {
      setUsuario(respuesta.datos[0]);
      localStorage.setItem("usuario", JSON.stringify(respuesta.datos[0]));
    }
    setCargando(false);
    return respuesta?.estado;
  };

  const cerrarSesion = () => {
    setCargando(true);
    setUsuario(null);
    localStorage.removeItem("usuario");
    setCargando(false);
  };

  return (
    <ContextoAutenticacion.Provider
      value={{
        usuario,
        cargando,
        iniciarSesion,
        registrarCuenta,
        cerrarSesion,
      }}
    >
      {children}
    </ContextoAutenticacion.Provider>
  );
}

export function useAutenticacion() {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto)
    throw new Error(
      "useAutenticacion debe usarse dentro de <ProveedorAutenticacion>",
    );
  return contexto;
}
