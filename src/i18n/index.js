import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './locales/en.json'
import ruTranslations from './locales/ru.json'

// Получаем сохраненный язык или используем английский по умолчанию
const savedLanguage = localStorage.getItem('askchef-language') || 'en'

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: savedLanguage,
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        translation: enTranslations
      },
      ru: {
        translation: ruTranslations
      }
    }
  })

export default i18n 