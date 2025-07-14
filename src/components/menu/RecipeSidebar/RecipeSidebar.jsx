import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import { mockRecipes } from '../../../data/mockData'
import DraggableRecipe from '../DraggableRecipe/DraggableRecipe'
import './RecipeSidebar.css'

const RecipeSidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMealType, setSelectedMealType] = useState('all')

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

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`recipe-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">{t('recipes.recipes')}</h2>
          <button onClick={onClose} className="close-button">
            <FiX />
          </button>
        </div>

        {/* Фильтры */}
        <div className="sidebar-filters">
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

        {/* Список рецептов */}
        <div className="recipes-list">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <DraggableRecipe
                key={recipe.id}
                recipe={recipe}
                compact={true}
              />
            ))
          ) : (
            <div className="no-recipes">
              <p>{t('recipes.noRecipes')}</p>
            </div>
          )}
        </div>

        {/* Инструкция */}
        <div className="sidebar-instruction">
          <p className="instruction-text">
            {t('menu.dragInstruction')}
          </p>
        </div>
      </div>
    </>
  )
}

export default RecipeSidebar 