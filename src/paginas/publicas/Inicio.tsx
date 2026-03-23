import TarjetaProducto from "@/components/TarjetaProducto";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Medal } from "lucide-react";

export default function Inicio() {
  return (
    <>
      <section className="bg-white grid grid-cols-2 gap-x-2 p-8 ">
        <div>
          <h2 className="text-center text-4xl">Titulo</h2>
          <p className="text-center text-2xl mt-5">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-orless normal
            distribution of letters, as opposed to using 'Content here, content
            her
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p>Imagen</p>
        </div>
      </section>

      <section className="bg-fondogris p-8">
        <h2 className="text-center text-4xl">Productos destacados</h2>
        <div className="flex justify-center px-15 mt-5">
          <Carousel
            opts={{
              align: "center",
            }}
          >
            <CarouselPrevious />
            <CarouselContent>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1-4">
                <TarjetaProducto />
              </CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1-4">
                <TarjetaProducto />
              </CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1-4">
                <TarjetaProducto />
              </CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1-4">
                <TarjetaProducto />
              </CarouselItem>
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
            <span className="font-bold text-xl">Envió rápido</span>
          </article>
        </div>
      </section>

      <section className="bg-fondogris grid grid-cols-2 gap-x-2 p-8 ">
        <div className="flex justify-center items-center">
          <p>Imagen</p>
        </div>
        <div>
          <h2 className="text-center text-4xl">Sobre byarshop</h2>
          <p className="text-center text-2xl mt-5">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-orless normal
            distribution of letters, as opposed to using 'Content here, content
            her
          </p>
        </div>
      </section>
    </>
  );
}
