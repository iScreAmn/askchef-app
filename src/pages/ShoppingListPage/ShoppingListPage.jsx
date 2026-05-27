import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiChevronDown, FiChevronUp, FiTrash2, FiX, FiPlus, FiCheck } from 'react-icons/fi'
import { IoMdAddCircleOutline, IoMdCheckboxOutline } from "react-icons/io"
import { MdModeEditOutline } from 'react-icons/md'
import useRecipeTranslations from '../../hooks/useRecipeTranslations'
import useShoppingStore from '../../store/shoppingStore'
import Button from '../../components/ui/Button/Button'
import CreateCustomListModal from '../../components/ui/CreateCustomListModal/CreateCustomListModal'
import CustomListCard from '../../components/ui/CustomListCard/CustomListCard'
import './ShoppingListPage.css'

const ShoppingListPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { getTranslatedRecipes } = useRecipeTranslations()
  const weeklyListRef = useRef(null)
  
  const {
    selectedRecipes,
    activeRecipes,
    expandedCategories,
    checkedIngredients,
    customLists,
    weeklyMenuShoppingList,
    clearAllSelections,
    selectAllRecipes,
    hasAnyActiveRecipes,
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
    toggleCustomListItem,
    updateCustomListItem,
    reorderCustomLists,
    clearWeeklyMenuShoppingList,
    toggleWeeklyMenuShoppingItem,
    removeWeeklyMenuShoppingItem
  } = useShoppingStore()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newItemInputs, setNewItemInputs] = useState({})
  // Состояние для редактирования элементов списка
  const [editingItem, setEditingItem] = useState(null) // { listId, itemId }
  const [editingItemText, setEditingItemText] = useState('')
  
  const recipes = getTranslatedRecipes()

  useEffect(() => {
    if (location.state?.scrollToWeeklyList && weeklyListRef.current) {
      setTimeout(() => {
        weeklyListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [location.state])

  // Определяем состояние кнопки "отметить все"/"снять все отметки"
  const hasActiveRecipes = hasAnyActiveRecipes()
  
  // Функция для переключения состояния всех рецептов
  const handleToggleAllSelections = () => {
    if (hasActiveRecipes) {
      clearAllSelections()
    } else {
      selectAllRecipes()
    }
  }

  // React DnD функция для перемещения карточек
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    if (dragIndex === hoverIndex) return
    
    const newLists = [...customLists]
    const [movedItem] = newLists.splice(dragIndex, 1)
    newLists.splice(hoverIndex, 0, movedItem)
    
    reorderCustomLists(newLists.map(l => l.id.toString()))
  }, [customLists, reorderCustomLists])

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

  // Функции для редактирования элементов списка
  const startEditingItem = (listId, itemId, itemName) => {
    setEditingItem({ listId, itemId })
    setEditingItemText(itemName)
  }

  const saveEditingItem = (listId, itemId) => {
    const newText = editingItemText.trim()
    if (newText && newText !== '') {
      console.log('Saving item:', { listId, itemId, newText })
      // Обновляем элемент в store
      updateCustomListItem(listId, itemId, { name: newText })
    }
    setEditingItem(null)
    setEditingItemText('')
  }

  const cancelEditingItem = () => {
    setEditingItem(null)
    setEditingItemText('')
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

  // Группировка списка из недельного меню по категориям
  const groupedWeeklyMenuItems = useMemo(() => {
    if (!weeklyMenuShoppingList) return {}
    
    const categoryGroups = {}
    weeklyMenuShoppingList.items.forEach(item => {
      const category = item.category || 'other'
      if (!categoryGroups[category]) {
        categoryGroups[category] = []
      }
      categoryGroups[category].push(item)
    })

    return categoryGroups
  }, [weeklyMenuShoppingList])

  // Автоматически открываем все категории при появлении новых ингредиентов
  const categoryKeys = Object.keys(groupedIngredients)
  const weeklyMenuCategoryKeys = Object.keys(groupedWeeklyMenuItems)
  
  useEffect(() => {
    const newExpandedCategories = {}
    
    // Открываем категории для обычных ингредиентов
    if (categoryKeys.length > 0) {
      categoryKeys.forEach(category => {
        newExpandedCategories[category] = true
      })
    }
    
    // Открываем категории для недельного меню
    if (weeklyMenuCategoryKeys.length > 0) {
      weeklyMenuCategoryKeys.forEach(category => {
        newExpandedCategories[`weekly-${category}`] = true
      })
    }
    
    if (Object.keys(newExpandedCategories).length > 0) {
      setExpandedCategories(prev => ({ ...prev, ...newExpandedCategories }))
    }
  }, [categoryKeys.length, weeklyMenuCategoryKeys.length])

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
            <Button variant="secondary" className="fixed-width-button" onClick={handleToggleAllSelections}>
              <IoMdCheckboxOutline /> {hasActiveRecipes ? t('shopping.clearSelections') : t('shopping.selectAll')}
            </Button>
            <Button variant="ghost" className="fixed-width-button" onClick={clearAllRecipes}>
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
      <div className="custom-lists-section">
        {(hasActiveRecipes || customLists.length > 0) && (
          <div className="section-header">
            <h2>{t('shopping.customLists')}</h2>
            {hasActiveRecipes && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="add-list-button"
              title={t('shopping.createCustomList')}
            >
              <IoMdAddCircleOutline />
            </button>
          )}
          </div>
        )}
        {customLists.length > 0 && (
          <div className="custom-lists-grid">
            {customLists.map((list, index) => (
              <CustomListCard
                key={list.id}
                list={list}
                index={index}
                moveCard={moveCard}
                onRemoveList={removeCustomList}
                onAddItem={addItemToCustomList}
                onRemoveItem={removeItemFromCustomList}
                onToggleItem={toggleCustomListItem}
                onUpdateItem={updateCustomListItem}
                newItemInputs={newItemInputs}
                onInputChange={handleInputChange}
                editingItem={editingItem}
                onStartEditing={startEditingItem}
                onSaveEditing={saveEditingItem}
                onCancelEditing={cancelEditingItem}
                editingItemText={editingItemText}
                onEditingTextChange={setEditingItemText}
              />
            ))}
          </div>
        )}
      </div>

      {/* Список покупок из недельного меню */}
      {weeklyMenuShoppingList && Object.keys(groupedWeeklyMenuItems).length > 0 && (
        <div className="shopping-list" ref={weeklyListRef}>
          <div className="section-header">
            <h2>{weeklyMenuShoppingList.name}</h2>
            <Button
              variant="ghost"
              onClick={clearWeeklyMenuShoppingList}
              title={t('shopping.clearWeeklyList')}
            >
              <FiTrash2 /> {t('shopping.clearList')}
            </Button>
          </div>
          
          {weeklyMenuShoppingList.description && (
            <p className="shopping-list-description">{weeklyMenuShoppingList.description}</p>
          )}
          
          {Object.entries(groupedWeeklyMenuItems).map(([category, items]) => (
            <div key={category} className="ingredient-category">
              <div 
                className="category-header"
                onClick={() => toggleCategory(`weekly-${category}`)}
              >
                <h3>{getCategoryName(category)}</h3>
                {expandedCategories[`weekly-${category}`] ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              
              {expandedCategories[`weekly-${category}`] && (
                <div className="ingredient-list">
                  {items.map((item) => (
                    <div key={item.id} className="ingredient-item">
                      <label className={`ingredient-checkbox ${item.checked ? 'checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleWeeklyMenuShoppingItem(item.id)}
                        />
                        <div className="ingredient-content">
                          <span className="ingredient-text">
                            {item.name} - {item.amount}
                          </span>
                          {item.fromRecipe && (
                            <span className="ingredient-recipe">из "{item.fromRecipe}"</span>
                          )}
                        </div>
                      </label>
                      <button 
                        className="remove-ingredient"
                        onClick={() => removeWeeklyMenuShoppingItem(item.id)}
                        title={t('shopping.removeIngredient')}
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {Object.keys(groupedIngredients).length === 0 && selectedRecipes.length === 0 && customLists.length === 0 && !weeklyMenuShoppingList && (
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