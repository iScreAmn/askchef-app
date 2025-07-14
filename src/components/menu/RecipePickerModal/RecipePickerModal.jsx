import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiSearch, FiFilter, FiPlus, FiCheck, FiX } from 'react-icons/fi'
import { useMenuStore } from '../../../store/menuStore'
import { useAuthStore } from '../../../store/authStore'
import useRecipeTranslations from '../../../hooks/useRecipeTranslations'
import Modal from '../../ui/Modal/Modal'
import './RecipePickerModal.css'

const RecipePickerModal = ({ isOpen, onClose, dayKey, mealType }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { getTranslatedRecipes } = useRecipeTranslations()
  const { isAuthenticated } = useAuthStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMealType, setSelectedMealType] = useState(mealType || 'all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [maxCookingTime, setMaxCookingTime] = useState('')
  const [minRating, setMinRating] = useState('')
  const [selectedDietary, setSelectedDietary] = useState([])
  const [excludeIngredients, setExcludeIngredients] = useState([])
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [addedRecipe, setAddedRecipe] = useState(null)

  const { addRecipeToMeal } = useMenuStore()

  // Получаем переведенные рецепты
  const translatedRecipes = getTranslatedRecipes()
  
  // Фильтрация рецептов
  const filteredRecipes = translatedRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || 
                           recipe.category === selectedCategory
    
    const matchesMealType = selectedMealType === 'all' || 
                           recipe.mealType === selectedMealType

    const matchesDifficulty = selectedDifficulty === 'all' ||
                             recipe.difficulty === selectedDifficulty

    const matchesCookingTime = !maxCookingTime ||
                              (recipe.cookingTime && parseInt(recipe.cookingTime) <= parseInt(maxCookingTime))

    const matchesRating = !minRating ||
                         (recipe.rating && recipe.rating >= parseInt(minRating))

    const matchesDietary = selectedDietary.length === 0 ||
                          selectedDietary.every(diet => recipe.dietary && recipe.dietary.includes(diet))

    const matchesExcludeIngredients = excludeIngredients.length === 0 ||
                                    !excludeIngredients.some(ingredient => 
                                      recipe.ingredients && recipe.ingredients.some(ing => {
                                        const ingName = typeof ing === 'string' ? ing : ing.name
                                        return ingName.toLowerCase().includes(ingredient.toLowerCase())
                                      })
                                    )

    return matchesSearch && matchesCategory && matchesMealType && 
           matchesDifficulty && matchesCookingTime && matchesRating && 
           matchesDietary && matchesExcludeIngredients
  })

  // Получение уникальных категорий и ингредиентов
  const categories = [...new Set(translatedRecipes.map(recipe => recipe.category).filter(Boolean))]
  const mealTypes = ['breakfast', 'lunch', 'dinner']
  const difficulties = ['easy', 'medium', 'hard']
  const dietaryOptions = ['vegetarian', 'vegan', 'glutenFree', 'dairyFree', 'lowCarb']
  const availableIngredients = [...new Set(
    translatedRecipes.flatMap(recipe => 
      (recipe.ingredients || []).map(ingredient => 
        typeof ingredient === 'string' ? ingredient : ingredient.name
      )
    )
  )].sort()

  const handleAddRecipe = (recipe) => {
    if (!isAuthenticated) {
      navigate('/menu-auth')
      onClose()
      return
    }
    
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
                      {t(`recipes.categories.${category}`, { defaultValue: category })}
                    </option>
                  ))}
                </select>
              </div>

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

              {/* Фильтр по сложности */}
              <div className="filter-group">
                <label className="filter-label">
                  {t('recipes.difficulty')}:
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">{t('recipes.allDifficulties')}</option>
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>
                      {t(`recipes.difficultyLevels.${diff}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-row">
              {/* Максимальное время готовки */}
              <div className="filter-group">
                <label className="filter-label">
                  {t('recipes.maxCookingTime')} ({t('recipes.minutes')}):
                </label>
                <input
                  type="number"
                  value={maxCookingTime}
                  onChange={(e) => setMaxCookingTime(e.target.value)}
                  className="filter-input"
                  placeholder="120"
                  min="1"
                  max="480"
                />
              </div>

              {/* Минимальный рейтинг */}
              <div className="filter-group">
                <label className="filter-label">
                  {t('recipes.minRating')}:
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="filter-select"
                >
                  <option value="">{t('recipes.anyRating')}</option>
                  <option value="4">4+ ⭐</option>
                  <option value="3">3+ ⭐</option>
                  <option value="2">2+ ⭐</option>
                </select>
              </div>

              {/* Исключить ингредиенты */}
              <div className="filter-group">
                <label className="filter-label">
                  {t('recipes.excludeIngredients')}:
                </label>
                <select
                  onChange={(e) => {
                    if (e.target.value && !excludeIngredients.includes(e.target.value)) {
                      setExcludeIngredients([...excludeIngredients, e.target.value])
                    }
                    e.target.value = ''
                  }}
                  className="filter-select"
                >
                  <option value="">{t('recipes.selectIngredient')}</option>
                  {availableIngredients.map(ingredient => (
                    <option key={ingredient} value={ingredient}>
                      {ingredient}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Диетические ограничения */}
            <div className="filter-group">
              <label className="filter-label">{t('recipes.dietaryRestrictions')}:</label>
              <div className="checkbox-group">
                {dietaryOptions.map(option => (
                  <label key={option} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedDietary.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDietary([...selectedDietary, option])
                        } else {
                          setSelectedDietary(selectedDietary.filter(item => item !== option))
                        }
                      }}
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">
                      {t(`recipes.dietary.${option}`)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Показать выбранные исключения */}
            {excludeIngredients.length > 0 && (
              <div className="selected-ingredients">
                {excludeIngredients.map(ingredient => (
                  <span key={ingredient} className="ingredient-tag">
                    {ingredient}
                    <button
                      onClick={() => setExcludeIngredients(excludeIngredients.filter(item => item !== ingredient))}
                      className="remove-ingredient-btn"
                      aria-label={`Remove ${ingredient}`}
                    >
                      <FiX />
                    </button>
                  </span>
                ))}
              </div>
            )}
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
                          {recipe.cookingTime}{t('units.minute')}
                        </span>
                      )}
                      {recipe.difficulty && (
                        <span className="recipe-difficulty">
                          {t(`recipes.difficultyLevels.${recipe.difficulty}`)}
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
          title={t('menu.recipeAdded')}
          size="small"
          className="success-modal"
        >
          <div className="success-modal-content">
            <div className="success-icon-wrapper">
              <FiCheck className="success-icon" />
            </div>
            <h3 className="success-title">{t('menu.recipeAddedSuccess')}</h3>
            <p className="success-message">
              <strong>{addedRecipe.title}</strong> {t('menu.addedTo')} {getMealTypeLabel()}
            </p>
            <button 
              onClick={handleSuccessModalClose} 
              className="success-close-button"
            >
              {t('menu.excellent')}
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default RecipePickerModal 