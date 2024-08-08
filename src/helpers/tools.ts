// english number to persian number
export const toPersianNumber = (text: number | string) => {
  return text.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
};
