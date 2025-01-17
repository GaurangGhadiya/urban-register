import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { getImagePath } from '@/utils/CustomImagePath';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: 'en', // Default language
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
    },
    backend: {
      loadPath: getImagePath('/locales/{{lng}}/{{ns}}.json'), // This is the path where your translation files will be located
    },
    react: { useSuspense: true },
  });

export default i18n;
