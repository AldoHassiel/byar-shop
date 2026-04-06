import type { ApiRespuesta } from "@/types/api";
import axios from "axios";
import { toast } from "sonner";
import api from "./api.config";
import type { Compras, DetalleCompra } from "@/types/compras";

const obtenerCompras = async (
  idUsuario: number,
  mostrarNotificacion: boolean = false,
) => {
  try {
    const respuestaHttp = await api.get<ApiRespuesta<Compras>>(
      `/usuario/${idUsuario}/compras`,
    );
    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast.error(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, { position: "bottom-right" });
    }

    return respuestaAPI.datos;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { mensaje } = error.response.data;
      toast.error(mensaje, {
        duration: 4000,
      });
    }

    toast.error("No se pudo hacer la petición", { position: "bottom-right" });
    return null;
  }
};

const obtenerDetalleCompra = async (
  idUsuario: number,
  idCompra: number,
  mostrarNotificacion: boolean = false,
) => {
  try {
    const respuestaHttp = await api.get<ApiRespuesta<DetalleCompra>>(
      `/usuario/${idUsuario}/compras/${idCompra}`,
    );
    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast.error(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, { position: "bottom-right" });
    }

    return respuestaAPI.datos[0];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { mensaje } = error.response.data;
      toast.error(mensaje, {
        duration: 4000,
      });
    }

    toast.error("No se pudo hacer la petición", { position: "bottom-right" });
    return null;
  }
};

export const apiCompras = {
  obtenerCompras,
  obtenerDetalleCompra,
};
