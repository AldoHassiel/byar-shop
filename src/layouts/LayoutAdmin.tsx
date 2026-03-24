import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import useNegocio from "@/hooks/useNegocio";
import { Outlet } from "react-router";

export default function LayoutAdmin() {
  const { negocio } = useNegocio();

  return (
    <div>
      <Header />
      <aside className="bg-orange-400">
        <p>Menus del admin qui</p>
      </aside>
      <main className="bg-orange-300">
        <Outlet />
      </main>
      <Footer negocio={negocio} />
      <Toaster />
    </div>
  );
}
