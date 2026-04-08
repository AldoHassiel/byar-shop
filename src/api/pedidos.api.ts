import { mostrarErroresZod } from "@/lib/validaciones.zod";
import type { ApiRespuesta } from "@/types/api";
import type {
  DetallePedido,
  EstadoPedido,
  FiltrosPedido,
  Pedido,
} from "@/types/pedidos";
import axios from "axios";
import { toast } from "sonner";
import api from "./api.config";

const obtenerEstadosPedidos = async (mostrarNotificacion: boolean = false) => {
  try {
    const respuestaHttp =
      await api.get<ApiRespuesta<EstadoPedido>>(`/estadosPedidos`);

    const respuestaAPI = respuestaHttp.data;

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, {
        duration: 4000,
      });
    }

    return respuestaAPI.datos;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { mensaje, datos } = error.response.data;
      if (mensaje === "Error de validaciones") {
        mostrarErroresZod(datos);
        return null;
      }

      toast.error(mensaje, {
        duration: 4000,
      });

      return null;
    }

    toast.error("No se pudo hacer la petición", {
      duration: 4000,
    });

    return null;
  }
};

const obtenerPedidos = async (
  filtros: FiltrosPedido,
  mostrarNotificacion: boolean = false,
) => {
  try {
    const params = Object.fromEntries(
      Object.entries(filtros).filter(([, valor]) => valor !== undefined),
    );

    const respuestaHttp = await api.get<ApiRespuesta<Pedido>>(`/pedidos`, {
      params,
    });

    const respuestaAPI = respuestaHttp.data;

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, {
        duration: 4000,
      });
    }

    return respuestaAPI.datos;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { mensaje, datos } = error.response.data;
      if (mensaje === "Error de validaciones") {
        mostrarErroresZod(datos);
        return null;
      }

      toast.error(mensaje, {
        duration: 4000,
      });

      return null;
    }

    toast.error("No se pudo hacer la petición", {
      duration: 4000,
    });

    return null;
  }
};

const obtenerDetallePedido = async (
  id_pedido: number,
  mostrarNotificacion: boolean = false,
) => {
  try {
    const respuestaHttp = await api.get<ApiRespuesta<DetallePedido>>(
      `/pedidos/${id_pedido}`,
    );

    const respuestaAPI = respuestaHttp.data;

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, {
        duration: 4000,
      });
    }

    return respuestaAPI.datos[0];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { mensaje, datos } = error.response.data;
      if (mensaje === "Error de validaciones") {
        mostrarErroresZod(datos);
        return null;
      }

      toast.error(mensaje, {
        duration: 4000,
      });

      return null;
    }

    toast.error("No se pudo hacer la petición", {
      duration: 4000,
    });

    return null;
  }
};

const cambiarEstado = async (
  id_pedido: number,
  id_estado: number,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.patch<ApiRespuesta<[]>>(
      `/pedidos/${id_pedido}`,
      {
        id_estado,
      },
    );

    const respuestaAPI = respuestaHttp.data;

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, {
        duration: 4000,
      });
    }

    return respuestaAPI.estado;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { mensaje, datos } = error.response.data;
      if (mensaje === "Error de validaciones") {
        mostrarErroresZod(datos);
        return null;
      }

      toast.error(mensaje, {
        duration: 4000,
      });

      return null;
    }

    toast.error("No se pudo hacer la petición", {
      duration: 4000,
    });

    return null;
  }
};

export const apiPedidos = {
  obtenerPedidos,
  obtenerDetallePedido,
  obtenerEstadosPedidos,
  cambiarEstado,
};
