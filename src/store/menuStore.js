import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useMenuStore = create(
  persist(
    (set, get) => ({
      // Структура: { "2024-01-15": { monday: { breakfast: [], lunch: [], dinner: [] }, ... } }
      weeklyMenus: {},
      currentWeekStart: null, // Дата понедельника текущей недели
      mealTypes: ['breakfast', 'lunch', 'dinner'],
      weekTemplates: [], // Сохраненные шаблоны недель
      isLoading: false,
      error: null,
      
      // Инициализация текущей недели
      initializeCurrentWeek: () => {
        const today = new Date()
        const monday = getWeekStart(today)
        const weekKey = formatWeekKey(monday)
        
        set((state) => {
          const currentWeekStart = monday
          const weeklyMenus = { ...state.weeklyMenus }
          
          // Создаем пустую структуру недели если её нет
          if (!weeklyMenus[weekKey]) {
            weeklyMenus[weekKey] = createEmptyWeek()
          }
          
          return { currentWeekStart, weeklyMenus }
        })
      },

      // Навигация по неделям
      setCurrentWeek: (weekStart) => {
        set({ currentWeekStart: weekStart })
      },

      goToNextWeek: () => {
        set((state) => {
          const nextWeek = new Date(state.currentWeekStart)
          nextWeek.setDate(nextWeek.getDate() + 7)
          return { currentWeekStart: nextWeek }
        })
      },

      goToPreviousWeek: () => {
        set((state) => {
          const prevWeek = new Date(state.currentWeekStart)
          prevWeek.setDate(prevWeek.getDate() - 7)
          return { currentWeekStart: prevWeek }
        })
      },

      // Управление рецептами в меню
      addRecipeToMeal: (day, mealType, recipe) => {
        set((state) => {
          const weekKey = formatWeekKey(state.currentWeekStart)
          const weeklyMenus = { ...state.weeklyMenus }
          
          if (!weeklyMenus[weekKey]) {
            weeklyMenus[weekKey] = createEmptyWeek()
          }
          
          if (!weeklyMenus[weekKey][day]) {
            weeklyMenus[weekKey][day] = createEmptyDay()
          }
          
          weeklyMenus[weekKey][day][mealType] = [
            ...weeklyMenus[weekKey][day][mealType],
            recipe
          ]
          
          return { weeklyMenus }
        })
      },
      
      removeRecipeFromMeal: (day, mealType, recipeId) => {
        set((state) => {
          const weekKey = formatWeekKey(state.currentWeekStart)
          const weeklyMenus = { ...state.weeklyMenus }
          
          if (weeklyMenus[weekKey] && weeklyMenus[weekKey][day]) {
            weeklyMenus[weekKey][day][mealType] = weeklyMenus[weekKey][day][mealType].filter(
              recipe => recipe.id !== recipeId
            )
          }
          
          return { weeklyMenus }
        })
      },
      
      clearMeal: (day, mealType) => {
        set((state) => {
          const weekKey = formatWeekKey(state.currentWeekStart)
          const weeklyMenus = { ...state.weeklyMenus }
          
          if (weeklyMenus[weekKey] && weeklyMenus[weekKey][day]) {
            weeklyMenus[weekKey][day][mealType] = []
          }
          
          return { weeklyMenus }
        })
      },
      
      clearDay: (day) => {
        set((state) => {
          const weekKey = formatWeekKey(state.currentWeekStart)
          const weeklyMenus = { ...state.weeklyMenus }
          
          if (weeklyMenus[weekKey]) {
            weeklyMenus[weekKey][day] = createEmptyDay()
          }
          
          return { weeklyMenus }
        })
      },
      
      clearWeek: () => {
        set((state) => {
          const weekKey = formatWeekKey(state.currentWeekStart)
          const weeklyMenus = { ...state.weeklyMenus }
          weeklyMenus[weekKey] = createEmptyWeek()
          
          return { weeklyMenus }
        })
      },
      
      // Получение текущей недели
      getCurrentWeek: () => {
        const { currentWeekStart, weeklyMenus } = get()
        if (!currentWeekStart) return createEmptyWeek()
        
        const weekKey = formatWeekKey(currentWeekStart)
        return weeklyMenus[weekKey] || createEmptyWeek()
      },

      // Получение меню текущей недели (алиас для совместимости)
      getCurrentWeekMenu: () => {
        return get().getCurrentWeek()
      },

      // Получение рецептов для конкретного дня и времени приема пищи
      getMealRecipes: (day, mealType) => {
        const currentWeek = get().getCurrentWeek()
        return currentWeek[day]?.[mealType] || []
      },

      // Генерация списка покупок для текущей недели
      generateShoppingList: () => {
        const currentWeek = get().getCurrentWeek()
        const ingredientsMap = new Map()
        
        // Собираем все ингредиенты из всех рецептов недели
        Object.values(currentWeek).forEach(dayMeals => {
          Object.values(dayMeals).forEach(mealRecipes => {
            mealRecipes.forEach(recipe => {
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
      
      // Получение статистики текущей недели
      getWeekStats: () => {
        const currentWeek = get().getCurrentWeek()
        let totalRecipes = 0
        let totalCookingTime = 0
        let filledMeals = 0
        const mealStats = {}
        
        Object.values(currentWeek).forEach(dayMeals => {
          Object.entries(dayMeals).forEach(([mealType, recipes]) => {
            if (recipes.length > 0) {
              filledMeals++
              totalRecipes += recipes.length
              
              recipes.forEach(recipe => {
                totalCookingTime += recipe.cookingTime || 0
              })
              
              if (!mealStats[mealType]) {
                mealStats[mealType] = 0
              }
              mealStats[mealType] += recipes.length
            }
          })
        })
        
        const totalMealSlots = 7 * 3 // 7 дней × 3 приема пищи
        const completionPercentage = Math.round((filledMeals / totalMealSlots) * 100)
        
        return {
          totalRecipes,
          filledMeals,
          totalMealSlots,
          completionPercentage,
          averageCookingTime: totalRecipes > 0 ? Math.round(totalCookingTime / totalRecipes) : 0,
          mealStats
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
          const { currentWeekStart, weeklyMenus } = get()
          const weekKey = formatWeekKey(currentWeekStart)
          const currentWeek = weeklyMenus[weekKey]
          
          // TODO: Заменить на реальный API call
          console.log('Saving menu for week:', weekKey, currentWeek)
          
          // Симуляция сохранения
          await new Promise(resolve => setTimeout(resolve, 500))
          
          set({ isLoading: false })
          return { success: true }
        } catch (error) {
          set({ error: error.message, isLoading: false })
          throw error
        }
      },

      // Работа с шаблонами недель
      saveWeekTemplate: (name) => {
        const currentWeek = get().getCurrentWeek()
        const template = {
          id: Date.now(),
          name,
          data: currentWeek,
          createdAt: new Date(),
          usageCount: 0
        }
        
        set((state) => ({
          weekTemplates: [...state.weekTemplates, template]
        }))
        
        return template.id
      },

      loadWeekTemplate: (templateId) => {
        const { weekTemplates, currentWeekStart } = get()
        const template = weekTemplates.find(t => t.id === templateId)
        
        if (template && currentWeekStart) {
          const weekKey = formatWeekKey(currentWeekStart)
          
          set((state) => {
            const weeklyMenus = { ...state.weeklyMenus }
            weeklyMenus[weekKey] = { ...template.data }
            
            // Увеличиваем счетчик использования
            const updatedTemplates = state.weekTemplates.map(t =>
              t.id === templateId ? { ...t, usageCount: t.usageCount + 1 } : t
            )
            
            return { weeklyMenus, weekTemplates: updatedTemplates }
          })
        }
      },

      deleteWeekTemplate: (templateId) => {
        set((state) => ({
          weekTemplates: state.weekTemplates.filter(t => t.id !== templateId)
        }))
      },

          // Генерация списка покупок из недельного меню
        generateShoppingListFromWeek: () => {
          const state = get()
          const currentWeek = state.getCurrentWeekMenu()
          
          if (!currentWeek) return
          
          const ingredients = new Map()
          const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
          const mealTypes = ['breakfast', 'lunch', 'dinner']
          
          // Собираем все ингредиенты из рецептов недели
          daysOfWeek.forEach(day => {
            const dayMenu = currentWeek[day]
            if (!dayMenu) return
            
            mealTypes.forEach(mealType => {
              const recipes = dayMenu[mealType] || []
              
              recipes.forEach(recipe => {
                if (recipe.ingredients) {
                  recipe.ingredients.forEach(ingredient => {
                    const name = typeof ingredient === 'string' ? ingredient : ingredient.name
                    const amount = typeof ingredient === 'string' ? '1 шт' : ingredient.amount
                    const category = typeof ingredient === 'string' ? 'Разное' : (ingredient.category || 'Разное')
                    
                    if (ingredients.has(name)) {
                      const existing = ingredients.get(name)
                      // Простое суммирование, можно улучшить логику для разных единиц измерения
                      existing.amount = `${existing.amount} + ${amount}`
                    } else {
                      ingredients.set(name, {
                        name,
                        amount,
                        category,
                        fromRecipe: recipe.title,
                        checked: false
                      })
                    }
                  })
                }
              })
            })
          })
          
          // Конвертируем в массив и группируем по категориям
          const shoppingItems = Array.from(ingredients.values())
          
          // Сохраняем в localStorage для использования в ShoppingListPage
          try {
            const weekPeriod = state.formatWeekKey(state.currentWeekStart)
            const listName = `Меню на неделю (${weekPeriod})`
            
            const shoppingListData = {
              name: listName,
              description: `Автоматически сгенерированный список из недельного меню`,
              items: shoppingItems,
              isTemplate: false,
              createdFrom: 'weeklyMenu',
              createdAt: new Date().toISOString()
            }
            
            // Сохраняем временно в localStorage для передачи в ShoppingListPage
            localStorage.setItem('pendingShoppingList', JSON.stringify(shoppingListData))
          } catch (error) {
            console.error('Ошибка при создании списка покупок:', error)
          }
        }
      }),
      {
        name: 'menu-storage', // ключ для localStorage
        partialize: (state) => ({
          weeklyMenus: state.weeklyMenus,
          weekTemplates: state.weekTemplates,
          currentWeekStart: state.currentWeekStart ? state.currentWeekStart.toISOString() : null
        }),
        // Восстанавливаем Date объекты при загрузке
        onRehydrateStorage: () => (state) => {
          if (state) {
            // Восстанавливаем currentWeekStart как Date объект
            if (state.currentWeekStart) {
              state.currentWeekStart = new Date(state.currentWeekStart)
            }
            
            // Восстанавливаем даты в шаблонах
            if (state.weekTemplates) {
              state.weekTemplates = state.weekTemplates.map(template => ({
                ...template,
                createdAt: new Date(template.createdAt)
              }))
            }
          }
        }
      }
    )
  )

// Вспомогательные функции
const getWeekStart = (date) => {
  const monday = new Date(date)
  const day = monday.getDay()
  const diff = monday.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
  monday.setDate(diff)
  monday.setHours(0, 0, 0, 0)
  return monday
}

const formatWeekKey = (mondayDate) => {
  return mondayDate.toISOString().split('T')[0] // YYYY-MM-DD format
}

const createEmptyDay = () => ({
  breakfast: [],
  lunch: [],
  dinner: []
})

const createEmptyWeek = () => ({
  monday: createEmptyDay(),
  tuesday: createEmptyDay(),
  wednesday: createEmptyDay(),
  thursday: createEmptyDay(),
  friday: createEmptyDay(),
  saturday: createEmptyDay(),
  sunday: createEmptyDay()
})

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