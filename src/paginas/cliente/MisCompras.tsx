import ModalDetalleCompra from "@/components/modales/ModalDetalleCompra";
import { Spinner } from "@/components/ui/spinner";
import useCompras from "@/hooks/useCompras";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";

export default function MisCompras() {
  const {
    compras,
    detalleCompra,
    cargando,
    cargandoDetalle,
    obtenerDetalleCompra,
  } = useCompras();
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirDetalle = (idCompra: number) => {
    obtenerDetalleCompra(idCompra);
    setModalAbierto(true);
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl">Mis compras</h2>
      </div>

      {cargando ? (
        <div className="flex justify-center items-center h-full">
          <Spinner className="size-8 text-byar" />
        </div>
      ) : (
        <section className="space-y-4 mt-5">
          {compras.map((c) => (
            <article
              key={c.id}
              onClick={() => abrirDetalle(c.id)}
              className="bg-fondogris rounded-2xl w-full grid grid-cols-12 justify-between items-center px-5 py-3 gap-4 cursor-pointer hover:scale-98"
            >
              <div className="col-span-6 space-y-1">
                <p className="font-bold text-xl">{c.estado}</p>
                {c.estado != "Cancelado" && (
                  <p className="text-xl">
                    {c.estado == "En proceso"
                      ? `Lo recibirás el ${c.fecha_entrega_estimada}`
                      : `Lo recibiste el ${c.fecha_entregado}`}
                  </p>
                )}
                <p className="font-bold text-xl">{`MXN ${c.total}`}</p>
              </div>
              <div className="col-span-5 flex gap-x-5">
                {c.imagenes.map((i) => (
                  <img
                    src={i}
                    alt="Imagen de los productos"
                    width={80}
                    height={80}
                  />
                ))}
              </div>
              <div className="col-span-1 text-gray-700">
                <ArrowRightIcon size={28} />
              </div>
            </article>
          ))}
        </section>
      )}

      <ModalDetalleCompra
        abierto={modalAbierto}
        setAbierto={setModalAbierto}
        detalleCompra={detalleCompra}
        cargando={cargandoDetalle}
      />
    </>
  );
}
