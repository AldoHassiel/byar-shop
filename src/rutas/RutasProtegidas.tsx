import { Spinner } from "@/components/ui/spinner";
import { useAutenticacion } from "@/global/AuthContexto";
import { Navigate, Outlet } from "react-router";

export function RutaCliente() {
  const { usuario, cargando } = useAutenticacion();

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="size-8 text-byar" />
      </div>
    );
  }

  if (!usuario?.id) return <Navigate to="/iniciar-sesion" replace />;
  return <Outlet />;
}

export function RutaAdmin() {
  const { usuario, cargando } = useAutenticacion();

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="size-8 text-byar" />
      </div>
    );
  }

  if (!usuario?.es_admin) return <Navigate to="/iniciar-sesion" replace />;
  return <Outlet />;
}
