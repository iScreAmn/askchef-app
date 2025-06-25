import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiClock, FiUsers, FiTrendingUp, FiArrowLeft, FiHeart } from 'react-icons/fi'
import { mockRecipes } from '../../data/mockData'
import useRecipeTranslations from '../../hooks/useRecipeTranslations'
import Button from '../../components/ui/Button/Button'
import './RecipeDetailPage.css'

const RecipeDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { getTranslatedRecipe } = useRecipeTranslations()
  
  const originalRecipe = mockRecipes.find(r => r.id === parseInt(id))
  const recipe = originalRecipe ? getTranslatedRecipe(originalRecipe) : null

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

  const getCategoryText = (category) => {
    const categories = {
      breakfast: t('recipes.breakfast'),
      lunch: t('recipes.lunch'),
      dinner: t('recipes.dinner')
    }
    return categories[category] || category
  }

  if (!recipe) {
    return (
      <div className="page-container">
        <div className="recipe-not-found">
          <h1>{t('recipes.notFound')}</h1>
          <Button variant="primary" onClick={() => navigate('/recipes')}>
            {t('recipes.backToRecipes')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="recipe-detail-page">
      <div className="recipe-header">
        <div className="recipe-header-content">
          <Button 
            variant="ghost" 
            icon={<FiArrowLeft />}
            onClick={() => navigate('/recipes')}
            className="back-button"
          >
            {t('common.back')}
          </Button>
          
          <div className="recipe-category-badge">
            {getCategoryText(recipe.category)}
          </div>
        </div>
      </div>

      <div className="recipe-detail-container">
        <div className="recipe-hero">
          <div className="recipe-image-large">
            <img src={recipe.image} alt={recipe.title} />
          </div>
          
          <div className="recipe-info">
            <h1 className="recipe-title-large">{recipe.title}</h1>
            <p className="recipe-description-large">{recipe.description}</p>
            
            <div className="recipe-stats">
              <div className="stat-item">
                <FiClock size={20} />
                <div>
                  <span className="stat-value">{recipe.cookingTime}</span>
                  <span className="stat-label">{t('recipes.minutes')}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <FiUsers size={20} />
                <div>
                  <span className="stat-value">{recipe.servings}</span>
                  <span className="stat-label">{t('recipes.servings')}</span>
                </div>
              </div>
              
              <div className="stat-item">
                <FiTrendingUp size={20} />
                <div>
                  <span className="stat-value" style={{ color: getDifficultyColor(recipe.difficulty) }}>
                    {getDifficultyText(recipe.difficulty)}
                  </span>
                  <span className="stat-label">{t('recipes.difficulty')}</span>
                </div>
              </div>
            </div>
            
            <div className="recipe-actions">
              <Button variant="primary" size="lg">
                <FiHeart /> {t('recipes.addToFavorites')}
              </Button>
              <Button variant="secondary" size="lg">
                {t('recipes.addToMenu')}
              </Button>
            </div>
          </div>
        </div>

        <div className="recipe-details">
          <div className="recipe-ingredients">
            <h2>{t('recipes.ingredients')}</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-name">{ingredient.name}</span>
                  <span className="ingredient-amount">{ingredient.amount} {ingredient.unit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe-instructions">
            <h2>{t('recipes.instructions')}</h2>
            <ol className="instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="instruction-item">
                  <span className="instruction-number">{index + 1}</span>
                  <span className="instruction-text">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="recipe-tags">
            <h3>{t('recipes.tags')}</h3>
            <div className="tags-list">
              {recipe.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeDetailPage 