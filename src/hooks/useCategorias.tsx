import { apiCategorias } from "@/api/categorias.api";
import type {
    Categorias,
    //CategoriaDTO
} from "@/types/categorias";
import { useEffect, useState } from "react";

export default function useCategorias() {
    const [categorias, setCategorias] = useState<Categorias[]>([]);
    //const [categoria, setCategoria] = useState<Categorias>();
    const [cargandoCategorias, setCargando] = useState(true);

    const obtenerCategorias = async (mostrarNotificacion?: true) => {
        setCargando(true);

        const datos = await apiCategorias.obtenerTodas(mostrarNotificacion);

        if (datos) {
            setCategorias(datos);
        }

        setCargando(false);
    };

    useEffect(() => {
        obtenerCategorias();
    }, []);

    return {
        categorias,
        cargandoCategorias,
        obtenerCategorias,
    };
}
