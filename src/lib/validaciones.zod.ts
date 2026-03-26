export interface ErrorZod {
  campo: string;
  mensaje: string;
}

import { toast } from "sonner";
import { ZodError } from "zod";

export function transformarErroresZod(error: ZodError): ErrorZod[] {
  return error.issues.map((err) => ({
    campo: err.path.join("."),
    mensaje: err.message,
  }));
}

export interface ErrorZod {
  campo: string;
  mensaje: string;
}

export function mostrarErroresZod(errores: ErrorZod[]): void {
  errores.forEach((error) => {
    toast.error(error.mensaje, {
      duration: 4000,
    });
  });
}
