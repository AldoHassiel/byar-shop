import { useAutenticacion } from "@/global/AuthContexto";
import { Navigate, Outlet } from "react-router";

export function RutaCliente() {
  const { usuario, cargando } = useAutenticacion();
  // const modoDesarrollo = import.meta.env.DEV;

  // if (modoDesarrollo) {
  //   return <Outlet />;
  // }

  if (cargando) {
    return <p className="mt-20">Cargando...</p>;
  }

  if (!usuario?.id) return <Navigate to="/iniciar-sesion" replace />;
  return <Outlet />;
}

export function RutaAdmin() {
  const { usuario, cargando } = useAutenticacion();
  // const modoDesarrollo = import.meta.env.DEV;

  // if (modoDesarrollo) {
  //   return <Outlet />;
  // }

  if (cargando) {
    return <p className="mt-20">Cargando...</p>;
  }

  if (!usuario?.es_admin) return <Navigate to="/iniciar-sesion" replace />;
  return <Outlet />;
}
