import { apiMetodosDePago } from "@/api/metodos-de-pago.api";
import { useAutenticacion } from "@/global/AuthContexto";
import type { Tarjeta, Tarjetas } from "@/types/metodos-de-pago";
import { useEffect, useState } from "react";

export default function useMetodosDePago() {
  const [tarjetas, setTarjetas] = useState<Tarjetas[]>([]);
  const [cargando, setCargando] = useState(false);

  const { usuario } = useAutenticacion();

  const recargar = async () => {
    if (!usuario) return;
    const resultado = await apiMetodosDePago.obtenerTarjetas(usuario.id, false);
    if (resultado) setTarjetas(resultado);
  };

  const obtenerTarjetas = async (mostrarNotificacion: boolean = false) => {
    if (!usuario) return;

    setCargando(true);
    const resultado = await apiMetodosDePago.obtenerTarjetas(
      usuario.id,
      mostrarNotificacion,
    );
    if (resultado) setTarjetas(resultado);
    setCargando(false);
  };

  const crearTarjeta = async (
    datos: Tarjeta,
    mostrarNotificacion: boolean = true,
  ) => {
    if (!usuario) return;

    setCargando(true);
    const resultado = await apiMetodosDePago.crearTarjeta(
      usuario?.id,
      datos,
      mostrarNotificacion,
    );
    if (resultado) recargar();
    setCargando(false);
  };

  const establecerPredeterminada = async (
    id_tarjeta: number,
    mostrarNotificacion: boolean = true,
  ) => {
    if (!usuario) return;

    setCargando(true);
    const resultado = await apiMetodosDePago.establecerPredeterminada(
      usuario?.id,
      id_tarjeta,
      mostrarNotificacion,
    );
    if (resultado) recargar();
    setCargando(false);
  };

  const eliminarTarjeta = async (
    id_tarjeta: number,
    mostrarNotificacion: boolean = true,
  ) => {
    if (!usuario) return;

    setCargando(true);
    const resultado = await apiMetodosDePago.eliminarTarjeta(
      usuario?.id,
      id_tarjeta,
      mostrarNotificacion,
    );
    if (resultado) recargar();
    setCargando(false);
  };

  useEffect(() => {
    obtenerTarjetas();
  }, []);

  return {
    tarjetas,
    cargando,
    crearTarjeta,
    establecerPredeterminada,
    eliminarTarjeta,
  };
}
