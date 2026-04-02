import { toast } from "sonner";
import api from "./api.config";
import axios from "axios";
import { mostrarErroresZod } from "@/lib/validaciones.zod";
import type { ApiRespuesta } from "@/types/api";
import type { MisDatos } from "@/types/mis-datos";

const obtener = async (
  idUsuario: number,
  mostrarNotificacion: boolean = false,
) => {
  try {
    const respuestaHttp = await api.get<ApiRespuesta<MisDatos>>(
      `/usuario/${idUsuario}/misDatos`,
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
      const { mensaje, datos } = error.response.data;

      if (mensaje === "Error de validaciones") {
        mostrarErroresZod(datos);
        return null;
      }

      toast.error(mensaje, {
        duration: 4000,
      });
    } else {
      toast.error("No se pudo hacer la petición", { position: "bottom-right" });
    }
    return null;
  }
};

const editarDatosGenerales = async (
  idUsuario: number,
  datos: MisDatos,
  mostrarNotificacion: boolean = false,
) => {
  try {
    const respuestaHttp = await api.put<ApiRespuesta<null>>(
      `/usuario/${idUsuario}/misDatos/editar`,
      {
        nombre: datos.nombre,
        apellidos: datos.apellidos,
        telefono: datos.telefono,
      },
    );

    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast.error(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, { position: "bottom-right" });
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
    } else {
      toast.error("No se pudo hacer la petición", { position: "bottom-right" });
    }
    return null;
  }
};

const editarCorreo = async (
  idUsuario: number,
  correo: string,
  mostrarNotificacion: boolean = false,
) => {
  try {
    const respuestaHttp = await api.patch<ApiRespuesta<null>>(
      `/usuario/${idUsuario}/misDatos/correo`,
      { correo },
    );

    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast.error(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, { position: "bottom-right" });
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
    } else {
      toast.error("No se pudo hacer la petición", { position: "bottom-right" });
    }
    return null;
  }
};

const editarPwd = async (
  idUsuario: number,
  pwd: string,
  mostrarNotificacion: boolean = false,
) => {
  try {
    const respuestaHttp = await api.patch<ApiRespuesta<null>>(
      `/usuario/${idUsuario}/misDatos/pwd`,
      { pwd },
    );

    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast.error(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, { position: "bottom-right" });
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
    } else {
      toast.error("No se pudo hacer la petición", { position: "bottom-right" });
    }
    return null;
  }
};

export const apiMisDatos = {
  obtener,
  editarDatosGenerales,
  editarCorreo,
  editarPwd,
};
