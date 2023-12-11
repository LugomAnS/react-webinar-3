/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}
/**
 * Список элементов для рендеринга пагинации
 * @param currentPage {Number}
 * @param totalPages {Number}
 * @returns {Array};
*/
export function paginationList(currentPage, totalPages) {
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({length: length}, (_ , i) => i + start);
  };

  if(totalPages === 1) {
    return [];
  }

  if(totalPages <= 5) {
    return range(1, totalPages)
  };

  const leftSiblingIndex = currentPage - 1;
  const rightSiblingIndex = currentPage + 1;

  const isLeftDots = leftSiblingIndex > 2;
  const isRightDots = rightSiblingIndex <= totalPages - 2;

  if(!isLeftDots && isRightDots) {
    let leftRange = range(1, Math.max(currentPage + 1, 3));
    return [...leftRange, "...", totalPages];
  }

  if(isLeftDots && !isRightDots) {
    let rightRange = range(totalPages - Math.max(totalPages - currentPage + 2, 3) + 1, totalPages);
    return [1, "...", ...rightRange];
  }

  if(isLeftDots && isRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, "...", ...middleRange, "...", totalPages];
  }
}
