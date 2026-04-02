export interface Marcas {
  id: number;
  nombre: string;
  descripcion?: string | null;
  cant_producto: number;
}

export interface MarcaDTO {
  id?: number;
  nombre: string;
  descripcion: string | null;
}
