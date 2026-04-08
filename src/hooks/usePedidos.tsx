import { apiCompras } from "@/api/compras.api";
import { apiPedidos } from "@/api/pedidos.api";
import { useAutenticacion } from "@/global/AuthContexto";
import type {
  DetallePedido,
  EstadoPedido,
  FiltrosPedido,
  Pedido,
} from "@/types/pedidos";
import { useEffect, useState } from "react";

const obtenerNombreEstado = (id_estado: number): string => {
  switch (id_estado) {
    case 1:
      return "En proceso";
    case 2:
      return "Entregado";
    case 3:
      return "Cancelado";
    default:
      return "Desconocido";
  }
};

const prioridadEstado: Record<string, number> = {
  "En proceso": 1,
  Entregado: 2,
  Cancelado: 3,
};

export default function usePedido(filtros: FiltrosPedido) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [estadosPedidos, setEstadosPedidos] = useState<EstadoPedido[]>([]);

  const [detallePedido, setDetallePedido] = useState<DetallePedido | null>(
    null,
  );
  const [cargando, setCargando] = useState(false);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  const { usuario } = useAutenticacion();

  const obtenerPedido = async (
    filtrosNuevos?: FiltrosPedido,
    mostrarNotificacion: boolean = false,
  ) => {
    if (!usuario?.es_admin) return;

    const filtrosReales = filtrosNuevos ?? filtros;

    setCargando(true);
    const resultado = await apiPedidos.obtenerPedidos(
      filtrosReales,
      mostrarNotificacion,
    );
    if (resultado) setPedidos(resultado);
    setCargando(false);
  };

  const obtenerDetallePedido = async (
    idPedido: number,
    mostrarNotificacion: boolean = false,
  ) => {
    if (!usuario?.es_admin) return;

    setCargandoDetalle(true);
    const resultado = await apiPedidos.obtenerDetallePedido(
      idPedido,
      mostrarNotificacion,
    );
    if (resultado) setDetallePedido(resultado);
    setCargandoDetalle(false);
  };

  const obtenerEstadosPedidos = async (
    mostrarNotificacion: boolean = false,
  ) => {
    const resultado =
      await apiPedidos.obtenerEstadosPedidos(mostrarNotificacion);
    if (resultado) setEstadosPedidos(resultado);
  };

  const cambiarEstadoPedido = async (
    id_pedido: number,
    id_estado: number,
    mostrarNotificacion: boolean = true,
  ) => {
    const resultado = await apiPedidos.cambiarEstado(
      id_pedido,
      id_estado,
      mostrarNotificacion,
    );
    if (resultado) {
      const nombreEstado = obtenerNombreEstado(id_estado);

      setPedidos((prev) =>
        prev
          .map((pedido) =>
            pedido.id === id_pedido
              ? { ...pedido, estado: nombreEstado }
              : pedido,
          )
          .sort(
            (a, b) =>
              (prioridadEstado[a.estado] ?? 99) -
              (prioridadEstado[b.estado] ?? 99),
          ),
      );

      setDetallePedido((prev) =>
        prev && prev.pedido.id === id_pedido
          ? {
              ...prev,
              pedido: {
                ...prev.pedido,
                estado: nombreEstado,
              },
            }
          : prev,
      );
    }
  };

  useEffect(() => {
    obtenerPedido();
    obtenerEstadosPedidos();
  }, []);

  return {
    pedidos,
    detallePedido,
    estadosPedidos,
    cargando,
    cargandoDetalle,
    obtenerPedido,
    obtenerDetallePedido,
    obtenerEstadosPedidos,
    cambiarEstadoPedido,
  };
}
