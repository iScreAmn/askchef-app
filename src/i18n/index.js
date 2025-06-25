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
            "allCategories": "Все категории",
            "breakfast": "Завтрак",
            "lunch": "Обед", 
            "dinner": "Ужин",
            "ingredients": "Ингредиенты",
            "instructions": "Инструкции",
            "cookingTime": "Время приготовления",
            "servings": "Порций",
            "difficulty": "Сложность",
            "difficultyEasy": "Легко",
            "difficultyMedium": "Средне",
            "difficultyHard": "Сложно",
            "minutes": "мин",
            "tags": "Теги",
            "addToFavorites": "В избранное",
            "addToMenu": "Добавить в меню",
            "notFound": "Рецепт не найден",
            "noRecipes": "В этой категории пока нет рецептов",
            "backToRecipes": "Назад к рецептам"
          },
          "units": {
            "г": "г",
            "шт": "шт", 
            "ст.л.": "ст.л.",
            "ч.л.": "ч.л.",
            "мл": "мл",
            "л": "л",
            "кг": "кг",
            "зубчика": "зубчика",
            "по вкусу": "по вкусу",
            "бутылка": "бутылка"
          },
          "recipeData": {
            "1": {
              "title": "Спагетти Болоньезе",
              "description": "Классическая итальянская паста с мясным соусом",
              "ingredients": [
                "Спагетти",
                "Фарш говяжий", 
                "Лук репчатый",
                "Морковь",
                "Томаты в собственном соку",
                "Чеснок",
                "Масло оливковое",
                "Соль",
                "Перец черный"
              ],
              "instructions": [
                "Отварить спагетти согласно инструкции на упаковке",
                "Обжарить лук и морковь на оливковом масле",
                "Добавить фарш и обжарить до готовности",
                "Добавить томаты и тушить 20 минут",
                "Смешать с готовыми спагетти и подавать"
              ],
              "tags": ["итальянская кухня", "паста", "мясо"]
            },
            "2": {
              "title": "Греческий салат",
              "description": "Свежий салат с овощами и сыром фета",
              "ingredients": [
                "Помидоры",
                "Огурцы",
                "Перец болгарский",
                "Лук красный",
                "Сыр фета",
                "Оливки",
                "Масло оливковое",
                "Уксус винный",
                "Орегано"
              ],
              "instructions": [
                "Нарезать овощи крупными кусками",
                "Добавить сыр фета и оливки",
                "Заправить маслом, уксусом и орегано",
                "Перемешать и подавать"
              ],
              "tags": ["салат", "греческая кухня", "вегетарианское"]
            },
            "3": {
              "title": "Омлет с грибами",
              "description": "Нежный омлет с шампиньонами на завтрак",
              "ingredients": [
                "Яйца",
                "Молоко",
                "Шампиньоны",
                "Масло сливочное",
                "Соль",
                "Перец черный",
                "Зелень"
              ],
              "instructions": [
                "Обжарить нарезанные грибы на сливочном масле",
                "Взбить яйца с молоком, солью и перцем",
                "Вылить яичную смесь на сковороду с грибами",
                "Готовить на медленном огне до готовности",
                "Подавать с зеленью"
              ],
              "tags": ["завтрак", "яйца", "грибы"]
            }
          },
          "common": {
            "save": "Сохранить",
            "cancel": "Отмена",
            "delete": "Удалить",
            "edit": "Редактировать",
            "add": "Добавить",
            "back": "Назад",
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
            "theme": "Тема оформления",
            "themeDescription": "Выберите светлую или темную тему интерфейса",
            "lightTheme": "Светлая тема",
            "darkTheme": "Темная тема",
            "toggleTheme": "Переключить тему",
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
            "allCategories": "All Categories",
            "breakfast": "Breakfast",
            "lunch": "Lunch",
            "dinner": "Dinner", 
            "ingredients": "Ingredients",
            "instructions": "Instructions",
            "cookingTime": "Cooking Time",
            "servings": "Servings",
            "difficulty": "Difficulty",
            "difficultyEasy": "Easy",
            "difficultyMedium": "Medium",
            "difficultyHard": "Hard",
            "minutes": "min",
            "tags": "Tags",
            "addToFavorites": "Add to Favorites",
            "addToMenu": "Add to Menu",
            "notFound": "Recipe not found",
            "noRecipes": "No recipes in this category yet",
            "backToRecipes": "Back to Recipes"
          },
          "units": {
            "г": "g",
            "шт": "pcs",
            "ст.л.": "tbsp",
            "ч.л.": "tsp", 
            "мл": "ml",
            "л": "l",
            "кг": "kg",
            "зубчика": "cloves",
            "по вкусу": "to taste",
            "бутылка": "bottle"
          },
          "recipeData": {
            "1": {
              "title": "Spaghetti Bolognese",
              "description": "Classic Italian pasta with meat sauce",
              "ingredients": [
                "Spaghetti",
                "Ground beef",
                "Onion",
                "Carrot", 
                "Canned tomatoes",
                "Garlic",
                "Olive oil",
                "Salt",
                "Black pepper"
              ],
              "instructions": [
                "Cook spaghetti according to package instructions",
                "Sauté onion and carrot in olive oil",
                "Add ground beef and cook until done",
                "Add tomatoes and simmer for 20 minutes",
                "Mix with cooked spaghetti and serve"
              ],
              "tags": ["italian cuisine", "pasta", "meat"]
            },
            "2": {
              "title": "Greek Salad",
              "description": "Fresh salad with vegetables and feta cheese",
              "ingredients": [
                "Tomatoes",
                "Cucumbers",
                "Bell pepper",
                "Red onion",
                "Feta cheese",
                "Olives",
                "Olive oil",
                "Wine vinegar",
                "Oregano"
              ],
              "instructions": [
                "Cut vegetables into large pieces",
                "Add feta cheese and olives",
                "Dress with oil, vinegar and oregano",
                "Mix and serve"
              ],
              "tags": ["salad", "greek cuisine", "vegetarian"]
            },
            "3": {
              "title": "Mushroom Omelet",
              "description": "Tender omelet with mushrooms for breakfast",
              "ingredients": [
                "Eggs",
                "Milk",
                "Mushrooms",
                "Butter",
                "Salt",
                "Black pepper",
                "Fresh herbs"
              ],
              "instructions": [
                "Sauté sliced mushrooms in butter",
                "Beat eggs with milk, salt and pepper",
                "Pour egg mixture into pan with mushrooms",
                "Cook on low heat until done",
                "Serve with fresh herbs"
              ],
              "tags": ["breakfast", "eggs", "mushrooms"]
            }
          },
          "common": {
            "save": "Save",
            "cancel": "Cancel",
            "delete": "Delete",
            "edit": "Edit",
            "add": "Add",
            "back": "Back",
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
            "theme": "Theme",
            "themeDescription": "Choose light or dark theme for the interface",
            "lightTheme": "Light Theme",
            "darkTheme": "Dark Theme",
            "toggleTheme": "Toggle theme",
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