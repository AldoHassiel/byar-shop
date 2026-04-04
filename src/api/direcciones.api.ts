import type { ApiRespuesta } from "@/types/api";
import { toast } from "sonner";
import api from "./api.config";
import type { Direccion, Direcciones, InfoCP } from "@/types/direcciones";
import axios from "axios";
import { mostrarErroresZod } from "@/lib/validaciones.zod";

const obtenerInfoCP = async (
  cp: string | number,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.get<ApiRespuesta<InfoCP>>(`/cp/${cp}`);

    const respuestaAPI = respuestaHttp.data;

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, {
        duration: 4000,
      });
    }

    return respuestaAPI.datos;
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

const obtenerDirecciones = async (
  id_usuario: number,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.get<ApiRespuesta<Direcciones>>(
      `/usuario/${id_usuario}/direcciones`,
    );

    const respuestaAPI = respuestaHttp.data;

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, {
        duration: 4000,
      });
    }

    return respuestaAPI.datos;
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

const crearDireccion = async (
  id_usuario: number,
  datos: Direccion,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.post<ApiRespuesta<null>>(
      `/usuario/${id_usuario}/direcciones`,
      datos,
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

const editarDireccion = async (
  id_usuario: number,
  datos: Direccion,
  mostrarNotificacion: boolean = true,
) => {
  if (!datos.id) {
    toast.error("Falta el id de la dirección", {
      duration: 4000,
    });
    return null;
  }

  try {
    const respuestaHttp = await api.put<ApiRespuesta<null>>(
      `/usuario/${id_usuario}/direcciones/${datos.id}`,
      datos,
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

const establecerPredeterminada = async (
  id_usuario: number,
  id_direccion: number,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.patch<ApiRespuesta<null>>(
      `/usuario/${id_usuario}/direcciones/${id_direccion}/predeterminada`,
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

const eliminarDireccion = async (
  id_usuario: number,
  id_direccion: number,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.delete<ApiRespuesta<null>>(
      `/usuario/${id_usuario}/direcciones/${id_direccion}`,
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

export const apiDirecciones = {
  obtenerInfoCP,
  obtenerDirecciones,
  crearDireccion,
  editarDireccion,
  establecerPredeterminada,
  eliminarDireccion,
};
