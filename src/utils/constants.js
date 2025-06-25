// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// App Configuration
export const APP_NAME = 'AskChef'
export const VERSION = '1.0.0'

// Storage Keys
export const STORAGE_KEYS = {
  AUTH: 'auth-storage',
  MENU: 'menu-storage',
  SETTINGS: 'settings-storage'
}

// Route Paths
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  MENU: '/menu',
  RECIPES: '/recipes',
  SHOPPING: '/shopping',
  PROFILE: '/profile'
}

// Form Validation
export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    MESSAGE: 'Неверный формат email'
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MESSAGE: 'Пароль должен содержать минимум 6 символов'
  },
  NAME: {
    MIN_LENGTH: 2,
    MESSAGE: 'Имя должно содержать минимум 2 символа'
  }
}

// Days of Week
export const DAYS_OF_WEEK = [
  'monday',
  'tuesday', 
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

// Ingredient Categories
export const INGREDIENT_CATEGORIES = {
  MEAT: 'meat',
  VEGETABLES: 'vegetables',
  FRUITS: 'fruits',
  DAIRY: 'dairy',
  GRAINS: 'grains',
  SPICES: 'spices',
  OTHER: 'other'
}

// Recipe Difficulty Levels
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
}

// Meal Types
export const MEAL_TYPES = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACK: 'snack'
} 