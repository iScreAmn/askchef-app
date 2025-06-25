import { useTranslation } from 'react-i18next'
import { mockRecipes } from '../data/mockData'

const useRecipeTranslations = () => {
  const { t } = useTranslation()

  const getTranslatedRecipe = (recipe) => {
    const recipeTranslation = t(`recipeData.${recipe.id}`, { returnObjects: true })
    
    // Если перевод не найден, используем оригинальные данные
    if (typeof recipeTranslation === 'string') {
      return recipe
    }

    return {
      ...recipe,
      title: recipeTranslation.title || recipe.title,
      description: recipeTranslation.description || recipe.description,
      ingredients: recipe.ingredients.map((ingredient, index) => ({
        ...ingredient,
        name: recipeTranslation.ingredients?.[index] || ingredient.name,
        unit: t(`units.${ingredient.unit}`) || ingredient.unit
      })),
      instructions: recipe.instructions.map((instruction, index) => 
        recipeTranslation.instructions?.[index] || instruction
      ),
      tags: recipeTranslation.tags || recipe.tags
    }
  }

  const getTranslatedRecipes = () => {
    return mockRecipes.map(recipe => getTranslatedRecipe(recipe))
  }

  return {
    getTranslatedRecipe,
    getTranslatedRecipes
  }
}

export default useRecipeTranslations 