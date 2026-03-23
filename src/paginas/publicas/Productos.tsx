import useProductos from "@/hooks/useProductos";

export default function Productos() {
  const { productos } = useProductos();

  return (
    <div>
      <p>Productos</p>
      {productos.map((producto) => (
        <article>
          <p>{producto.nombre}</p>
        </article>
      ))}
    </div>
  );
}
