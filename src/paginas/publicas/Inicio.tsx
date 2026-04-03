import TarjetaProducto from "@/components/TarjetaProducto";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useProductos from "@/hooks/useProductos";
import type { Negocio } from "@/types/negocio";
import { Medal } from "lucide-react";
import { CreditCard } from "lucide-react";
import { Rocket } from "lucide-react";
import { useOutletContext } from "react-router";
import byarhero from "@/assets/Fotoinicio/ByarPLa.png";

export default function Inicio() {
  const { negocio, cargando } = useOutletContext<{
    negocio: Negocio | null;
    cargando: boolean;
  }>();
  const { productos, cargando: cargandoProductos } = useProductos({
    paginaInicial: 1,
    limiteInicial: 8,
  });

  if (cargando) return <p className="mt-20 p-6">Cargando...</p>;

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <img
          src={negocio?.hero_imagen_url || byarhero}
          alt="Hero"
          className="w-full h-[460px] sm:h-[620px] lg:h-[700px] 2xl:h-[900] object-cover object-center"
        />
      </section>
      <section className="bg-fondogris p-8">
        <h2 className="text-center text-4xl">Productos destacados</h2>
        <div className="flex justify-center mt-5 px-2 md:px-4">
          <Carousel opts={{ align: "start" }} className="w-full max-w-6xl">
            <CarouselPrevious
              variant="ghost"
              className="text-byar h-20 w-20 -right-8 md:-left-20 hover:bg-transparent  active:bg-transparent  shadow-none p-0  [&_svg]:size-20! "
            />
            <CarouselContent>
              {cargandoProductos
                ? Array.from({ length: 4 }).map((_, indice) => (
                    <CarouselItem
                      key={indice}
                      className="basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
                    >
                      <div className="bg-white rounded p-5 w-50 h-74 animate-pulse" />
                    </CarouselItem>
                  ))
                : productos.map((producto) => (
                    <CarouselItem
                      key={producto.id}
                      className="basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
                    >
                      <TarjetaProducto producto={producto} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselNext
              variant="ghost"
              className="text-byar h-20 w-20 -right-8 md:-right-20 hover:bg-transparent  active:bg-transparent  shadow-none p-0  [&_svg]:size-20! "
            />
          </Carousel>
        </div>
        {!cargandoProductos && productos.length === 0 && (
          <p className="text-center mt-5">
            No hay productos destacados disponibles.
          </p>
        )}
      </section>
      <section className="bg-white p-8">
        <h2 className="text-center text-4xl">¿Por qué elegirnos?</h2>
        <div className="flex justify-center gap-x-15 mt-5">
          <article className="bg-byarclaro rounded p-8 flex flex-col items-center">
            <Medal size={64} className="text-byar" />
            <span className="font-bold text-xl">Máxima calidad</span>
          </article>
          <article className="bg-byarclaro rounded p-8 flex flex-col items-center">
            <CreditCard size={64} className="text-byar text-center" />
            <span className="font-bold text-xl">Pago seguro</span>
          </article>
          <article className="bg-byarclaro rounded p-8 flex flex-col items-center">
            <Rocket size={64} className="text-byar" />
            <span className="font-bold text-xl">Envío rápido</span>
          </article>
        </div>
      </section>
      <section className="bg-fondogris grid grid-cols-2 gap-x-2 p-8">
        <div className="flex justify-center items-center">
          {cargando ? (
            <div className="w-full max-w-md h-80 bg-gray-200 animate-pulse rounded-2xl" />
          ) : (
            <img
              src={negocio?.imagen_sobre_nosotros_url || "/plazuela.jpeg"}
              alt="Imagen del negocio"
              className="w-full max-w-md h-80 object-cover rounded-2xl"
            />
          )}
        </div>
        <div>
          <h2 className="text-center font-bold text-4xl">
            Sobre {negocio?.nombre || "byarshop"}
          </h2>
          <p className="text-justify ml-4 mr-4 text-2xl mt-5">
            {negocio?.sobre_nosotros ||
              "En Byarshop somos apasionados por traerte lo mejor del mundo. Nos especializamos en productos extranjeros de alta calidad, cuidadosamente seleccionados para ofrecerte una experiencia de compra única. Nos encontramos en el corazón de la ciudad, frente a la iglesia de la Plazuela 27 de Sep, donde cada fin de semana abrimos nuestras puertas para que descubras artículos exclusivos que no encontrarás en ningún otro lugar. ¡Ven y vive la experiencia Byarshop!"}
          </p>
        </div>
      </section>
    </>
  );
}
