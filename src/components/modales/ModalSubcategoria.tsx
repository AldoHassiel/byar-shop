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
import { Spinner } from "../ui/spinner";
import type { SubcategoriaDTO } from "@/types/subcategoria";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import type { Categorias } from "@/types/categorias";

interface Props {
  accion: (datos: SubcategoriaDTO) => Promise<void>;
  editar?: boolean;
  subcategoria?: SubcategoriaDTO;
  categorias: Categorias[];
}

export default function ModalSubcategoria({
  editar,
  subcategoria,
  accion,
  categorias,
}: Props) {
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaId, setCategoriaId] = useState<number | null>(null);

  const manejador = async () => {
    setCargando(true);

    if (!nombre.trim()) {
      toast.error("El nombre es requerido", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!categoriaId) {
      toast.error("La categoría es requerida", { duration: 4000 });
      setCargando(false);
      return;
    }

    let datos: SubcategoriaDTO = {
      id: subcategoria?.id ?? undefined,
      nombre,
      descripcion,
      id_categoria: categoriaId,
    };

    await accion(datos);
    setCargando(false);
    setAbierto(false);
  };

  useEffect(() => {
    if (abierto) {
      setNombre(subcategoria?.nombre ?? "");
      setDescripcion(subcategoria?.descripcion ?? "");
      setCategoriaId(subcategoria?.id_categoria ?? null);
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
            Agregar subcategoría
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editar ? "Editando subcategoría" : "Agregar subcategoría"}
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
                <FieldLabel htmlFor="nombre">
                  Nombre de la subcategoría
                </FieldLabel>
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

              <Field>
                <Label htmlFor="categorias">Categoría</Label>
                <Combobox
                  id="categorias"
                  value={categorias.find((c) => c.id === categoriaId) ?? null}
                  items={categorias}
                  itemToStringLabel={(cat: Categorias) => cat.nombre}
                  itemToStringValue={(cat: Categorias) => cat.nombre}
                  isItemEqualToValue={(a, b) => a.id === b.id}
                  onValueChange={(cat: Categorias) => {
                    setCategoriaId(cat?.id ?? null);
                  }}
                >
                  <ComboboxInput placeholder="Selecciona una" />
                  <ComboboxContent>
                    <ComboboxEmpty>No encontrada</ComboboxEmpty>
                    <ComboboxList>
                      {(item: Categorias) => (
                        <ComboboxItem
                          key={item.id}
                          value={item}
                          onPointerDown={(e) => e.preventDefault()}
                        >
                          {item.nombre}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
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
