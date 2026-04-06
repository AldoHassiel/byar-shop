import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { useEffect } from "react";
import type { Producto } from "@/types/productos";
import useFavoritos from "@/hooks/useFavoritos";
import useProductos from "@/hooks/useProductos";
import Corazon from "./Corazon";

interface TarjetaProductoProps {
  producto?: Producto;
}

export default function TarjetaProducto({ producto }: TarjetaProductoProps) {
  const { agregarFavorito, eliminarFavorito } = useFavoritos();

  const { setProductos } = useProductos();

  const [favoritoLocal, setFavoritoLocal] = useState(
    producto?.es_favorito ?? false
  );
  useEffect(() => {
    setFavoritoLocal(producto?.es_favorito ?? false);
  }, [producto?.es_favorito]);

  // Si no viene producto, mostrar un placeholder
  if (!producto) {
    return (
      <article className="bg-white rounded p-5 w-50 flex flex-col min-h-96">
        <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="mt-2 space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="mt-2 flex gap-x-2">
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </article>
    );
  }


  const manejarFavorito = async () => {
    const valorActual = favoritoLocal;

    setFavoritoLocal(!valorActual);

    if (setProductos) {
      setProductos((prev) =>
        prev.map((p) =>
          p.id === producto.id
            ? { ...p, es_favorito: !valorActual }
            : p
        )
      );
    }

    try {
      if (valorActual) {
        await eliminarFavorito(producto.id);
      } else {
        await agregarFavorito(producto.id);
      }
    } catch (error) {
      if (setProductos) {
        setProductos((prev) =>
          prev.map((p) =>
            p.id === producto.id
              ? { ...p, es_favorito: valorActual }
              : p
          )
        );
      }
    }
  };

  return (
    <article className="bg-white rounded p-5 w-50 flex flex-col min-h-96">
      <Link
        to={`/productos/${producto.id}`}
        className="no-underline flex flex-col flex-1"
      >
        <div className="flex justify-center h-40">
          <img
            src={producto.imagen_url || ""}
            width={150}
            height={150}
            alt={producto.nombre}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col mt-8 ">
          <p className="text-xl font-bold">MXN {producto.precio}</p>
          <h1 className="line-clamp-2 flex-1">{producto.nombre}</h1>
          <span className="font-bold text-sm">{producto.nombre_marca}</span>
        </div>
      </Link>

      <footer className="mt-auto flex justify-center gap-x-2">
        <Button className="rounded-2xl py-4 flex-1">Agregar al carrito</Button>
        <Corazon
          es_favorito={favoritoLocal}
          onToggle={() => manejarFavorito()}
        />
      </footer>
    </article>
  );
}
