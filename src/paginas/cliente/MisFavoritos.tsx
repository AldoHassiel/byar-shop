import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import ModalEliminar from "@/components/modales/ModalEliminar";
import useFavoritos from "@/hooks/useFavoritos";
import { Spinner } from "@/components/ui/spinner";
import Paginacion from "@/components/Paginacion";
import { Link } from "react-router";


export default function MisFavoritos() {
  const {
    productosFavoritos,
    cargandoProductosFavoritos,
    eliminarFavorito,
  } = useFavoritos();

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 4;

  const totalPaginas = Math.ceil(
    productosFavoritos.length / productosPorPagina
  );

  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;

  const productosPaginados = productosFavoritos.slice(
    indiceInicio,
    indiceFin
  );

  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas || 1);
    }
  }, [productosFavoritos, totalPaginas, paginaActual]);

  return (
    <>
      <h1 className="text-4xl mb-4">Mis Favoritos</h1>

      {cargandoProductosFavoritos && (
        <div className="flex justify-center items-center h-full">
          <Spinner className="size-8 text-byar" />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {productosPaginados.map((producto) => (
          <Card className="bg-fondogris" key={producto.id}>

            <CardContent className="flex items-center gap-10 p-4 w-full">
              <Link to={`/productos/${producto.id}`}>
                <div className="flex items-center gap-10 flex-1 min-w-0 hover:scale-98">
                  <img
                    src={producto.imagen_url ?? undefined}
                    alt={producto.nombre}
                    className="h-35 w-35 object-contain"
                  />


                  <div className="flex-1 space-y-2">
                    <p className="text-3xl font-semibold">
                      {producto.nombre}
                    </p>
                    <p className="text-2xl text-muted-foreground">
                      {producto.descripcion}
                    </p>

                  </div>
                </div>
              </Link>
              <div className="flex-shrink-0">
                <ModalEliminar
                  titulo="Eliminar favorito"
                  descripcion={`¿Seguro que deseas eliminar el producto ${producto.nombre}?`}
                  nombreResaltado={producto.nombre}
                  accion={() => eliminarFavorito(producto.id)}
                  alerta
                />
              </div>
            </CardContent>

          </Card>

        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={setPaginaActual}
        />
      </div>
    </>
  );
}