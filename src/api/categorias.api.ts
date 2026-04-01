import type { ApiRespuesta } from "@/types/api";
import api from "./api.config";
import type { CategoriaDTO, Categorias } from "@/types/categorias";
import { toast } from "sonner";
import axios from "axios";
import { mostrarErroresZod } from "@/lib/validaciones.zod";

const obtenerTodas = async (mostrarNotificacion: boolean = true) => {
  try {
    const respuestaHttp =
      await api.get<ApiRespuesta<Categorias>>("/categorias");

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
};

const crear = async (
  datos: CategoriaDTO,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.post<ApiRespuesta<null>>("/categorias", {
      nombre: datos.nombre,
      descripcion: datos.descripcion,
    });

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
    }
    return null;
  }
};

const editar = async (
  datos: CategoriaDTO,
  mostrarNotificacion: boolean = true,
) => {
  if (!datos.id) {
    toast.error("Falta el id de la categoría a editar", {
      duration: 4000,
    });

    return null;
  }

  try {
    const respuestaHttp = await api.put<ApiRespuesta<null>>(
      `/categorias/${datos.id}`,
      {
        nombre: datos.nombre,
        descripcion: datos.descripcion,
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
    }
    return null;
  }
};

const eliminar = async (id: number, mostrarNotificacion: boolean = true) => {
  try {
    const respuestaHttp = await api.delete<ApiRespuesta<null>>(
      `/categorias/${id}`,
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
    }
    return null;
  }
};

export const apiCategorias = {
  obtenerTodas,
  crear,
  editar,
  eliminar,
};
