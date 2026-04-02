import { toast } from "sonner";
import api from "./api.config";
import type { ApiRespuesta } from "@/types/api";
import type { InicioSesion } from "@/types/auth";
import axios from "axios";
import { mostrarErroresZod } from "@/lib/validaciones.zod";

const inciarSesion = async (
  correo: string,
  pwd: string,
  mostrarNotificacion?: true,
) => {
  try {
    const respuestaHttp = await api.post<ApiRespuesta<InicioSesion>>(
      "/auth/iniciarSesion",
      { correo, pwd },
    );

    const respuestaAPI = respuestaHttp.data;

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, {
        duration: 4000,
      });
    }

    return respuestaAPI;
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

const registrarCuenta = async (
  nombre: string,
  apellidos: string,
  correo: string,
  pwd: string,
  mostrarNotificacion?: true,
) => {
  try {
    const respuestaHttp = await api.post<ApiRespuesta<InicioSesion>>(
      "/auth/registrar",
      { nombre, apellidos, correo, pwd },
    );

    const respuestaAPI = respuestaHttp.data;

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, {
        duration: 4000,
      });
    }

    return respuestaAPI;
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

const cerrarSesion = async (mostrarNotificacion: boolean = true) => {
  try {
    const respuestaHttp =
      await api.post<ApiRespuesta<null>>("/auth/cerrarSesion");

    const respuestaAPI = respuestaHttp.data;

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, {
        duration: 4000,
      });
    }

    return respuestaAPI;
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

export const apiAuth = {
  inciarSesion,
  registrarCuenta,
  cerrarSesion,
};
