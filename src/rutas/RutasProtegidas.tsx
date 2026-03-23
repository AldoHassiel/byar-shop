import { Navigate, Outlet } from "react-router";
import { usarSesion } from "@/global/usarSesion";

export function RutaCliente() {
  const { id } = usarSesion();
  if (!id) return <Navigate to="/iniciar-sesion" replace />;
  return <Outlet />;
}

export function RutaAdmin() {
  const { id, esAdmin, modoAdmin } = usarSesion();
  if (!id) return <Navigate to="/iniciar-sesion" replace />;
  if (!esAdmin || !modoAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}
