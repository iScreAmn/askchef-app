import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

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
          },
          "footer": {
            "allRightsReserved": "Все права защищены"
          },
          "profile": {
            "settings": "Настройки",
            "language": "Язык интерфейса",
            "languageDescription": "Выберите язык для отображения интерфейса приложения",
            "accountInfo": "Информация об аккаунте",
            "inDevelopment": "Эта секция находится в разработке..."
          },
          "home": {
            "title": "AskChef",
            "subtitle": "Планировщик рецептов и покупок для умной кухни",
            "getStarted": "Начать планирование",
            "viewRecipes": "Смотреть рецепты",
            "featuresTitle": "Возможности AskChef",
            "features": {
              "menuPlanning": {
                "title": "Планирование меню",
                "description": "Составляйте меню на неделю и никогда не думайте о том, что приготовить"
              },
              "recipeDatabase": {
                "title": "База рецептов",
                "description": "Тысячи проверенных рецептов с пошаговыми инструкциями"
              },
              "shoppingList": {
                "title": "Список покупок",
                "description": "Автоматическая генерация списка покупок на основе вашего меню"
              },
              "aiAssistant": {
                "title": "AI помощник",
                "description": "Умный бот подскажет рецепты из имеющихся ингредиентов"
              }
            }
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
          },
          "footer": {
            "allRightsReserved": "All rights reserved"
          },
          "profile": {
            "settings": "Settings",
            "language": "Interface Language",
            "languageDescription": "Choose the language for the application interface",
            "accountInfo": "Account Information",
            "inDevelopment": "This section is under development..."
          },
          "home": {
            "title": "AskChef",
            "subtitle": "Recipe and shopping planner for smart kitchen",
            "getStarted": "Start Planning",
            "viewRecipes": "View Recipes",
            "featuresTitle": "AskChef Features",
            "features": {
              "menuPlanning": {
                "title": "Menu Planning",
                "description": "Plan your weekly menu and never wonder what to cook"
              },
              "recipeDatabase": {
                "title": "Recipe Database",
                "description": "Thousands of verified recipes with step-by-step instructions"
              },
              "shoppingList": {
                "title": "Shopping List",
                "description": "Automatic shopping list generation based on your menu"
              },
              "aiAssistant": {
                "title": "AI Assistant",
                "description": "Smart bot suggests recipes from available ingredients"
              }
            }
          }
        }
      }
    }
  })

export default i18n 