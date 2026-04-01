import type { ApiRespuesta } from "@/types/api";
import api from "./api.config";
import type {
  Producto,
  ProductoDetallado,
  ProductoEditadoFormulario,
  ProductoFormulario,
} from "@/types/productos";
import { toast } from "sonner";
import axios from "axios";
import { mostrarErroresZod } from "@/lib/validaciones.zod";

interface Datos {
  totalPaginas: number;
  productos: Producto[];
}

const obtenerTodos = async (
  mostrarNotificacion?: true,
  nombre?: string,
  precioMin?: number,
  precioMax?: number,
  idMarca?: number,
  idCategoria?: number,
  idSubcategoria?: number,
  pagina = 1,
  limite = 20,
) => {
  try {
    const filtros = {
      nombre,
      precio_min: precioMin,
      precio_max: precioMax,
      id_marca: idMarca,
      id_categoria: idCategoria,
      id_subcategoria: idSubcategoria,
      pagina,
      limite,
    };

    const params = Object.fromEntries(
      Object.entries(filtros).filter(([, valor]) => valor !== undefined),
    );

    const respuestaHttp = await api.get<ApiRespuesta<Producto>>("/productos", {
      params,
    });
    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, { position: "bottom-right" });
    }

    const datos: Datos = {
      totalPaginas: respuestaAPI.total_paginas ?? 0,
      productos: respuestaAPI.datos,
    };

    return datos;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { mensaje, datos } = error.response.data;
      if (mensaje === "Error de validaciones") {
        mostrarErroresZod(datos);
        return null;
      }

      toast.error("No se pudo hacer la petición", {
        duration: 4000,
      });
    }
    return null;
  }
};

const obtenerUno = async (id: number, mostrarNotificacion?: true) => {
  try {
    const respuestaHttp = await api.get<ApiRespuesta<ProductoDetallado>>(
      `/productos/${id}`,
    );
    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast(respuestaAPI.mensaje, { position: "bottom-right" });
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

      toast.error("No se pudo hacer la petición", {
        duration: 4000,
      });
    }
    return null;
  }
};

const crear = async (
  datos: ProductoFormulario,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const formulario = new FormData();

    formulario.append("nombre", datos.nombre);
    formulario.append("descripcion", datos.descripcion ?? "");
    formulario.append("precio", String(datos.precio));
    formulario.append("stock", String(datos.stock));
    formulario.append("id_subcategoria", String(datos.id_subcategoria));
    formulario.append("id_marca", String(datos.id_marca));

    if (datos.imagen) {
      formulario.append("imagen", datos.imagen);
    }

    const respuestaHttp = await api.post<ApiRespuesta<[]>>(
      "/productos",
      formulario,
    );
    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast(respuestaAPI.mensaje, { position: "bottom-right" });
      return null;
    }

    if (respuestaAPI.estado && mostrarNotificacion) {
      toast.success(respuestaAPI.mensaje, { position: "bottom-right" });
    }

    return respuestaAPI.estado;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      const { mensaje, datos } = error.response.data;
      if (mensaje === "Error de validaciones") {
        console.error(datos);
        console.error(error.response.data);

        mostrarErroresZod(datos);
        return null;
      }

      toast.error("No se pudo hacer la petición", {
        duration: 4000,
      });
    }
    return null;
  }
};

const editar = async (
  datos: ProductoEditadoFormulario,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const formulario = new FormData();

    formulario.append("nombre", datos.nombre);
    formulario.append("descripcion", datos.descripcion ?? "");
    formulario.append("precio", String(datos.precio));
    formulario.append("stock", String(datos.stock));
    formulario.append("id_subcategoria", String(datos.id_subcategoria));
    formulario.append("id_marca", String(datos.id_marca));
    formulario.append("accion_imagen", datos.accion_imagen);

    if (datos.accion_imagen === "nueva" && datos.imagen) {
      formulario.append("imagen", datos.imagen);
    }

    const respuestaHttp = await api.put<ApiRespuesta<[]>>(
      `/productos/${datos.id}`,
      formulario,
    );
    const respuestaAPI = respuestaHttp.data;

    if (!respuestaAPI.estado) {
      toast.error(respuestaAPI.mensaje, { position: "bottom-right" });
      return false;
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

      toast.error("No se pudo hacer la petición", {
        duration: 4000,
      });
    }
    return null;
  }
};

const eliminar = async (id: number, mostrarNotificacion: boolean = true) => {
  try {
    const respuestaHttp = await api.delete<ApiRespuesta<null>>(
      `/productos/${id}`,
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

      toast.error("No se pudo hacer la petición", {
        duration: 4000,
      });
    }
    return null;
  }
};

export const apiProductos = {
  obtenerTodos,
  obtenerUno,
  crear,
  editar,
  eliminar,
};
