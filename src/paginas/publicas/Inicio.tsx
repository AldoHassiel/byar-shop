import TarjetaProducto from "@/components/TarjetaProducto";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Negocio } from "@/types/negocio";
import { Medal } from "lucide-react";
import { useOutletContext } from "react-router";

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

export default function Inicio() {
  const { negocio, cargando } = useOutletContext<{
    negocio: Negocio | null;
    cargando: boolean;
  }>();

  const datos: Negocio = {
    ...NEGOCIO_DEFAULT,
    ...Object.fromEntries(
      Object.entries(negocio ?? {}).filter(([_, v]) => noVacio(v)),
    ),
  };

  return (
    <>
      <section className="bg-white grid grid-cols-2 gap-x-2 p-8">
        <div>
          <h2 className="text-center text-4xl">{datos.hero_titulo}</h2>
          <p className="text-center text-2xl mt-5">{datos.hero_descripcion}</p>
        </div>
        <div className="flex justify-center items-center">
          {cargando ? (
            <div className="w-full h-48 bg-gray-200 animate-pulse rounded" />
          ) : (
            <img
              src={datos.hero_imagen_url ?? undefined}
              alt="Imagen del hero"
            />
          )}
        </div>
      </section>
      <section className="bg-fondogris p-8">
        <h2 className="text-center text-4xl">Productos destacados</h2>
        <div className="flex justify-center px-15 mt-5">
          <Carousel opts={{ align: "center" }}>
            <CarouselPrevious />
            <CarouselContent>
              {cargando
                ? Array.from({ length: 4 }).map((_, i) => (
                    <CarouselItem
                      key={i}
                      className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div className="h-48 bg-gray-200 animate-pulse rounded" />
                    </CarouselItem>
                  ))
                : Array.from({ length: 4 }).map((_, i) => (
                    <CarouselItem
                      key={i}
                      className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <TarjetaProducto />
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      <section className="bg-white p-8">
        <h2 className="text-center text-4xl">¿Por qué elegirnos?</h2>
        <div className="flex justify-center gap-x-15 mt-5">
          <article className="bg-rosa rounded p-8 flex flex-col items-center">
            <Medal size={64} className="text-byar text-center" />
            <span className="font-bold text-xl">Máxima calidad</span>
          </article>
          <article className="bg-rosa rounded p-8 flex flex-col items-center">
            <Medal size={64} className="text-byar" />
            <span className="font-bold text-xl">Pago seguro</span>
          </article>
          <article className="bg-rosa rounded p-8 flex flex-col items-center">
            <Medal size={64} className="text-byar" />
            <span className="font-bold text-xl">Envío rápido</span>
          </article>
        </div>
      </section>
      <section className="bg-fondogris grid grid-cols-2 gap-x-2 p-8">
        <div className="flex justify-center items-center">
          {cargando ? (
            <div className="w-full h-48 bg-gray-200 animate-pulse rounded" />
          ) : (
            <img
              src={datos?.imagen_sobre_de_url ?? undefined}
              alt="Imagen del negocio"
            />
          )}
        </div>
        <div>
          <h2 className="text-center text-4xl">Sobre {datos?.nombre}</h2>
          <p className="text-center text-2xl mt-5">{datos?.sobre_de}</p>
        </div>
      </section>
    </>
  );
}
