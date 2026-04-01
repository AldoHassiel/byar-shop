import { ImageUpIcon, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  imagenInicial?: string | null;
  onChange?: (archivo: File | null) => void;
  onEliminar?: () => void;
}

export default function SubirImagen({
  imagenInicial,
  onChange,
  onEliminar,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [vista, setVista] = useState<string | null>(imagenInicial ?? null);
  const [arrastrando, setArrastrando] = useState(false);

  const manejarImagen = (imagen: File) => {
    const url = URL.createObjectURL(imagen);
    setVista(url);
    onChange?.(imagen);
  };

  const limpiar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVista(null);
    if (inputRef.current) inputRef.current.value = "";
    onEliminar?.();
    onChange?.(null);
  };

  useEffect(() => {
    setVista(imagenInicial ?? null);
  }, [imagenInicial]);

  const manejarUrl = async (url: string) => {
    try {
      const respuesta = await fetch(url);
      const blob = await respuesta.blob();
      const archivo = new File([blob], "imagen.jpg", { type: blob.type });
      manejarImagen(archivo);
    } catch {
      console.error("No se pudo cargar la imagen, el sitio no lo permite.");
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setArrastrando(true);
      }}
      onDragLeave={() => {
        setArrastrando(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setArrastrando(false);
        const archivo = e.dataTransfer.files[0];
        if (archivo) {
          manejarImagen(archivo);
          return;
        }
        const url = e.dataTransfer.getData("text/uri-list");
        if (url) manejarUrl(url);
      }}
      className={`relative rounded-2xl flex justify-center items-center h-50 border-2 border-dashed cursor-pointer border-byar transition-colors ${
        arrastrando && !vista
          ? "bg-byarclaro"
          : !vista
            ? "bg-pink-100 hover:bg-byarclaro"
            : "bg-pink-100"
      }`}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={(e) => {
          const imagen = e.target.files?.[0];
          if (imagen) manejarImagen(imagen);
        }}
      />

      {vista ? (
        <>
          <img
            src={vista}
            alt="Vista previa de la imagen del producto"
            className="h-full w-full object-contain rounded-2xl p-1"
          />
          <button
            className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow text-pink-500 hover:text-pink-700 cursor-pointer"
            onClick={limpiar}
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <ImageUpIcon size={50} className="text-byar mb-2 text-center" />
          <span className="text-sm text-byar text-center w-50">
            Arrastra una imagen o haz clic para seleccionar una
          </span>
        </div>
      )}
    </div>
  );
}
