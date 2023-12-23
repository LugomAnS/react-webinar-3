import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {I18nContext} from '../i18n/context';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
// export default function useTranslate() {
//   return useContext(I18nContext);
// }

export default function useTranslate() {
  const services = useServices();

  const [lang, setLang] = useState(services.i18n.lang);

  const i18n = useMemo(() => ({
    // Код локали
    lang,
    // Функция для смены локали
    setLang: (value) => {
      services.i18n.setLang(value),
      setLang(value);
    },
    // Функция для локализации текстов
    t: (text, number) => services.i18n.textTranslate(lang, text, number)
  }), [services, lang]);

  console.log(services);

  return i18n;
}