import { FiClock, FiUsers } from 'react-icons/fi'
import { RiDraggable } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import './DraggableRecipe.css'

const DraggableRecipe = ({ recipe, compact = false }) => {
  const { t } = useTranslation()

  const handleDragStart = (e) => {
    const dragData = {
      type: 'recipe',
      recipe: recipe
    }
    e.dataTransfer.setData('text/plain', JSON.stringify(dragData))
    e.dataTransfer.effectAllowed = 'copy'
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#2ECC71'
      case 'medium': return '#F39C12'
      case 'hard': return '#E74C3C'
      default: return '#95A5A6'
    }
  }

  return (
    <div 
      className={`draggable-recipe ${compact ? 'compact' : ''}`}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="recipe-drag-handle">
        <RiDraggable />
      </div>
      
      <div className="draggable-recipe-image">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          loading="lazy"
        />
      </div>
      
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        
        {!compact && (
          <p className="recipe-description">{recipe.description}</p>
        )}
        
        <div className="recipe-meta">
          {recipe.cookingTime && (
            <div className="meta-item">
              <FiClock />
              <span>{recipe.cookingTime} {t('recipes.minutes')}</span>
            </div>
          )}
          
          {recipe.servings && (
            <div className="meta-item">
              <FiUsers />
              <span>{recipe.servings}</span>
            </div>
          )}
          
          {recipe.difficulty && (
            <div className="meta-item">
              <span 
                className="difficulty-indicator"
                style={{ 
                  backgroundColor: getDifficultyColor(recipe.difficulty),
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '1.2rem'
                }}
              >
                {t(`recipes.difficulty${recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}`)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DraggableRecipe 