import type { ApiRespuesta } from "@/types/api";
import api from "./api.config";
import type {
    Categorias,
    CategoriaDTO
} from "@/types/categorias";
import { toast } from "sonner";


const obtenerTodas = async (mostrarNotificacion?: true) => {
    try {
        const respuestaHttp = await api.get<ApiRespuesta<Categorias>>("/categorias");

        const respuestaAPI = respuestaHttp.data;

        if (!respuestaAPI.estado) {
            toast(respuestaAPI.mensaje, { position: "bottom-right" });
            return null;
        }

        if (respuestaAPI.estado && mostrarNotificacion) {
            toast(respuestaAPI.mensaje, { position: "bottom-right" });
        }

        return respuestaAPI.datos;
    } catch (error) {
        console.error(error);
        toast("No se pudo hacer la petición", { position: "bottom-right" });

        return null;
    }
}

/*
const respuestaHttp = await api.get<ApiRespuesta<Producto>>("/productos", {
      params,
    });
    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast(respuestaAPI.mensaje, { position: "bottom-right" });
    }

    const datos: Datos = {
      totalPaginas: respuestaAPI.total_paginas ?? 0,
      productos: respuestaAPI.datos,
    };

    return datos;
  } catch (error) {
    console.error(error);
    toast("No se pudo hacer la petición", { position: "bottom-right" });

    return null;
  }
*/

export const apiCategorias = {
    obtenerTodas,
};
