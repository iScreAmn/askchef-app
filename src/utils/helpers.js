// Импорт изображений рецептов
import {
  spaghettiBolognese,
  greekSalad,
  mushroomOmelet,
  syrniki,
  soupKharcho,
  braisedPork
} from '../assets/images'

// Сопоставление ID рецептов с изображениями
const recipeImages = {
  1: spaghettiBolognese,
  2: greekSalad,
  3: mushroomOmelet,
  4: syrniki,
  5: soupKharcho,
  6: braisedPork
}

// Получение изображения рецепта по ID
export const getRecipeImage = (recipeId) => {
  return recipeImages[recipeId] || greekSalad // греческий салат как fallback
}

// Форматирование даты
export const formatDate = (date, locale = 'ru-RU') => {
  return new Date(date).toLocaleDateString(locale)
}

// Получение недели
export const getWeekDates = (startDate = new Date()) => {
  const week = []
  const monday = new Date(startDate)
  monday.setDate(startDate.getDate() - startDate.getDay() + 1)
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday)
    day.setDate(monday.getDate() + i)
    week.push(day)
  }
  
  return week
}

// Валидация email
export const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(email)
}

// Генерация случайного ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Дебаунс функция
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Группировка массива по ключу
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key]
    if (!result[group]) {
      result[group] = []
    }
    result[group].push(item)
    return result
  }, {})
}

// Фильтрация объекта
export const filterObject = (obj, predicate) => {
  return Object.keys(obj)
    .filter(key => predicate(obj[key], key))
    .reduce((result, key) => {
      result[key] = obj[key]
      return result
    }, {})
}

// Капитализация строки
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Проверка на пустоту
export const isEmpty = (value) => {
  if (value == null) return true
  if (Array.isArray(value) || typeof value === 'string') return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

// Форматирование времени приготовления
export const formatCookingTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} мин`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 
    ? `${hours} ч ${remainingMinutes} мин`
    : `${hours} ч`
}

// Обрезка текста
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Локальное хранилище с обработкой ошибок
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error)
      return defaultValue
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error)
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
    }
  }
} 