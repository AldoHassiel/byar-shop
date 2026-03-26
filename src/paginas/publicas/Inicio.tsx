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
import {CreditCard} from "lucide-react";
import { Rocket } from "lucide-react";
import { useOutletContext } from "react-router";
import nyar from "@/assets/Fotoinicio/ByarPLa.png";
// import byart from "@/assets/byart.png";
import imagenplazuela from "/WhatsApp Image 2026-03-25 at 7.04.18 AM (1).jpeg";
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
  const { productos, cargando: cargandoProductos } = useProductos({
    paginaInicial: 1,
    limiteInicial: 8,
  });

  const datos: Negocio = {
    ...NEGOCIO_DEFAULT,
    ...Object.fromEntries(
      Object.entries(negocio ?? {}).filter(([_, v]) => noVacio(v)),
    ),
  };

  return (
    <>
      
      <section className="relative w-full overflow-hidden">
        <img
          src={nyar}
          alt="Hero"
         className="w-full h-[460px] sm:h-[620px] lg:h-[700px] 2xl:h-[900] object-cover object-center"
        />
        {/* <div>
          <h2 className="text-center text-4xl">{datos.hero_titulo}</h2>
          <p className="text-center text-2xl ">{datos.hero_descripcion}</p>
        </div> */}
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
          <p className="text-center mt-5">No hay productos destacados disponibles.</p>
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
          ) : (datos.imagen_sobre_de_url || imagenplazuela) ? (
            <img
              src={datos.imagen_sobre_de_url || imagenplazuela}
              alt="Imagen del negocio"
              className="w-full max-w-md h-80 object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full max-w-md h-80 bg-gray-200 rounded-2xl" />
          )}
        </div>
        <div>
          <h2 className="text-center font-bold text-4xl">Sobre {datos?.nombre}</h2>
          <p className="text-justify ml-4 mr-4 text-2xl mt-5">{datos?.sobre_de}</p>
        </div>
      </section>
    </>
  );
}
