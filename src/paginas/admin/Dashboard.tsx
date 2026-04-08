import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import useEstadisticas from "@/hooks/useEstadisticas";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { TooltipProps } from "recharts";

export default function Dashboard() {
  const { estadisticas, cargando } = useEstadisticas();

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl">Dashboard</h2>
      </div>

      {cargando ? (
        <div className="flex justify-center items-center h-full">
          <Spinner className="size-8 text-byar" />
        </div>
      ) : (
        <div className="space-y-4 mt-5 px-4">
          <section className="flex justify-center gap-x-10">
            <div className="text-center">
              <span className="block font-bold text-4xl">
                {estadisticas?.datos_generales?.total_productos}
              </span>
              <span className="block text-2xl">Productos</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-4xl">
                {estadisticas?.datos_generales?.total_ventas}
              </span>
              <span className="block text-2xl">Ventas</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-4xl">{`${estadisticas?.datos_generales?.total_ganancias}`}</span>
              <span className="block text-2xl">Ganancias</span>
            </div>
          </section>
          <Separator />
          <section>
            <h3 className="text-2xl mb-3">Ganancias por año</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={estadisticas?.ganancias_totales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="anio" tick={{ dy: 8 }} />
                <YAxis
                  tickFormatter={(v) => `$${Number(v).toLocaleString("es-MX")}`}
                />
                <Tooltip content={<TooltipMoneda />} />
                <Line
                  type="monotone"
                  dataKey="ganancias"
                  stroke="#ff00a2"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>
          <Separator />
          <section>
            <h3 className="text-2xl mb-3">Ventas por mes</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={estadisticas?.venta_mes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" tick={<TickMes />} height={50} />
                <YAxis allowDecimals={false} />
                <Tooltip content={<TooltipConteo />} />
                <Bar dataKey="ventas" fill="#ff00a2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>

          <Separator />

          <section>
            <h3 className="text-2xl mb-3">Producto más vendido</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={estadisticas?.top_productos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="producto" tick={{ dy: 8 }} />
                <YAxis allowDecimals={false} />
                <Tooltip content={<TooltipConteo />} />
                <Bar
                  dataKey="total_vendido"
                  fill="#ff00a2"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </div>
      )}
    </>
  );
}

const TooltipMoneda = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border rounded p-2 text-sm shadow text-center">
      <p className="font-semibold">{label}</p>
      <p>
        $
        {Number(payload[0].value).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  );
};

const TooltipConteo = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border rounded p-2 text-sm shadow text-center">
      <p className="font-semibold">{label}</p>
      <p>{payload[0].value}</p>
    </div>
  );
};

const TickMes = ({ x, y, payload }: any) => {
  const [anio, mes] = (payload.value as string).split("-");
  const nombreMes = new Date(Number(anio), Number(mes) - 1).toLocaleString(
    "es-MX",
    { month: "long" },
  );
  const mesCapitalizado =
    nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={12} textAnchor="middle" fill="#666">
        {mesCapitalizado}
      </text>
      <text x={0} y={0} dy={26} textAnchor="middle" fontSize={10} fill="#999">
        {anio}
      </text>
    </g>
  );
};
