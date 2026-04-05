import type { Tarjeta } from "@/types/metodos-de-pago";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { detectarMarcaTarjeta } from "@/lib/marcasTarjetas";

interface Props {
  accion: (datos: Tarjeta) => Promise<void>;
}

export default function ModalMetodoDePago({ accion }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);

  const [nombreTitular, setNombreTitular] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [cvv, setCvv] = useState("");

  const [marcaTarjeta, setMarcaTarjeta] = useState("");

  const manejador = async () => {
    setCargando(true);

    if (!nombreTitular.trim()) {
      toast.error("El nombre del titular es requerido", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!numeroTarjeta.trim()) {
      toast.error("El número de la tarjeta es requerida", { duration: 4000 });
      setCargando(false);
      return;
    }

    const numeroLimpio = numeroTarjeta.split(" ").join("");

    if (numeroLimpio.length < 15 || numeroLimpio.length > 16) {
      toast.error("El número de tarjeta no es válido", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!fechaVencimiento.trim()) {
      toast.error("La fecha de vencimiento es requerida", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (fechaVencimiento < minMes) {
      toast.error("La tarjeta está vencida", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!cvv.trim()) {
      toast.error("El CVV es requerido", { duration: 4000 });
      setCargando(false);
      return;
    }

    const datos: Tarjeta = {
      nombre_titular: nombreTitular,
      numero_tarjeta: numeroLimpio,
      mes_vencimiento: fechaVencimiento.split("-")[1],
      ano_vencimiento: fechaVencimiento.split("-")[0],
      cvv,
    };

    await accion(datos);

    setCargando(false);
    setAbierto(false);
  };

  const { minMes, maxMes } = useMemo(() => {
    const hoy = new Date();
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const yyyy = hoy.getFullYear();
    return {
      minMes: `${yyyy}-${mm}`,
      maxMes: `${yyyy + 20}-${mm}`,
    };
  }, []);

  useEffect(() => {
    const numeroTarjetaLimpia = numeroTarjeta.split(" ").join("");

    if (!numeroTarjetaLimpia || numeroTarjetaLimpia.length < 15) return;

    const tiempoEspera = setTimeout(() => {
      const marca = detectarMarcaTarjeta(numeroTarjetaLimpia);
      setMarcaTarjeta(marca);
    }, 50);

    return () => clearTimeout(tiempoEspera);
  }, [numeroTarjeta]);

  useEffect(() => {
    if (abierto) {
      setNombreTitular("");
      setNumeroTarjeta("");
      setFechaVencimiento("");
      setCvv("");
      setMarcaTarjeta("");
    }
  }, [abierto]);

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>
        <Button variant="pink" className="p-4">
          <Plus />
          Agregar método de pago
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-2xl">Agregar método de pago</DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            manejador();
          }}
        >
          <div className="pb-4 px-2">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="nombreTitular">
                  Nombre del titular
                </FieldLabel>
                <Input
                  id="nombreTitular"
                  required
                  type="text"
                  value={nombreTitular}
                  onChange={(e) => setNombreTitular(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="numeroTarjeta">
                  Número de la tarjeta
                </FieldLabel>
                <Input
                  id="numeroTarjeta"
                  required
                  type="text"
                  inputMode="numeric"
                  maxLength={19}
                  value={numeroTarjeta}
                  onChange={(e) => {
                    const solo = e.target.value.replace(/\D/g, "").slice(0, 16);
                    const formateado = solo.replace(/(.{4})/g, "$1 ").trim();
                    setNumeroTarjeta(formateado);
                  }}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="marcaTarjeta">Marca</FieldLabel>
                <Input
                  id="marcaTarjeta"
                  disabled
                  type="text"
                  value={marcaTarjeta}
                />
              </Field>
              <div className="flex gap-2">
                <Field>
                  <FieldLabel htmlFor="fechaVencimiento">
                    Fecha de vencimiento
                  </FieldLabel>
                  <Input
                    id="fechaVencimiento"
                    required
                    type="month"
                    min={minMes}
                    max={maxMes}
                    value={fechaVencimiento}
                    onChange={(e) => setFechaVencimiento(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                  <Input
                    id="cvv"
                    required
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </Field>
              </div>
            </FieldGroup>
          </div>
          <DialogFooter>
            <Button
              variant="pink"
              className="w-full"
              type="submit"
              disabled={cargando}
            >
              {cargando ? (
                <>
                  <Spinner />
                  {"Creando..."}
                </>
              ) : (
                <>{"Agregar tarjeta"}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
