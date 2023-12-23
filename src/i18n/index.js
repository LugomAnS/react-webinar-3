import * as translations from './translations';

class I18nService {

  constructor(services, config={}) {
    this.services = services,
    this.config = config,
    this.lang = 'ru'
  }

  // установка языка
  setLang(lang) {
    this.lang = lang;
    //this.services = {...this.services, _i18n: this};
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