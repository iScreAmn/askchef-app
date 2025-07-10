import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch, FiFilter, FiPlus, FiCheck } from 'react-icons/fi'
import { mockRecipes } from '../../../data/mockData'
import { useMenuStore } from '../../../store/menuStore'
import Modal from '../../ui/Modal/Modal'
import './RecipePickerModal.css'

const RecipePickerModal = ({ isOpen, onClose, dayKey, mealType }) => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMealType, setSelectedMealType] = useState(mealType || 'all')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [addedRecipe, setAddedRecipe] = useState(null)

  const { addRecipeToMeal } = useMenuStore()

  // Фильтрация рецептов
  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || 
                           recipe.category === selectedCategory
    
    const matchesMealType = selectedMealType === 'all' || 
                           recipe.mealType === selectedMealType

    return matchesSearch && matchesCategory && matchesMealType
  })

  // Получение уникальных категорий
  const categories = [...new Set(mockRecipes.map(recipe => recipe.category).filter(Boolean))]
  const mealTypes = ['breakfast', 'lunch', 'dinner']

  const handleAddRecipe = (recipe) => {
    if (dayKey && mealType && recipe) {
      try {
        addRecipeToMeal(dayKey, mealType, recipe)
        setAddedRecipe(recipe)
        setShowSuccessModal(true)
      } catch (error) {
        console.error('Error adding recipe:', error)
      }
    }
  }

  const handleCardClick = (recipe) => {
    handleAddRecipe(recipe)
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    setAddedRecipe(null)
    onClose()
  }

  const getMealTypeLabel = () => {
    if (!mealType) return t('menu.selectMealTime')
    return t(`menu.${mealType}`)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`${t('menu.addRecipe')} - ${getMealTypeLabel()}`}
        size="large"
        className="recipe-picker-modal"
      >
        <div className="recipe-picker-content">
          {/* Фильтры */}
          <div className="picker-filters">
            {/* Поиск */}
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder={t('recipes.searchRecipes')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-row">
              {/* Фильтр по времени приема пищи */}
              <div className="filter-group">
                <label className="filter-label">
                  {t('recipes.mealType')}:
                </label>
                <select
                  value={selectedMealType}
                  onChange={(e) => setSelectedMealType(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">{t('recipes.allMealTypes')}</option>
                  {mealTypes.map(type => (
                    <option key={type} value={type}>
                      {t(`recipes.${type}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Фильтр по категории */}
              <div className="filter-group">
                <label className="filter-label">
                  {t('recipes.category')}:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">{t('recipes.allCategories')}</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Список рецептов */}
          <div className="recipes-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <div 
                  key={recipe.id} 
                  className="recipe-picker-card clickable"
                  onClick={() => handleCardClick(recipe)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="recipe-image-container">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="recipe-picker-image"
                    />
                  </div>
                  
                  <div className="recipe-picker-info">
                    <h3 className="recipe-picker-title">{recipe.title}</h3>
                    <p className="recipe-picker-description">
                      {recipe.description}
                    </p>
                    
                    <div className="recipe-picker-meta">
                      {recipe.cookingTime && (
                        <span className="recipe-time">
                          {recipe.cookingTime} мин
                        </span>
                      )}
                      {recipe.difficulty && (
                        <span className="recipe-difficulty">
                          {t(`recipes.difficulty.${recipe.difficulty}`)}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddRecipe(recipe)
                      }}
                      className="add-recipe-button"
                    >
                      <FiPlus />
                      {t('menu.addToMeal')}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-recipes-found">
                <p>{t('recipes.noRecipes')}</p>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Модальное окно успешного добавления */}
      {showSuccessModal && addedRecipe && (
        <Modal
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          title="Успешно добавлено!"
          size="small"
          className="success-modal"
        >
          <div className="success-modal-content">
            <div className="success-icon-wrapper">
              <FiCheck className="success-icon" />
            </div>
            <h3 className="success-title">Рецепт добавлен!</h3>
            <p className="success-message">
              <strong>{addedRecipe.title}</strong> добавлен в {getMealTypeLabel()}
            </p>
            <button 
              onClick={handleSuccessModalClose} 
              className="success-close-button"
            >
              Отлично!
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default RecipePickerModal 