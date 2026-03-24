import { apiNegocio } from "@/api/negocio.api";
import type { Negocio } from "@/types/negocio";
import { useEffect, useState } from "react";

export default function useNegocio() {
  const [negocio, setNegocio] = useState<Negocio>();
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);

      const datos = await apiNegocio.obtenerDatos();
      if (datos) {
        setNegocio(datos);
      }

      setCargando(false);
    };

    cargar();
  }, []);

  return { negocio, cargando };
}
