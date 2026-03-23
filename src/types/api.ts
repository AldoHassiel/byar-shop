export interface ApiRespuesta<T> {
  estado: boolean;
  mensaje: string;
  datos: T[];
  total_paginas?: number;
}
