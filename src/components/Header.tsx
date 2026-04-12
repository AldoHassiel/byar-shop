import {
  Brush,
  ChevronDown,
  MenuIcon,
  Package,
  Search,
  Shirt,
  ShoppingCart,
  Sparkles,
  Tag,
  User2,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import useCategorias from "@/hooks/useCategorias";
import useSubcategorias from "@/hooks/useSubcategorias";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { useAutenticacion } from "@/global/AuthContexto";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import useProductos from "@/hooks/useProductos";

interface Props {
  nombre: string | undefined;
}

export default function Header({ nombre }: Props) {
  const [abrirBuscador, setAbrirBuscador] = useState(false);
  const [query, setQuery] = useState("");
  const { productos, setProductos, cargando, obtenerTodos } = useProductos({
    limiteInicial: 0,
    paginaInicial: 1,
  });

  const navigate = useNavigate();

  const { usuario } = useAutenticacion();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriaExpandida, setCategoriaExpandida] = useState<number | null>(
    null,
  );
  const { categorias, cargando: cargandoCategorias } = useCategorias();
  const { subCategorias, cargandoSubcategorias } = useSubcategorias();

  const subcategoriasPorCategoria = useMemo(() => {
    const agrupadas = new Map<number, typeof subCategorias>();

    for (const subcategoria of subCategorias) {
      const idCategoria = Number(subcategoria.id_categoria);

      if (Number.isNaN(idCategoria)) {
        continue;
      }

      const existentes = agrupadas.get(idCategoria) ?? [];
      agrupadas.set(idCategoria, [...existentes, subcategoria]);
    }

    return agrupadas;
  }, [subCategorias]);

  const obtenerIconoCategoria = (nombreCategoria: string) => {
    const nombre = nombreCategoria.toLowerCase();

    if (nombre.includes("ropa")) return Shirt;
    if (nombre.includes("maquill")) return Brush;
    if (nombre.includes("skin")) return Sparkles;
    if (nombre.includes("art")) return Package;

    return Tag;
  };

  useEffect(() => {
    if (!query.trim()) {
      setProductos([]);
      return;
    }

    const timeout = setTimeout(() => {
      obtenerTodos(
        undefined,
        query,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        1,
        8,
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!abrirBuscador) setQuery("");
  }, [abrirBuscador]);

  return (
    <header className="fixed top-0 w-full z-50 h-20 flex items-center justify-between bg-byar/40 backdrop-blur-md border-b border-white/20 px-15">
      <Popover open={menuAbierto} onOpenChange={setMenuAbierto}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Abrir menú de categorías"
            className="cursor-pointer"
          >
            <MenuIcon color="white" size={32} />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          side="bottom"
          className="w-[22rem] max-w-[calc(100vw-2rem)] p-3 max-h-[75vh] overflow-y-auto"
        >
          {(cargandoCategorias || cargandoSubcategorias) && (
            <p className="px-1 py-2 text-sm">Cargando menú...</p>
          )}

          {!cargandoCategorias && categorias.length === 0 && (
            <p className="px-1 py-2 text-sm">No hay categorías disponibles.</p>
          )}

          {!cargandoCategorias && categorias.length > 0 && (
            <Accordion
              type="single"
              collapsible
              value={
                categoriaExpandida !== null
                  ? `categoria-${categoriaExpandida}`
                  : ""
              }
              className="w-full"
            >
              <div className="flex items-center gap-2 py-1.5 rounded px-1 hover:bg-muted">
                <Package size={18} className="text-fuchsia-500" />
                <Link
                  to="/productos"
                  onClick={() => setMenuAbierto(false)}
                  className="text-base font-semibold hover:text-byar"
                >
                  Todos los productos
                </Link>
              </div>
              {categorias.map((categoria) => {
                const subcategorias =
                  subcategoriasPorCategoria.get(categoria.id) ?? [];
                const IconoCategoria = obtenerIconoCategoria(categoria.nombre);
                const expandida = categoriaExpandida === categoria.id;

                return (
                  <AccordionItem
                    key={categoria.id}
                    value={`categoria-${categoria.id}`}
                  >
                    <div
                      className="flex items-center justify-between gap-3 py-1.5 rounded px-1 cursor-pointer hover:bg-muted"
                      role="button"
                      tabIndex={0}
                      aria-expanded={expandida}
                      aria-label={`Mostrar subcategorias de ${categoria.nombre}`}
                      onClick={() =>
                        setCategoriaExpandida(expandida ? null : categoria.id)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setCategoriaExpandida(
                            expandida ? null : categoria.id,
                          );
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <IconoCategoria
                          size={18}
                          className="text-fuchsia-500"
                        />
                        <Link
                          to={`/productos?idCategoria=${categoria.id}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setMenuAbierto(false);
                          }}
                          className="text-base font-semibold hover:text-byar"
                        >
                          {categoria.nombre}
                        </Link>
                      </div>

                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          expandida ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>

                    <AccordionContent className="pb-2">
                      {subcategorias.length === 0 ? (
                        <p className="pl-7 text-sm text-muted-foreground">
                          Sin subcategorías
                        </p>
                      ) : (
                        <ul className="space-y-1 pl-7">
                          {subcategorias.map((subcategoria) => (
                            <li
                              key={subcategoria.id}
                              className="text-sm leading-tight"
                            >
                              <Link
                                to={`/productos?idCategoria=${categoria.id}&idSubcategoria=${subcategoria.id}`}
                                onClick={() => setMenuAbierto(false)}
                                className="hover:text-byar"
                              >
                                {subcategoria.nombre}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </PopoverContent>
      </Popover>

      <Link to="/" className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-[65px] text-white font-titulo mt-2">
          {nombre || "byarshop"}
        </h1>
      </Link>
      <nav className="flex items-center space-x-5">
        <Search
          color="white"
          size={32}
          onClick={() => setAbrirBuscador(true)}
          className="cursor-pointer"
        />

        <Link to="/mi-carrito">
          <ShoppingCart color="white" size={32} />
        </Link>
        <Link
          to={usuario?.es_admin && usuario.modo_admin ? "/admin" : "/perfil"}
        >
          <User2 color="white" size={32} />
        </Link>
      </nav>

      <CommandDialog open={abrirBuscador} onOpenChange={setAbrirBuscador}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Escribe el nombre del producto"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {query.trim() && cargando && (
              <CommandEmpty>Buscando...</CommandEmpty>
            )}
            {query.trim() && !cargando && productos.length === 0 && (
              <CommandEmpty>Sin resultados para "{query}"</CommandEmpty>
            )}
            {query.trim() && !cargando && productos.length > 0 && (
              <CommandGroup heading="Productos">
                {productos.map((p) => (
                  <CommandItem
                    key={p.id}
                    onSelect={() => {
                      setAbrirBuscador(false);
                      navigate(`/productos/${p.id}`);
                    }}
                    className="cursor-pointer hover:bg-byarclaro"
                  >
                    <img
                      src={p.imagen_url ?? ""}
                      className="w-8 h-8 object-cover rounded-md mr-3"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{p.nombre}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.nombre_marca}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">
                      MXN {Number(p.precio).toFixed(2)}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </header>
  );
}
