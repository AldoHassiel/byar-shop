import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import {useNegocio} from "@/global/NegocioContexto";
import { Outlet } from "react-router";

export default function LayoutCliente() {
  const { negocio } = useNegocio();

  return (
    <div>
      <Header nombre={negocio?.nombre} />
      <aside className="bg-orange-400">
        <p>Menus del cliente qui</p>
      </aside>
      <main className="bg-orange-300">
        <Outlet />
      </main>
      <Footer negocio={negocio} />
      <Toaster />
    </div>
  );
}
