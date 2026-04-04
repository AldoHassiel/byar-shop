export interface Direcciones {
  id: number;
  calle: string;
  numero_exterior: string;
  numero_interior: string;
  colonia: string;
  ciudad: string;
  municipio: string;
  estado: string;
  codigo_postal: string;
  especificaciones: string;
  es_predeterminada: boolean;
}

export interface Direccion {
  id?: number;
  calle: string;
  numero_exterior: string;
  numero_interior: string;
  colonia: string;
  ciudad: string;
  municipio: string;
  estado: string;
  codigo_postal: string;
  especificaciones: string;
}

export interface InfoCP {
  estados: string[];
  municipios: string[];
  ciudades: string[];
  colonias: string[];
}
