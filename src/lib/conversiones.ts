export function a12horas(hora: string) {
  const [hh, mm] = hora.split(":");

  const periodo = Number(hh) >= 12 ? "PM" : "AM";
  const horaFormateada = Number(hh) % 12 || 12;

  return `${horaFormateada}:${mm} ${periodo}`;
}
