import { apiNegocio } from "@/api/negocio.api";
import type {
  EditarDatosNegocio,
  EditarImagenesNegocio,
  Negocio,
} from "@/types/negocio";
import { createContext, useContext, useEffect, useState } from "react";

interface NegocioContexto {
  negocio: Negocio | undefined;
  cargando: boolean;
  obtenerDatosNegocio: () => Promise<void>;
  editarDatosNegocio: (
    datos: EditarDatosNegocio,
    imagenes?: EditarImagenesNegocio,
    mostrarNotificacion?: boolean,
  ) => Promise<void>;
}

const NegocioContext = createContext<NegocioContexto | undefined>(undefined);

export function ProveedorNegocio({ children }: { children: React.ReactNode }) {
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

  return (
    <NegocioContext.Provider
      value={{ negocio, cargando, obtenerDatosNegocio, editarDatosNegocio }}
    >
      {children}
    </NegocioContext.Provider>
  );
}

export function useNegocio(): NegocioContexto {
  const context = useContext(NegocioContext);
  if (!context)
    throw new Error("useNegocio debe usarse dentro de <NegocioProvider>");
  return context;
}
