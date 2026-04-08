import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import type { EstadoPedido } from "@/types/pedidos";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

interface Props {
  id_pedido: number;
  estadoActual: string;
  estadosPedidos: EstadoPedido[];
  actualizarPedido: (id_pedio: number, id_estado: number) => Promise<void>;
}

export default function ModalActualizarPedido({
  id_pedido,
  estadoActual,
  estadosPedidos,
  actualizarPedido,
}: Props) {
  const [estadoSel, setEstadoSel] = useState("");

  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>
        <Pencil
          size={24}
          className="text-byar cursor-pointer hover:opacity-70 transition-opacity"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Actualizar pedido</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 px-2">
          <div>
            <span className="block text-xl mb-2">Estado actual</span>
            <div className="w-full">
              <span className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 text-sm font-medium">
                <span
                  className={`w-3 h-3 rounded-full ${
                    estadoActual == "Entregado"
                      ? "bg-green-500"
                      : estadoActual == "En proceso"
                        ? "bg-yellow-400"
                        : "bg-red-500"
                  }`}
                ></span>
                {estadoActual}
              </span>
            </div>
          </div>
          <div>
            <span className="block text-xl">Estado nuevo</span>
            <Combobox
              value={
                estadosPedidos.find((e) => e.id == Number(estadoSel)) ?? null
              }
              items={estadosPedidos}
              itemToStringLabel={(e: EstadoPedido) => e.nombre}
              itemToStringValue={(e: EstadoPedido) => e.nombre}
              isItemEqualToValue={(a, b) => a.id === b.id}
              onValueChange={(e: EstadoPedido) => {
                setEstadoSel(String(e.id));
              }}
            >
              <ComboboxInput placeholder="Selecciona un estado" />
              <ComboboxContent>
                <ComboboxEmpty>No encontrado</ComboboxEmpty>
                <ComboboxList>
                  {(item: EstadoPedido) => (
                    <ComboboxItem key={item.id} value={item}>
                      {item.nombre}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="pink"
            onClick={async () => {
              setCargando(true);
              if (!estadoSel.trim()) {
                toast.error("Se debe seleccionar un estado", {
                  duration: 4000,
                });
                setCargando(false);
                setAbierto(false);
                return;
              }
              await actualizarPedido(id_pedido, Number(estadoSel));
              setCargando(false);
              setAbierto(false);
            }}
          >
            {cargando ? (
              <>
                <Spinner />
                {"Actualizando pedido..."}
              </>
            ) : (
              <>{"Actualizar estado"}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
