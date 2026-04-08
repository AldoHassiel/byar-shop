import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

interface Props {
  correoActual: string;
  accion: (
    correo: string,
    pwdActual: string,
  ) => Promise<boolean | null | undefined>;
  className?: string;
}

export default function ModalCorreo({ correoActual, accion, className }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [repetirCorreo, setRepetirCorreo] = useState("");
  const [bloquearAutocompletado, setBloquearAutocompletado] = useState(true);

  const limpiarCampos = () => {
    setContrasenaActual("");
    setNuevoCorreo("");
    setRepetirCorreo("");
    setBloquearAutocompletado(true);
  };

  const manejarCambioAbierto = (valor: boolean) => {
    setAbierto(valor);
    limpiarCampos();
  };

  const cancelar = () => {
    setAbierto(false);
  };

  const correosNoCoinciden =
    nuevoCorreo.trim() !== "" &&
    repetirCorreo.trim() !== "" &&
    nuevoCorreo.trim() !== repetirCorreo.trim();

  const estiloInput =
    "bg-gray-100/70 border-gray-300 text-gray-800 placeholder:text-gray-500";

  const estiloLabel = "text-gray-700";

  const manejador = async () => {
    const correoLimpio = nuevoCorreo.trim();
    const repetirCorreoLimpio = repetirCorreo.trim();
    const contrasenaActualLimpia = contrasenaActual.trim();

    if (!contrasenaActualLimpia) {
      toast.error("La contraseña actual es requerida", { duration: 4000 });
      return;
    }

    if (!correoLimpio) {
      toast.error("El nuevo correo es requerido", { duration: 4000 });
      return;
    }

    if (correoLimpio === correoActual) {
      toast.error("El nuevo correo debe ser diferente al actual", {
        duration: 4000,
      });
      return;
    }

    if (correoLimpio !== repetirCorreoLimpio) return;

    setCargando(true);
    const ok = await accion(correoLimpio, contrasenaActualLimpia);
    setCargando(false);

    if (ok) {
      limpiarCampos();
      setAbierto(false);
    }
  };

  return (
    <Dialog open={abierto} onOpenChange={manejarCambioAbierto}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="link"
          className={cn(
            "h-auto p-0 text-sm font-medium text-byar hover:underline",
            className,
          )}
        >
          Cambiar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Cambiar e-mail</DialogTitle>
        </DialogHeader>

        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            manejador();
          }}
        >
          <input type="hidden" name="username" />
          <input type="hidden" name="password" />

          <div className="overflow-y-auto max-h-[60vh] px-2 dialog-scroll">
            <FieldGroup className="gap-2">
              <p className="text-sm text-gray-500">
                E-mail actual: <span className="text-gray-600">{correoActual}</span>
              </p>

              <Field className="gap-0.5">
                <FieldLabel className={estiloLabel} htmlFor="contrasenaActual">
                  Contraseña actual
                </FieldLabel>
                <Input
                  id="contrasenaActual"
                  type="password"
                  required
                  autoComplete="new-password"
                  readOnly={bloquearAutocompletado}
                  placeholder="Ingresa tu contraseña actual"
                  className={estiloInput}
                  value={contrasenaActual}
                  onFocus={() => setBloquearAutocompletado(false)}
                  onChange={(e) => setContrasenaActual(e.target.value)}
                />
              </Field>

              <Field className="gap-0.5">
                <FieldLabel className={estiloLabel} htmlFor="nuevoCorreo">
                  Nuevo e-mail
                </FieldLabel>
                <Input
                  id="nuevoCorreo"
                  type="email"
                  required
                  autoComplete="off"
                  readOnly={bloquearAutocompletado}
                  placeholder="Ingresa tu nuevo e-mail"
                  className={estiloInput}
                  value={nuevoCorreo}
                  onFocus={() => setBloquearAutocompletado(false)}
                  onChange={(e) => setNuevoCorreo(e.target.value)}
                />
              </Field>

              <Field className="gap-0.5">
                <FieldLabel className={estiloLabel} htmlFor="repetirCorreo">
                  Repetir e-mail
                </FieldLabel>
                <Input
                  id="repetirCorreo"
                  type="email"
                  required
                  autoComplete="off"
                  readOnly={bloquearAutocompletado}
                  placeholder="Repite tu nuevo e-mail"
                  className={estiloInput}
                  value={repetirCorreo}
                  onFocus={() => setBloquearAutocompletado(false)}
                  onChange={(e) => setRepetirCorreo(e.target.value)}
                />
              </Field>

              {correosNoCoinciden && (
                <p className="text-xs font-medium text-red-500">
                  Los correos no son iguales
                </p>
              )}
            </FieldGroup>
          </div>

          <DialogFooter twoColumns>
            <Button type="button" variant="outline" onClick={cancelar}>
              Cancelar
            </Button>
            <Button type="submit" variant="pink" disabled={cargando || correosNoCoinciden}>
              {cargando ? (
                <>
                  <Spinner />
                  Cambiando...
                </>
              ) : (
                "Cambiar e-mail"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
