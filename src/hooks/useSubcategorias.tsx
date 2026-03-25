import { apiSubcategorias } from "@/api/subcategorias.api";
import type {
    Subcategorias,
    //CategoriaDTO
} from "@/types/subcategoria";
import { useEffect, useState } from "react";

export default function useSubcategorias() {
    const [subCategorias, setSubCategorias] = useState<Subcategorias[]>([]);
    //const [subcategoria, setSubcategoria] = useState<Subcategorias>();
    const [cargandoSubcategorias, setCargando] = useState(true);

    const obtenerSubcategorias = async (mostrarNotificacion?: true) => {
        setCargando(true);

        const datos = await apiSubcategorias.obtenerTodas(mostrarNotificacion);

        if (datos) {
            setSubCategorias(datos);
        }

        setCargando(false);
    };

    useEffect(() => {
        obtenerSubcategorias();
    }, []);

    return {
        subCategorias,
        cargandoSubcategorias,
        obtenerSubcategorias,
    };
}
