import { apiMarcas } from "@/api/marcas.api";
import type { MarcaDTO, Marcas } from "@/types/marcas";
import { useEffect, useState } from "react";

export default function useMarcas() {
  const [marcas, setMarcas] = useState<Marcas[]>([]);
  const [cargandoMarcas, setCargando] = useState(true);

  const recargar = async () => {
    const datos = await apiMarcas.obtenerTodas(false);
    if (datos) {
      setMarcas(datos);
    }
  };

  const obtenerMarcas = async (mostrarNotificacion: boolean = false) => {
    setCargando(true);
    const datos = await apiMarcas.obtenerTodas(mostrarNotificacion);
    if (datos) {
      setMarcas(datos);
    }
    setCargando(false);
  };

  const crearMarca = async (
    datos: MarcaDTO,
    mostrarNotificacion: boolean = true,
  ) => {
    setCargando(true);
    const resultado = await apiMarcas.crear(datos, mostrarNotificacion);
    if (resultado) {
      recargar();
    }
    setCargando(false);
  };

  const editarMarca = async (
    datos: MarcaDTO,
    mostrarNotificacion: boolean = true,
  ) => {
    setCargando(true);
    const resultado = await apiMarcas.editar(datos, mostrarNotificacion);
    if (resultado) {
      recargar();
    }
    setCargando(false);
  };

  const eliminarMarca = async (
    id: number,
    mostrarNotificacion: boolean = true,
  ) => {
    setCargando(true);
    const resultado = await apiMarcas.eliminar(id, mostrarNotificacion);
    if (resultado) {
      recargar();
    }
    setCargando(false);
  };

  useEffect(() => {
    obtenerMarcas();
  }, []);

  return {
    marcas,
    cargandoMarcas,
    obtenerMarcas,
    crearMarca,
    editarMarca,
    eliminarMarca,
  };
}
