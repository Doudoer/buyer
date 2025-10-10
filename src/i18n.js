import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationES from './locales/es/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
  es: { translation: translationES },
  en: { translation: translationEN },
};


const savedLang = localStorage.getItem('i18nextLng');
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
