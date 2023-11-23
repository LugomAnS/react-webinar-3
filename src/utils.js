const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}
/*
 * Склонение "раз" в зависимости от количества выделений
 */
export function wordDeclination(number) {
  let value = number % 100;
  if(value >= 10 && value <= 20) {
    return "раз";
  }

  value %= 10;
  if(value === 1) {
    return "раз";
  } else if (value === 0 || value > 4) {
    return "раз";
  } else {
    return "раза";
  }
}
