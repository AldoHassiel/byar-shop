import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DatosSesion {
  id: number;
  correo: string;
  es_admin: boolean;
}

interface SesionStore {
  id: number | null;
  correo: string | null;
  esAdmin: boolean | null;
  modoAdmin: boolean;
  iniciarSesion: (datos: DatosSesion) => void;
  cerrarSesion: () => void;
  alternarModo: () => void;
}

export const usarSesion = create<SesionStore>()(
  persist(
    (set) => ({
      id: null,
      correo: null,
      esAdmin: null,
      modoAdmin: false,
      iniciarSesion: (datos) => {
        set({
          id: datos.id,
          correo: datos.correo,
          esAdmin: datos.es_admin,
          modoAdmin: datos.es_admin,
        });
      },
      cerrarSesion: () => {
        set({ id: null, correo: null, esAdmin: false, modoAdmin: false });
      },
      alternarModo: () => set((estado) => ({ modoAdmin: !estado.modoAdmin })),
    }),
    { name: "sesion" },
  ),
);
