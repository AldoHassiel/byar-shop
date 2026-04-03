import type { ApiRespuesta } from "@/types/api";
import api from "./api.config";
import type {
  EditarDatosNegocio,
  EditarImagenesNegocio,
  Negocio,
} from "@/types/negocio";
import { toast } from "sonner";
import axios from "axios";
import { mostrarErroresZod } from "@/lib/validaciones.zod";

const obtenerDatos = async (mostrarNotificacion: boolean = false) => {
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
    return null;
  }
};

const editar = async (
  datos: EditarDatosNegocio,
  imagenes?: EditarImagenesNegocio,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const formulario = new FormData();

    formulario.append("nombre", datos.nombre);
    formulario.append("sobre_nosotros", datos.sobre_nosotros);
    formulario.append("direccion", datos.direccion);
    formulario.append("whatsapp", datos.whatsapp);
    formulario.append("instagram", datos.instagram);
    formulario.append("dias_laborales", datos.dias_laborales);
    formulario.append("hora_de_apertura", datos.hora_de_apertura);
    formulario.append("hora_de_cierre", datos.hora_de_cierre);

    if (imagenes) {
      if (imagenes.logotipo) {
        formulario.append("logotipo", imagenes.logotipo);
      }
      if (imagenes.imagen_sobre_nosotros) {
        formulario.append(
          "imagen_sobre_nosotros",
          imagenes.imagen_sobre_nosotros,
        );
      }
      if (imagenes.hero_imagen) {
        formulario.append("hero_imagen", imagenes.hero_imagen);
      }
    }

    const respuestaHttp = await api.put<ApiRespuesta<null>>(
      "/negocio",
      formulario,
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

export const apiNegocio = {
  obtenerDatos,
  editar,
};
