export interface Subcategorias {
  id: number;
  nombre: string;
  descripcion?: string;
  cant_producto?: number;
}

export interface SubcategoriasDTO {
  nombre: string;
  descripcion: string;
}
