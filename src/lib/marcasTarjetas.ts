export function detectarMarcaTarjeta(numero: string) {
  const num = numero.replace(/\D/g, "");

  const marcas = [
    { nombre: "Visa", regex: /^4/ },
    {
      nombre: "Mastercard",
      regex: /^5[1-5]|^2(2[2-9][1-9]|[3-6]\d{2}|7([01]\d|20))/,
    },
    { nombre: "American Express", regex: /^3[47]/ },
    {
      nombre: "Discover",
      regex:
        /^6(?:011|22(?:1(?:2[6-9]|[3-9]\d)|[2-8]\d{2}|9(?:[01]\d|2[0-5]))|4[4-9]\d|5\d{2})/,
    },
    { nombre: "Diners Club", regex: /^3(?:0[0-5]|[68])/ },
    { nombre: "JCB", regex: /^(?:2131|1800|35\d{3})/ },
    { nombre: "UnionPay", regex: /^62/ },
    { nombre: "Maestro", regex: /^(?:5018|5020|5038|6304|6759|676[1-3])/ },
    {
      nombre: "Elo",
      regex:
        /^(?:4011|4312|4389|4514|4573|4576|5041|5066|5067|509\d|6277|6362|6363|650[0-5]|6516|6550)/,
    },
    { nombre: "Hipercard", regex: /^(?:38|60)/ },
    { nombre: "Mir", regex: /^220[0-4]/ },
    { nombre: "RuPay", regex: /^60(?:80|81|82|84|85)/ },
  ];

  const encontrada = marcas.find(({ regex }) => regex.test(num));
  return encontrada ? encontrada.nombre : "Desconocida";
}
