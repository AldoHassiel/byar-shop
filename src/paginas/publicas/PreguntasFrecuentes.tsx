import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

const preguntas = [
  {
    id: "item-1",
    pregunta: "¿Cómo puedo crear una cuenta?",
    respuesta:
      "Haz clic en el icono de usuario en la parte superior, ingresa al apartado de \"¿Aun no tienes cuenta? Crear una cuenta\" completa tus datos y listo, ya puedes empezar a comprar.",
  },
  {
    id: "item-2",
    pregunta: "¿Cómo puedo cambiar mi correo o contraseña?",
    respuesta:
      "Desde tu perfil entra a Mis datos y usa los botones Cambiar para actualizar correo o contraseña de forma segura.",
  },
  {
    id: "item-3",
    pregunta: "¿Que metodos de pago aceptan?",
    respuesta:
      "Puedes pagar con tarjetas registradas en la sección Métodos de pago. También podrás administrar tus tarjetas guardadas.",
  },
  {
    id: "item-4",
    pregunta: "¿Dónde reviso mis compras?",
    respuesta:
      "En la sección Mis compras puedes ver el historial, el detalle de cada pedido y su estado.",
  },
  {
    id: "item-5",
    pregunta: "¿Cómo agrego productos a favoritos?",
    respuesta:
      "En cada tarjeta de producto pulsa el icono de corazón. Luego podrás verlos en la sección Mis favoritos.",
  },
  {
    id: "item-6",
    pregunta: "¿Cómo contacto con el soporte?",
    respuesta:
      "Puedes contactar con nuestro equipo de soporte a través del formulario de contacto en la sección Ayuda.",
  },
  {
    id: "item-7",
    pregunta: "¿Dónde encuentro información sobre mi pedidos?",
    respuesta:
      "Desde tu perfil entra a Mis compras, selecciona el pedido que quieres revisar y podrás ver su detalle",
  },
  {
    id: "item-8",
    pregunta: "¿Cómo puedo eliminar mi cuenta?",
    respuesta:
      "Desde tu perfil entra a Mis datos y usa el botón Eliminar cuenta. Ten en cuenta que esta acción es irreversible.",
  },
];

export default function PreguntasFrecuentes() {
  return (
    <div className="mt-26 items-center  ">
      <section className="max-w-4xl h-screen mx-auto px-4 mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Preguntas Frecuentes
        </h1>
        <Accordion
          type="single"
          collapsible
          className="rounded-xl border px-4 "
        >
          {preguntas.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-base font-semibold sm:text-lg cursor-pointer ">
                {item.pregunta}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground sm:text-base">
                  {item.respuesta}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
