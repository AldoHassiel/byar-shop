import type { ApiRespuesta } from "@/types/api";
import api from "./api.config";
import type { Negocio } from "@/types/negocio";
import { toast } from "sonner";

const obtenerDatos = async (mostrarNotificacion?: false) => {
  try {
    const respuestaHttp = await api.get<ApiRespuesta<Negocio>>(`/negocio`);
    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    return respuestaAPI.datos[0];
  } catch (error) {
    console.error(error);
    toast("No se pudo hacer la petición", { position: "bottom-right" });
    return false;
  }
};

export const apiNegocio = {
  obtenerDatos,
};
