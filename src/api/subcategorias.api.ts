import type { ApiRespuesta } from "@/types/api";
import api from "./api.config";
import type {
    CategoriaConSubcategorias,
    Subcategorias,
    //SubcategoriasDTO
} from "@/types/subcategoria";
import { toast } from "sonner";


const obtenerTodas = async (mostrarNotificacion?: true) => {
    try {
        const respuestaHttp = await api.get<ApiRespuesta<CategoriaConSubcategorias>>("/categorias-subcategorias");

        const respuestaAPI = respuestaHttp.data;

        if (!respuestaAPI.estado) {
            toast(respuestaAPI.mensaje, { position: "bottom-right" });
            return null;
        }

        if (respuestaAPI.estado && mostrarNotificacion) {
            toast(respuestaAPI.mensaje, { position: "bottom-right" });
        }

        return respuestaAPI.datos.flatMap((grupo) =>
            grupo.subcategorias.map((subcategoria) => ({
                ...subcategoria,
                id_categoria: subcategoria.id_categoria ?? grupo.id_categoria,
            })),
        );
    } catch (error) {
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
        } catch (fallbackError) {
            console.error(error);
            console.error(fallbackError);
            toast("No se pudo hacer la petición", { position: "bottom-right" });

            return null;
        }
    }
}


export const apiSubcategorias = {
    obtenerTodas,
};
