import type { ApiRespuesta } from "@/types/api";
import api from "./api.config";
import type {
    Subcategorias,
    //SubcategoriasDTO
} from "@/types/subcategoria";
import { toast } from "sonner";


const obtenerTodas = async (mostrarNotificacion?: true) => {
    try {
        const respuestaHttp = await api.get<ApiRespuesta<Subcategorias>>("/subcategorias");

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


export const apiSubcategorias = {
    obtenerTodas,
};
