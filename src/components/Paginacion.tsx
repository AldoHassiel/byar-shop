import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginacionProps = {
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
  maxVisible?: number;
  className?: string;
};

type TokenPagina = number | "ellipsis-left" | "ellipsis-right";

function construirPaginas(
  paginaActual: number,
  totalPaginas: number,
  maxVisible: number,
): TokenPagina[] {
  if (totalPaginas <= maxVisible) {
    return Array.from({ length: totalPaginas }, (_, indice) => indice + 1);
  }

  if (paginaActual <= 3) {
    return [1, 2, 3, "ellipsis-right", totalPaginas];
  }

  if (paginaActual >= totalPaginas - 2) {
    return [
      1,
      "ellipsis-left",
      totalPaginas - 2,
      totalPaginas - 1,
      totalPaginas,
    ];
  }

  return [
    1,
    "ellipsis-left",
    paginaActual - 1,
    paginaActual,
    paginaActual + 1,
    "ellipsis-right",
    totalPaginas,
  ];
}

function cambiarPaginaSiEsValida(
  pagina: number,
  totalPaginas: number,
  onCambiarPagina: (pagina: number) => void,
) {
  if (pagina < 1 || pagina > totalPaginas) return;
  onCambiarPagina(pagina);
}

export default function Paginacion({
  paginaActual,
  totalPaginas,
  onCambiarPagina,
  maxVisible = 10,
  className,
}: PaginacionProps) {
  if (totalPaginas <= 1) return null;

  const claseBotonBase =
    "h-10 min-w-10 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm hover:border-byar hover:text-byar";
  const claseBotonActivo =
    "h-10 min-w-10 rounded-md border  bg-byar px-3 text-sm font-semibold text-white shadow-sm hover:bg-byar";
  const claseDeshabilitado = "pointer-events-none opacity-50";

  const esPrimeraPagina = paginaActual === 1;
  const esUltimaPagina = paginaActual === totalPaginas;
  const paginas = construirPaginas(paginaActual, totalPaginas, maxVisible);

  return (
    <Pagination className={`mt-2 ${className ?? ""}`}>
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationPrevious
            text="Previo"
            href="#"
            onClick={(evento) => {
              evento.preventDefault();
              cambiarPaginaSiEsValida(
                paginaActual - 1,
                totalPaginas,
                onCambiarPagina,
              );
            }}
            aria-disabled={esPrimeraPagina}
            className={`${claseBotonBase} ${
              esPrimeraPagina ? claseDeshabilitado : ""
            }`}
          />
        </PaginationItem>

        {paginas.map((pagina, indice) => {
          if (pagina === "ellipsis-left" || pagina === "ellipsis-right") {
            return (
              <PaginationItem key={`${pagina}-${indice}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pagina}>
              <PaginationLink
                href="#"
                isActive={pagina === paginaActual}
                className={
                  pagina === paginaActual ? claseBotonActivo : claseBotonBase
                }
                onClick={(evento) => {
                  evento.preventDefault();
                  cambiarPaginaSiEsValida(
                    pagina,
                    totalPaginas,
                    onCambiarPagina,
                  );
                }}
              >
                {pagina}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            text="Siguiente"
            href="#"
            onClick={(evento) => {
              evento.preventDefault();
              cambiarPaginaSiEsValida(
                paginaActual + 1,
                totalPaginas,
                onCambiarPagina,
              );
            }}
            aria-disabled={esUltimaPagina}
            className={`${claseBotonBase} ${
              esUltimaPagina ? claseDeshabilitado : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}