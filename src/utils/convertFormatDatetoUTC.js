const utils = (value) => {
  // format:date-month-year
  const arr_temp = value.split('-');
  const str = arr_temp[1] + '-' + arr_temp[0] + '-' + arr_temp[2];
  const date_str = new Date(str);
  if (date_str instanceof Date && isFinite(date_str)) {
    return date_str?.toISOString();
  } else return null;
};
export default utils;
