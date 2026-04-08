import { apiEstadisticas } from "@/api/estadisticas.api";
import type { Estadisticas } from "@/types/estadisticas";
import { useEffect, useState } from "react";

export default function useEstadisticas(mostrarNotificacion?: boolean) {
  const [estadisticas, setEstadisticas] = useState<Estadisticas>();
  const [cargando, setCargando] = useState(false);

  const obtenerEstadisticas = async (mostrarNotificacion: boolean = false) => {
    setCargando(true);
    const datos =
      await apiEstadisticas.obtenerEstadisticas(mostrarNotificacion);
    if (datos) {
      setEstadisticas(datos);
    }
    setCargando(false);
  };

  useEffect(() => {
    obtenerEstadisticas(mostrarNotificacion);
  }, []);

  return { estadisticas, cargando, obtenerEstadisticas };
}
