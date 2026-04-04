import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { useNegocio } from "@/global/NegocioContexto";
import { Outlet } from "react-router";

export default function LayoutPrincipal() {
  const { negocio, cargando } = useNegocio();

  return (
    <div>
      <Header nombre={ negocio?.nombre} />
      <main>
        <Outlet context={{ negocio, cargando }} />
      </main>
      <Footer negocio={negocio} />
      <Toaster />
    </div>
  );
}
