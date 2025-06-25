import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    resources: {
      ru: {
        translation: {
          "navigation": {
            "home": "Главная",
            "menu": "Меню на неделю",
            "recipes": "Рецепты",
            "shopping": "Список покупок",
            "profile": "Профиль"
          },
          "auth": {
            "login": "Войти",
            "register": "Регистрация",
            "logout": "Выйти",
            "email": "Email",
            "password": "Пароль",
            "confirmPassword": "Подтвердите пароль",
            "name": "Имя"
          },
          "menu": {
            "weeklyMenu": "Меню на неделю",
            "addRecipe": "Добавить рецепт",
            "generateList": "Сгенерировать список покупок",
            "monday": "Понедельник",
            "tuesday": "Вторник",
            "wednesday": "Среда",
            "thursday": "Четверг",
            "friday": "Пятница",
            "saturday": "Суббота",
            "sunday": "Воскресенье"
          },
          "recipes": {
            "searchRecipes": "Поиск рецептов",
            "ingredients": "Ингредиенты",
            "instructions": "Инструкции",
            "cookingTime": "Время приготовления",
            "servings": "Порций",
            "difficulty": "Сложность"
          },
          "common": {
            "save": "Сохранить",
            "cancel": "Отмена",
            "delete": "Удалить",
            "edit": "Редактировать",
            "add": "Добавить",
            "loading": "Загрузка...",
            "error": "Ошибка",
            "success": "Успешно"
          }
        }
      },
      en: {
        translation: {
          "navigation": {
            "home": "Home",
            "menu": "Weekly Menu",
            "recipes": "Recipes",
            "shopping": "Shopping List",
            "profile": "Profile"
          },
          "auth": {
            "login": "Login",
            "register": "Register",
            "logout": "Logout",
            "email": "Email",
            "password": "Password",
            "confirmPassword": "Confirm Password",
            "name": "Name"
          },
          "menu": {
            "weeklyMenu": "Weekly Menu",
            "addRecipe": "Add Recipe",
            "generateList": "Generate Shopping List",
            "monday": "Monday",
            "tuesday": "Tuesday",
            "wednesday": "Wednesday",
            "thursday": "Thursday",
            "friday": "Friday",
            "saturday": "Saturday",
            "sunday": "Sunday"
          },
          "recipes": {
            "searchRecipes": "Search Recipes",
            "ingredients": "Ingredients",
            "instructions": "Instructions",
            "cookingTime": "Cooking Time",
            "servings": "Servings",
            "difficulty": "Difficulty"
          },
          "common": {
            "save": "Save",
            "cancel": "Cancel",
            "delete": "Delete",
            "edit": "Edit",
            "add": "Add",
            "loading": "Loading...",
            "error": "Error",
            "success": "Success"
          }
        }
      }
    }
  })

export default i18n 