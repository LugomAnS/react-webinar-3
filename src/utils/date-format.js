const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export default function parseDate(list, field) {
  const result = [];
  for(let i = 0; i < list.length; i++) {
    const date = new Date(list[i][field]);
    const day = date.getDay();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    const item = {...list[i]};
    item[field] =`${day} ${month} ${year} в ${hour}:${minutes}`;
    result.push(item);
  }

  return result;
}