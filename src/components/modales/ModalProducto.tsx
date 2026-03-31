import { MinusIcon, Plus, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { Textarea } from "../ui/textarea";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import SubirImagen from "../SubirImagen";
import { useState } from "react";
import useCategorias from "@/hooks/useCategorias";
import useSubcategorias from "@/hooks/useSubcategorias";
import useMarcas from "@/hooks/useMarca";
import type { Categorias } from "@/types/categorias";
import type { Subcategorias } from "@/types/subcategoria";
import type { Marcas } from "@/types/marcas";
import type { ProductoFormulario } from "@/types/productos";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

interface Prop {
  accion: (producto: ProductoFormulario) => Promise<void>;
}

export default function ModalProducto({ accion }: Prop) {
  const [abierto, setAbierto] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(100);
  const [stock, setStock] = useState(1);
  const [categoriaId, setCategoriaId] = useState<number | null>();
  const [subcategoriaId, setSubcategoriaId] = useState<number | null>();
  const [marcaId, setMarcaId] = useState<number | null>();
  const [imagen, setImagen] = useState<File | null>(null);

  const { categorias } = useCategorias();
  const { subCategorias } = useSubcategorias();
  const { marcas } = useMarcas();

  const [cargando, setCargando] = useState(false);

  const manejadorAgregar = async () => {
    setCargando(true);

    if (!nombre.trim()) {
      toast.error("El nombre es requerido", {
        duration: 4000,
      });
      return;
    }

    if (!categoriaId) {
      toast.error("La categoría es requerida", {
        duration: 4000,
      });
      return;
    }

    if (!subcategoriaId) {
      toast.error("La subcategoría es requerida", {
        duration: 4000,
      });
      return;
    }

    if (!marcaId) {
      toast.error("La marca es requerida", {
        duration: 4000,
      });
      return;
    }

    if (!precio) {
      toast.error("El precio es requerido", {
        duration: 4000,
      });
      return;
    }

    if (!stock) {
      toast.error("El stock inicial es requerido", {
        duration: 4000,
      });
      return;
    }

    const datos: ProductoFormulario = {
      nombre,
      descripcion,
      precio,
      stock,
      id_subcategoria: subcategoriaId,
      id_marca: marcaId,
      imagen,
    };

    await accion(datos);
    setCargando(false);

    setAbierto(false);
  };

  const manejadorCambioDialog = (open: boolean) => {
    if (open) {
      setNombre("");
      setDescripcion("");
      setPrecio(100);
      setStock(1);
      setCategoriaId(null);
      setSubcategoriaId(null);
      setMarcaId(null);
      setImagen(null);
      setCargando(false);
    }
    setAbierto(open);
  };

  return (
    <Dialog open={abierto} onOpenChange={manejadorCambioDialog}>
      <DialogTrigger asChild>
        <Button variant="pink" className="p-4">
          <Plus />
          Agregar producto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Agregar producto</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            manejadorAgregar();
          }}
        >
          <div className="overflow-y-auto max-h-[60vh] px-2 dialog-scroll">
            <FieldGroup>
              <Field>
                <Label htmlFor="nombre">Nombre del producto</Label>
                <Input
                  id="nombre"
                  required
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
              <div className="flex gap-2">
                <Field>
                  <Label htmlFor="categoria">Categoría</Label>
                  <Combobox
                    id="categoria"
                    items={categorias}
                    itemToStringLabel={(cat: Categorias) => cat.nombre}
                    itemToStringValue={(cat: Categorias) => cat.nombre}
                    isItemEqualToValue={(a, b) => a.id === b.id}
                    onValueChange={(cat: Categorias) =>
                      setCategoriaId(cat?.id ?? null)
                    }
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
                <Field>
                  <Label htmlFor="subcategoria">Subcategoría</Label>
                  <Combobox
                    id="subcategoria"
                    items={subCategorias.filter(
                      (s: Subcategorias) => s?.id_categoria == categoriaId,
                    )}
                    itemToStringLabel={(sub: Subcategorias) => sub.nombre}
                    itemToStringValue={(sub: Subcategorias) => sub.nombre}
                    isItemEqualToValue={(a, b) => a.id === b.id}
                    onValueChange={(sub: Subcategorias) =>
                      setSubcategoriaId(sub?.id ?? null)
                    }
                  >
                    <ComboboxInput placeholder="Selecciona una" />
                    <ComboboxContent>
                      <ComboboxEmpty>No encontrada</ComboboxEmpty>
                      <ComboboxList>
                        {(item: Subcategorias) => (
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
              </div>
              <Field>
                <Label htmlFor="marca">Marca</Label>
                <Combobox
                  id="marca"
                  items={marcas}
                  itemToStringLabel={(marca: Marcas) => marca.nombre}
                  itemToStringValue={(marca: Marcas) => marca.nombre}
                  isItemEqualToValue={(a, b) => a.id === b.id}
                  onValueChange={(marca: Marcas) =>
                    setMarcaId(marca?.id ?? null)
                  }
                >
                  <ComboboxInput placeholder="Selecciona una marca" />
                  <ComboboxContent>
                    <ComboboxEmpty>No encontrada</ComboboxEmpty>
                    <ComboboxList>
                      {(item: Marcas) => (
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
              <div className="flex gap-2">
                <Field>
                  <Label htmlFor="precio">Precio</Label>
                  <InputGroup>
                    <InputGroupText className="pl-2">MXN</InputGroupText>
                    <InputGroupInput
                      id="precio"
                      required
                      type="number"
                      className="text-center"
                      min="1"
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") {
                          e.preventDefault();
                        }
                      }}
                      value={precio}
                      onChange={(e) => setPrecio(Number(e.target.value))}
                    />
                  </InputGroup>
                </Field>
                <Field>
                  <Label htmlFor="stockInicial">Stock inicial</Label>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <InputGroupButton
                        onClick={() =>
                          setStock((prev) => (prev >= 2 ? prev - 1 : prev))
                        }
                      >
                        <MinusIcon />
                      </InputGroupButton>
                    </InputGroupAddon>
                    <InputGroupInput
                      className="text-center"
                      id="stockInicial"
                      required
                      type="number"
                      min="1"
                      step="1"
                      onKeyDown={(e) => {
                        if (
                          e.key === "." ||
                          e.key === "," ||
                          e.key === "-" ||
                          e.key === "e"
                        ) {
                          e.preventDefault();
                        }
                      }}
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        onClick={() => setStock((prev) => prev + 1)}
                      >
                        <PlusIcon />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </div>
              <Field>
                <Label>Imagen</Label>
                <SubirImagen onChange={(imagen) => setImagen(imagen)} />
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
                  Creando...
                </>
              ) : (
                <>Agregar</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
