import { MinusIcon, Pencil, Plus, PlusIcon } from "lucide-react";
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
import { useEffect, useState } from "react";
import useCategorias from "@/hooks/useCategorias";
import useSubcategorias from "@/hooks/useSubcategorias";
import useMarcas from "@/hooks/useMarca";
import type { Categorias } from "@/types/categorias";
import type { Subcategorias } from "@/types/subcategoria";
import type { Marcas } from "@/types/marcas";
import type {
  ProductoDetallado,
  ProductoEditadoFormulario,
  ProductoFormulario,
} from "@/types/productos";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

interface Prop {
  accion: (
    producto: ProductoFormulario | ProductoEditadoFormulario,
  ) => Promise<void>;
  editar?: boolean;
  productoId?: number;
  obtenerDetalle?: (id: number) => void;
  detalle?: ProductoDetallado | null;
  cargandoDetalle?: boolean;
}

export default function ModalProducto({
  accion,
  editar,
  productoId,
  obtenerDetalle,
  detalle,
  cargandoDetalle,
}: Prop) {
  const [abierto, setAbierto] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("100");
  const [stock, setStock] = useState("1");
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const [subcategoriaId, setSubcategoriaId] = useState<number | null>(null);
  const [marcaId, setMarcaId] = useState<number | null>(null);
  const [imagen, setImagen] = useState<File | null>(null);
  const [imagenEliminada, setImagenEliminada] = useState(false);

  const { categorias } = useCategorias();
  const { subCategorias } = useSubcategorias();
  const { marcas } = useMarcas();

  const [cargando, setCargando] = useState(false);

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

    if (!subcategoriaId) {
      toast.error("La subcategoría es requerida", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!marcaId) {
      toast.error("La marca es requerida", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!precio || Number(precio) < 1) {
      toast.error("El precio debe ser mayor a 0", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!stock || Number(stock) < 1) {
      toast.error("El stock debe ser mayor a 0", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (editar) {
      const datos: ProductoEditadoFormulario = {
        id: detalle?.id,
        nombre,
        descripcion,
        precio: Number(precio),
        stock: Number(stock),
        id_subcategoria: subcategoriaId,
        id_marca: marcaId,
        imagen: imagen ?? undefined,
        accion_imagen: calcularAccionImagen(),
      };
      await accion(datos);
    } else {
      const datos: ProductoFormulario = {
        nombre,
        descripcion,
        precio: Number(precio),
        stock: Number(stock),
        id_subcategoria: subcategoriaId,
        id_marca: marcaId,
        imagen: imagen ?? undefined,
      };
      await accion(datos);
    }

    setCargando(false);
    setAbierto(false);
  };

  const calcularAccionImagen = (): "conservar" | "nueva" | "eliminar" => {
    if (imagen) return "nueva";
    if (imagenEliminada) return "eliminar";
    return "conservar";
  };

  const manejadorCambioDialog = (open: boolean) => {
    if (open) {
      setNombre("");
      setDescripcion("");
      setPrecio("100");
      setStock("1");
      setCategoriaId(null);
      setSubcategoriaId(null);
      setMarcaId(null);
      setImagen(null);
      setImagenEliminada(false);
      setCargando(false);

      if (editar && productoId) {
        obtenerDetalle?.(productoId);
      }
    }
    setAbierto(open);
  };

  useEffect(() => {
    if (editar && detalle && abierto) {
      setNombre(detalle.nombre);
      setDescripcion(detalle.descripcion ?? "");
      setPrecio(String(detalle.precio));
      setStock(String(detalle.stock));
      setCategoriaId(detalle.id_categoria);
      setSubcategoriaId(detalle.id_subcategoria);
      setMarcaId(detalle.id_marca);
      setImagen(null);
    }
  }, [detalle, editar, abierto]);

  return (
    <Dialog open={abierto} onOpenChange={manejadorCambioDialog}>
      <DialogTrigger asChild>
        {editar ? (
          <Pencil
            size={24}
            className="text-byar cursor-pointer hover:opacity-70 transition-opacity"
          />
        ) : (
          <Button variant="pink" className="p-4">
            <Plus />
            Agregar producto
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editar ? "Editando producto" : "Agregar producto"}
          </DialogTitle>
        </DialogHeader>
        {editar && cargandoDetalle ? (
          <div className="flex justify-center py-10">
            <Spinner className="size-8 text-byar" />
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              manejador();
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
                      value={
                        categorias.find((c) => c.id === categoriaId) ?? null
                      }
                      items={categorias}
                      itemToStringLabel={(cat: Categorias) => cat.nombre}
                      itemToStringValue={(cat: Categorias) => cat.nombre}
                      isItemEqualToValue={(a, b) => a.id === b.id}
                      onValueChange={(cat: Categorias) => {
                        setCategoriaId(cat?.id ?? null);
                        setSubcategoriaId(null);
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
                  <Field>
                    <Label htmlFor="subcategoria">Subcategoría</Label>
                    <Combobox
                      id="subcategoria"
                      value={
                        subCategorias.find((s) => s.id === subcategoriaId) ??
                        null
                      }
                      items={subCategorias.filter(
                        (s: Subcategorias) => s?.id_categoria === categoriaId,
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
                    value={marcas.find((m) => m.id === marcaId) ?? null}
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
                        type="number"
                        className="text-center"
                        min="1"
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e") {
                            e.preventDefault();
                          }
                        }}
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                      />
                    </InputGroup>
                  </Field>
                  <Field>
                    <Label htmlFor="stockInicial">Stock inicial</Label>
                    <InputGroup>
                      <InputGroupAddon align="inline-start">
                        <InputGroupButton
                          onClick={() =>
                            setStock((prev) =>
                              String(Math.max(1, Number(prev) - 1)),
                            )
                          }
                        >
                          <MinusIcon />
                        </InputGroupButton>
                      </InputGroupAddon>
                      <InputGroupInput
                        className="text-center"
                        id="stockInicial"
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
                        onChange={(e) => setStock(e.target.value)}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          onClick={() =>
                            setStock((prev) => String(Number(prev) + 1))
                          }
                        >
                          <PlusIcon />
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </div>
                <Field>
                  <Label>Imagen</Label>
                  <SubirImagen
                    onChange={(img) => {
                      setImagen(img);
                      if (img) setImagenEliminada(false);
                    }}
                    onEliminar={() => {
                      setImagen(null);
                      setImagenEliminada(true);
                    }}
                    imagenInicial={editar ? detalle?.imagen_url : ""}
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
        )}
      </DialogContent>
    </Dialog>
  );
}
