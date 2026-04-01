import { apiCarrito } from "@/api/carrito";
import { useAutenticacion } from "@/global/AuthContexto";
import type { Carrito } from "@/types/carrito";
import { useEffect, useRef, useState } from "react";

export default function useCarrito(idDireccionInicial?: number) {
  const [carrito, setCarrito] = useState<Carrito>();
  const idDireccionRef = useRef<number | undefined>(idDireccionInicial);
  const [cargando, setCargando] = useState(false);

  const { usuario } = useAutenticacion();

  const recargarCarrito = async (
    idDireccion?: number,
    mostrarNotificacion = true,
  ) => {
    if(!usuario?.id) return;

    const datos = await apiCarrito.obtenerCarrito(
      usuario?.id,
      idDireccion,
      mostrarNotificacion,
    );
    if (datos) setCarrito(datos);
  };

  const obtenerCarrito = async (
    idDireccion?: number,
    mostrarNotificacion: boolean = true,
  ) => {
    idDireccionRef.current = idDireccion;
    setCargando(true);
    await recargarCarrito(idDireccion, mostrarNotificacion);
    setCargando(false);
  };

  const agregarAlCarrito = async (
    idProducto: number,
    cantidad: number,
    mostrarNotificacion: boolean = true,
  ) => {
    if (!usuario?.id) return;
    setCargando(true);
    await apiCarrito.agregarAlCarrito(
      usuario?.id,
      idProducto,
      cantidad,
      mostrarNotificacion,
    );
    await recargarCarrito(idDireccionRef.current, false);
    setCargando(false);
  };

  const actualizarCantidad = async (
    idProducto: number,
    delta: number,
    mostrarNotificacion: boolean = true,
  ) => {
    if (!usuario?.id) return;
    setCargando(true);
    await apiCarrito.actualizarCantidad(
      usuario?.id,
      idProducto,
      delta,
      mostrarNotificacion,
    );
    await recargarCarrito(idDireccionRef.current, false);
    setCargando(false);
  };

  const eliminarProducto = async (
    idProducto: number,
    mostrarNotificacion: boolean = true,
  ) => {
    if (!usuario?.id) return;
    setCargando(true);
    await apiCarrito.eliminarProducto(
      usuario?.id,
      idProducto,
      mostrarNotificacion,
    );
    await recargarCarrito(idDireccionRef.current, false);
    setCargando(false);
  };

  useEffect(() => {
    obtenerCarrito(idDireccionRef.current);
  }, []);

  return {
    carrito,
    cargando,
    obtenerCarrito,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarProducto,
  };
}
