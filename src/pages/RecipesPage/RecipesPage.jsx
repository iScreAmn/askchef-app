import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { FiClock, FiUsers, FiTrendingUp } from 'react-icons/fi'
import useRecipeTranslations from '../../hooks/useRecipeTranslations'
import './RecipesPage.css'

const RecipesPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { getTranslatedRecipes } = useRecipeTranslations()

  const categories = [
    { id: 'all', name: t('recipes.allCategories'), icon: '🍽️' },
    { id: 'breakfast', name: t('recipes.breakfast'), icon: '🥞' },
    { id: 'lunch', name: t('recipes.lunch'), icon: '🥗' },
    { id: 'dinner', name: t('recipes.dinner'), icon: '🍝' }
  ]

  const getDifficultyText = (difficulty) => {
    const difficulties = {
      easy: t('recipes.difficultyEasy'),
      medium: t('recipes.difficultyMedium'),
      hard: t('recipes.difficultyHard')
    }
    return difficulties[difficulty] || difficulty
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'var(--success-color)',
      medium: 'var(--warning-color)', 
      hard: 'var(--error-color)'
    }
    return colors[difficulty] || 'var(--text-secondary)'
  }

  const translatedRecipes = getTranslatedRecipes()
  const filteredRecipes = selectedCategory === 'all' 
    ? translatedRecipes 
    : translatedRecipes.filter(recipe => recipe.category === selectedCategory)

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`)
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{t('navigation.recipes')}</h1>
      
      <div className="recipes-content">
        {/* Categories */}
        <div className="recipe-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'category-card--active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <h3 className="category-name">{category.name}</h3>
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="recipes-grid">
          {filteredRecipes.map(recipe => (
            <div 
              key={recipe.id} 
              className="recipe-card"
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <div className="recipe-image">
                <img src={recipe.image} alt={recipe.title} />
                <div className="recipe-difficulty" style={{ color: getDifficultyColor(recipe.difficulty) }}>
                  {getDifficultyText(recipe.difficulty)}
                </div>
              </div>
              
              <div className="recipe-content">
                <h3 className="recipe-title">{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
                
                <div className="recipe-meta">
                  <div className="meta-item">
                    <FiClock size={16} />
                    <span>{recipe.cookingTime} {t('recipes.minutes')}</span>
                  </div>
                  <div className="meta-item">
                    <FiUsers size={16} />
                    <span>{recipe.servings} {t('recipes.servings')}</span>
                  </div>
                  <div className="meta-item">
                    <FiTrendingUp size={16} />
                    <span>{getDifficultyText(recipe.difficulty)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="empty-state">
            <p>{t('recipes.noRecipes')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipesPage 