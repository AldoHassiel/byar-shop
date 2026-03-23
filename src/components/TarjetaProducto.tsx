import { Heart } from "lucide-react";
import { Button } from "./ui/button";

export default function TarjetaProducto() {
  return (
    <article className="bg-white rounded p-5 w-50">
      <div>
        <img
          src="https://nrvwrzxntzikquunhmfy.supabase.co/storage/v1/object/public/imagenes/productos/1774023694859-m3bqudfmowa.webp"
          width={150}
          height={150}
        />
      </div>

      <div className="mt-2">
        <p className="text-xl">MXN 319.90</p>
        <h1>Maybelline Lash Sensational Sky High Lengthening Mascara</h1>
      </div>

      <footer className="mt-2">
        <span className="font-bold">Maybelline</span>
        <div className="flex gap-x-2">
          <Button className="rounded-2xl py-4">Agregar al carrito</Button>
          <Heart />
        </div>
      </footer>
    </article>
  );
}
