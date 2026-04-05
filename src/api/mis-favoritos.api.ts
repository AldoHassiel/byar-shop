import type { ApiRespuesta } from "@/types/api";
import api from "./api.config";
import type {
    ProductoFavorito,
} from "@/types/mis-favoritos";
import { toast } from "sonner";
import axios from "axios";
import { mostrarErroresZod } from "@/lib/validaciones.zod";

const obtenerFavoritos = async (id: number, mostrarNotificacion?: true) => {
    try {
        const respuestaHttp = await api.get<ApiRespuesta<ProductoFavorito>>(`/usuarios/${id}/mis-favoritos`);

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
        console.error(error);
        toast.error("No se pudo hacer la petición", { position: "bottom-right" });

        return null;
    }
};

const eliminarFavorito = async (idUsuario: number, idProducto: number, mostrarNotificacion?: true) => {
    try {
        const respuestaHttp = await api.delete(`/usuarios/${idUsuario}/mis-favoritos/eliminar/producto/${idProducto}`);

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
        console.error(error);
        toast.error("No se pudo hacer la petición", { position: "bottom-right" });
        return null;
    }
};


export const apiFavoritos = {
    obtenerFavoritos,
    eliminarFavorito,
};