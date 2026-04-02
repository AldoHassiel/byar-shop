export interface InicioSesion {
  usuario: Usuario;
  token: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  telefono: string | null;
  correo: string;
  es_admin: boolean;
  activo: boolean;
}
