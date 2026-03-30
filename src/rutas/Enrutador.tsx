import { Routes, Route } from "react-router";

import LayoutPrincipal from "../layouts/LayoutPrincipal";
import LayoutCliente from "../layouts/LayoutCliente";
import LayoutAdmin from "../layouts/LayoutAdmin";

import Inicio from "../paginas/publicas/Inicio";
import Productos from "../paginas/publicas/Productos";
import DetalleProductos from "../paginas/publicas/DetalleProductos";
import Nosotros from "../paginas/publicas/Nosotros";

import MiCarrito from "../paginas/cliente/MiCarrito";
import MisCompras from "../paginas/cliente/MisCompras";
import MisFavoritos from "../paginas/cliente/MisFavoritos";
import MisMetodosDePago from "../paginas/cliente/MisMetodosDePago";
import MisDirecciones from "../paginas/cliente/MisDirecciones";
import MisDatos from "../paginas/cliente/MisDatos";

import Dashboard from "../paginas/admin/Dashboard";
import GestionProductos from "../paginas/admin/GestionProductos";
import GestionCategorias from "../paginas/admin/GestionCategorias";
import GestionSubcategorias from "../paginas/admin/GestionSubcategorias";
import GestionMarcas from "../paginas/admin/GestionMarcas";
import GestionPedidos from "../paginas/admin/GestionPedidos";
import GestionNegocio from "../paginas/admin/GestionNegocio";

import IniciarSesion from "../paginas/auth/IniciarSesion";
import Registro from "../paginas/auth/Registro";
import { RutaAdmin, RutaCliente } from "./RutasProtegidas";

export default function Enrutador() {
  return (
    <Routes>
      <Route element={<LayoutPrincipal />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProductos />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Route>

      <Route element={<LayoutPrincipal />}>
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrar" element={<Registro />} />
      </Route>

      <Route element={<RutaCliente />}>
        <Route element={<LayoutPrincipal />}>
          <Route path="/mi-carrito" element={<MiCarrito />} />
        </Route>
      </Route>

      <Route element={<RutaCliente />}>
        <Route element={<LayoutCliente />}>
          <Route path="/mis-compras" element={<MisCompras />} />
          <Route path="/mis-favoritos" element={<MisFavoritos />} />
          <Route path="/mis-metodos-de-pago" element={<MisMetodosDePago />} />
          <Route path="/mi-direcciones" element={<MisDirecciones />} />
          <Route path="/perfil" element={<MisDatos />} />
        </Route>
      </Route>

      <Route element={<RutaAdmin />}>
        <Route element={<LayoutAdmin />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/productos" element={<GestionProductos />} />
          <Route path="/admin/categorias" element={<GestionCategorias />} />
          <Route
            path="/admin/subcategorias"
            element={<GestionSubcategorias />}
          />
          <Route path="/admin/marcas" element={<GestionMarcas />} />
          <Route path="/admin/pedidos" element={<GestionPedidos />} />
          <Route path="/admin/negocio" element={<GestionNegocio />} />
        </Route>
      </Route>
    </Routes>
  );
}
