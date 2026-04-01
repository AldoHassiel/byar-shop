import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";

interface Props {
  titulo: string;
  descripcion: string;
  nombreResaltado?: string;
  accion: () => void;
  alerta?: boolean;
}

export default function ModalEliminar({
  titulo,
  descripcion,
  nombreResaltado,
  accion,
  alerta,
}: Props) {
  const [abiertoDialog, setAbiertoDialog] = useState(false);

  if (!alerta)
    return (
      <Dialog open={abiertoDialog} onOpenChange={setAbiertoDialog}>
        <DialogTrigger asChild>
          <TrashIcon
            size={24}
            className="text-byar cursor-pointer hover:opacity-70 transition-opacity"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl text-black"> {titulo}</DialogTitle>
            <DialogDescription className="text-xl text-gray-500">
              {nombreResaltado
                ? descripcion
                    .split(nombreResaltado)
                    .map((parte, indice, arr) => (
                      <span key={indice}>
                        {parte}
                        {indice < arr.length - 1 && (
                          <span className="font-semibold text-gray-700">
                            {nombreResaltado}
                          </span>
                        )}
                      </span>
                    ))
                : descripcion}
              <span className="block text-gray-700">
                Esta acción no se puede deshacer
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter twoColumns>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              variant="pink"
              onClick={() => {
                accion();
                setAbiertoDialog(false);
              }}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <TrashIcon
          size={24}
          className="text-byar cursor-pointer hover:opacity-70 transition-opacity"
        />
      </AlertDialogTrigger>
      <AlertDialogContent size="default">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-black">
            {titulo}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xl text-gray-500">
            {nombreResaltado
              ? descripcion.split(nombreResaltado).map((parte, indice, arr) => (
                  <span key={indice}>
                    {parte}
                    {indice < arr.length - 1 && (
                      <span className="font-semibold text-gray-700">
                        {nombreResaltado}
                      </span>
                    )}
                  </span>
                ))
              : descripcion}
            <span className="block text-gray-700">
              Esta acción no se puede deshacer
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="pink" onClick={accion}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
