import { apiProductos } from "@/api/productos.api";
import type {
  Producto,
  ProductoDetallado,
  ProductoEditadoFormulario,
  ProductoFormulario,
} from "@/types/productos";
import { useEffect, useState } from "react";

type ConfiguracionUseProductos = {
  paginaInicial?: number;
  limiteInicial?: number;
};

export default function useProductos(configuracion?: number | ConfiguracionUseProductos) {
  const id = typeof configuracion === "number" ? configuracion : undefined;
  const paginaInicial =
    typeof configuracion === "object" && configuracion?.paginaInicial
      ? configuracion.paginaInicial
      : 1;
  const limiteInicial =
    typeof configuracion === "object" && configuracion?.limiteInicial
      ? configuracion.limiteInicial
      : 20;

  const [productos, setProductos] = useState<Producto[]>([]);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [producto, setProducto] = useState<ProductoDetallado>();
  const [cargando, setCargando] = useState(true);

  const obtenerTodos = async (
    mostrarNotificacion?: true,
    nombre?: string,
    precioMin?: number,
    precioMax?: number,
    idMarca?: number,
    idCategoria?: number,
    idSubcategoria?: number,
    pagina = 1,
    limite = 20,
  ) => {
    setCargando(true);
    const datos = await apiProductos.obtenerTodos(
      mostrarNotificacion,
      nombre,
      precioMin,
      precioMax,
      idMarca,
      idCategoria,
      idSubcategoria,
      pagina,
      limite,
    );
    if (datos) {
      setProductos(datos.productos);
      setTotalPaginas(datos.totalPaginas);
    }
    setCargando(false);
  };

  const obtenerUno = async (id: number, mostrarNotificacion?: true) => {
    setCargando(true);
    const datos = await apiProductos.obtenerUno(id, mostrarNotificacion);
    if (datos) {
      setProducto(datos);
    }
    setCargando(false);
  };

  const crearProducto = async (
    producto: ProductoFormulario,
    mostrarNotificacion?: true,
  ) => {
    setCargando(true);
    const estado = await apiProductos.crear(producto, mostrarNotificacion);
    if (estado) {
      await obtenerTodos();
    }

    setCargando(false);
  };

  const editarProducto = async (
    producto: ProductoEditadoFormulario,
    mostrarNotificacion?: true,
  ) => {
    setCargando(true);
    const estado = await apiProductos.editar(producto, mostrarNotificacion);
    if (estado) {
      await obtenerTodos();
    }

    setCargando(false);
  };

  const eliminarProducto = async (id: number, mostrarNotificacion?: true) => {
    setCargando(true);
    const estado = await apiProductos.eliminar(id, mostrarNotificacion);
    if (estado) {
      await obtenerTodos();
    }

    setCargando(false);
  };

  useEffect(() => {
    const cargarTodos = async () => {
      await obtenerTodos(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        paginaInicial,
        limiteInicial,
      );
    };

    const cargarUno = async (id: number) => {
      await obtenerUno(id);
    };

    if (id) {
      cargarUno(id);
    } else {
      cargarTodos();
    }
  }, [id, limiteInicial, paginaInicial]);

  return {
    productos,
    producto,
    totalPaginas,
    cargando,
    obtenerTodos,
    obtenerUno,
    crearProducto,
    editarProducto,
    eliminarProducto,
  };
}
