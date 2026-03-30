export interface InicioSesion {
  usuario: Usuario;
  token: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellidos: any;
  telefono: any;
  correo: string;
  es_admin: boolean;
  activo: boolean;
}
