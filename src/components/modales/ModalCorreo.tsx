import { cn } from "@/lib/utils";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
import { Field, FieldLabel } from "../ui/field";
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
  const [mostrarContrasenaActual, setMostrarContrasenaActual] = useState(false);
  const [bloquearAutocompletado, setBloquearAutocompletado] = useState(true);

  const limpiarCampos = () => {
    setContrasenaActual("");
    setNuevoCorreo("");
    setRepetirCorreo("");
    setMostrarContrasenaActual(false);
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

  const estiloInput =
    "h-14 rounded-full border-gray-500/70 px-5 text-xl placeholder:text-gray-400";

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

      <DialogContent className="sm:max-w-xl rounded-[2rem] p-8">
        <DialogHeader>
          <DialogTitle className="text-5xl">Cambiar e-mail</DialogTitle>
        </DialogHeader>

        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            manejador();
          }}
          className="space-y-4"
        >
          <p className="text-xl text-gray-500">E-mail actual, {correoActual}</p>

          <Field>
            <FieldLabel className="sr-only" htmlFor="contrasenaActual">
              Contraseña actual
            </FieldLabel>
            <div className="relative">
              <Input
                id="contrasenaActual"
                type={mostrarContrasenaActual ? "text" : "password"}
                required
                autoComplete="off"
                readOnly={bloquearAutocompletado}
                placeholder="Contraseña actual"
                className={cn(estiloInput, "pr-14")}
                value={contrasenaActual}
                onFocus={() => setBloquearAutocompletado(false)}
                onChange={(e) => setContrasenaActual(e.target.value)}
              />
              <button
                type="button"
                aria-label={
                  mostrarContrasenaActual
                    ? "Ocultar contraseña actual"
                    : "Mostrar contraseña actual"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setMostrarContrasenaActual((prev) => !prev)}
              >
                {mostrarContrasenaActual ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </Field>

          <Field>
            <FieldLabel className="sr-only" htmlFor="nuevoCorreo">
              Nuevo e-mail
            </FieldLabel>
            <Input
              id="nuevoCorreo"
              type="email"
              required
              autoComplete="off"
              readOnly={bloquearAutocompletado}
              placeholder="Nuevo e-mail"
              className={estiloInput}
              value={nuevoCorreo}
              onFocus={() => setBloquearAutocompletado(false)}
              onChange={(e) => setNuevoCorreo(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel className="sr-only" htmlFor="repetirCorreo">
              Repetir e-mail
            </FieldLabel>
            <Input
              id="repetirCorreo"
              type="email"
              required
              autoComplete="off"
              readOnly={bloquearAutocompletado}
              placeholder="Nuevo e-mail"
              className={estiloInput}
              value={repetirCorreo}
              onFocus={() => setBloquearAutocompletado(false)}
              onChange={(e) => setRepetirCorreo(e.target.value)}
            />
          </Field>

          {correosNoCoinciden && (
            <p className="text-sm font-medium text-red-500">
              Los correos no son iguales
            </p>
          )}

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
