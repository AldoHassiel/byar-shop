import type { Negocio } from "@/types/negocio";
import { Instagram, MapPin, Copyright } from "lucide-react";
import { Link } from "react-router";

interface Props {
  negocio: Negocio;
}

export default function Footer({ negocio }: Props) {
  return (
    <footer className="relative bg-byar px-10 py-7">
      <div className="absolute top-4 right-5 text-white">
        <Copyright size={24} strokeWidth={2.5} />
      </div>

      <div className="flex flex-col gap-3 max-w-xl">
        <h2 className="text-white font-bold text-2xl">¡Contáctanos!</h2>

        <a
          href={negocio?.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-white text-sm"
        >
          <Instagram size={22} strokeWidth={2.5} className="shrink-0" />
          <span>byar.shop</span>
        </a>

        <a
          href="https://www.google.com/maps/place/Plazuela+27+de+Septiembre,+Centro,+81200+Los+Mochis,+Sin./@25.7924664,-109.019924,15z/data=!4m6!3m5!1s0x86ba25f80b321eeb:0x7c906e574122c7d8!8m2!3d25.7900824!4d-108.9979547!16s%2Fg%2F11bw3xt245?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2.5 text-white text-sm"
        >
          <MapPin size={22} strokeWidth={2.5} className="shrink-0 mt-0.5" />
          <div className="flex flex-col leading-snug">
            <span>{negocio?.direccion}</span>
            <div className="space-x-2">
              <span>{negocio?.dias_laborales}</span>
              <span>
                {negocio?.hora_de_apertura} a {negocio?.hora_de_cierre}
              </span>
            </div>
          </div>
        </a>
      </div>
    </footer>
  );
}
