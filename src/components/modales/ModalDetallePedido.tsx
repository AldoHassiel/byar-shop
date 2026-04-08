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
import type { DetallePedido } from "@/types/pedidos";

interface Props {
  abierto: boolean;
  setAbierto: (abierto: boolean) => void;
  detallePedido: DetallePedido | null;
  cargando: boolean;
}

export default function ModalDetallePedido({
  abierto,
  setAbierto,
  detallePedido,
  cargando,
}: Props) {
  return (
    <Dialog open={abierto} onOpenChange={setAbierto} modal={true}>
      <DialogContent className="gap-0">
        <DialogHeader className="gap-0">
          <DialogTitle className="text-xl">{`N° Pedido ${detallePedido?.pedido.id ?? "--"}`}</DialogTitle>
          <DialogDescription>{`Fecha de compra: ${detallePedido?.pedido.fecha ?? "--/--/--"}`}</DialogDescription>
        </DialogHeader>
        {cargando ? (
          <div className="flex justify-center py-8">
            <Spinner className="size-8 text-byar" />
          </div>
        ) : (
          <div className="space-y-1 overflow-hidden mt-1 overflow-y-auto max-h-[80vh] dialog-scroll">
            <div>
              <span className="block text-[18px] font-medium">
                Nombre del comprador
              </span>
              <span>{`${detallePedido?.pedido.usuario_nombre} ${detallePedido?.pedido.usuario_apellidos}`}</span>
            </div>
            <div>
              <span className="block text-[18px] font-medium">{`${detallePedido?.productos.length} articulos`}</span>
              <div className="relative px-3">
                <Carousel opts={{ align: "center" }}>
                  <CarouselContent className="px-1">
                    {detallePedido?.productos.map((producto) => (
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
                              <span className="block font-bold text-sm whitespace-nowrap">{`MXN ${producto.subtotal}`}</span>
                            </div>
                          </Link>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious
                    variant="ghost"
                    className="text-byar -left-7 hover:bg-transparent  active:bg-transparent  shadow-none p-0 hover:text-byar"
                  />
                  <CarouselNext
                    variant="ghost"
                    className="text-byar -right-6 hover:bg-transparent  active:bg-transparent  shadow-none p-0 hover:text-byar"
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
                      detallePedido?.pedido.tarjeta_marca ?? "Desconocida"
                    ]
                  }
                  <span>{`**** ${detallePedido?.pedido.tarjeta_ultimos_digitos}`}</span>
                </div>
              </div>
              <div>
                <span className="text-[18px] font-medium">
                  Dirección de envío
                </span>
                <div className="">
                  <p>{`${detallePedido?.pedido.direccion_calle} ${detallePedido?.pedido.direccion_numero_exterior} ${detallePedido?.pedido.direccion_numero_interior && detallePedido?.pedido.direccion_numero_interior}, ${detallePedido?.pedido.direccion_especificaciones || "Sin especificaciones"}`}</p>
                  <p>{`${detallePedido?.pedido.direccion_colonia}, ${detallePedido?.pedido.direccion_codigo_postal} ${detallePedido?.pedido.direccion_municipio}, ${detallePedido?.pedido.direccion_estado} `}</p>
                </div>
              </div>
            </div>
            <Separator className="bg-gray-800" />
            <div>
              <div className="flex justify-between">
                <span className="block">Subtotal</span>
                <span className="block">{`MXN ${detallePedido?.pedido.subtotal}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="block ">Costo de envío</span>
                <span className="block">{`MXN ${detallePedido?.pedido.costo_envio}`}</span>
              </div>
              <div className="flex justify-between">
                <div className="space-x-1">
                  <span className="font-bold text-lg">Total</span>
                  <span>(IVA incluido)</span>
                </div>
                <span className="block font-bold text-lg">{`MXN ${detallePedido?.pedido.total}`}</span>
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
