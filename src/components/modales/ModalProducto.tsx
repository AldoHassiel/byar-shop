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

export default function ModalProducto() {
  return (
    <Dialog>
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
        <div className="overflow-y-auto max-h-[60vh] px-2 dialog-scroll">
          <FieldGroup>
            <Field>
              <Label htmlFor="nombre">Nombre del producto</Label>
              <Input id="nombre" />
            </Field>
            <Field>
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea id="descripcion" />
            </Field>
            <div className="flex gap-2">
              <Field>
                <Label htmlFor="categoria">Categoría</Label>
                <Combobox id="categoria">
                  <ComboboxInput placeholder="Selecciona una" />
                  <ComboboxContent>
                    <ComboboxEmpty>No encontrada</ComboboxEmpty>
                    <ComboboxList>
                      <ComboboxItem>Categoria1</ComboboxItem>
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>
              <Field>
                <Label htmlFor="subcategoria">Subcategoría</Label>
                <Combobox id="subcategoria">
                  <ComboboxInput placeholder="Selecciona una" />
                  <ComboboxContent>
                    <ComboboxEmpty>No encontrada</ComboboxEmpty>
                    <ComboboxList>
                      <ComboboxItem>Categoria1</ComboboxItem>
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>
            </div>
            <Field>
              <Label htmlFor="marca">Marca</Label>
              <Combobox id="marca">
                <ComboboxInput placeholder="Selecciona una marca" />
                <ComboboxContent>
                  <ComboboxEmpty>No encontrada</ComboboxEmpty>
                  <ComboboxList>
                    <ComboboxItem>Categoria1</ComboboxItem>
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
                  />
                </InputGroup>
              </Field>
              <Field>
                <Label htmlFor="stockInicial">Stock inicial</Label>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupButton>
                      <MinusIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                  <InputGroupInput
                    className="text-center"
                    id="stockInicial"
                    type="number"
                    value={1}
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
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton>
                      <PlusIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </div>
            <Field>
              <Label>Imagen</Label>
              <SubirImagen />
            </Field>
          </FieldGroup>
        </div>
        <DialogFooter>
          <Button variant="pink" className="w-full">
            Agregar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
