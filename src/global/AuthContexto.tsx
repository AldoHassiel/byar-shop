import { apiAuth } from "@/api/auth.api";
import type { Usuario } from "@/types/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ContextoAutenticacionTipo {
  usuario: Usuario | null;
  cargando: boolean;
  iniciarSesion: (correo: string, pwd: string) => Promise<boolean | undefined>;
  registrarCuenta: (
    nombre: string,
    apellidos: string,
    correo: string,
    pwd: string,
  ) => Promise<boolean | undefined>;

  cerrarSesion: () => void;

  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

export const ContextoAutenticacion =
  createContext<ContextoAutenticacionTipo | null>(null);

interface Props {
  children: ReactNode;
}

export function ProveedorAutenticacion({ children }: Props) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
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
      setUsuario(respuesta.datos[0].usuario);
      localStorage.setItem(
        "usuario",
        JSON.stringify(respuesta.datos[0].usuario),
      );
      localStorage.setItem("token", respuesta.datos[0].token);
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
      setUsuario(respuesta.datos[0].usuario);
      localStorage.setItem(
        "usuario",
        JSON.stringify(respuesta.datos[0].usuario),
      );
    }
    setCargando(false);
    return respuesta?.estado;
  };

  const cerrarSesion = async () => {
    setCargando(true);
    await apiAuth.cerrarSesion();
    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
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
        setUsuario,
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
