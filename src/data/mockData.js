// Mock данные для разработки
import { spaghettiBolognese, greekSalad, mushroomOmelet, syrniki, soupKharcho, braisedPork } from '../assets/images'

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
  },
  {
    id: 4,
    title: 'Сырники',
    description: 'Классические творожные сырники на завтрак',
    image: syrniki,
    cookingTime: 30,
    servings: 1,
    difficulty: 'easy',
    ingredients: [
      { name: 'Творог', amount: 175, unit: 'г', category: 'dairy' },
      { name: 'Куриное яйцо', amount: 1, unit: 'шт', category: 'dairy' },
      { name: 'Сахар', amount: 2, unit: 'ч.л.', category: 'other' },
      { name: 'Пшеничная мука', amount: 3, unit: 'ст.л.', category: 'grains' },
    ],
    instructions: [
      'Положите весь творог в кастрюльку и разомните его вилкой так, чтобы в нем не осталось крупных комков. Разбейте в него яйца, всыпьте сахар и тщательно все перемешайте.',
      'Всыпьте в творог муку и тщательно перемешайте. В итоге у вас должна получиться однородная масса, из которой можно будет лепить сырники.',
      'Поставьте сковороду на средний огонь',
      'Насыпьте на тарелку немного муки. Слепите несколько небольших шариков из творожной массы, обкатайте их в муке и сплющите в небольшие лепешки.',
      'Обжаривайте сырники 1–2 минуты до появления золотистой корочки. Затем переверните их на другую сторону и также обжарьте до золотистого состояния.'
    ],
    tags: ['завтрак', 'творог', 'сырники'],
    category: 'breakfast'
  },
  {
    id: 5,
    title: 'Суп харчо',
    description: 'Традиционный грузинский суп с говядиной и рисом',
    image: soupKharcho,
    cookingTime: 75,
    servings: 4,
    difficulty: 'medium',
    ingredients: [
      { name: 'Репчатый лук', amount: 3, unit: 'шт', category: 'vegetables' },
      { name: 'Чеснок', amount: 1, unit: 'зубчик', category: 'vegetables' },
      { name: 'Рис', amount: 4, unit: 'ст.л.', category: 'grains' },
      { name: 'Помидоры', amount: 500, unit: 'г', category: 'vegetables' },
      { name: 'Говядина', amount: 400, unit: 'г', category: 'meat' },
      { name: 'Кинза', amount: 1, unit: 'по вкусу', category: 'herbs' },
      { name: 'Петрушка', amount: 1, unit: 'по вкусу', category: 'herbs' },
      { name: 'Укроп', amount: 1, unit: 'по вкусу', category: 'herbs' },
      { name: 'Специи', amount: 1, unit: 'по вкусу', category: 'other' }
    ],
    instructions: [
      'Очищаем мясо от костей. В кастрюлю наливаем 2–2,5 литра холодной воды, закладываем мясо и косточки и ставим на огонь.',
      'Когда вода закипит, тщательно снимаем пену и уменьшаем огонь так, чтобы вода слегка побулькивала. Оставляем варить на час–полтора. За полчаса до окончания варки в бульон можно добавить корень петрушки или сельдерея и посолить по вкусу.',
      'Тем временем, мелко режем лук и обжариваем его в растительном масле на медленном огне, чтобы лук оставался мягким.',
      'Как только лук начнет приобретать золотистый цвет, добавляем к нему мясо из бульона и жарим минут 5.',
      'Затем добавляем пару столовых ложек бульона и тушим под закрытой крышкой минут 15.',
      'Пока мясо и лук тушатся, подготавливаем помидоры',
      'Содержимое сковороды отправляем в бульон, который снова уже на плите и собирается закипеть.',
      'Добавить в содержимое кастрюли рис и продолжать варить.',
      'Даем нашему еще не законченному супу 5 минут покипеть, уменьшаем огонь до среднего и добавляем специи.',
      'На самом последнем этапе приготовления добавляем толченый чеснок и мелко рубленную зелень (укроп, петрушку и кинзу).',
      'Даем час супу настояться под крышкой и можно подавать на стол.'
    ],
    tags: ['суп', 'харчо', 'говядина', 'грузинская кухня'],
    category: 'lunch'
  },
  {
    id: 6,
    title: 'Тушеная свинина',
    description: 'Нежная тушеная свинина в сметанном соусе с овощами',
    image: braisedPork,
    cookingTime: 120,
    servings: 4,
    difficulty: 'medium',
    ingredients: [
      { name: 'Свинина', amount: 1, unit: 'кг', category: 'meat' },
      { name: 'Репчатый лук', amount: 3, unit: 'шт', category: 'vegetables' },
      { name: 'Молотый черный перец', amount: 1, unit: 'по вкусу', category: 'spices' },
      { name: 'Соль', amount: 1, unit: 'по вкусу', category: 'spices' },
      { name: 'Растительное масло', amount: 50, unit: 'мл', category: 'other' },
      { name: 'Петрушка', amount: 1, unit: 'по вкусу', category: 'herbs' },
      { name: 'Укроп', amount: 1, unit: 'по вкусу', category: 'herbs' },
      { name: 'Чеснок', amount: 2, unit: 'шт', category: 'vegetables' },
      { name: 'Сметана', amount: 100, unit: 'г', category: 'dairy' },
      { name: 'Томатная паста', amount: 3, unit: 'ст.л.', category: 'other' },
      { name: 'Ржаная мука', amount: 2, unit: 'ст.л.', category: 'grains' }
    ],
    instructions: [
      'Мясо нарезать, обжарить, переложить в посуду для тушения.',
      'Обжарить нашинкованный репчатый лук и добавить к мясу.',
      'Залить водой (или мясным бульоном), посолить, поперчить. Тушить в течение часа.',
      'В части полученного бульона развести муку. Добавить в кастрюлю с мясом.',
      'Добавить томатную пасту (можно взять кетчуп). Тушить 20 минут.',
      'Добавить сметану и довести до кипения. Снять с огня.',
      'Добавить зелень и чеснок.'
    ],
    tags: ['свинина', 'тушеное', 'сметана', 'мясо'],
    category: 'dinner'
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