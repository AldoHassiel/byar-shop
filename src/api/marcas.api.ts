import type { ApiRespuesta } from "@/types/api";
import api from "./api.config";
import type { MarcaDTO, Marcas } from "@/types/marcas";
import { toast } from "sonner";
import { mostrarErroresZod } from "@/lib/validaciones.zod";
import axios from "axios";

const obtenerTodas = async (mostrarNotificacion: boolean = false) => {
  try {
    const respuestaHttp = await api.get<ApiRespuesta<Marcas>>("/marcas");

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

const crear = async (datos: MarcaDTO, mostrarNotificacion: boolean = true) => {
  try {
    const respuestaHttp = await api.post<ApiRespuesta<null>>("/marcas", {
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

const editar = async (datos: MarcaDTO, mostrarNotificacion: boolean = true) => {
  if (!datos.id) {
    toast.error("Falta el id de la marca", {
      duration: 4000,
    });
    return null;
  }

  try {
    const respuestaHttp = await api.put<ApiRespuesta<null>>(
      `/marcas/${datos.id}`,
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
  if (!id) {
    toast.error("Falta el id de la marca", {
      duration: 4000,
    });
    return null;
  }

  try {
    const respuestaHttp = await api.delete<ApiRespuesta<null>>(`/marcas/${id}`);

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

export const apiMarcas = {
  obtenerTodas,
  crear,
  editar,
  eliminar,
};
