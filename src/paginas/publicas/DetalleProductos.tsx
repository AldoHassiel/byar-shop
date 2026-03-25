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
      <section className="grid grid-cols-12 gap-5">
        <article className="col-span-8 flex gap-x-10 p-5 bg-white rounded-2xl">
          <div>
            <img
              src={producto?.imagen_url}
              alt="Imagen del producto"
              className="w-[400px] h-[400px] object-contain"
            />
          </div>

          <div className="flex flex-col justify-around">
            <h1 className="text-4xl mt-5">{producto?.nombre}</h1>

            <div>
              <p className="font-bold text-2xl mt-5">
                {producto?.nombre_marca}
              </p>
              <data value={producto?.precio} className="text-xl">
                MXN {producto?.precio}
              </data>

              <h2 className="font-bold text-xl mt-5">Descripción</h2>
              <p className="text-xl">{producto?.descripcion}</p>
            </div>
          </div>
        </article>
        <div className="col-span-4 bg-white rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <p className="text-center text-xl border-b border-b-gray-500 py-2 mb-5">
              Stock disponible
            </p>
            <p>Hola</p>
          </div>

          <div>
            <ButtonGroup className="w-full">
              <Button variant="outline" size="icon">
                <MinusIcon />
              </Button>
              <Input type="number" value={1} className="text-center" />
              <Button variant="outline" size="icon">
                <PlusIcon />
              </Button>
            </ButtonGroup>

            <Button className="mt-2 w-full p-5">Agregar al carrito</Button>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl text-gray-500">Seguir viendo</h2>
        <div className="mt-5 flex gap-5 justify-center">
          <TarjetaProducto />
          <TarjetaProducto />
          <TarjetaProducto />
          <TarjetaProducto />
          <TarjetaProducto />
        </div>
      </section>
    </div>
  );
}
