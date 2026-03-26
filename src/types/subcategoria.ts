export interface Subcategorias {
  id: number;
  nombre: string;
  descripcion?: string;
  cant_producto?: number;
  id_categoria?: number;
  idCategoria?: number;
  categoria?: {
    id: number;
    nombre?: string;
  };
}

export interface SubcategoriasDTO {
  nombre: string;
  descripcion: string;
}

export interface CategoriaConSubcategorias {
  id_categoria: number;
  categoria: string;
  subcategorias: Subcategorias[];
}
