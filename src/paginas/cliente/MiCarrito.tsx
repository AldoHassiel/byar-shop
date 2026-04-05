import ModalDirecciones from "@/components/modales/ModalDirecciones";
import ModalEliminar from "@/components/modales/ModalEliminar";
import ModalMetodoDePago from "@/components/modales/ModalMetodoDePago";
import Paginacion from "@/components/Paginacion";
import SeguirViendo from "@/components/SeguirViendo";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import useCarrito from "@/global/CarritoContexto";
import useDirecciones from "@/hooks/useDirecciones";
import useMetodosDePago from "@/hooks/useMetodosDePago";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PaymentIcon } from "react-svg-credit-card-payment-icons";

const iconosMarcas: Record<string, React.ReactNode> = {
  Visa: <PaymentIcon type="Visa" format="flatRounded" width={48} />,
  Mastercard: <PaymentIcon type="Mastercard" format="flatRounded" width={48} />,
  "American Express": (
    <PaymentIcon type="Amex" format="flatRounded" width={48} />
  ),
  Discover: <PaymentIcon type="Discover" format="flatRounded" width={48} />,
  "Diners Club": <PaymentIcon type="Diners" format="flatRounded" width={48} />,
  JCB: <PaymentIcon type="Jcb" format="flatRounded" width={48} />,
  UnionPay: <PaymentIcon type="Unionpay" format="flatRounded" width={48} />,
  Maestro: <PaymentIcon type="Maestro" format="flatRounded" width={48} />,
  Elo: <PaymentIcon type="Elo" format="flatRounded" width={48} />,
  Hipercard: <PaymentIcon type="Hipercard" format="flatRounded" width={48} />,
  Mir: <PaymentIcon type="Mir" format="flatRounded" width={48} />,
  Desconocida: <PaymentIcon type="Generic" format="flatRounded" width={48} />,
};

export default function MiCarrito() {
  const {
    carrito,
    cargando,
    obtenerCarrito,
    actualizarCantidad,
    eliminarProducto,
  } = useCarrito();

  const [direccionSel, setDireccionSel] = useState("");
  const [tarjetaSel, setTarjetaSel] = useState("");

  const { direcciones, crearDireccion, obtenerInfoCP } = useDirecciones();
  const { tarjetas, crearTarjeta } = useMetodosDePago();

  const categoriasCarritoRef = useRef<number[]>([]);

  const categoriasCarrito = useMemo(() => {
    const nuevas = [...new Set(carrito?.productos.map((p) => p.id_categoria))];

    const sonIguales =
      nuevas.length === categoriasCarritoRef.current.length &&
      nuevas.every((id) => categoriasCarritoRef.current.includes(id));

    if (!sonIguales) {
      categoriasCarritoRef.current = nuevas;
    }

    return categoriasCarritoRef.current;
  }, [carrito]);

  const [paginaActual, setPaginaActual] = useState(1);
  const PRODUCTOS_POR_PAGINA = 5;

  const productosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    return (
      carrito?.productos.slice(inicio, inicio + PRODUCTOS_POR_PAGINA) ?? []
    );
  }, [carrito, paginaActual]);

  const totalPaginas = Math.ceil(
    (carrito?.productos.length ?? 0) / PRODUCTOS_POR_PAGINA,
  );

  useEffect(() => {
    setPaginaActual(1);
  }, [carrito?.productos.length]);

  useEffect(() => {
    obtenerCarrito(Number(direccionSel));
  }, [direccionSel]);

  useEffect(() => {
    const direccionPredeterminada = direcciones.find(
      (d) => d.es_predeterminada,
    );
    if (direccionPredeterminada)
      setDireccionSel(String(direccionPredeterminada.id));

    const tarjetaPredeterminada = tarjetas.find((t) => t.es_predeterminada);
    if (tarjetaPredeterminada) setTarjetaSel(String(tarjetaPredeterminada.id));
  }, [direcciones, tarjetas]);

  if (cargando)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="size-8 text-byar" />
      </div>
    );

  return (
    <div className="mt-20">
      <div className="flex flex-col items-center justify-between px-20 py-4">
        <div className="w-full mb-5">
          <h2 className="text-5xl text-left">Mi carrito</h2>
        </div>

        <section className="grid grid-cols-12 items-start w-full gap-15">
          <div className="col-span-8 bg-white rounded-4xl px-5">
            {productosPaginados?.map((p, indice) => (
              <>
                <article className="flex gap-x-5 mb-1 p-5">
                  <div>
                    <img
                      src={p.imagen_url}
                      alt="Imagen del producto"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div className="space-y-1">
                      <h1 className="block text-2xl">{p.nombre}</h1>
                      <p className="block">{p.descripcion}</p>
                      <span className="block font-bold text-xl">{p.marca}</span>
                    </div>

                    <div className="pt-2 space-y-2">
                      <div className="space-x-2">
                        <span>Stock:</span>
                        <span>{p.stock}</span>
                      </div>
                      <div className="flex items-center gap-x-5 w-[25%]">
                        <InputGroup>
                          <InputGroupAddon>
                            <InputGroupButton
                              onClick={() => {
                                if (p.cantidad <= 1) return;
                                actualizarCantidad(p.id, -1);
                              }}
                            >
                              <MinusIcon />
                            </InputGroupButton>
                          </InputGroupAddon>
                          <InputGroupInput
                            value={p.cantidad}
                            className="text-center"
                          />
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              onClick={() => {
                                if (p.cantidad >= p.stock) return;
                                actualizarCantidad(p.id, 1);
                              }}
                            >
                              <PlusIcon />
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>
                        <ModalEliminar
                          titulo="Eliminar producto"
                          descripcion={`¿Estas seguro que deseas eliminar el producto ${p.nombre}?`}
                          nombreResaltado={p.nombre}
                          accion={() => eliminarProducto(p.id)}
                        />
                      </div>
                    </div>

                    <div className="w-full mt-2">
                      <span className="text-right block">{`MXN ${p.total}`}</span>
                    </div>
                  </div>
                </article>
                {indice < productosPaginados.length - 1 && (
                  <Separator className="bg-gray-500" />
                )}
              </>
            ))}
            <Paginacion
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambiarPagina={setPaginaActual}
              className="py-4"
            />
          </div>
          <div className="col-span-4 p-5">
            <div>
              <h3 className="text-4xl">Dirección</h3>
              <div className="bg-white rounded-4xl p-5 mt-2 space-y-2">
                <span className="block">Selecciona tu dirección</span>
                <Select value={direccionSel} onValueChange={setDireccionSel}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      {direcciones.map((dir) => (
                        <SelectItem key={dir.id} value={String(dir.id)}>
                          {dir.calle} {dir.numero_exterior}
                          {dir.numero_interior &&
                            ` Int. ${dir.numero_interior}`}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <ModalDirecciones
                  accion={crearDireccion}
                  obtenerInfoCP={obtenerInfoCP}
                  className="w-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-4xl">Método de pago</h3>
              <div className="bg-white rounded-4xl p-5 mt-2 space-y-2">
                <span className="block">Selecciona el método</span>
                <Select value={tarjetaSel} onValueChange={setTarjetaSel}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      {tarjetas.map((t) => (
                        <SelectItem key={t.id} value={String(t.id)}>
                          {iconosMarcas[t.marca]}
                          {`**** ${t.ultimos_digitos}`}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <ModalMetodoDePago accion={crearTarjeta} className="w-full" />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-4xl">Resumen</h3>
              <div className="bg-white rounded-4xl p-5 mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="block font-bold text-xl">Subtotal</span>
                  <span className="block">
                    {carrito?.resumen.subtotal
                      ? `MXN ${carrito?.resumen.subtotal}`
                      : "- - -"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="block text-xl">Costo de envío</span>
                  <span className="block">
                    {carrito?.resumen.costo_de_envio
                      ? `MXN ${carrito?.resumen.costo_de_envio}`
                      : "- - -"}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="block font-bold text-xl">Total</span>
                  <span className="block">
                    {carrito?.resumen.total
                      ? `MXN ${carrito?.resumen.total}`
                      : "- - -"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div>
          {categoriasCarrito.length > 0 && (
            <SeguirViendo
              idCategorias={categoriasCarrito}
              titulo="También te podría interesar..."
              limite={5}
              productosExcluir={carrito?.productos.map((p) => p.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
