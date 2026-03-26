import { useAutenticacion } from "@/global/AuthContexto";
import { Navigate, Outlet } from "react-router";

export function RutaCliente() {
  const { usuario } = useAutenticacion();
  const modoDesarrollo = import.meta.env.DEV;

  if (modoDesarrollo) {
    return <Outlet />;
  }

  if (!usuario?.id) return <Navigate to="/iniciar-sesion" replace />;
  return <Outlet />;
}

export function RutaAdmin() {
  const { usuario } = useAutenticacion();
  const modoDesarrollo = import.meta.env.DEV;

  if (modoDesarrollo) {
    return <Outlet />;
  }

  if (!usuario?.es_admin) return <Navigate to="/iniciar-sesion" replace />;
  return <Outlet />;
}
