import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAutenticacion } from "@/global/AuthContexto";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { ExternalLink } from "lucide-react";

export default function IniciarSesion() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { iniciarSesion } = useAutenticacion();
  const navigate = useNavigate();

  const manejadorClic = async () => {
    const estado = await iniciarSesion(email, pwd);

    if (estado) {
      navigate("/");
    }
  };

  return (
    <div className="mt-20 bg-fondogris grid place-items-center h-100">
      <div className="bg-white rounded-4xl p-10 w-[30%]">
        <h2 className="text-center text-2xl">Iniciar sesión</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            manejadorClic();
          }}
        >
          <div className="flex flex-col gap-y-1 mt-5">
            <Label htmlFor="email" className="text-md text-gray-500">
              Correo
            </Label>
            <Input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="pwd" className="text-md text-gray-500">
              Contraseña
            </Label>
            <Input
              type="password"
              name="pwd"
              required
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            variant="pink"
            onClick={manejadorClic}
            className="mt-7 w-full py-4 text-md"
          >
            <p className="border-b-2 leading-none">Iniciar sesión</p>
          </Button>
        </form>

        <Link
          to="/registrar"
          className="text-[#ff01a2] flex gap-x-2 items-center mt-2 text-center"
        >
          ¿Aun no tienes cuenta? Crear una cuenta
          <ExternalLink />
        </Link>
      </div>
    </div>
  );
}
