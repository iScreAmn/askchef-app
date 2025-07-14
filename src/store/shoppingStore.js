import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useShoppingStore = create(
  persist(
    (set, get) => ({
      // Выбранные рецепты для списка покупок
      selectedRecipes: [],
      
      // Активные рецепты (чьи ингредиенты включены в список)
      activeRecipes: [],
      
      // Отмеченные как купленные ингредиенты
      checkedIngredients: {},
      
      // Развернутые категории
      expandedCategories: {},

      // Кастомные списки покупок
      customLists: [],

      // Список покупок из недельного меню (отдельно от кастомных)
      weeklyMenuShoppingList: null,

      // Добавить рецепт в список покупок
      addRecipeToList: (recipeId) => {
        set((state) => ({
          selectedRecipes: state.selectedRecipes.includes(recipeId)
            ? state.selectedRecipes
            : [...state.selectedRecipes, recipeId],
          activeRecipes: state.activeRecipes.includes(recipeId)
            ? state.activeRecipes
            : [...state.activeRecipes, recipeId]
        }))
      },

      // Удалить рецепт из списка покупок
      removeRecipeFromList: (recipeId) => {
        set((state) => ({
          selectedRecipes: state.selectedRecipes.filter(id => id !== recipeId),
          activeRecipes: state.activeRecipes.filter(id => id !== recipeId)
        }))
      },

      // Переключить рецепт в списке покупок
      toggleRecipeInList: (recipeId) => {
        const { selectedRecipes } = get()
        if (selectedRecipes.includes(recipeId)) {
          get().removeRecipeFromList(recipeId)
        } else {
          get().addRecipeToList(recipeId)
        }
      },

      // Проверить, добавлен ли рецепт в список
      isRecipeInList: (recipeId) => {
        return get().selectedRecipes.includes(recipeId)
      },

      // Переключить активность рецепта (включить/выключить ингредиенты)
      toggleRecipeActive: (recipeId) => {
        set((state) => ({
          activeRecipes: state.activeRecipes.includes(recipeId)
            ? state.activeRecipes.filter(id => id !== recipeId)
            : [...state.activeRecipes, recipeId]
        }))
      },

      // Проверить, активен ли рецепт (включены ли его ингредиенты)
      isRecipeActive: (recipeId) => {
        return get().activeRecipes.includes(recipeId)
      },

      // Снять все отметки (убрать активность со всех рецептов)
      clearAllSelections: () => {
        set({
          activeRecipes: [],
          checkedIngredients: {}
        })
      },

      // Отметить все рецепты как активные
      selectAllRecipes: () => {
        set((state) => ({
          activeRecipes: [...state.selectedRecipes],
          checkedIngredients: {}
        }))
      },

      // Проверить, все ли выбранные рецепты активны
      areAllRecipesSelected: () => {
        const { selectedRecipes, activeRecipes } = get()
        return selectedRecipes.length > 0 && selectedRecipes.every(id => activeRecipes.includes(id))
      },

      // Проверить, есть ли хотя бы один активный рецепт
      hasAnyActiveRecipes: () => {
        const { activeRecipes } = get()
        return activeRecipes.length > 0
      },

      // Удалить все рецепты из списка покупок
      clearAllRecipes: () => {
        set({
          selectedRecipes: [],
          activeRecipes: [],
          checkedIngredients: {}
        })
      },

      // Очистить список покупок (убрать только отметки о покупках)
      clearShoppingList: () => {
        set({
          checkedIngredients: {}
        })
      },

      // Переключить состояние ингредиента (куплен/не куплен)
      toggleIngredientCheck: (ingredientKey) => {
        set((state) => ({
          checkedIngredients: {
            ...state.checkedIngredients,
            [ingredientKey]: !state.checkedIngredients[ingredientKey]
          }
        }))
      },

      // Переключить категорию (развернуть/свернуть)
      toggleCategory: (category) => {
        set((state) => ({
          expandedCategories: {
            ...state.expandedCategories,
            [category]: !state.expandedCategories[category]
          }
        }))
      },

      // Установить состояние категории
      setExpandedCategories: (categories) => {
        set({
          expandedCategories: categories
        })
      },

      // Добавить кастомный список
      addCustomList: (listName) => {
        const newList = {
          id: Date.now(),
          name: listName,
          items: [],
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          customLists: [...state.customLists, newList]
        }))
        return newList.id
      },

      // Добавить список покупок из недельного меню
      addWeeklyMenuShoppingList: (shoppingListData) => {
        const newList = {
          id: Date.now(),
          name: shoppingListData.name,
          description: shoppingListData.description,
          items: shoppingListData.items.map(item => ({
            id: Date.now() + Math.random(), // Уникальный ID для каждого элемента
            name: item.name,
            amount: item.amount,
            category: item.category,
            fromRecipe: item.fromRecipe,
            checked: false
          })),
          createdFrom: 'weeklyMenu',
          createdAt: new Date().toISOString()
        }
        
        // Сохраняем список отдельно от кастомных списков
        set(() => ({
          weeklyMenuShoppingList: newList
        }))
        
        return newList.id
      },

      // Очистить список покупок из недельного меню
      clearWeeklyMenuShoppingList: () => {
        set(() => ({
          weeklyMenuShoppingList: null
        }))
      },

      // Переключить состояние элемента в списке из недельного меню
      toggleWeeklyMenuShoppingItem: (itemId) => {
        set((state) => {
          if (!state.weeklyMenuShoppingList) return state
          
          return {
            weeklyMenuShoppingList: {
              ...state.weeklyMenuShoppingList,
              items: state.weeklyMenuShoppingList.items.map(item =>
                item.id === itemId
                  ? { ...item, checked: !item.checked }
                  : item
              )
            }
          }
        })
      },

      // Удалить элемент из списка недельного меню
      removeWeeklyMenuShoppingItem: (itemId) => {
        set((state) => {
          if (!state.weeklyMenuShoppingList) return state
          
          return {
            weeklyMenuShoppingList: {
              ...state.weeklyMenuShoppingList,
              items: state.weeklyMenuShoppingList.items.filter(item => item.id !== itemId)
            }
          }
        })
      },

      // Удалить кастомный список
      removeCustomList: (listId) => {
        set((state) => ({
          customLists: state.customLists.filter(list => list.id !== listId)
        }))
      },

      // Добавить элемент в кастомный список
      addItemToCustomList: (listId, itemName) => {
        set((state) => ({
          customLists: state.customLists.map(list => 
            list.id === listId 
              ? {
                  ...list,
                  items: [...list.items, {
                    id: Date.now(),
                    name: itemName,
                    checked: false
                  }]
                }
              : list
          )
        }))
      },

      // Удалить элемент из кастомного списка
      removeItemFromCustomList: (listId, itemId) => {
        set((state) => ({
          customLists: state.customLists.map(list =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.filter(item => item.id !== itemId)
                }
              : list
          )
        }))
      },

      // Переключить состояние элемента в кастомном списке
      toggleCustomListItem: (listId, itemId) => {
        set((state) => ({
          customLists: state.customLists.map(list =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.map(item =>
                    item.id === itemId
                      ? { ...item, checked: !item.checked }
                      : item
                  )
                }
              : list
          )
        }))
      },

      // Обновить элемент в кастомном списке
      updateCustomListItem: (listId, itemId, updates) => {
        set((state) => ({
          customLists: state.customLists.map(list =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.map(item =>
                    item.id === itemId
                      ? { ...item, ...updates }
                      : item
                  )
                }
              : list
          )
        }))
      },

      // Изменить порядок кастомных списков
      reorderCustomLists: (newOrderIds) => {
        set((state) => {
          const orderedLists = newOrderIds.map(id => {
            return state.customLists.find(list => list.id.toString() === id)
          }).filter(Boolean) // убираем undefined элементы
          
          console.log('Store reorder:', newOrderIds, 'Result:', orderedLists)
          
          return {
            customLists: orderedLists
          }
        })
      }
    }),
    {
      name: 'shopping-store',
      partialize: (state) => ({
        selectedRecipes: state.selectedRecipes,
        activeRecipes: state.activeRecipes,
        checkedIngredients: state.checkedIngredients,
        customLists: state.customLists,
        weeklyMenuShoppingList: state.weeklyMenuShoppingList
      })
    }
  )
)

export default useShoppingStore 