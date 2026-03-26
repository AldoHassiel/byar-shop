import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ProveedorAutenticacion } from "./global/AuthContexto.tsx";

createRoot(document.getElementById("root")!).render(
  <ProveedorAutenticacion>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProveedorAutenticacion>,
);
