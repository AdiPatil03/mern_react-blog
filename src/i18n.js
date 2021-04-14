import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationMa from './locales/ma/translation.json';
import translationHi from './locales/hi/translation.json';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    ma: {
        translation: translationMa
    },
    hi: {
        translation: translationHi
    }
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng:           'en',
        fallbackLng:   'en',
        debug:         false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;
