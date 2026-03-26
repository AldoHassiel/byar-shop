import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import coragris from "../assets/corazongris.svg";
import corarosa from "../assets/corazonrosa.svg";
import type { Producto } from "@/types/productos";

interface TarjetaProductoProps {
  producto?: Producto;
}

export default function TarjetaProducto({ producto }: TarjetaProductoProps) {
  const [esFavorito, setEsFavorito] = useState(false);

  // Si no viene producto, mostrar un placeholder
  if (!producto) {
    return (
      <article className="bg-white rounded p-5 w-50">
        <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="mt-2 space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded p-5 w-50">
      <Link to={`/productos/${producto.id}`} className="no-underline">
        <div className="flex justify-center">
          <img
            src={producto.imagen_url || ""}
            width={150}
            height={150}
            alt={producto.nombre}
            className="object-contain"
          />
        </div>

        <div className="mt-2">
          <p className="text-xl">MXN {producto.precio}</p>
          <h1 className="line-clamp-2">{producto.nombre}</h1>
        </div>

        <span className="font-bold text-sm">{producto.nombre_marca}</span>
      </Link>

      <footer className="mt-2">
        <div className="flex gap-x-2">
          <Button className="rounded-2xl py-4 ">Agregar al carrito</Button>
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
        </div>
      </footer>
    </article>
  );
}
