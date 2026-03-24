import TarjetaProducto from "@/components/TarjetaProducto";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import useProductos from "@/hooks/useProductos";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useParams } from "react-router";

export default function DetalleProductos() {
  const { id } = useParams();
  const { producto, cargando } = useProductos(Number(id));

  if (cargando) return <p>Cargando detalle producto</p>;

  return (
    <div className="bg-fondogris px-20 py-10">
      <article className="bg-white rounded-2xl px-10 py-5">
        <header className="flex gap-x-10">
          <div>
            <img
              src={producto?.imagen_url}
              alt="Imagen del productp"
              width={200}
              height={200}
            />
          </div>
          <div>
            <h1 className="text-4xl">{producto?.nombre}</h1>
            <span className="text-xl font-bold block mt-2">
              {producto?.nombre_marca}
            </span>
            <data value={producto?.precio} className="text-2xl">
              MXN {producto?.precio}
            </data>
            <div className="flex gap-x-5 mt-2">
              <ButtonGroup>
                <Button variant="outline" size="icon">
                  <MinusIcon />
                </Button>
                <Input type="number" className="text-center" />
                <Button variant="outline" size="icon">
                  <PlusIcon />
                </Button>
              </ButtonGroup>
              <Button>Agregar al carrito</Button>
            </div>
          </div>
        </header>
        <footer className="mt-5">
          <p className="font-bold text-2xl">Descripción</p>
          <p className="text-xl">{producto?.descripcion}</p>
        </footer>
      </article>

      <section className="mt-10">
        <h2 className="text-2xl text-gray-500">Seguir viendo</h2>
        <div className="flex overflow-hidden mt-5">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              <CarouselItem className="pl-1">
                <TarjetaProducto />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
