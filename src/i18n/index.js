import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
 
import pt from './pt.json';
import en from './en.json';
 
const deviceLang = Localization.getLocales()[0]?.languageCode ?? 'pt';
const lang = ['pt', 'en'].includes(deviceLang) ? deviceLang : 'pt';
 
i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
    },
    lng: lang,
    fallbackLng: 'pt',
    interpolation: { escapeValue: false },
  });
 
export default i18n;
 