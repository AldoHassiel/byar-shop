import { toast } from "sonner";
import api from "./api.config";
import type { ApiRespuesta } from "@/types/api";
import type { Carrito } from "@/types/carrito";
import axios from "axios";

const obtenerCarrito = async (
  idUsuario: number,
  idDireccion?: number,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.get<ApiRespuesta<Carrito>>(
      `/usuario/${idUsuario}/carrito?id_direccion=${idDireccion ?? ""}`,
    );
    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast.error(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast(respuestaAPI.mensaje, { position: "bottom-right" });
    }

    return respuestaAPI.datos[0];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { mensaje } = error.response.data;
      toast.error(mensaje, {
        duration: 4000,
      });
    }

    toast("No se pudo hacer la petición", { position: "bottom-right" });
    return null;
  }
};

const agregarAlCarrito = async (
  idUsuario: number,
  idProducto: number,
  cantidad: number,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.post<ApiRespuesta<null>>(
      `/usuario/${idUsuario}/carrito`,
      {
        id_producto: idProducto,
        cantidad,
      },
    );
    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast.error(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast(respuestaAPI.mensaje, { position: "bottom-right" });
    }

    return respuestaAPI.estado;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { mensaje } = error.response.data;
      toast.error(mensaje, {
        duration: 4000,
      });
    }

    toast("No se pudo hacer la petición", { position: "bottom-right" });
    return null;
  }
};

const actualizarCantidad = async (
  idUsuario: number,
  idProducto: number,
  delta: number,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.patch<ApiRespuesta<null>>(
      `/usuario/${idUsuario}/carrito/${idProducto}`,
      {
        delta,
      },
    );
    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast.error(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast(respuestaAPI.mensaje, { position: "bottom-right" });
    }

    return respuestaAPI.estado;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { mensaje } = error.response.data;
      toast.error(mensaje, {
        duration: 4000,
      });
    }
    console.error(error);
    toast("No se pudo hacer la petición", { position: "bottom-right" });
    return null;
  }
};

const eliminarProducto = async (
  idUsuario: number,
  idProducto: number,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.delete<ApiRespuesta<null>>(
      `/usuario/${idUsuario}/carrito/${idProducto}`,
    );
    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast.error(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast(respuestaAPI.mensaje, { position: "bottom-right" });
    }

    return respuestaAPI.estado;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { mensaje } = error.response.data;
      toast.error(mensaje, {
        duration: 4000,
      });
    }

    toast("No se pudo hacer la petición", { position: "bottom-right" });
    return null;
  }
};

export const apiCarrito = {
  obtenerCarrito,
  agregarAlCarrito,
  actualizarCantidad,
  eliminarProducto,
};
