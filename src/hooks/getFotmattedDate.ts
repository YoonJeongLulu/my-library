export const getFormattedDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return `${yyyy}.${mm > 9 ? mm : `0${mm}`}.${dd > 9 ? dd : `0${dd}`}`;
};
