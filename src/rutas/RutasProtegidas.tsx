import { Outlet } from "react-router";

export function RutaCliente() {
  const modoDesarrollo = import.meta.env.DEV;

  if (modoDesarrollo) {
    return <Outlet />;
  }

  return <Outlet />;
}

export function RutaAdmin() {
  const modoDesarrollo = import.meta.env.DEV;

  if (modoDesarrollo) {
    return <Outlet />;
  }

  return <Outlet />;
}
