import {
  Brush,
  MenuIcon,
  Package,
  Search,
  Shirt,
  ShoppingCart,
  Sparkles,
  Tag,
  User2,
} from "lucide-react";
import { Link } from "react-router";
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
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { categorias, cargandoCategorias } = useCategorias();
  const { subCategorias, cargandoSubcategorias } = useSubcategorias();

  useEffect(() => {
    const posicionOriginal = document.body.style.position;
    const topOriginal = document.body.style.top;
    const leftOriginal = document.body.style.left;
    const rightOriginal = document.body.style.right;
    const widthOriginal = document.body.style.width;
    const overflowYOriginal = document.body.style.overflowY;
    const scrollY = window.scrollY;

    if (menuAbierto) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.position = posicionOriginal;
      document.body.style.top = topOriginal;
      document.body.style.left = leftOriginal;
      document.body.style.right = rightOriginal;
      document.body.style.width = widthOriginal;
      document.body.style.overflowY = overflowYOriginal;
    }

    return () => {
      document.body.style.position = posicionOriginal;
      document.body.style.top = topOriginal;
      document.body.style.left = leftOriginal;
      document.body.style.right = rightOriginal;
      document.body.style.width = widthOriginal;
      document.body.style.overflowY = overflowYOriginal;

      if (menuAbierto) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [menuAbierto]);

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

  return (
    <header className="fixed top-0 w-full z-50 flex justify-around bg-byar/40 backdrop-blur-md border-b border-white/20 py-4">
      <Popover open={menuAbierto} onOpenChange={setMenuAbierto}>
        <PopoverTrigger asChild>
          <button type="button" aria-label="Abrir menú de categorías">
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
            <Accordion type="single" collapsible className="w-full">
              {categorias.map((categoria) => {
                const subcategorias =
                  subcategoriasPorCategoria.get(categoria.id) ?? [];
                const IconoCategoria = obtenerIconoCategoria(categoria.nombre);

                return (
                  <AccordionItem
                    key={categoria.id}
                    value={`categoria-${categoria.id}`}
                  >
                    <AccordionTrigger className="py-1.5 text-base font-semibold hover:no-underline">
                      <span className="flex items-center gap-2">
                        <IconoCategoria size={18} className="text-fuchsia-500" />
                        <span>{categoria.nombre}</span>
                      </span>
                    </AccordionTrigger>

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

      <Link to="/">
        <h1 className="text-5xl text-white font-titulo">byarshop</h1>
      </Link>
      <nav className="flex space-x-5">
        <Link to="/productos">
          <Search color="white" size={32} />
        </Link>
        <Link to="/mi-carrito">
          <ShoppingCart color="white" size={32} />
        </Link>
        <Link to="/perfil">
          <User2 color="white" size={32} />
        </Link>
      </nav>
    </header>
  );
}
