import { roundToTwo } from "./Math";
const NumbertoMoney = (value = 0) => {
  if (!value) return "$ 0,00";

  return `$ ${roundToTwo(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const MoneytoNumber = (value = "0") => {
  if (!value) return "";
  return value.replace(/\$\s?|(,*)/g, "");
};

export { NumbertoMoney, MoneytoNumber };
