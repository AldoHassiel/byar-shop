import { Instagram, MapPin, Copyright } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-byar px-10 py-7">
      <div className="absolute top-4 right-5 text-white">
        <Copyright size={24} strokeWidth={2.5} />
      </div>

      <div className="flex flex-col gap-3 max-w-xl">
        <h2 className="text-white font-bold text-2xl">¡Contáctanos!</h2>

        <div className="flex items-center gap-2.5 text-white text-sm">
          <Instagram size={22} strokeWidth={2.5} className="shrink-0" />
          <span>byar.shop</span>
        </div>

        <div className="flex items-start gap-2.5 text-white text-sm">
          <MapPin size={22} strokeWidth={2.5} className="shrink-0 mt-0.5" />
          <div className="flex flex-col leading-snug">
            <span>Plazuela 27 de Sep frente a la iglesia</span>
            <span>Viernes a Domingo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
