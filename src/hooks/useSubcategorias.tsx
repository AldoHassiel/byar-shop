import { apiSubcategorias } from "@/api/subcategorias.api";
import type {
  SubcategoriaDTO,
  Subcategorias,
  SubcategoriasDTO,
} from "@/types/subcategoria";
import { useEffect, useState } from "react";

interface Props {
  sinArbol?: boolean;
}

export default function useSubcategorias(props?: Props) {
  const [subCategorias, setSubCategorias] = useState<Subcategorias[]>([]);
  const [subCategoriasNormal, setSubCategoriasNormal] = useState<
    SubcategoriasDTO[]
  >([]);
  const [cargandoSubcategorias, setCargando] = useState(true);

  const recargar = async () => {
    const datos = await apiSubcategorias.obtenerSubcategorias(false);
    if (datos) {
      setSubCategoriasNormal(datos);
    }
  };

  const obtenerSubcategorias = async (mostrarNotificacion: boolean = false) => {
    setCargando(true);
    const datos = await apiSubcategorias.obtenerTodas(mostrarNotificacion);
    if (datos) {
      setSubCategorias(datos);
    }
    setCargando(false);
  };

  const obtenerSubcategoriasNormal = async (
    mostrarNotificacion: boolean = false,
  ) => {
    setCargando(true);
    const datos =
      await apiSubcategorias.obtenerSubcategorias(mostrarNotificacion);
    if (datos) {
      setSubCategoriasNormal(datos);
    }
    setCargando(false);
  };

  const crearSubcategoria = async (
    datos: SubcategoriaDTO,
    mostrarNotificacion: boolean = true,
  ) => {
    setCargando(true);
    const resultado = await apiSubcategorias.crear(datos, mostrarNotificacion);
    if (resultado) {
      recargar();
    }
    setCargando(false);
  };

  const editarSubcategoria = async (
    datos: SubcategoriaDTO,
    mostrarNotificacion: boolean = true,
  ) => {
    setCargando(true);
    const resultado = await apiSubcategorias.editar(datos, mostrarNotificacion);
    if (resultado) {
      recargar();
    }
    setCargando(false);
  };

  const eliminarSubcategoria = async (
    id: number,
    mostrarNotificacion: boolean = true,
  ) => {
    setCargando(true);
    const resultado = await apiSubcategorias.eliminar(id, mostrarNotificacion);
    if (resultado) {
      recargar();
    }
    setCargando(false);
  };

  useEffect(() => {
    if (props && props.sinArbol) {
      obtenerSubcategoriasNormal();
    } else {
      obtenerSubcategorias();
    }
  }, []);

  return {
    subCategorias,
    subCategoriasNormal,
    cargandoSubcategorias,
    obtenerSubcategorias,
    crearSubcategoria,
    editarSubcategoria,
    eliminarSubcategoria,
  };
}
