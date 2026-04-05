export interface Carrito {
  productos: Producto[];
  resumen: Resumen;
}

export interface Producto {
  id: number;
  imagen_url: string;
  nombre: string;
  descripcion: string;
  marca: string;
  stock: number;
  cantidad: number;
  total: string;
  id_subcategoria: number;
  id_categoria: number;
  id_marca: number;
}

export interface Resumen {
  subtotal: string;
  costo_de_envio: string | null;
  total: string;
}
