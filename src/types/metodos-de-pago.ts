export interface Tarjetas {
  id: number;
  nombre_titular: string;
  ultimos_digitos: string;
  marca: string;
  es_predeterminada: boolean;
}

export interface Tarjeta {
  nombre_titular: string;
  numero_tarjeta: string;
  mes_vencimiento: string;
  ano_vencimiento: string;
  cvv: string;
}
