import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ProveedorAutenticacion } from "./global/AuthContexto.tsx";
import { ProveedorNegocio } from "./global/NegocioContexto.tsx";

createRoot(document.getElementById("root")!).render(
  <ProveedorAutenticacion>
    <ProveedorNegocio>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProveedorNegocio>
  </ProveedorAutenticacion>,
);
