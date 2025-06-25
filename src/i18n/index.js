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
            "backToRecipes": "Назад к рецептам",
            "tips": "Советы по рецепту",
            "kharcho": {
              "tips": "Рис можно брать круглый, можно длиннозерный. Советую классический набор специй — хмели-сунели, лавровый лист, пара горошин черного душистого перца и базилик. Для остроты можно добавить красный молотый перец или кусочек стручка острого перчика. Но не увлекайтесь! Кроме перечисленных специй, можно использовать кориандр, эстрагон, шафран и пр…"
            },
            "braisedPork": {
              "tips": "Готовить тушеную свинину совсем несложно — главное, найти вкусное мясо, которое благодатно впитает в себя все соки. В этом рецепте не указано, какая именно часть свинины идет в дело, и это понятно: мясу предстоит долго томиться с луком и соусом, поэтому можно использовать самые сухие части, вплоть до вырезки. Указанная среди ингредиентов ржаная мука придаст блюду интересную текстуру — так подливка будет гуще и сытнее — и яркий терпкий аромат ржаной горбушки. Можно использовать и пшеничную муку, но тогда не добиться такого благоухания."
            }
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
            },
            "4": {
              "title": "Сырники",
              "description": "Классические творожные сырники на завтрак",
              "ingredients": [
                "Творог",
                "Куриное яйцо",
                "Сахар",
                "Пшеничная мука"
              ],
              "instructions": [
                "Положите весь творог в кастрюльку и разомните его вилкой так, чтобы в нем не осталось крупных комков. Разбейте в него яйца, всыпьте сахар и тщательно все перемешайте.",
                "Всыпьте в творог муку и тщательно перемешайте. В итоге у вас должна получиться однородная масса, из которой можно будет лепить сырники.",
                "Поставьте сковороду на средний огонь.",
                "Насыпьте на тарелку немного муки. Слепите несколько небольших шариков из творожной массы, обкатайте их в муке и сплющите в небольшие лепешки.",
                "Обжаривайте сырники 1–2 минуты до появления золотистой корочки. Затем переверните их на другую сторону и также обжарьте до золотистого состояния."
              ],
              "tags": ["завтрак", "творог", "сырники"]
            },
            "5": {
              "title": "Суп харчо",
              "description": "Традиционный грузинский суп с говядиной и рисом",
              "ingredients": [
                "Репчатый лук",
                "Чеснок",
                "Рис",
                "Помидоры",
                "Говядина",
                "Кинза",
                "Петрушка",
                "Укроп",
                "Специи"
              ],
              "instructions": [
                "Очищаем мясо от костей. В кастрюлю наливаем 2–2,5 литра холодной воды, закладываем мясо и косточки и ставим на огонь.",
                "Когда вода закипит, тщательно снимаем пену и уменьшаем огонь так, чтобы вода слегка побулькивала. Оставляем варить на час–полтора. За полчаса до окончания варки в бульон можно добавить корень петрушки или сельдерея и посолить по вкусу.",
                "Тем временем, мелко режем лук и обжариваем его в растительном масле на медленном огне, чтобы лук оставался мягким.",
                "Как только лук начнет приобретать золотистый цвет, добавляем к нему мясо из бульона и жарим минут 5.",
                "Затем добавляем пару столовых ложек бульона и тушим под закрытой крышкой минут 15.",
                "Пока мясо и лук тушатся, подготавливаем помидоры",
                "Содержимое сковороды отправляем в бульон, который снова уже на плите и собирается закипеть.",
                "Добавить в содержимое кастрюли рис и продолжать варить.",
                "Даем нашему еще не законченному супу 5 минут покипеть, уменьшаем огонь до среднего и добавляем специи.",
                "На самом последнем этапе приготовления добавляем толченый чеснок и мелко рубленную зелень (укроп, петрушку и кинзу).",
                "Даем час супу настояться под крышкой и можно подавать на стол."
              ],
              "tags": ["суп", "харчо", "говядина", "грузинская кухня"]
            },
            "6": {
              "title": "Тушеная свинина",
              "description": "Нежная тушеная свинина в сметанном соусе с овощами",
              "ingredients": [
                "Свинина",
                "Репчатый лук",
                "Молотый черный перец",
                "Соль",
                "Растительное масло",
                "Петрушка",
                "Укроп",
                "Чеснок",
                "Сметана",
                "Томатная паста",
                "Ржаная мука"
              ],
              "instructions": [
                "Мясо нарезать, обжарить, переложить в посуду для тушения.",
                "Обжарить нашинкованный репчатый лук и добавить к мясу.",
                "Залить водой (или мясным бульоном), посолить, поперчить. Тушить в течение часа.",
                "В части полученного бульона развести муку. Добавить в кастрюлю с мясом.",
                "Добавить томатную пасту (можно взять кетчуп). Тушить 20 минут.",
                "Добавить сметану и довести до кипения. Снять с огня.",
                "Добавить зелень и чеснок."
              ],
              "tags": ["свинина", "тушеное", "сметана", "мясо"]
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
            "backToRecipes": "Back to Recipes",
            "tips": "Recipe Tips",
            "kharcho": {
              "tips": "You can use round or long-grain rice. I recommend the classic set of spices — khmeli-suneli, bay leaf, a couple of black peppercorns and basil. For spiciness, you can add red ground pepper or a piece of hot pepper pod. But don't overdo it! In addition to the listed spices, you can use coriander, tarragon, saffron, etc..."
            },
            "braisedPork": {
              "tips": "Cooking braised pork is quite simple — the main thing is to find tasty meat that will gratefully absorb all the juices. This recipe doesn't specify which part of the pork to use, and this is understandable: the meat will stew for a long time with onions and sauce, so you can use the driest parts, even tenderloin. The rye flour listed among the ingredients will give the dish an interesting texture — the gravy will be thicker and more satisfying — and a bright, tart aroma of rye crust. You can also use wheat flour, but then you won't achieve such fragrance."
            }
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
            },
            "4": {
              "title": "Cottage Cheese Pancakes",
              "description": "Classic cottage cheese pancakes for breakfast",
              "ingredients": [
                "Cottage cheese",
                "Chicken egg",
                "Sugar",
                "Wheat flour"
              ],
              "instructions": [
                "Put all the cottage cheese in a small pot and mash it with a fork so that there are no large lumps left. Break the eggs into it, add sugar and mix everything thoroughly.",
                "Add flour to the cottage cheese and mix thoroughly. As a result, you should get a homogeneous mass from which you can form pancakes.",
                "Put the pan on medium heat.",
                "Sprinkle some flour on a plate. Form several small balls from the resulting cottage cheese mass, roll them in flour and flatten them into small pancakes.",
                "Fry the pancakes for 1-2 minutes until golden brown. Then flip them to the other side and also fry until golden."
              ],
              "tags": ["breakfast", "cottage cheese", "pancakes"]
            },
            "5": {
              "title": "Kharcho Soup",
              "description": "Traditional Georgian soup with beef and rice",
              "ingredients": [
                "Onions",
                "Garlic",
                "Rice",
                "Tomatoes",
                "Beef",
                "Cilantro",
                "Parsley",
                "Dill",
                "Spices"
              ],
              "instructions": [
                "Clean the meat from bones. Pour 2-2.5 liters of cold water into a pot, add meat and bones and put on fire.",
                "When the water boils, carefully remove the foam and reduce heat so that the water bubbles slightly. Leave to cook for an hour and a half. Half an hour before the end of cooking, you can add parsley or celery root to the broth and salt to taste.",
                "Meanwhile, finely chop the onion and fry it in vegetable oil over low heat so that the onion remains soft.",
                "As soon as the onion begins to turn golden, add the meat from the broth to it and fry for about 5 minutes.",
                "Then add a couple of tablespoons of broth and simmer under a closed lid for 15 minutes.",
                "While the meat and onions are stewing, prepare the tomatoes",
                "Send the contents of the pan to the broth, which is already on the stove again and is about to boil.",
                "Add rice to the pot contents and continue cooking.",
                "Let our not yet finished soup boil for 5 minutes, reduce heat to medium and add spices.",
                "At the very last stage of cooking, add crushed garlic and finely chopped herbs (dill, parsley and cilantro).",
                "Let the soup steep under the lid for an hour and you can serve."
              ],
              "tags": ["soup", "kharcho", "beef", "georgian cuisine"]
            },
            "6": {
              "title": "Braised Pork",
              "description": "Tender braised pork in sour cream sauce with vegetables",
              "ingredients": [
                "Pork",
                "Onions",
                "Ground black pepper",
                "Salt",
                "Vegetable oil",
                "Parsley",
                "Dill",
                "Garlic",
                "Sour cream",
                "Tomato paste",
                "Rye flour"
              ],
              "instructions": [
                "Cut the meat, fry it, transfer to a braising dish.",
                "Fry the chopped onion and add to the meat.",
                "Pour water (or meat broth), salt, pepper. Braise for an hour.",
                "Dissolve flour in part of the resulting broth. Add to the pot with meat.",
                "Add tomato paste (you can use ketchup). Braise for 20 minutes.",
                "Add sour cream and bring to a boil. Remove from heat.",
                "Add herbs and garlic."
              ],
              "tags": ["pork", "braised", "sour cream", "meat"]
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