export interface Estadisticas {
  datos_generales: DatosGenerales;
  ganancias_totales: GananciasTotale[];
  venta_mes: VentaMes[];
  top_productos: TopProducto[];
}

export interface DatosGenerales {
  total_productos: number;
  total_ventas: number;
  total_ganancias: number;
}

export interface GananciasTotale {
  anio: number;
  ganancias: number;
}

export interface VentaMes {
  mes: string;
  ventas: number;
}

export interface TopProducto {
  producto: string;
  total_vendido: number;
}
