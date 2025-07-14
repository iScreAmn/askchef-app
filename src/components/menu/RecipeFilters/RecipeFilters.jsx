import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import './RecipeFilters.css'

const RecipeFilters = ({ 
  filters = {}, 
  onFiltersChange, 
  availableCategories = [], 
  availableIngredients = [],
  isExpanded = false,
  onToggleExpanded 
}) => {
  const { t } = useTranslation()
  
  const [localFilters, setLocalFilters] = useState({
    searchTerm: '',
    category: 'all',
    mealType: 'all',
    difficulty: 'all',
    maxCookingTime: '',
    minRating: '',
    dietary: [],
    excludeIngredients: [],
    ...filters
  })

  const updateFilter = (key, value) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const updateArrayFilter = (key, value, isAdd) => {
    const currentArray = localFilters[key] || []
    const newArray = isAdd 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value)
    
    updateFilter(key, newArray)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      searchTerm: '',
      category: 'all',
      mealType: 'all',
      difficulty: 'all',
      maxCookingTime: '',
      minRating: '',
      dietary: [],
      excludeIngredients: []
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = () => {
    return localFilters.searchTerm ||
           localFilters.category !== 'all' ||
           localFilters.mealType !== 'all' ||
           localFilters.difficulty !== 'all' ||
           localFilters.maxCookingTime ||
           localFilters.minRating ||
           localFilters.dietary.length > 0 ||
           localFilters.excludeIngredients.length > 0
  }

  const mealTypes = ['breakfast', 'lunch', 'dinner']
  const difficulties = ['easy', 'medium', 'hard']
  const dietaryOptions = ['vegetarian', 'vegan', 'glutenFree', 'dairyFree', 'lowCarb']

  return (
    <div className="recipe-filters">
      <div 
        className="filters-header clickable"
        onClick={onToggleExpanded}
        title={isExpanded ? t('recipes.hideFilters') : t('recipes.showFilters')}
      >
        <div className="filters-title">
          <FiFilter className="filter-icon" />
          <span>{t('recipes.filters')}</span>
          {hasActiveFilters() && (
            <span className="active-filters-count">
              ({Object.values(localFilters).filter(v => v && v !== 'all' && (Array.isArray(v) ? v.length > 0 : true)).length})
            </span>
          )}
        </div>
        
        <div className="filters-controls">
          {hasActiveFilters() && (
            <button 
              onClick={(e) => {
                e.stopPropagation()
                clearAllFilters()
              }} 
              className="clear-filters-btn"
            >
              <FiX />
              {t('recipes.clearFilters')}
            </button>
          )}
          
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onToggleExpanded()
            }}
            className="toggle-filters-btn"
            aria-label={isExpanded ? t('recipes.hideFilters') : t('recipes.showFilters')}
          >
            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="filters-content">
          {/* Основные фильтры */}
          <div className="filters-row">
            <div className="filter-group">
              <label className="filter-label">{t('recipes.category')}:</label>
              <select
                value={localFilters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="filter-select"
              >
                <option value="all">{t('recipes.allCategories')}</option>
                {availableCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">{t('recipes.mealType')}:</label>
              <select
                value={localFilters.mealType}
                onChange={(e) => updateFilter('mealType', e.target.value)}
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

            <div className="filter-group">
              <label className="filter-label">{t('recipes.difficulty')}:</label>
              <select
                value={localFilters.difficulty}
                onChange={(e) => updateFilter('difficulty', e.target.value)}
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

          {/* Числовые фильтры */}
          <div className="filters-row">
            <div className="filter-group">
              <label className="filter-label">{t('recipes.maxCookingTime')} (мин):</label>
              <input
                type="number"
                value={localFilters.maxCookingTime}
                onChange={(e) => updateFilter('maxCookingTime', e.target.value)}
                className="filter-input"
                placeholder="120"
                min="1"
                max="480"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">{t('recipes.minRating')}:</label>
              <select
                value={localFilters.minRating}
                onChange={(e) => updateFilter('minRating', e.target.value)}
                className="filter-select"
              >
                <option value="">{t('recipes.anyRating')}</option>
                <option value="4">4+ ⭐</option>
                <option value="3">3+ ⭐</option>
                <option value="2">2+ ⭐</option>
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
                    checked={localFilters.dietary.includes(option)}
                    onChange={(e) => updateArrayFilter('dietary', option, e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">
                    {t(`recipes.dietary.${option}`)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Исключить ингредиенты */}
          <div className="filter-group">
            <label className="filter-label">{t('recipes.excludeIngredients')}:</label>
            <div className="ingredients-selector">
              <select
                onChange={(e) => {
                  if (e.target.value && !localFilters.excludeIngredients.includes(e.target.value)) {
                    updateArrayFilter('excludeIngredients', e.target.value, true)
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
              
              {localFilters.excludeIngredients.length > 0 && (
                <div className="selected-ingredients">
                  {localFilters.excludeIngredients.map(ingredient => (
                    <span key={ingredient} className="ingredient-tag">
                      {ingredient}
                      <button
                        onClick={() => updateArrayFilter('excludeIngredients', ingredient, false)}
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
          </div>
        </div>
      )}
    </div>
  )
}

export default RecipeFilters 