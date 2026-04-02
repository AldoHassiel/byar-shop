import type { ApiRespuesta } from "@/types/api";
import api from "./api.config";
import type {
  CategoriaConSubcategorias,
  SubcategoriaDTO,
  Subcategorias,
  SubcategoriasDTO,
  //SubcategoriasDTO
} from "@/types/subcategoria";
import { toast } from "sonner";
import axios from "axios";
import { mostrarErroresZod } from "@/lib/validaciones.zod";

const obtenerTodas = async (mostrarNotificacion: boolean = false) => {
  try {
    const respuestaHttp = await api.get<
      ApiRespuesta<CategoriaConSubcategorias>
    >("/categorias-subcategorias");

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
      const respuestaHttp =
        await api.get<ApiRespuesta<Subcategorias>>("/subcategorias");

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
};

//Nota: Hice este metodo porque no se que tanta magia hace la de arriba.
// Este se trae unicamente {id, id_categoria, nombre, descripcion, cant_producto}
const obtenerSubcategorias = async (mostrarNotificacion: boolean = true) => {
  try {
    const respuestaHttp =
      await api.get<ApiRespuesta<SubcategoriasDTO>>("/subcategorias");

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
    }
    return null;
  }
};

const crear = async (
  datos: SubcategoriaDTO,
  mostrarNotificacion: boolean = true,
) => {
  try {
    const respuestaHttp = await api.post<ApiRespuesta<null>>("/subcategorias", {
      id_categoria: datos.id_categoria,
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
  datos: SubcategoriaDTO,
  mostrarNotificacion: boolean = true,
) => {
  if (!datos.id) {
    toast.error("Hace falta el id de la subcategoría", {
      duration: 4000,
    });
    return null;
  }

  try {
    const respuestaHttp = await api.put<ApiRespuesta<null>>(
      `/subcategorias/${datos.id}`,
      {
        id_categoria: datos.id_categoria,
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
      `/subcategorias/${id}`,
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

export const apiSubcategorias = {
  obtenerTodas,
  obtenerSubcategorias,
  crear,
  editar,
  eliminar,
};
