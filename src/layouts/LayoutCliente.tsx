import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAutenticacion } from "@/global/AuthContexto";
import { useNegocio } from "@/global/NegocioContexto";
import {
  CreditCard,
  Heart,
  LogOut,
  MapPinned,
  ReceiptText,
  ShoppingCart,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

interface MenuItem {
  id: number;
  nombre: string;
  Icono: LucideIcon;
  enlace: string;
}

const menu: MenuItem[] = [
  { id: 6, nombre: "Perfil", Icono: UserRound, enlace: "/perfil" },

  { id: 1, nombre: "Mi Carrito", Icono: ShoppingCart, enlace: "/mi-carrito" },
  { id: 2, nombre: "Mis Compras", Icono: ReceiptText, enlace: "/mis-compras" },
  { id: 3, nombre: "Favoritos", Icono: Heart, enlace: "/mis-favoritos" },
  {
    id: 4,
    nombre: "Metodos de Pago",
    Icono: CreditCard,
    enlace: "/mis-metodos-de-pago",
  },
  {
    id: 5,
    nombre: "Mis Direcciones",
    Icono: MapPinned,
    enlace: "/mi-direcciones",
  },
];

export default function LayoutCliente() {
  const { negocio } = useNegocio();
  const { usuario, cerrarSesion } = useAutenticacion();

  return (
    <div className="min-h-screen flex flex-col">
      <Header nombre={negocio?.nombre} />

      <div className="flex flex-1 gap-10 mx-10 my-5 mt-25">
        <aside className="bg-white rounded-2xl w-64 shrink-0 p-5 flex flex-col">
          <div className="text-byar text-2xl border-b-2  border-byar/20 pb-2">
            <span className="font-bold">¡Hola {usuario?.nombre}!</span>
          </div>
          <nav className="flex flex-col flex-1 mt-3">
            <ul className="space-y-2">
              {menu.map(({ id, nombre, Icono, enlace }) => (
                <li key={id}>
                  <NavLink
                    to={enlace}
                    end={enlace === "/perfil"}
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
                <LogOut size={18} />
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
