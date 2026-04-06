import { Info } from "lucide-react";
interface Props {
    modulo: string;
}

export default function ModuloVacio({ modulo }: Props) {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-90 gap-2">
                <Info size={48} className="text-byar" />
                <p className="text-byar text-2xl">Aún no hay {modulo}</p>
            </div>
        </>
    );
}