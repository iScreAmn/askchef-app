import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiClock, FiX } from 'react-icons/fi'
import { useMenuStore } from '../../../store/menuStore'
import { useAuthStore } from '../../../store/authStore'
import './MealSlot.css'

const MealSlot = ({ dayKey, mealType, mealName, onAddRecipe }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isDragOver, setIsDragOver] = useState(false)
  
  const {
    getMealRecipes,
    addRecipeToMeal,
    removeRecipeFromMeal
  } = useMenuStore()
  
  const { isAuthenticated } = useAuthStore()
  const recipes = getMealRecipes(dayKey, mealType)

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (!isAuthenticated) {
      navigate('/menu-auth')
      return
    }
    
    try {
      const recipeData = JSON.parse(e.dataTransfer.getData('text/plain'))
      if (recipeData && recipeData.type === 'recipe') {
        addRecipeToMeal(dayKey, mealType, recipeData.recipe)
      }
    } catch (error) {
      console.error('Error dropping recipe:', error)
    }
  }

  const handleRemoveRecipe = (recipeId) => {
    removeRecipeFromMeal(dayKey, mealType, recipeId)
  }

  const handleAddRecipeClick = () => {
    if (!isAuthenticated) {
      navigate('/menu-auth')
      return
    }
    
    if (onAddRecipe) {
      onAddRecipe(dayKey, mealType)
    }
  }

  // Получаем иконку для времени приема пищи
  const getMealIcon = () => {
    switch (mealType) {
      case 'breakfast': return '🌅'
      case 'lunch': return '☀️'
      case 'dinner': return '🌙'
      default: return '🍽️'
    }
  }

  return (
    <div 
      className={`meal-slot ${isDragOver ? 'drag-over' : ''} ${recipes.length === 0 ? 'empty' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="meal-header">
        <span className="meal-icon">{getMealIcon()}</span>
        <h4 className="meal-name">{mealName}</h4>
        <span className="recipe-count">
          {recipes.length > 0 && `(${recipes.length})`}
        </span>
      </div>
      
      <div className="meal-recipes">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <div 
              key={recipe.id} 
              className="meal-recipe-card"
              style={{
                backgroundImage: recipe.image ? `url(${recipe.image})` : 'none'
              }}
            >
              <div className="recipe-overlay">
                <div className="recipe-info">
                  <h5 className="recipe-title">{recipe.title}</h5>
                  {recipe.cookingTime && (
                    <div className="recipe-time">
                      <FiClock />
                      <span>{recipe.cookingTime}{t('units.minute')}</span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleRemoveRecipe(recipe.id)}
                  className="remove-recipe-btn"
                  title={t('menu.removeRecipe')}
                >
                  <FiX />
                </button>
              </div>
            </div>
          ))
        ) : (
          <button 
            className="empty-meal-slot clickable" 
            onClick={handleAddRecipeClick}
            title={t('menu.addRecipe')}
          >
            <FiPlus className="add-icon" />
            <span className="add-text">
              {t('menu.addRecipe')}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default MealSlot 