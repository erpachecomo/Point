const toMXN = value =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
    value
  );
export default toMXN;
