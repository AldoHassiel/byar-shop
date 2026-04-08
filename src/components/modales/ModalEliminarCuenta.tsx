import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState, type ReactNode } from "react";

interface Props {
  accion: () => Promise<boolean | null | undefined>;
  trigger: ReactNode;
}

export default function ModalEliminarCuenta({ accion, trigger }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);

  const manejarEliminar = async () => {
    setCargando(true);
    const ok = await accion();
    setCargando(false);

    if (ok) setAbierto(false);
  };

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Eliminar cuenta</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-500">
          ¿Seguro que deseas eliminar tu cuenta?
          <span className="block text-gray-700">Esta acción no se puede deshacer</span>
        </p>

        <DialogFooter twoColumns>
          <Button variant="outline" onClick={() => setAbierto(false)}>
            Cancelar
          </Button>
          <Button variant="pink" onClick={manejarEliminar} disabled={cargando}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
