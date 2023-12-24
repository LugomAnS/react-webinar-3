import * as translations from './translations';

class I18nService {

  constructor(services, config={}) {
    this.services = services,
    this.config = config,
    this.listeners = [],
    this.lang = 'ru'
  }

  /**
  * Подписка слушателя на изменения состояния
  * @param listener {Function}
  * @returns {Function} Функция отписки
  */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  // установка языка
  setLang(lang) {
    this.lang = lang;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener(this.lang);
  }

  getLang() {
    return this.lang;
  }

  // перевод
  textTranslate(lang, text, plural) {
    //return translate(this.lang, text, plural);
    let result = translations[lang] && (text in translations[lang])
    ? translations[lang][text]
    : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }
}

export default I18nService;