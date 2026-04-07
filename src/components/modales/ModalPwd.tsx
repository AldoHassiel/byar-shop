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
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

interface Props {
  accion: (
    pwd: string,
    pwdActual: string,
  ) => Promise<boolean | null | undefined>;
  className?: string;
}

export default function ModalPwd({ accion, className }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  const [bloquearAutocompletado, setBloquearAutocompletado] = useState(true);

  const contrasenasNoCoinciden =
    nuevaContrasena.trim() !== "" &&
    repetirContrasena.trim() !== "" &&
    nuevaContrasena.trim() !== repetirContrasena.trim();

  const limpiarCampos = () => {
    setContrasenaActual("");
    setNuevaContrasena("");
    setRepetirContrasena("");
    setBloquearAutocompletado(true);
  };

  const manejador = async () => {
    const contrasenaActualLimpia = contrasenaActual.trim();
    const nuevaContrasenaLimpia = nuevaContrasena.trim();
    const repetirContrasenaLimpia = repetirContrasena.trim();

    if (!contrasenaActualLimpia) {
      toast.error("La contraseña actual es requerida", { duration: 4000 });
      return;
    }

    if (!nuevaContrasenaLimpia) {
      toast.error("La nueva contraseña es requerida", { duration: 4000 });
      return;
    }

    if (nuevaContrasenaLimpia.length < 8) {
      toast.error("La nueva contraseña debe tener al menos 8 caracteres", {
        duration: 4000,
      });
      return;
    }

    if (nuevaContrasenaLimpia !== repetirContrasenaLimpia) return;

    setCargando(true);
    const ok = await accion(nuevaContrasenaLimpia, contrasenaActualLimpia);
    setCargando(false);

    if (ok) {
      limpiarCampos();
      setAbierto(false);
    }
  };

  const manejarCambioAbierto = (valor: boolean) => {
    setAbierto(valor);
    limpiarCampos();
  };

  const cancelar = () => {
    setAbierto(false);
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Cambiar contraseña</DialogTitle>
        </DialogHeader>

        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            manejador();
          }}
          className="space-y-4"
        >
          {/* Fake inputs para engañar al autofill del navegador */}
          <input type="hidden" name="username" />
          <input type="hidden" name="password" />

          <Field>
            <FieldLabel className="sr-only" htmlFor="contrasenaActual">
              Contraseña actual
            </FieldLabel>
            <Input
              id="contrasenaActual"
              type="password"
              required
              autoComplete="new-password"
              readOnly={bloquearAutocompletado}
              placeholder="Contraseña actual"
              className={estiloInput}
              value={contrasenaActual}
              onFocus={() => setBloquearAutocompletado(false)}
              onChange={(e) => setContrasenaActual(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel className="sr-only" htmlFor="nuevaContrasena">
              Nueva contraseña
            </FieldLabel>
            <Input
              id="nuevaContrasena"
              type="password"
              minLength={8}
              required
              autoComplete="new-password"
              readOnly={bloquearAutocompletado}
              placeholder="Nueva contraseña"
              className={estiloInput}
              value={nuevaContrasena}
              onFocus={() => setBloquearAutocompletado(false)}
              onChange={(e) => setNuevaContrasena(e.target.value)}
            />
          </Field>

          <p className="text-xl text-gray-500">Mínimo 8 caracteres</p>

          <Field>
            <FieldLabel className="sr-only" htmlFor="repetirContrasena">
              Repetir contraseña
            </FieldLabel>
            <Input
              id="repetirContrasena"
              type="password"
              minLength={8}
              required
              autoComplete="off"
              readOnly={bloquearAutocompletado}
              placeholder="Repetir contraseña"
              className={estiloInput}
              value={repetirContrasena}
              onFocus={() => setBloquearAutocompletado(false)}
              onChange={(e) => setRepetirContrasena(e.target.value)}
            />
          </Field>

          <p className="text-xl text-gray-500">
            Debe coincidir con el campo Nueva Contraseña
          </p>

          {contrasenasNoCoinciden && (
            <p className="text-sm font-medium text-red-500">
              Las contraseñas no son iguales
            </p>
          )}

          <DialogFooter twoColumns>
            <Button type="button" variant="outline" onClick={cancelar}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="pink"
              disabled={cargando || contrasenasNoCoinciden}
            >
              {cargando ? (
                <>
                  <Spinner />
                  Cambiando...
                </>
              ) : (
                "Cambiar contraseña"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
