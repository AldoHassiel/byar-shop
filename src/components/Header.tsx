import { MenuIcon, Search, ShoppingCart, User2 } from "lucide-react";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="flex justify-around bg-byar py-4">
      <MenuIcon color="white" size={32} />
      <Link to="/">
        <h1 className="text-2xl text-white font-bold">ByarShop</h1>
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
