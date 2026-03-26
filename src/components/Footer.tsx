import type { Negocio } from "@/types/negocio";
import { CircleQuestionMark, Instagram, MapPin } from "lucide-react";

interface Props {
  negocio: Negocio;
}
const NEGOCIO_DEFAULT: Negocio = {
  id: 0,
  nombre: "Byarshop",
  descripcion: "Tienda de productos extranjeros de calidad",
  sobre_de: "Somos una tienda comprometida con la calidad.",
  imagen_sobre_de_url: "",
  instagram: "https://www.instagram.com/byar.shop",
  direccion: "Plazuela 27 de Sep frente a la iglesia",
  dias_laborales: "Viernes a Domingo",
  hora_de_apertura: "6:30 AM",
  hora_de_cierre: "10:00 PM",
  hero_titulo: "Bienvenido a nuestra tienda",
  hero_descripcion: "Descubre los mejores productos para ti.",
  hero_imagen_url: "",
};
const noVacio = (v: unknown) => v !== null && v !== "" && v !== undefined;

export default function Footer({ negocio }: Props) {
  const datos: Negocio = {
    ...NEGOCIO_DEFAULT,
    ...Object.fromEntries(
      Object.entries(negocio ?? {}).filter(([_, v]) => noVacio(v)),
    ),
  };
  return (
    <footer className="relative bg-byar px-10 py-7">
      <div className="absolute top-10 right-10 text-white">
        <CircleQuestionMark color="white" size={32} />
      </div>

      <div className="flex flex-col gap-3 max-w-xl">
        <div className="flex justify-between">
          <h2 className="text-white font-bold text-2xl">¡Contáctanos!</h2>
        </div>

        <a
          href={datos.instagram}
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
            <span>{datos.direccion}</span>
            <div className="space-x-2">
              <span>{datos.dias_laborales}</span>
              <span>
                {datos.hora_de_apertura} a {datos.hora_de_cierre}
              </span>
            </div>
          </div>
        </a>
      </div>
      <div>
        <p className="text-white text-center text-sm mt-6">
          &copy; {new Date().getFullYear()} Byarshop. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
