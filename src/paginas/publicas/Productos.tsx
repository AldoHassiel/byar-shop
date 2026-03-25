import useProductos from "@/hooks/useProductos";
import useMarcas from "@/hooks/useMarca";
import useCategorias from "@/hooks/useCategorias";
import useSubcategorias from "@/hooks/useSubCategorias";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import coragris from "@/assets/corazongris.svg";
import corarosa from "@/assets/corazonrosa.svg";

import { useState, useEffect } from "react";

export default function Productos() {
  const { productos, cargando, obtenerTodos } = useProductos();

  const { categorias } = useCategorias();
  const { subCategorias } = useSubcategorias();
  const { marcas } = useMarcas();

  const [precioMin, setPrecioMin] = useState<number | undefined>();
  const [precioMax, setPrecioMax] = useState<number | undefined>();
  const [idMarca, setIdMarca] = useState<number | undefined>();
  const [idCategoria, setIdCategoria] = useState<number | undefined>();
  const [idSubcategoria, setIdSubcategoria] = useState<number | undefined>();

  const rangosPrecios = [
    { label: "Menos de $100", min: 0, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 - $300", min: 200, max: 300 },
    { label: "$300 - $400", min: 300, max: 400 },
    { label: "$400 - $500", min: 400, max: 500 },
    { label: "$500 - $1000", min: 500, max: 1000 },
    { label: "$1000 - $1500", min: 1000, max: 1500 },
    { label: "$1500 - $2000", min: 1500, max: 2000 },
    { label: "$2000 - $2500", min: 2000, max: 2500 },
    { label: "$2500 o más", min: 2500, max: undefined },
  ];
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    obtenerTodos(
      undefined,
      undefined,
      precioMin,
      precioMax,
      idMarca,
      idCategoria,
      idSubcategoria,
    );
  }, [precioMin, precioMax, idMarca, idCategoria, idSubcategoria]);

  const nombreCategoriaSeleccionada = categorias.find(
    (cat) => cat.id === idCategoria
  )?.nombre;

  const titulo = nombreCategoriaSeleccionada || "Productos";

  if (cargando) return <p className="p-6">Cargando...</p>;

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-4xl not-italic">{titulo}</h1>

        <div className="flex gap-3">
          {/* PRECIOS */}
          <Select
            onValueChange={(value) => {
              if (value === "all") {
                setPrecioMin(undefined);
                setPrecioMax(undefined);
                return;
              }

              const rango = rangosPrecios[Number(value)];
              setPrecioMin(rango.min);
              setPrecioMax(rango.max);
            }}
          >
            <SelectTrigger className="w-40 rounded-full bg-gray-100 border-none">
              <SelectValue placeholder="Precios" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Precios</SelectItem>

                {rangosPrecios.map((rango, index) => (
                  <SelectItem key={index} value={String(index)}>
                    {rango.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* MARCAS */}
          <Select
            value={idMarca ? String(idMarca) : "all"}
            onValueChange={(value) =>
              setIdMarca(value === "all" ? undefined : Number(value))
            }
          >
            <SelectTrigger className="w-40 rounded-full bg-gray-100 border-none">
              <SelectValue placeholder="Marca" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Marcas</SelectItem>

                {marcas.map((marc) => (
                  <SelectItem key={marc.id} value={String(marc.id)}>
                    {marc.nombre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* CATEGORÍAS */}
          <Select
            value={idCategoria ? String(idCategoria) : "all"}
            onValueChange={(value) =>
              setIdCategoria(value === "all" ? undefined : Number(value))
            }
          >
            <SelectTrigger className="w-40 rounded-full bg-gray-100 border-none">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Categorías</SelectItem>

                {categorias.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.nombre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* SUBCATEGORÍAS */}
          <Select
            value={idSubcategoria ? String(idSubcategoria) : "all"}
            onValueChange={(value) =>
              setIdSubcategoria(value === "all" ? undefined : Number(value))
            }
          >
            <SelectTrigger className="w-44 rounded-full bg-gray-100 border-none">
              <SelectValue placeholder="Subcategoría" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Subcategorías</SelectItem>

                {subCategorias.map((subCat) => (
                  <SelectItem key={subCat.id} value={String(subCat.id)}>
                    {subCat.nombre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="grid grid-cols-4 gap-6 px-6 pb-6">
        {productos.map((producto) => (
          <Card
            key={producto.id}
            className="rounded-2xl shadow-sm border bg-white overflow-hidden hover:shadow-md transition"
          >
            {/* Imagen */}
            <div className="w-full h-56 bg-white-100 flex items-center justify-center">
              {producto.imagen_url && (
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  className="h-full object-contain"
                />
              )}
            </div>

            <CardContent className="p-4 space-y-1">
              <p className="font-semibold text-lg">
                MXN {producto.precio}
              </p>

              <p className="text-sm text-gray-700 leading-tight">
                {producto.nombre}
              </p>

              <p className="text-xs font-semibold text-black">
                {producto.nombre_marca || "Sin marca"}
              </p>
            </CardContent>

            <CardFooter className="p-4 flex items-center gap-2">
              <Button
                variant="pink"
              >
                Agregar al carrito
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border"
              //onClick={() => setEsFavorito((v) => !v)}
              >
                <img
                  src={esFavorito ? corarosa : coragris}
                  width={20}
                  height={20}
                  alt="favorito"
                />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}