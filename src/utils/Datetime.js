const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];
const weekdays = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado"
];
const date = new Date();
const today =
  weekdays[date.getDay()] +
  ", " +
  date.getDate() +
  " de " +
  months[date.getMonth()] +
  " del " +
  date.getFullYear();
const hora = date
  .toLocaleTimeString()
  .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
export default today;
export { today, hora };
