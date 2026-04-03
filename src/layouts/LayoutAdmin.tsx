import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAutenticacion } from "@/global/AuthContexto";
import { useNegocio } from "@/global/NegocioContexto";
import {
  Building2,
  IdCard,
  LayoutDashboard,
  Package,
  Tag,
  Tags,
  type LucideIcon,
} from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { Toaster } from "sonner";

interface MenuItem {
  id: number;
  nombre: string;
  Icono: LucideIcon;
  enlace: string;
}

const menu: MenuItem[] = [
  { id: 1, nombre: "Dashboard", Icono: LayoutDashboard, enlace: "/admin" },
  { id: 2, nombre: "Productos", Icono: Package, enlace: "/admin/productos" },
  { id: 3, nombre: "Categoría", Icono: Tag, enlace: "/admin/categorias" },
  {
    id: 4,
    nombre: "Subcategorías",
    Icono: Tags,
    enlace: "/admin/subcategorias",
  },
  { id: 5, nombre: "Marcas", Icono: IdCard, enlace: "/admin/marcas" },
  { id: 6, nombre: "Pedidos", Icono: Package, enlace: "/admin/pedidos" },
  { id: 7, nombre: "Negocio", Icono: Building2, enlace: "/admin/negocio" },
];

export default function LayoutAdmin() {
  const { negocio } = useNegocio();
  const { cerrarSesion } = useAutenticacion();

  return (
    <div className="min-h-screen flex flex-col">
      <Header nombre={negocio?.nombre} />

      <div className="flex flex-1 gap-10 mx-10 my-5 mt-25">
        <aside className="bg-white rounded-2xl w-64 shrink-0 p-5 flex flex-col">
          <h2 className="text-4xl text-center border-b border-b-gray-600 pb-2">
            Panel
          </h2>
          <nav className="flex flex-col flex-1 mt-3">
            <ul className="space-y-2">
              {menu.map(({ id, nombre, Icono, enlace }) => (
                <li key={id}>
                  <NavLink
                    to={enlace}
                    end={enlace === "/admin"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-2 py-1 transition-colors
                       ${
                         isActive
                           ? "text-byar font-bold bg-byar/10"
                           : "text-gray-600 hover:text-byar hover:bg-byar/5"
                       }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icono
                          size={28}
                          className={isActive ? "text-byar" : "text-gray-400"}
                        />
                        <span className="text-xl">{nombre}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <Button
                variant="pink"
                className="w-full mt-5"
                onClick={cerrarSesion}
              >
                Cerrar Sesión
              </Button>
            </div>
          </nav>
        </aside>

        <main className="flex-1 bg-white rounded-2xl p-5">
          <Outlet />
        </main>
      </div>

      <Footer negocio={negocio} />
      <Toaster />
    </div>
  );
}
