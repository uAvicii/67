import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const storedLanguage = localStorage.getItem('language')
const initialLocale =
  storedLanguage && typeof storedLanguage === 'string' ? JSON.parse(storedLanguage).langue : 'en'

const i18n = createI18n({
  legacy: false, // 没有该参数可能会报错
  locale: initialLocale,
  messages: {
    zh,
    en
  }
})

export default i18n
