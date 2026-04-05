import { mostrarErroresZod } from "@/lib/validaciones.zod";
import type { ApiRespuesta } from "@/types/api";
import axios from "axios";
import { toast } from "sonner";
import api from "./api.config";
import type { Tarjeta, Tarjetas } from "@/types/metodos-de-pago";

const obtenerTarjetas = async (
  id_usuario: number,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.get<ApiRespuesta<Tarjetas>>(
      `/usuario/${id_usuario}/metodosPago`,
    );

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

const crearTarjeta = async (
  id_usuario: number,
  datos: Tarjeta,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.post<ApiRespuesta<null>>(
      `/usuario/${id_usuario}/metodosPago`,
      datos,
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

const establecerPredeterminada = async (
  id_usuario: number,
  id_tarjeta: number,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.patch<ApiRespuesta<null>>(
      `/usuario/${id_usuario}/metodosPago/${id_tarjeta}/predeterminada`,
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

const eliminarTarjeta = async (
  id_usuario: number,
  id_tarjeta: number,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.delete<ApiRespuesta<null>>(
      `/usuario/${id_usuario}/metodosPago/${id_tarjeta}`,
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

export const apiMetodosDePago = {
  obtenerTarjetas,
  crearTarjeta,
  establecerPredeterminada,
  eliminarTarjeta,
};
