import type { CategoriaDTO, Categorias } from "@/types/categorias";
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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Pencil, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  accion?: (datos: CategoriaDTO) => Promise<void>;
  editar?: boolean;
  categoria?: Categorias;
}

export default function ModalCategoria({ editar, categoria, accion }: Props) {
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

    let datos: CategoriaDTO = {
      nombre,
      descripcion,
    };

    if (editar) datos = { ...datos, id: categoria?.id };

    setCargando(false);
    await accion?.(datos);
    setAbierto(false);
  };

  useEffect(() => {
    if (abierto) {
      setNombre(categoria?.nombre ?? "");
      setDescripcion(categoria?.descripcion ?? "");
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
            Agregar categoría
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editar ? "Editando categoría" : "Agregar categoría"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            manejador();
          }}
        >
          <div className="overflow-y-auto max-h-[60vh] px-2 dialog-scroll">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="nombre">Nombre de la categoría</FieldLabel>
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

          <DialogFooter className="mt-4">
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
