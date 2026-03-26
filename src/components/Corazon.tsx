import { useState } from "react";
import coragris from "../assets/corazongris.svg";
import corarosa from "../assets/corazonrosa.svg";
import { Button } from "./ui/button";

interface Props {
  es_favorito: boolean;
}

export default function Corazon({ es_favorito }: Props) {
  const [esFavorito, setEsFavorito] = useState(es_favorito);

  return (
    <Button
      variant="outline"
      className="rounded-2xl py-4"
      onClick={() => setEsFavorito((valorActual) => !valorActual)}
    >
      <img
        src={esFavorito ? corarosa : coragris}
        width={20}
        height={20}
        alt={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
      />
    </Button>
  );
}
