import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ProveedorAutenticacion } from "./global/AuthContexto.tsx";
import { ProveedorNegocio } from "./global/NegocioContexto.tsx";
import { ProveedorCarrito } from "./global/CarritoContexto.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ProveedorAutenticacion>
      <ProveedorNegocio>
        <ProveedorCarrito>
          <App />
        </ProveedorCarrito>
      </ProveedorNegocio>
    </ProveedorAutenticacion>
  </BrowserRouter>,
);
