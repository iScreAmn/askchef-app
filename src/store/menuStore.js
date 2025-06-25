import { create } from 'zustand'

export const useMenuStore = create((set, get) => ({
  weeklyMenu: {},
  currentWeek: new Date(),
  isLoading: false,
  error: null,
  
  // Действия для управления меню
  addRecipeToDay: (day, recipe) => {
    set((state) => ({
      weeklyMenu: {
        ...state.weeklyMenu,
        [day]: [...(state.weeklyMenu[day] || []), recipe]
      }
    }))
  },
  
  removeRecipeFromDay: (day, recipeId) => {
    set((state) => ({
      weeklyMenu: {
        ...state.weeklyMenu,
        [day]: state.weeklyMenu[day]?.filter(recipe => recipe.id !== recipeId) || []
      }
    }))
  },
  
  clearDay: (day) => {
    set((state) => ({
      weeklyMenu: {
        ...state.weeklyMenu,
        [day]: []
      }
    }))
  },
  
  clearWeek: () => {
    set({ weeklyMenu: {} })
  },
  
  setCurrentWeek: (date) => {
    set({ currentWeek: date })
  },
  
  // Генерация списка покупок
  generateShoppingList: () => {
    const menu = get().weeklyMenu
    const ingredientsMap = new Map()
    
    // Собираем все ингредиенты из всех рецептов
    Object.values(menu).flat().forEach(recipe => {
      recipe.ingredients?.forEach(ingredient => {
        const key = `${ingredient.name}_${ingredient.unit || ''}`
        const existing = ingredientsMap.get(key)
        
        if (existing) {
          existing.amount += ingredient.amount || 0
        } else {
          ingredientsMap.set(key, {
            name: ingredient.name,
            amount: ingredient.amount || 0,
            unit: ingredient.unit || '',
            category: ingredient.category || 'other'
          })
        }
      })
    })
    
    // Группируем по категориям
    const categorizedList = {}
    for (const ingredient of ingredientsMap.values()) {
      const category = ingredient.category
      if (!categorizedList[category]) {
        categorizedList[category] = []
      }
      categorizedList[category].push(ingredient)
    }
    
    return categorizedList
  },
  
  // Получение статистики меню
  getMenuStats: () => {
    const menu = get().weeklyMenu
    const totalRecipes = Object.values(menu).flat().length
    const totalDays = Object.keys(menu).length
    const avgRecipesPerDay = totalDays > 0 ? totalRecipes / totalDays : 0
    
    return {
      totalRecipes,
      totalDays,
      avgRecipesPerDay: Math.round(avgRecipesPerDay * 10) / 10
    }
  },
  
  // Загрузка меню (для будущего API)
  loadWeeklyMenu: async (weekDate) => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Заменить на реальный API call
      console.log('Loading menu for week:', weekDate)
      
      // Симуляция загрузки
      await new Promise(resolve => setTimeout(resolve, 500))
      
      set({ isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },
  
  // Сохранение меню (для будущего API)
  saveWeeklyMenu: async () => {
    set({ isLoading: true, error: null })
    try {
      const menu = get().weeklyMenu
      
      // TODO: Заменить на реальный API call
      console.log('Saving menu:', menu)
      
      // Симуляция сохранения
      await new Promise(resolve => setTimeout(resolve, 500))
      
      set({ isLoading: false })
      return { success: true }
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  }
}))

// Утилиты для работы с датами
export const getWeekDays = (startDate = new Date()) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const week = []
  
  // Находим понедельник текущей недели
  const monday = new Date(startDate)
  monday.setDate(startDate.getDate() - startDate.getDay() + 1)
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday)
    day.setDate(monday.getDate() + i)
    week.push({
      key: days[i],
      date: day,
      formatted: day.toLocaleDateString('ru-RU')
    })
  }
  
  return week
} 