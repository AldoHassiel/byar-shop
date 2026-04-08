import type { MarcaDTO, Marcas } from "@/types/marcas";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Pencil, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

interface Props {
  accion: (datos: MarcaDTO) => Promise<void>;
  editar?: boolean;
  marca?: Marcas;
}

export default function ModalMarca({ accion, editar, marca }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const manejador = async () => {
    setCargando(true);

    if (!nombre.trim()) {
      toast.error("El nombre es requerido", { duration: 4000 });
      setCargando(false);
      return;
    }

    let datos: MarcaDTO = {
      id: marca?.id ?? undefined,
      nombre,
      descripcion,
    };

    setCargando(false);
    await accion(datos);
    setAbierto(false);
  };

  useEffect(() => {
    if (abierto) {
      setNombre(marca?.nombre ?? "");
      setDescripcion(marca?.descripcion ?? "");
    }
  }, [abierto]);

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>
        {editar ? (
          <Pencil
            size={24}
            className="text-byar cursor-pointer hover:opacity-70 transition-opacity"
          />
        ) : (
          <Button variant="pink" className="p-4">
            <Plus />
            Agregar marca
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editar ? "Editando marca" : "Agregar marca"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            manejador();
          }}
        >
          <div className="overflow-y-auto max-h-[60vh] px-2 dialog-scroll pb-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="nombre">Nombre de la marca</FieldLabel>
                <Input
                  id="nombre"
                  required
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </Field>
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
                  {editar ? "Editando..." : "Creando..."}
                </>
              ) : (
                <>{editar ? "Editar" : "Agregar"}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
