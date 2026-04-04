import type { Direccion, InfoCP } from "@/types/direcciones";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { toast } from "sonner";

interface Props {
  accion: (datos: Direccion) => Promise<void>;
  editar?: boolean;
  direccion?: Direccion;
  obtenerInfoCP: (cp: string | number) => Promise<InfoCP | undefined>;
}

export default function ModalDirecciones({
  accion,
  editar,
  direccion,
  obtenerInfoCP,
}: Props) {
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);

  const [calle, setCalle] = useState("");
  const [numeroInterior, setNumeroInterior] = useState("");
  const [numeroExterior, setNumeroExterior] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [estado, setEstado] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [colonia, setColonia] = useState("");
  const [especificaciones, setEspecificaciones] = useState("");

  const [estados, setEstados] = useState<string[]>([]);
  const [municipios, setMunicipios] = useState<string[]>([]);
  const [ciudades, setCiudades] = useState<string[]>([]);
  const [colonias, setColonias] = useState<string[]>([]);

  const manejador = async () => {
    setCargando(true);

    if (!calle.trim()) {
      toast.error("La calle es requerida", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!numeroExterior.trim()) {
      toast.error("El número exterior es requerido", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!codigoPostal.trim()) {
      toast.error("El código postal es requerido", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!estado.trim()) {
      toast.error("El estado es requerido", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!municipio.trim()) {
      toast.error("El municipio es requerido", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!ciudad.trim()) {
      toast.error("La ciudad es requerida", { duration: 4000 });
      setCargando(false);
      return;
    }

    if (!colonia.trim()) {
      toast.error("La colonia es requerida", { duration: 4000 });
      setCargando(false);
      return;
    }

    const datos: Direccion = {
      id: direccion?.id ?? undefined,
      calle,
      numero_exterior: numeroExterior,
      numero_interior: numeroInterior,
      codigo_postal: codigoPostal,
      estado,
      municipio,
      ciudad,
      colonia,
      especificaciones,
    };

    await accion(datos);

    setCargando(false);
    setAbierto(false);
  };

  useEffect(() => {
    if (!codigoPostal || codigoPostal.length < 5) return;

    const tiempoEspera = setTimeout(async () => {
      const info = await obtenerInfoCP(codigoPostal);
      if (info) {
        setEstados(info.estados);
        setMunicipios(info.municipios);
        setCiudades(info.ciudades);
        setColonias(info.colonias);

        setEstado((prev) => (prev || info.estados[0]) ?? "");
        setMunicipio((prev) => (prev || info.municipios[0]) ?? "");
        setCiudad((prev) => (prev || info.ciudades[0]) ?? "");
        setColonia((prev) => (prev || info.colonias[0]) ?? "");
      }
    }, 200);

    return () => clearTimeout(tiempoEspera);
  }, [codigoPostal]);

  useEffect(() => {
    if (abierto) {
      setCalle(direccion?.calle ?? "");
      setNumeroInterior(direccion?.numero_interior ?? "");
      setNumeroExterior(direccion?.numero_exterior ?? "");
      setCodigoPostal(direccion?.codigo_postal ?? "");
      setEstado(direccion?.estado ?? "");
      setMunicipio(direccion?.municipio ?? "");
      setCiudad(direccion?.ciudad ?? "");
      setColonia(direccion?.colonia ?? "");
      setEspecificaciones(direccion?.especificaciones ?? "");
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
            Añadir dirección
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editar ? "Editando dirección" : "Añadir dirección"}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              manejador();
            }}
          >
            <div className="overflow-y-auto max-h-[60vh] px-2 dialog-scroll pb-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="calle">Calle</FieldLabel>
                  <Input
                    id="calle"
                    required
                    type="text"
                    value={calle}
                    onChange={(e) => setCalle(e.target.value)}
                  />
                </Field>
                <div className="flex gap-2">
                  <Field>
                    <FieldLabel htmlFor="numeroInterior">
                      Número interior
                    </FieldLabel>
                    <Input
                      id="numeroInterior"
                      type="text"
                      value={numeroInterior}
                      onChange={(e) => setNumeroInterior(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="numeroExterior">
                      Número exterior
                    </FieldLabel>
                    <Input
                      id="numeroExterior"
                      required
                      type="text"
                      value={numeroExterior}
                      onChange={(e) => setNumeroExterior(e.target.value)}
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="codigoPostal">Código postal</FieldLabel>
                  <Input
                    id="codigoPostal"
                    required
                    type="text"
                    value={codigoPostal}
                    onChange={(e) => setCodigoPostal(e.target.value)}
                  />
                </Field>
                <div className="flex gap-2">
                  <Field>
                    <FieldLabel htmlFor="estado">Estado</FieldLabel>
                    <Combobox
                      id="estado"
                      required
                      value={estado}
                      items={estados}
                      itemToStringLabel={(e: string) => e}
                      itemToStringValue={(e: string) => e}
                      isItemEqualToValue={(a, b) => a === b}
                      onValueChange={(e: string) => setEstado(e ?? "")}
                      disabled={codigoPostal.trim() == ""}
                    >
                      <ComboboxInput
                        placeholder={
                          codigoPostal.trim() === ""
                            ? "Ingresa un CP"
                            : "Selecciona un estado"
                        }
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No encontrado</ComboboxEmpty>
                        <ComboboxList>
                          {(item: string) => (
                            <ComboboxItem
                              key={item}
                              value={item}
                              onPointerDown={(e) => e.preventDefault()}
                            >
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="municipio">Municipio</FieldLabel>
                    <Combobox
                      id="municipio"
                      required
                      value={municipio}
                      items={municipios}
                      itemToStringLabel={(m: string) => m}
                      itemToStringValue={(m: string) => m}
                      isItemEqualToValue={(a, b) => a === b}
                      onValueChange={(m: string) => setMunicipio(m ?? "")}
                      disabled={codigoPostal.trim() == ""}
                    >
                      <ComboboxInput
                        placeholder={
                          codigoPostal.trim() === ""
                            ? "Ingresa un CP"
                            : "Selecciona un municipio"
                        }
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No encontrado</ComboboxEmpty>
                        <ComboboxList>
                          {(item: string) => (
                            <ComboboxItem
                              key={item}
                              value={item}
                              onPointerDown={(e) => e.preventDefault()}
                            >
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="ciudad">Ciudad</FieldLabel>
                  <Combobox
                    id="ciudad"
                    required
                    value={ciudad}
                    items={ciudades}
                    itemToStringLabel={(c: string) => c}
                    itemToStringValue={(c: string) => c}
                    isItemEqualToValue={(a, b) => a === b}
                    onValueChange={(c: string) => setCiudad(c ?? "")}
                    disabled={codigoPostal.trim() == ""}
                  >
                    <ComboboxInput
                      placeholder={
                        codigoPostal.trim() === ""
                          ? "Ingresa un CP"
                          : "Selecciona una ciudad"
                      }
                    />
                    <ComboboxContent>
                      <ComboboxEmpty>No encontrado</ComboboxEmpty>
                      <ComboboxList>
                        {(item: string) => (
                          <ComboboxItem
                            key={item}
                            value={item}
                            onPointerDown={(e) => e.preventDefault()}
                          >
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
                <Field>
                  <FieldLabel htmlFor="colonia">Colonia</FieldLabel>
                  <Combobox
                    id="colonia"
                    required
                    value={colonia}
                    items={colonias}
                    itemToStringLabel={(c: string) => c}
                    itemToStringValue={(c: string) => c}
                    isItemEqualToValue={(a, b) => a === b}
                    onValueChange={(c: string) => setColonia(c ?? "")}
                    disabled={codigoPostal.trim() == ""}
                  >
                    <ComboboxInput
                      placeholder={
                        codigoPostal.trim() === ""
                          ? "Ingresa un CP"
                          : "Selecciona una colonia"
                      }
                    />
                    <ComboboxContent>
                      <ComboboxEmpty>No encontrado</ComboboxEmpty>
                      <ComboboxList>
                        {(item: string) => (
                          <ComboboxItem
                            key={item}
                            value={item}
                            onPointerDown={(e) => e.preventDefault()}
                          >
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
                <Field>
                  <FieldLabel htmlFor="especificaciones">
                    Especificaciones
                  </FieldLabel>
                  <Textarea
                    id="especificaciones"
                    value={especificaciones}
                    onChange={(e) => setEspecificaciones(e.target.value)}
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
                  <>{editar ? "Editar dirección" : "Agregar dirección"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
