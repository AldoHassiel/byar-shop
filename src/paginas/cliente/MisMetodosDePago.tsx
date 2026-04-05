import ModalEliminar from "@/components/modales/ModalEliminar";
import ModalMetodoDePago from "@/components/modales/ModalMetodoDePago";
import { Spinner } from "@/components/ui/spinner";
import useMetodosDePago from "@/hooks/useMetodosDePago";
import { CircleSmallIcon } from "lucide-react";
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

export default function MisMetodosDePago() {
  const {
    tarjetas,
    cargando,
    crearTarjeta,
    establecerPredeterminada,
    eliminarTarjeta,
  } = useMetodosDePago();

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl">Métodos de pago </h2>
        <ModalMetodoDePago accion={crearTarjeta} />
      </div>

      {cargando ? (
        <div className="flex justify-center items-center h-full">
          <Spinner className="size-8 text-byar" />
        </div>
      ) : (
        <div className="space-y-4 mt-5">
          {tarjetas?.map((t) => (
            <article className="bg-fondogris rounded-2xl w-full grid grid-cols-12 justify-between items-center px-4 py-3 gap-4">
              <div className="col-span-8 flex items-center gap-4">
                <div>{iconosMarcas[t.marca]}</div>
                <div>
                  <span className="block">{t.nombre_titular}</span>
                  <span className="block">{`**** ${t.ultimos_digitos}`}</span>
                </div>
              </div>
              <div className="col-span-2">
                {t.es_predeterminada ? (
                  <span className="block text-center text-gray-600">
                    Predeterminada
                  </span>
                ) : (
                  <div className="flex justify-center">
                    <CircleSmallIcon
                      className="cursor-pointer"
                      onClick={() => establecerPredeterminada(t.id)}
                    />
                  </div>
                )}
              </div>
              <div className="col-span-2 flex gap-4 justify-center items-center">
                <ModalEliminar
                  titulo="Eliminar método de pago"
                  descripcion="¿Estas seguro que deseas eliminar este método de pago?"
                  accion={() => eliminarTarjeta(t.id)}
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
