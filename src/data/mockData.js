// Mock данные для разработки
import { spaghettiBolognese, greekSalad, mushroomOmelet } from '../assets/images'

export const mockRecipes = [
  {
    id: 1,
    title: 'Спагетти Болоньезе',
    description: 'Классическая итальянская паста с мясным соусом',
    image: spaghettiBolognese,
    cookingTime: 45,
    servings: 4,
    difficulty: 'medium',
    ingredients: [
      { name: 'Спагетти', amount: 400, unit: 'г', category: 'grains' },
      { name: 'Фарш говяжий', amount: 500, unit: 'г', category: 'meat' },
      { name: 'Лук репчатый', amount: 1, unit: 'шт', category: 'vegetables' },
      { name: 'Морковь', amount: 1, unit: 'шт', category: 'vegetables' },
      { name: 'Томаты в собственном соку', amount: 400, unit: 'г', category: 'vegetables' },
      { name: 'Чеснок', amount: 3, unit: 'зубчика', category: 'vegetables' },
      { name: 'Масло оливковое', amount: 2, unit: 'ст.л.', category: 'other' },
      { name: 'Соль', amount: 1, unit: 'по вкусу', category: 'spices' },
      { name: 'Перец черный', amount: 1, unit: 'по вкусу', category: 'spices' }
    ],
    instructions: [
      'Отварить спагетти согласно инструкции на упаковке',
      'Обжарить лук и морковь на оливковом масле',
      'Добавить фарш и обжарить до готовности',
      'Добавить томаты и тушить 20 минут',
      'Смешать с готовыми спагетти и подавать'
    ],
    tags: ['итальянская кухня', 'паста', 'мясо'],
    category: 'dinner'
  },
  {
    id: 2,
    title: 'Греческий салат',
    description: 'Свежий салат с овощами и сыром фета',
    image: greekSalad,
    cookingTime: 15,
    servings: 2,
    difficulty: 'easy',
    ingredients: [
      { name: 'Помидоры', amount: 3, unit: 'шт', category: 'vegetables' },
      { name: 'Огурцы', amount: 2, unit: 'шт', category: 'vegetables' },
      { name: 'Перец болгарский', amount: 1, unit: 'шт', category: 'vegetables' },
      { name: 'Лук красный', amount: 0.5, unit: 'шт', category: 'vegetables' },
      { name: 'Сыр фета', amount: 200, unit: 'г', category: 'dairy' },
      { name: 'Оливки', amount: 100, unit: 'г', category: 'other' },
      { name: 'Масло оливковое', amount: 3, unit: 'ст.л.', category: 'other' },
      { name: 'Уксус винный', amount: 1, unit: 'ст.л.', category: 'other' },
      { name: 'Орегано', amount: 1, unit: 'ч.л.', category: 'spices' }
    ],
    instructions: [
      'Нарезать овощи крупными кусками',
      'Добавить сыр фета и оливки',
      'Заправить маслом, уксусом и орегано',
      'Перемешать и подавать'
    ],
    tags: ['салат', 'греческая кухня', 'вегетарианское'],
    category: 'lunch'
  },
  {
    id: 3,
    title: 'Омлет с грибами',
    description: 'Нежный омлет с шампиньонами на завтрак',
    image: mushroomOmelet,
    cookingTime: 20,
    servings: 2,
    difficulty: 'easy',
    ingredients: [
      { name: 'Яйца', amount: 4, unit: 'шт', category: 'dairy' },
      { name: 'Молоко', amount: 50, unit: 'мл', category: 'dairy' },
      { name: 'Шампиньоны', amount: 200, unit: 'г', category: 'vegetables' },
      { name: 'Масло сливочное', amount: 20, unit: 'г', category: 'dairy' },
      { name: 'Соль', amount: 1, unit: 'по вкусу', category: 'spices' },
      { name: 'Перец черный', amount: 1, unit: 'по вкусу', category: 'spices' },
      { name: 'Зелень', amount: 1, unit: 'по вкусу', category: 'vegetables' }
    ],
    instructions: [
      'Обжарить нарезанные грибы на сливочном масле',
      'Взбить яйца с молоком, солью и перцем',
      'Вылить яичную смесь на сковороду с грибами',
      'Готовить на медленном огне до готовности',
      'Подавать с зеленью'
    ],
    tags: ['завтрак', 'яйца', 'грибы'],
    category: 'breakfast'
  }
]

export const mockShoppingLists = [
  {
    id: 1,
    name: 'Список на неделю',
    date: '2024-01-15',
    items: {
      meat: [
        { name: 'Фарш говяжий', amount: 500, unit: 'г', checked: false },
        { name: 'Курица целая', amount: 1, unit: 'шт', checked: true }
      ],
      vegetables: [
        { name: 'Помидоры', amount: 6, unit: 'шт', checked: false },
        { name: 'Огурцы', amount: 4, unit: 'шт', checked: false },
        { name: 'Лук репчатый', amount: 2, unit: 'шт', checked: true }
      ],
      dairy: [
        { name: 'Молоко', amount: 1, unit: 'л', checked: false },
        { name: 'Сыр фета', amount: 200, unit: 'г', checked: false },
        { name: 'Яйца', amount: 10, unit: 'шт', checked: true }
      ],
      grains: [
        { name: 'Спагетти', amount: 400, unit: 'г', checked: false },
        { name: 'Рис', amount: 500, unit: 'г', checked: false }
      ],
      other: [
        { name: 'Масло оливковое', amount: 1, unit: 'бутылка', checked: true },
        { name: 'Оливки', amount: 100, unit: 'г', checked: false }
      ]
    }
  }
]

export const mockWeeklyMenu = {
  monday: [
    { ...mockRecipes[0], mealType: 'dinner' }
  ],
  tuesday: [
    { ...mockRecipes[2], mealType: 'breakfast' },
    { ...mockRecipes[1], mealType: 'lunch' }
  ],
  wednesday: [],
  thursday: [
    { ...mockRecipes[1], mealType: 'lunch' }
  ],
  friday: [],
  saturday: [
    { ...mockRecipes[0], mealType: 'dinner' }
  ],
  sunday: [
    { ...mockRecipes[2], mealType: 'breakfast' }
  ]
}

export const mockUser = {
  id: 1,
  name: 'Иван Петров',
  email: 'ivan@example.com',
  avatar: '/images/avatars/default-avatar.png',
  preferences: {
    dietaryRestrictions: [],
    favoriteCategories: ['итальянская кухня', 'салаты'],
    allergies: []
  },
  stats: {
    recipesCooked: 24,
    menusPlanned: 8,
    favoriteRecipes: 12
  }
} 