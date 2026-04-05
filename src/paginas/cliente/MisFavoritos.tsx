import { Trash2, ShoppingBag } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useFavoritos from "@/hooks/useFavoritos";
import { useState } from "react";
import type { ProductoFavorito } from "@/types/mis-favoritos";
import { set } from "zod";

export default function MisFavoritos() {

  const { productosFavoritos, cargandoProductosFavoritos } = useFavoritos();

  return (
    <>
      <h1 className="text-4xl  mb-4">Mis Favoritos</h1>
      {cargandoProductosFavoritos && <p>Cargando...</p>}

      <div className="grid grid-cols-1 gap-4">
        {productosFavoritos.map((producto) => (
          <Card key={producto.id}>
            <CardContent className="flex items-center gap-10 p-4">
              <img
                src={producto.imagen_url ?? undefined}
                alt={producto.nombre}
                className="h-35 w-35 object-cover"
              />

              <div className="flex-1 space-y-2">
                <p className="text-3xl font-semibold">{producto.nombre}</p>
                <p className="text-2xl text-muted-foreground">
                  {producto.descripcion}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-destructive h-12 w-12"
              >
                <Trash2 className="h-12 w-12" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}