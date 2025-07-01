import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useShoppingStore = create(
  persist(
    (set, get) => ({
      // Выбранные рецепты для списка покупок
      selectedRecipes: [],
      
      // Отмеченные как купленные ингредиенты
      checkedIngredients: {},
      
      // Развернутые категории
      expandedCategories: {},

      // Добавить рецепт в список покупок
      addRecipeToList: (recipeId) => {
        set((state) => ({
          selectedRecipes: state.selectedRecipes.includes(recipeId)
            ? state.selectedRecipes
            : [...state.selectedRecipes, recipeId]
        }))
      },

      // Удалить рецепт из списка покупок
      removeRecipeFromList: (recipeId) => {
        set((state) => ({
          selectedRecipes: state.selectedRecipes.filter(id => id !== recipeId)
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

      // Снять все отметки (убрать все рецепты)
      clearAllSelections: () => {
        set({
          selectedRecipes: [],
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
      }
    }),
    {
      name: 'shopping-store',
      partialize: (state) => ({
        selectedRecipes: state.selectedRecipes,
        checkedIngredients: state.checkedIngredients
      })
    }
  )
)

export default useShoppingStore 