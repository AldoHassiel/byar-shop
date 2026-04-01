import { apiCategorias } from "@/api/categorias.api";
import type { CategoriaDTO, Categorias } from "@/types/categorias";
import { useEffect, useState } from "react";

export default function useCategorias() {
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const [cargando, setCargando] = useState(true);

  const recargar = async () => {
    const datos = await apiCategorias.obtenerTodas(false);
    if (datos) {
      setCategorias(datos);
    }
  };

  const obtenerCategorias = async (mostrarNotificacion: boolean = false) => {
    setCargando(true);
    const datos = await apiCategorias.obtenerTodas(mostrarNotificacion);
    if (datos) {
      setCategorias(datos);
    }
    setCargando(false);
  };

  const crearCategoria = async (
    datos: CategoriaDTO,
    mostrarNotificacion: boolean = true,
  ) => {
    setCargando(true);
    const resultado = await apiCategorias.crear(datos, mostrarNotificacion);
    if (resultado) {
      await recargar();
    }
    setCargando(false);
  };

  const editarCategoria = async (
    datos: CategoriaDTO,
    mostrarNotificacion: boolean = true,
  ) => {
    setCargando(true);
    const resultado = await apiCategorias.editar(datos, mostrarNotificacion);
    if (resultado) {
      recargar();
    }
    setCargando(false);
  };

  const eliminarCategoria = async (
    id: number,
    mostrarNotificacion: boolean = true,
  ) => {
    setCargando(true);
    const resultado = await apiCategorias.eliminar(id, mostrarNotificacion);
    if (resultado) {
      recargar();
    }
    setCargando(false);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return {
    categorias,
    cargando,
    obtenerCategorias,
    crearCategoria,
    editarCategoria,
    eliminarCategoria,
  };
}
