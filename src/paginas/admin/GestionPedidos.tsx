import ModalActualizarPedido from "@/components/modales/ModalActualizarPedido";
import ModalDetallePedido from "@/components/modales/ModalDetallePedido";
import ModalEliminar from "@/components/modales/ModalEliminar";
import ModuloVacio from "@/components/ModuloVacio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import usePedido from "@/hooks/usePedidos";
import type { EstadoPedido } from "@/types/pedidos";
import { CalendarIcon, Eye, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

const periodos = [
  {
    id: "7",
    nombre: "Últimos 7 dias",
  },
  {
    id: "30",
    nombre: "Últimos 30 dias",
  },
  {
    id: "182",
    nombre: "Últimos 6 meses",
  },
];

export default function GestionPedidos() {
  const {
    pedidos,
    detallePedido,
    estadosPedidos,
    cargando,
    cargandoDetalle,
    obtenerPedido,
    obtenerDetallePedido,
    cambiarEstadoPedido,
  } = usePedido({});

  const [nombre, setNombre] = useState("");
  const [estadoSel, setEstadoSel] = useState("");
  const [periodoSel, setPeriodoSel] = useState("");

  const [fecha, setFecha] = useState<DateRange | undefined>();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [calendarioAbierto, setCalendarioAbierto] = useState(false);

  const todosLosEstados = [{ id: 0, nombre: "Todos" }, ...estadosPedidos];
  const todosLosPeriodos = [{ id: "", nombre: "Todos" }, ...periodos];

  const formatearFecha = (fecha?: Date) => {
    if (!fecha) return "";

    const ano = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  };

  useEffect(() => {
    obtenerPedido({
      nombre_usuario: nombre,
      id_estado: Number(estadoSel),
      periodo_dias: periodoSel,
    });
  }, [nombre, estadoSel, periodoSel]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl">Pedidos</h2>
        {(!cargando || pedidos.length > 0) && (
          <div className="flex flex-row gap-2 items-center">
            <div className="w-fit">
              <InputGroup className="px-2">
                <InputGroupInput
                  placeholder="Buscar por nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <InputGroupAddon align="inline-end">
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="w-fit">
              <Combobox
                value={
                  estadoSel && estadoSel !== "0"
                    ? (todosLosEstados.find((e) => e.id == Number(estadoSel)) ??
                      null)
                    : null
                }
                items={todosLosEstados}
                itemToStringLabel={(e: EstadoPedido) => e.nombre}
                itemToStringValue={(e: EstadoPedido) => e.nombre}
                isItemEqualToValue={(a, b) => a.id === b.id}
                onValueChange={(e: EstadoPedido) => {
                  setEstadoSel(e.id === 0 ? "" : String(e.id));
                }}
              >
                <ComboboxInput placeholder="Filtra por estado" />
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
            <div className="w-fit">
              <Combobox
                value={
                  periodoSel
                    ? (todosLosPeriodos.find((p) => p.id == periodoSel) ?? null)
                    : null
                }
                items={todosLosPeriodos}
                itemToStringLabel={(p: { id: string; nombre: string }) =>
                  p.nombre
                }
                itemToStringValue={(p: { id: string; nombre: string }) =>
                  p.nombre
                }
                isItemEqualToValue={(a, b) => a.id === b.id}
                onValueChange={(p: { id: string; nombre: string }) => {
                  setPeriodoSel(p.id);
                }}
              >
                <ComboboxInput placeholder="Filtra por periodos" />
                <ComboboxContent>
                  <ComboboxEmpty>No encontrado</ComboboxEmpty>
                  <ComboboxList>
                    {(item: { id: string; nombre: string }) => (
                      <ComboboxItem key={item.id} value={item}>
                        {item.nombre}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
            <div className="w-fit">
              <Dialog
                open={calendarioAbierto}
                onOpenChange={setCalendarioAbierto}
              >
                <DialogTrigger asChild>
                  <CalendarIcon />
                </DialogTrigger>
                <DialogContent className="gap-0">
                  <div className="flex justify-center items-center pt-5">
                    <Calendar
                      mode="range"
                      className="w-full h-full"
                      selected={fecha}
                      onSelect={setFecha}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      variant="pink"
                      onClick={() => {
                        const desde = formatearFecha(fecha?.from);
                        const hasta = formatearFecha(fecha?.to);

                        setPeriodoSel("");
                        obtenerPedido({
                          nombre_usuario: nombre,
                          id_estado: Number(estadoSel),
                          fecha_inicio: desde,
                          fecha_fin: hasta,
                        });
                        setCalendarioAbierto(false);
                      }}
                    >
                      Confirmar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>

      {(cargando || !pedidos) && (
        <div className="flex justify-center items-center h-full">
          <Spinner className="size-8 text-byar" />
        </div>
      )}

      {pedidos.length === 0 && !cargando && <ModuloVacio modulo="pedidos" />}

      <section className="space-y-4 mt-5">
        {pedidos.map((p) => (
          <article
            key={p.id}
            className="bg-fondogris rounded-2xl flex items-center px-4 py-3 gap-4 "
          >
            <table className="w-full text-sm table-fixed">
              <colgroup>
                <col className="w-[5%]" />
                <col className="w-[16.6%]" />
                <col className="w-[16.6%]" />
                <col className="w-[16.6%]" />
                <col className="w-[16.6%]" />
                <col className="w-[16.6%]" />
              </colgroup>
              <thead>
                <tr className="text-gray-800 font-semibold">
                  <th className="text-center pb-1 border-b border-gray-300">
                    Id
                  </th>
                  <th className="text-center pb-1 border-b border-gray-300">
                    Nombre
                  </th>
                  <th className="text-center pb-1 border-b border-gray-300">
                    Dirección
                  </th>
                  <th className="text-center pb-1 border-b border-gray-300">
                    Tarjeta
                  </th>
                  <th className="text-center pb-1 border-b border-gray-300">
                    Estado
                  </th>
                  <th className="text-center pb-1 border-b border-gray-300">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-600 truncate max-w-0">
                  <td className="py-3 align-middle truncate text-center">
                    {p.id}
                  </td>
                  <td className="py-3 align-middle text-center truncate max-w-0 px-2">
                    {`${p.usuario_nombre} ${p.usuario_apellidos}`}
                  </td>
                  <td className="py-3 align-middle text-center truncate max-w-0">
                    {`${p.direccion_calle} ${p.direccion_numero_interior ? p.direccion_numero_interior : p.direccion_numero_exterior} ${p.direccion_codigo_postal}`}
                  </td>
                  <td className="py-3 align-middle text-center truncate max-w-0 px-2">
                    {p.tarjeta_marca}
                  </td>
                  <td className="py-3 align-middle max-w-0 px-2 text-center">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-gray-400 bg-gray-100 text-gray-700 text-xs">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          p.estado == "Entregado"
                            ? "bg-green-500"
                            : p.estado == "En proceso"
                              ? "bg-yellow-400"
                              : "bg-red-500"
                        }`}
                      ></span>
                      {p.estado}
                    </span>
                  </td>
                  <td className="py-3 align-middle text-center">
                    <div className="flex gap-4 justify-center items-center">
                      <Eye
                        size={24}
                        className="text-byar cursor-pointer hover:opacity-70 transition-opacity"
                        onClick={() => {
                          obtenerDetallePedido(p.id);
                          setModalAbierto(true);
                        }}
                      />
                      <ModalActualizarPedido
                        id_pedido={p.id}
                        estadoActual={p.estado}
                        estadosPedidos={estadosPedidos}
                        actualizarPedido={cambiarEstadoPedido}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </article>
        ))}
      </section>
      <ModalDetallePedido
        abierto={modalAbierto}
        setAbierto={setModalAbierto}
        cargando={cargandoDetalle}
        detallePedido={detallePedido}
      />
    </>
  );
}
