import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";

interface SelectorCantidadProps {
  cantidad: number;
  setCantidad: (cantidad: number) => void;
  stock: number;
}

export default function SelectorCantidad({
  cantidad,
  setCantidad,
  stock,
}: SelectorCantidadProps) {
  function incrementarCantidad() {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  }

  function decrementarCantidad() {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  }

  return (
    <div className="space-y-3 text-center">
      <div>
        <p className="text-sm font-semibold mb-2">Cantidad</p>
        <ButtonGroup className="w-full">
          <Button variant="outline" size="icon" onClick={decrementarCantidad}>
            <MinusIcon />
          </Button>
          <Input type="number" value={cantidad} readOnly className="text-center" />
          <Button variant="outline" size="icon" onClick={incrementarCantidad}>
            <PlusIcon />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
