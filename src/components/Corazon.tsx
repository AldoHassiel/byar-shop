import coragris from "../assets/corazongris.svg";
import corarosa from "../assets/corazonrosa.svg";
import { Button } from "./ui/button";

interface Props {
  es_favorito: boolean;
  onToggle: () => void | Promise<void>;
}

export default function Corazon({ es_favorito, onToggle }: Props) {
  return (
    <Button
      variant="ghost"
      className="rounded-2xl py-4"
      onClick={onToggle}
    >
      <img
        src={es_favorito ? corarosa : coragris}
        width={20}
        height={20}
        alt={es_favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
      />
    </Button>
  );
}