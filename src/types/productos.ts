export interface Producto {
  id: number;
  imagen_url: string | null;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  nombre_categoria: string;
  nombre_subcategoria: string;
  nombre_marca: string;
  es_favorito: boolean;
}

export interface ProductoDetallado {
  id: number;
  imagen_url: string | null;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  id_categoria: number;
  nombre_categoria: string;
  id_subcategoria: number;
  nombre_subcategoria: string;
  id_marca: number;
  nombre_marca: string;
}

export interface ProductoFormulario {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  id_subcategoria: number;
  id_marca: number;
  imagen?: File;
}

export interface ProductoEditadoFormulario extends ProductoFormulario {
  accion_imagen: "conservar" | "nueva" | "eliminar";
  id: number;
}
