import { apiMarcas } from "@/api/marcas.api";
import type {
    Marcas,
} from "@/types/marcas";
import { useEffect, useState } from "react";

export default function useMarcas() {
    const [marcas, setMarcas] = useState<Marcas[]>([]);
    //const [categoria, setCategoria] = useState<Categorias>();
    const [cargandoMarcas, setCargando] = useState(true);

    const obtenerMarcas = async (mostrarNotificacion?: true) => {
        setCargando(true);

        const datos = await apiMarcas.obtenerTodas(mostrarNotificacion);

        if (datos) {
            setMarcas(datos);
        }

        setCargando(false);
    };

    useEffect(() => {
        obtenerMarcas();
    }, []);

    return {
        marcas,
        cargandoMarcas,
        obtenerMarcas,
    };
}
