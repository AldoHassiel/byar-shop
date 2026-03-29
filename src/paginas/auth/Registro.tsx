import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAutenticacion } from "@/global/AuthContexto";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { ExternalLink } from "lucide-react";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { registrarCuenta, cargando } = useAutenticacion();
  const navigate = useNavigate();

  const manejadorClic = async () => {
    const estado = await registrarCuenta(nombre, apellidos, email, pwd);

    if (estado) {
      navigate("/");
    }
  };

  return (
    <div className="mt-25 mb-5 bg-fondogris grid place-items-center">
      <div className="bg-white rounded-4xl p-10 w-[30%]">
        <h2 className="text-center text-2xl">Crear cuenta</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            manejadorClic();
          }}
        >
          <div className="flex flex-col gap-y-1 mt-5">
            <div className="flex gap-2">
              <div className="w-full">
                <Label htmlFor="nombre" className="text-md text-gray-500">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="apellidos" className="text-md text-gray-500">
                  Apellidos
                </Label>
                <Input
                  id="apellidos"
                  type="text"
                  required
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
              </div>
            </div>
            <Label htmlFor="email" className="text-md text-gray-500">
              Correo
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="pwd" className="text-md text-gray-500">
              Contraseña
            </Label>
            <Input
              id="pwd"
              type="password"
              required
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            variant="pink"
            className="mt-7 w-full py-4 text-md"
            disabled={cargando}
          >
            <p className="border-b-2 leading-none">Registrarse</p>
          </Button>
        </form>

        <Link
          to="/iniciar-sesion"
          className="text-[#ff01a2] flex gap-x-2 items-center mt-2 text-center"
        >
          ¿Ya tienes una cuenta? Inicia sesión
          <ExternalLink />
        </Link>
      </div>
    </div>
  );
}
