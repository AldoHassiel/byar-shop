import { apiCarrito } from "@/api/carrito";
import { useAutenticacion } from "@/global/AuthContexto";
import type { Usuario } from "@/types/auth";
import type { Carrito } from "@/types/carrito";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface CarritoContexto {
  carrito: Carrito | undefined;
  usuario: Usuario | null;
  cargando: boolean;
  obtenerCarrito: (
    idDireccion?: number,
    mostrarNotificacion?: boolean,
  ) => Promise<void>;
  agregarAlCarrito: (
    idProducto: number,
    cantidad: number,
    mostrarNotificacion?: boolean,
  ) => Promise<void>;
  actualizarCantidad: (
    idProducto: number,
    delta: number,
    mostrarNotificacion?: boolean,
  ) => Promise<void>;
  eliminarProducto: (
    idProducto: number,
    mostrarNotificacion?: boolean,
  ) => Promise<void>;
}

const CarritoContexto = createContext<CarritoContexto | undefined>(undefined);

interface CarritoProviderProps {
  children: ReactNode;
  cargaInicial?: boolean;
  idDireccionInicial?: number;
}

export function ProveedorCarrito({
  children,
  cargaInicial = true,
  idDireccionInicial,
}: CarritoProviderProps) {
  const [carrito, setCarrito] = useState<Carrito>();
  const idDireccionRef = useRef<number | undefined>(idDireccionInicial);
  const [cargando, setCargando] = useState(false);
  const { usuario } = useAutenticacion();

  const recargarCarrito = async (
    idDireccion?: number,
    mostrarNotificacion = false,
  ) => {
    if (!usuario?.id) return;
    const datos = await apiCarrito.obtenerCarrito(
      usuario?.id,
      idDireccion,
      mostrarNotificacion,
    );
    if (datos) setCarrito(datos);
  };

  const obtenerCarrito = async (
    idDireccion?: number,
    mostrarNotificacion: boolean = false,
  ) => {
    idDireccionRef.current = idDireccion;
    setCargando(true);
    await recargarCarrito(idDireccion, mostrarNotificacion);
    setCargando(false);
  };

  const agregarAlCarrito = async (
    idProducto: number,
    cantidad: number,
    mostrarNotificacion: boolean = true,
  ) => {
    if (!usuario?.id) return;
    setCargando(true);
    await apiCarrito.agregarAlCarrito(
      usuario?.id,
      idProducto,
      cantidad,
      mostrarNotificacion,
    );
    await recargarCarrito(idDireccionRef.current, false);
    setCargando(false);
  };

  const actualizarCantidad = async (
    idProducto: number,
    delta: number,
    mostrarNotificacion: boolean = false,
  ) => {
    if (!usuario?.id) return;
    const carritoAnterior = carrito;
    setCarrito((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        productos: prev.productos.map((p) =>
          p.id === idProducto ? { ...p, cantidad: p.cantidad + delta } : p,
        ),
      };
    });
    const resultado = await apiCarrito.actualizarCantidad(
      usuario.id,
      idProducto,
      delta,
      mostrarNotificacion,
    );
    if (!resultado) {
      setCarrito(carritoAnterior);
      return;
    }
    await recargarCarrito(idDireccionRef.current, false);
  };

  const eliminarProducto = async (
    idProducto: number,
    mostrarNotificacion: boolean = true,
  ) => {
    if (!usuario?.id) return;
    setCargando(true);
    await apiCarrito.eliminarProducto(
      usuario?.id,
      idProducto,
      mostrarNotificacion,
    );
    await recargarCarrito(idDireccionRef.current, false);
    setCargando(false);
  };

  useEffect(() => {
    if (cargaInicial) obtenerCarrito(idDireccionRef.current);
  }, []);

  return (
    <CarritoContexto.Provider
      value={{
        carrito,
        usuario,
        cargando,
        obtenerCarrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarProducto,
      }}
    >
      {children}
    </CarritoContexto.Provider>
  );
}

export default function useCarrito() {
  const contexto = useContext(CarritoContexto);
  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de <ProveedorCarrito>");
  }
  return contexto;
}
