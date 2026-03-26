import SeguirViendo from "@/components/SeguirViendo";
import { useState, useMemo } from "react";

// Tipo para los items del carrito
interface ItemCarrito {
  id: number;
  id_categoria: number;
  nombre: string;
  precio: string;
  cantidad: number;
}

export default function MiCarrito() {
  // TODO: Reemplazar con estado global del carrito cuando esté disponible
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  // Extraer categorías únicas de los productos en el carrito
  const categoriasCarrito = useMemo(() => {
    return [...new Set(carrito.map((item) => item.id_categoria))];
  }, [carrito]);

  // Ejemplo de carrito con productos de diferentes categorías (para demo)
  const handleDemoCarrito = () => {
    setCarrito([
      {
        id: 1,
        id_categoria: 4, // Labiales
        nombre: "Labial Rojo",
        precio: "150",
        cantidad: 1,
      },
      {
        id: 2,
        id_categoria: 4, // Sombras
        nombre: "Sombra Dorada",
        precio: "200",
        cantidad: 2,
      },
    ]);
  };

  return (
    <div className="bg-fondogris px-10 py-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Mi Carrito</h1>

      {carrito.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center">
          <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
          <button
            onClick={handleDemoCarrito}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Ver Demo con Productos
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Productos</h2>
            {carrito.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4 p-4 border-b">
                <div>
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-gray-500">Cantidad: {item.cantidad}</p>
                </div>
                <p className="font-bold">MXN {item.precio}</p>
              </div>
            ))}
          </div>

          {/* Mostrar recomendaciones basadas en categorías del carrito */}
          {categoriasCarrito.length > 0 && (
            <SeguirViendo
              idCategorias={categoriasCarrito}
              titulo="También te podría interesar..."
              limite={8}
            />
          )}
        </>
      )}
    </div>
  );
}
