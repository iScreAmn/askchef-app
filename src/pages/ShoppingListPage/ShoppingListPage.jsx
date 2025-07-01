import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { FiChevronDown, FiChevronUp, FiTrash2, FiX, FiPlus, FiCheck } from 'react-icons/fi'
import { IoMdAddCircleOutline, IoMdCheckboxOutline } from "react-icons/io"
import useRecipeTranslations from '../../hooks/useRecipeTranslations'
import useShoppingStore from '../../store/shoppingStore'
import Button from '../../components/ui/Button/Button'
import CreateCustomListModal from '../../components/ui/CreateCustomListModal/CreateCustomListModal'
import './ShoppingListPage.css'

const ShoppingListPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { getTranslatedRecipes } = useRecipeTranslations()
  
  const {
    selectedRecipes,
    activeRecipes,
    expandedCategories,
    checkedIngredients,
    customLists,
    clearAllSelections,
    clearAllRecipes,
    toggleCategory,
    toggleIngredientCheck,
    removeRecipeFromList,
    toggleRecipeActive,
    isRecipeActive,
    setExpandedCategories,
    addCustomList,
    removeCustomList,
    addItemToCustomList,
    removeItemFromCustomList,
    toggleCustomListItem
  } = useShoppingStore()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newItemInputs, setNewItemInputs] = useState({})
  const recipes = getTranslatedRecipes()

  // Функция для создания кастомного списка
  const handleCreateCustomList = (listName) => {
    addCustomList(listName)
    
    // Если есть выбранные рецепты или ингредиенты, скроллим к кастомным спискам
    if (selectedRecipes.length > 0 || Object.keys(groupedIngredients).length > 0) {
      setTimeout(() => {
        const customListsSection = document.querySelector('.custom-lists-section')
        if (customListsSection) {
          customListsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          })
        }
      }, 100) // Небольшая задержка для завершения рендера
    }
  }

  // Функция для добавления элемента в список
  const handleAddItem = (listId) => {
    const itemName = newItemInputs[listId]?.trim()
    if (itemName) {
      addItemToCustomList(listId, itemName)
      setNewItemInputs(prev => ({ ...prev, [listId]: '' }))
    }
  }

  // Функция для обновления значения поля ввода
  const handleInputChange = (listId, value) => {
    setNewItemInputs(prev => ({ ...prev, [listId]: value }))
  }

  // Группировка и объединение ингредиентов (только для активных рецептов)
  const groupedIngredients = useMemo(() => {
    const ingredientMap = {}
    
    activeRecipes.forEach(recipeId => {
      const recipe = recipes.find(r => r.id === recipeId)
      if (recipe) {
        recipe.ingredients.forEach(ingredient => {
          const key = ingredient.name
          if (ingredientMap[key]) {
            // Суммируем количества одинаковых ингредиентов
            if (typeof ingredient.amount === 'number' && typeof ingredientMap[key].amount === 'number') {
              ingredientMap[key].amount += ingredient.amount
            }
          } else {
            ingredientMap[key] = { ...ingredient }
          }
        })
      }
    })

    // Группируем по категориям
    const categoryGroups = {}
    Object.values(ingredientMap).forEach(ingredient => {
      const category = ingredient.category || 'other'
      if (!categoryGroups[category]) {
        categoryGroups[category] = []
      }
      categoryGroups[category].push(ingredient)
    })

    return categoryGroups
  }, [activeRecipes, recipes])

  // Автоматически открываем все категории при появлении новых ингредиентов
  const categoryKeys = Object.keys(groupedIngredients)
  useEffect(() => {
    if (categoryKeys.length > 0) {
      const newExpandedCategories = {}
      categoryKeys.forEach(category => {
        newExpandedCategories[category] = true
      })
      setExpandedCategories(prev => ({ ...prev, ...newExpandedCategories }))
    }
  }, [categoryKeys.length])

  // Функция для удаления ингредиента из списка
  const removeIngredient = (ingredientName) => {
    // Находим активные рецепты, которые содержат этот ингредиент
    const recipesToDeactivate = activeRecipes.filter(recipeId => {
      const recipe = recipes.find(r => r.id === recipeId)
      return recipe?.ingredients.some(ing => ing.name === ingredientName)
    })
    
    // Деактивируем эти рецепты (убираем их ингредиенты из списка)
    recipesToDeactivate.forEach(recipeId => toggleRecipeActive(recipeId))
  }

  // Названия категорий
  const getCategoryName = (category) => {
    const categoryNames = {
      vegetables: t('shopping.categories.vegetables'),
      meat: t('shopping.categories.meat'),
      dairy: t('shopping.categories.dairy'),
      grains: t('shopping.categories.grains'),
      herbs: t('shopping.categories.herbs'),
      spices: t('shopping.categories.spices'),
      other: t('shopping.categories.other')
    }
    return categoryNames[category] || category
  }

  return (
        <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{t('navigation.shopping')}</h1>
        <Button 
          variant="primary" 
          icon={<FiPlus />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          {t('shopping.createCustomList')}
        </Button>
      </div>
      
      {/* Добавленные рецепты */}
      {selectedRecipes.length > 0 && (
        <div className="selected-recipes">
          <h2>{t('shopping.selectedRecipes')}</h2>
          <div className="selected-recipes-grid">
            {selectedRecipes.map(recipeId => {
              const recipe = recipes.find(r => r.id === recipeId)
              if (!recipe) return null
              
              return (
                <div key={recipe.id} className="selected-recipe">
                  <div 
                    className="selected-recipe-image"
                    onClick={() => navigate(`/recipes/${recipe.id}?from=shopping`)}
                  >
                    <img src={recipe.image} alt={recipe.title} />
                  </div>
                  <div className="selected-recipe-content">
                    <label className="recipe-checkbox">
                      <input
                        type="checkbox"
                        checked={isRecipeActive(recipe.id)}
                        onChange={() => toggleRecipeActive(recipe.id)}
                      />
                      <h4 className="selected-recipe-title">{recipe.title}</h4>
                    </label>
                    <button 
                      className="remove-recipe"
                      onClick={() => removeRecipeFromList(recipe.id)}
                      title={t('shopping.removeRecipe')}
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="shopping-actions">
            <Button variant="secondary" onClick={clearAllSelections}>
              <IoMdCheckboxOutline /> {t('shopping.clearSelections')}
            </Button>
            <Button variant="ghost" onClick={clearAllRecipes}>
              <FiTrash2 /> {t('shopping.clearList')}
            </Button>
          </div>
        </div>
      )}

      {/* Список ингредиентов по категориям */}
      {Object.keys(groupedIngredients).length > 0 && (
        <div className="shopping-list">
          <h2>{t('shopping.shoppingList')}</h2>
          
          {Object.entries(groupedIngredients).map(([category, ingredients]) => (
            <div key={category} className="ingredient-category">
              <div 
                className="category-header"
                onClick={() => toggleCategory(category)}
              >
                <h3>{getCategoryName(category)}</h3>
                {expandedCategories[category] ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedCategories[category] && (
                <div className="ingredient-list">
                  {ingredients.map((ingredient, index) => {
                    const ingredientKey = `${category}-${ingredient.name}-${index}`
                    const isChecked = checkedIngredients[ingredientKey]
                    
                    return (
                      <div key={ingredientKey} className="ingredient-item">
                        <label className={`ingredient-checkbox ${isChecked ? 'checked' : ''}`}>
                          <input
                            type="checkbox"
                            checked={isChecked || false}
                            onChange={() => toggleIngredientCheck(ingredientKey)}
                          />
                          <span className="ingredient-text">
                            {ingredient.name} - {ingredient.amount} {ingredient.unit}
                          </span>
                        </label>
                        <button 
                          className="remove-ingredient"
                          onClick={() => removeIngredient(ingredient.name)}
                          title={t('shopping.removeIngredient')}
                        >
                          <FiX />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Кастомные списки */}
      {customLists.length > 0 && (
        <div className="custom-lists-section">
          <div className="section-header">
            <h2>{t('shopping.customLists')}</h2>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="add-list-button"
              title={t('shopping.createCustomList')}
            >
              <IoMdAddCircleOutline />
            </button>
          </div>
          <div className="custom-lists-grid">
            {customLists.map(list => (
              <div key={list.id} className="custom-list-card">
                <div className="custom-list-header">
                  <h3>{list.name}</h3>
                  <button 
                    className="remove-list-button"
                    onClick={() => removeCustomList(list.id)}
                    title={t('shopping.removeList')}
                  >
                    <FiX />
                  </button>
                </div>
                
                <div className="custom-list-items">
                  {list.items.map(item => (
                    <div key={item.id} className="custom-list-item">
                      <label className={`custom-item-checkbox ${item.checked ? 'checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleCustomListItem(list.id, item.id)}
                        />
                        <span className="custom-item-text">{item.name}</span>
                      </label>
                      <button 
                        className="remove-item-button"
                        onClick={() => removeItemFromCustomList(list.id, item.id)}
                        title={t('shopping.removeItem')}
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                  
                  <div className="add-item-form">
                    <div className="add-item-input-group">
                      <input
                        type="text"
                        value={newItemInputs[list.id] || ''}
                        onChange={(e) => handleInputChange(list.id, e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddItem(list.id)
                          }
                        }}
                        placeholder={t('shopping.addItemPlaceholder')}
                        className="add-item-input"
                      />
                      <button
                        onClick={() => handleAddItem(list.id)}
                        disabled={!newItemInputs[list.id]?.trim()}
                        className="add-item-button"
                        title={t('shopping.addItem')}
                      >
                        <FiCheck />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(groupedIngredients).length === 0 && selectedRecipes.length === 0 && customLists.length === 0 && (
        <div className="empty-shopping-list">
          <p>{t('shopping.emptyList')}</p>
        </div>
      )}

      {/* Модальное окно создания кастомного списка */}
      <CreateCustomListModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateCustomList}
      />
    </div>
  )
}

export default ShoppingListPage 