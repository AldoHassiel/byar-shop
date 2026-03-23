export interface Categorias {
  id: number;
  nombre: string;
  descripcion?: string;
  cant_producto?: number;
}

export interface CategoriaDTO {
  nombre: string;
  descripcion: string;
}
