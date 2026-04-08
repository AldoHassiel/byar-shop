import type { ApiRespuesta } from "@/types/api";
import api from "./api.config";
import type { Estadisticas } from "@/types/estadisticas";
import { toast } from "sonner";
import axios from "axios";

const obtenerEstadisticas = async (mostrarNotificacion: boolean = true) => {
  try {
    const respuestaHttp =
      await api.get<ApiRespuesta<Estadisticas>>(`/estadisticas`);
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
      return null;
    }

    toast.error("No se pudo hacer la petición", { position: "bottom-right" });
    return null;
  }
};

export const apiEstadisticas = {
  obtenerEstadisticas,
};
