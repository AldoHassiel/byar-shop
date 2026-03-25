import { Navigate, Outlet } from "react-router";
import { usarSesion } from "@/global/usarSesion";

export function RutaCliente() {
  const { id } = usarSesion();
  const modoDesarrollo = import.meta.env.DEV;

  if (modoDesarrollo) {
    return <Outlet />;
  }

  if (!id) return <Navigate to="/iniciar-sesion" replace />;
  return <Outlet />;
}

export function RutaAdmin() {
  const { id, esAdmin, modoAdmin } = usarSesion();
  const modoDesarrollo = import.meta.env.DEV;

  if (modoDesarrollo) {
    return <Outlet />;
  }

  if (!id) return <Navigate to="/iniciar-sesion" replace />;
  if (!esAdmin || !modoAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}
