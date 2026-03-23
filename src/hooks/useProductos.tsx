import { apiProductos } from "@/api/productos.api";
import type {
  Producto,
  ProductoDetallado,
  ProductoEditadoFormulario,
  ProductoFormulario,
} from "@/types/productos";
import { useEffect, useState } from "react";

export default function useProductos() {
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
    const cargar = async () => {
      await obtenerTodos();
    };
    cargar();
  }, []);

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
