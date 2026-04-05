import { apiFavoritos } from "@/api/mis-favoritos.api";
import { useAutenticacion } from "@/global/AuthContexto";
import type { ProductoFavorito } from "@/types/mis-favoritos";
import { useEffect, useState } from "react";

export default function useFavoritos() {
    const { usuario } = useAutenticacion();

    const [productosFavoritos, setProductosFavoritos] = useState<ProductoFavorito[]>([]);
    const [cargandoProductosFavoritos, setCargando] = useState(true);

    const obtenerFavoritos = async () => {
        if (!usuario) return;

        setCargando(true);

        const datos = await apiFavoritos.obtenerFavoritos(usuario.id);
        if (datos) {
            setProductosFavoritos(datos);
        }

        setCargando(false);
    };

    useEffect(() => {
        obtenerFavoritos();
    }, [usuario]);

    return {
        productosFavoritos,
        cargandoProductosFavoritos,
        obtenerFavoritos,
    };
}