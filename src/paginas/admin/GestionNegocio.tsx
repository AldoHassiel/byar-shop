import SubirImagen from "@/components/SubirImagen";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useNegocio } from "@/global/NegocioContexto";
import type {
  EditarDatosNegocio,
  EditarImagenesNegocio,
} from "@/types/negocio";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function GestionNegocio() {
  const [nombre, setNombre] = useState("");
  const [sobreNosotros, setSobreNosotros] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [direccion, setDireccion] = useState("");
  const [diasLaborales, setDiasLaborales] = useState("");
  const [horaApertura, setHoraApertura] = useState("");
  const [horaCierre, setHoraCierre] = useState("");
  const [editando, setEditando] = useState(false);

  const [imagenBanner, setImagenBanner] = useState<File | null>(null);
  const [imagenSobreDe, setImagenSobreDe] = useState<File | null>(null);

  const [bannerEliminado, setBannerEliminado] = useState(false);
  const [sobreDeEliminado, setSobreDeEliminado] = useState(false);

  const { negocio, cargando, editarDatosNegocio } = useNegocio();

  const manejador = async () => {
    setEditando(true);

    if (!imagenBanner && bannerEliminado) {
      toast.error("El banner es requerido");
      setEditando(false);
      return;
    }

    if (!imagenSobreDe && sobreDeEliminado) {
      toast.error("La imagen de la sección 'sobre de' es requerida");
      setEditando(false);
      return;
    }

    if (!nombre) {
      toast.error("El nombre es requerido");
      setEditando(false);
      return;
    }

    if (!sobreNosotros) {
      toast.error("La descripción es requerida");
      setEditando(false);
      return;
    }

    if (!instagram) {
      toast.error("El usuario de instagram es requerido");
      setEditando(false);
      return;
    }

    if (!whatsapp) {
      toast.error("El número de whatsapp es requerido");
      setEditando(false);
      return;
    }

    if (!direccion) {
      toast.error("La dirección es requerida");
      setEditando(false);
      return;
    }

    if (!diasLaborales) {
      toast.error("Los días laborales son requeridos");
      setEditando(false);
      return;
    }

    if (!horaApertura) {
      toast.error("La hora de apertura es requerida");
      setEditando(false);
      return;
    }

    if (!horaCierre) {
      toast.error("La hora de cierre es requerido");
      setEditando(false);
      return;
    }

    const datos: EditarDatosNegocio = {
      nombre,
      sobre_nosotros: sobreNosotros,
      dias_laborales: diasLaborales,
      direccion,
      hora_de_apertura: horaApertura,
      hora_de_cierre: horaCierre,
      instagram,
      whatsapp,
    };

    let imagenes: EditarImagenesNegocio = {};

    if (imagenBanner) {
      imagenes.hero_imagen = imagenBanner;
    }

    if (imagenSobreDe) {
      imagenes.imagen_sobre_nosotros = imagenSobreDe;
    }

    await editarDatosNegocio(datos, imagenes);

    setEditando(false);
  };

  useEffect(() => {
    if (negocio) {
      setNombre(negocio.nombre || "");
      setSobreNosotros(negocio.sobre_nosotros || "");
      setInstagram(negocio.instagram || "");
      setWhatsapp(negocio.whatsapp || "");
      setDireccion(negocio.direccion || "");
      setDiasLaborales(negocio.dias_laborales || "");
      setHoraApertura(negocio.hora_de_apertura || "");
      setHoraCierre(negocio.hora_de_cierre || "");

      setBannerEliminado(negocio.hero_imagen_url ? false : true);
      setSobreDeEliminado(negocio.imagen_sobre_nosotros_url ? false : true);
    }
  }, [negocio]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl">Negocio</h2>
      </div>

      {cargando ? (
        <div className="flex justify-center items-center h-full">
          <Spinner className="size-8 text-byar" />
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            manejador();
          }}
        >
          <div className="space-y-4 mt-5">
            <section>
              <span className="text-2xl">Banner</span>
              <SubirImagen
                imagenInicial={negocio?.hero_imagen_url}
                onChange={(imagen) => setImagenBanner(imagen)}
                onEliminar={() => {
                  setImagenBanner(null);
                  setBannerEliminado(true);
                }}
              />
            </section>

            <section className="space-y-4">
              <span className="text-xl">Sobre de</span>
              <Field>
                <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
                <Input
                  id="nombre"
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <SubirImagen
                    imagenInicial={negocio?.imagen_sobre_nosotros_url}
                    onChange={(imagen) => setImagenSobreDe(imagen)}
                    onEliminar={() => {
                      setImagenSobreDe(null);
                      setSobreDeEliminado(true);
                    }}
                  />
                </div>
                <Field>
                  <FieldLabel htmlFor="sobreNosotros" className="text-2xl">
                    Sobre {nombre}
                  </FieldLabel>
                  <Textarea
                    id="sobreNosotros"
                    required
                    value={sobreNosotros}
                    onChange={(e) => setSobreNosotros(e.target.value)}
                  />
                </Field>
              </div>
            </section>

            <section className="space-y-2">
              <span className="text-2xl">Pie de pagina</span>
              <Field>
                <FieldLabel htmlFor="instagram">Instagram</FieldLabel>
                <Input
                  id="instagram"
                  type="text"
                  required
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="whatsapp">WhatsApp</FieldLabel>
                <Input
                  id="whatsapp"
                  type="text"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="direccion">Dirección</FieldLabel>
                <Input
                  id="direccion"
                  type="text"
                  required
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="diasLaborales">Dias laborales</FieldLabel>
                <Input
                  id="diasLaborales"
                  type="text"
                  required
                  value={diasLaborales}
                  onChange={(e) => setDiasLaborales(e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="horaApertura">
                    Hora de apertura
                  </FieldLabel>
                  <Input
                    id="horaApertura"
                    type="time"
                    required
                    value={horaApertura}
                    onChange={(e) => setHoraApertura(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="horaCierre">Hora de cierre</FieldLabel>
                  <Input
                    id="horaCierre"
                    type="time"
                    required
                    value={horaCierre}
                    onChange={(e) => setHoraCierre(e.target.value)}
                  />
                </Field>
              </div>
            </section>

            <Button
              variant="pink"
              className="w-full"
              type="submit"
              disabled={editando}
            >
              {editando && <Spinner />}
              {editando ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
