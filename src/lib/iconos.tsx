import { PaymentIcon } from "react-svg-credit-card-payment-icons";

export const iconosMarcas: Record<string, React.ReactNode> = {
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
