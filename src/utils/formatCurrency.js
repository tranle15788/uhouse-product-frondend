const Util = (money = 0, currency = '₫', convertInt = true, deparate = '.') => {
  if (convertInt) {
    money = parseInt(money, 10);
  }
  return money?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, deparate) + currency;
};
export default Util;
