import type { DetalleCompra } from "@/types/compras";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Separator } from "../ui/separator";
import { iconosMarcas } from "@/lib/iconos";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Link } from "react-router";

interface Props {
  abierto: boolean;
  setAbierto: (abierto: boolean) => void;
  detalleCompra: DetalleCompra | null;
  cargando: boolean;
}

export default function ModalDetalleCompra({
  abierto,
  setAbierto,
  detalleCompra,
  cargando,
}: Props) {
  return (
    <Dialog open={abierto} onOpenChange={setAbierto} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">{`N° Pedido ${detalleCompra?.pedido.id ?? "--"}`}</DialogTitle>
          <DialogDescription>{`Fecha de compra: ${detalleCompra?.pedido.fecha ?? "--/--/--"}`}</DialogDescription>
        </DialogHeader>
        {cargando ? (
          <div className="flex justify-center py-8">
            <Spinner className="size-8 text-byar" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="space-y-1">
              <span className="block text-[18px] font-medium">{`${detalleCompra?.productos.length} articulos`}</span>
              <div className="relative">
                <Carousel opts={{ align: "start" }}>
                  <CarouselContent className="px-2">
                    {detalleCompra?.productos.map((producto) => (
                      <CarouselItem
                        key={producto.id}
                        className="basis-1/2 md:basis-1/3 flex justify-center"
                      >
                        <div className="rounded-xl bg-white p-2 flex flex-col h-full hover:scale-95">
                          <Link
                            to={`/productos/${producto.id}`}
                            className="flex flex-col h-full"
                          >
                            <div className="flex justify-center items-center h-20">
                              <img
                                src={producto.imagen_url}
                                alt={`Imagen del producto ${producto.nombre}`}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>

                            <div className="mt-auto pt-1">
                              <span className="block text-sm leading-tight">
                                {producto.nombre}
                              </span>
                              <span className="block font-bold text-sm">{`MXN ${producto.subtotal}`}</span>
                            </div>
                          </Link>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious
                    variant="ghost"
                    className="text-byar -left-5"
                  />
                  <CarouselNext
                    variant="ghost"
                    className="text-byar -right-5"
                  />
                </Carousel>
              </div>
            </div>
            <div className="space-y-1">
              <div>
                <span className="block text-[18px] font-medium">
                  Método de pago
                </span>
                <div className="flex items-center gap-x-2">
                  {
                    iconosMarcas[
                      detalleCompra?.pedido.tarjeta_marca ?? "Desconocida"
                    ]
                  }
                  <span>{`**** ${detalleCompra?.pedido.tarjeta_ultimos_digitos}`}</span>
                </div>
              </div>
              <div>
                <span className="text-[18px] font-medium">
                  Dirección de envío
                </span>
                <div className="">
                  <p>{`${detalleCompra?.pedido.direccion_calle} ${detalleCompra?.pedido.direccion_numero_exterior} ${detalleCompra?.pedido.direccion_numero_interior && detalleCompra?.pedido.direccion_numero_interior}, ${detalleCompra?.pedido.direccion_especificaciones}`}</p>
                  <p>{`${detalleCompra?.pedido.direccion_colonia}, ${detalleCompra?.pedido.direccion_codigo_postal} ${detalleCompra?.pedido.direccion_municipio}, ${detalleCompra?.pedido.direccion_estado} `}</p>
                </div>
              </div>
            </div>
            <Separator className="bg-gray-800" />
            <div>
              <div className="flex justify-between">
                <span className="block">Subtotal</span>
                <span className="block">{`MXN ${detalleCompra?.pedido.subtotal}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="block ">Costo de envío</span>
                <span className="block">{`MXN ${detalleCompra?.pedido.costo_envio}`}</span>
              </div>
              <div className="flex justify-between">
                <div className="space-x-1">
                  <span className="font-bold text-lg">Total</span>
                  <span>(IVA incluido)</span>
                </div>
                <span className="block font-bold text-lg">{`MXN ${detalleCompra?.pedido.total}`}</span>
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="pink" onClick={() => setAbierto(false)}>
            Volver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
