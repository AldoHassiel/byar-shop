import { apiCompras } from "@/api/compras.api";
import { useAutenticacion } from "@/global/AuthContexto";
import type { Compras, DetalleCompra } from "@/types/compras";
import { useEffect, useState } from "react";

export default function useCompras() {
  const [compras, setCompras] = useState<Compras[]>([]);
  const [detalleCompra, setDetalleCompra] = useState<DetalleCompra | null>(
    null,
  );
  const [cargando, setCargando] = useState(false);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  const { usuario } = useAutenticacion();

  const obtenerCompras = async (mostrarNotificacion: boolean = false) => {
    if (!usuario?.id) return;

    setCargando(true);
    const resultado = await apiCompras.obtenerCompras(
      usuario?.id,
      mostrarNotificacion,
    );
    if (resultado) setCompras(resultado);
    setCargando(false);
  };

  const obtenerDetalleCompra = async (
    idCompra: number,
    mostrarNotificacion: boolean = false,
  ) => {
    if (!usuario?.id) return;

    setCargandoDetalle(true);
    const resultado = await apiCompras.obtenerDetalleCompra(
      usuario?.id,
      idCompra,
      mostrarNotificacion,
    );
    if (resultado) setDetalleCompra(resultado);
    setCargandoDetalle(false);
  };

  useEffect(() => {
    obtenerCompras();
  }, []);

  return {
    compras,
    detalleCompra,
    cargando,
    cargandoDetalle,
    obtenerCompras,
    obtenerDetalleCompra,
  };
}
