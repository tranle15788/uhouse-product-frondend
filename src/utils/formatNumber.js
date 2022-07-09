const util = (value, deparate = '.', rounded = true) => {
  if (rounded) {
    value = Math.floor(Number(value));
  }
  value = value?.toString().replace('.', ',');
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, deparate);
};
export default util;
