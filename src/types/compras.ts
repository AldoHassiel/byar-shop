export interface Compras {
  id: number;
  estado: string;
  fecha_entrega_estimada: string;
  fecha_entregado: string | null;
  total: string;
  imagenes: string[];
}

export interface DetalleCompra {
  pedido: Pedido;
  productos: Producto[];
}

export interface Pedido {
  id: number;
  fecha: string;
  subtotal: string;
  costo_envio: string;
  total: string;
  fecha_entrega_estimada: string;
  fecha_entregado: string | null;
  estado: string;
  tarjeta_marca: string;
  tarjeta_ultimos_digitos: string;
  direccion_calle: string;
  direccion_numero_exterior: string;
  direccion_numero_interior: string;
  direccion_colonia: string;
  direccion_municipio: string;
  direccion_estado: string;
  direccion_codigo_postal: string;
  direccion_pais: string;
  direccion_especificaciones: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  marca: string;
  cantidad: number;
  precio: string;
  subtotal: string;
}
