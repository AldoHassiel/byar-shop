export interface Negocio {
  id: number;
  logotipo_url: string;
  nombre: string;
  whatsapp: string;
  sobre_nosotros: string;
  imagen_sobre_nosotros_url: string;
  instagram: string;
  direccion: string;
  dias_laborales: string;
  hora_de_apertura: string;
  hora_de_cierre: string;
  hero_imagen_url: string;
}

export interface EditarDatosNegocio {
  nombre: string;
  whatsapp: string;
  sobre_nosotros: string;
  instagram: string;
  direccion: string;
  dias_laborales: string;
  hora_de_apertura: string;
  hora_de_cierre: string;
}

export interface EditarImagenesNegocio {
  logotipo?: File;
  imagen_sobre_nosotros?: File;
  hero_imagen?: File;
}
