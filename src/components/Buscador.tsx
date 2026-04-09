import { InputGroup, InputGroupInput } from "./ui/input-group";

interface Props {
  abierto: boolean;
  onCerrar: () => void;
}

export default function Buscador({ abierto, onCerrar }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onCerrar}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <InputGroup>
          <InputGroupInput/>
        </InputGroup>
      </div>
    </div>
  );
}
