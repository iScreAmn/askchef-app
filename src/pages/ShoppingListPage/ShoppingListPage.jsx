import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { FiChevronDown, FiChevronUp, FiTrash2, FiX, FiPlus, FiCheck } from 'react-icons/fi'
import { IoMdAddCircleOutline, IoMdCheckboxOutline } from "react-icons/io"
import { MdModeEditOutline } from 'react-icons/md'
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
    reorderCustomLists
  } = useShoppingStore()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newItemInputs, setNewItemInputs] = useState({})
  // Простое состояние для drag-and-drop
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  // Состояние для редактирования элементов списка
  const [editingItem, setEditingItem] = useState(null) // { listId, itemId }
  const [editingItemText, setEditingItemText] = useState('')
  
  const recipes = getTranslatedRecipes()

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

  // Начало перетаскивания
  const startDrag = (e, listId) => {
    e.preventDefault()
    console.log('Starting drag for list:', listId)
    
    const card = e.currentTarget.closest('.custom-list-card')
    const rect = card.getBoundingClientRect()
    const x = e.clientX || e.touches?.[0]?.clientX || 0
    const y = e.clientY || e.touches?.[0]?.clientY || 0
    
    setDraggedItem(listId)
    setDragOffset({ x: x - rect.left, y: y - rect.top })
    setMousePos({ x, y })
    
    console.log('Drag started successfully')
  }





  // Глобальные слушатели событий
  useEffect(() => {
    if (!draggedItem) {
      console.log('No drag item, removing listeners')
      return
    }

    console.log('Adding event listeners for drag:', draggedItem)

    const handleMouseMove = (e) => {
      if (!draggedItem) return
      
      const x = e.clientX || e.touches?.[0]?.clientX || 0
      const y = e.clientY || e.touches?.[0]?.clientY || 0
      
      setMousePos({ x, y })
    }

    const handleMouseUp = (e) => {
      console.log('Global mouse up event')
      console.log('Current draggedItem in handler:', draggedItem)
      
      if (!draggedItem) {
        console.log('No dragged item in handler, exiting')
        return
      }
      
      const x = e.clientX || e.changedTouches?.[0]?.clientX || mousePos.x
      const y = e.clientY || e.changedTouches?.[0]?.clientY || mousePos.y
      
      console.log('Drop coordinates:', x, y)
      
      // Находим элемент под мышью
      const elementBelow = document.elementFromPoint(x, y)
      const targetCard = elementBelow?.closest('.custom-list-card:not([data-dragging="true"])')
      
      console.log('Element below:', elementBelow)
      console.log('Target card:', targetCard)
      
      if (targetCard) {
        const targetId = targetCard.dataset.listId
        console.log('Drop on:', targetId, 'from:', draggedItem)
        
        if (targetId && targetId !== draggedItem) {
          const dragIndex = customLists.findIndex(l => l.id.toString() === draggedItem)
          const dropIndex = customLists.findIndex(l => l.id.toString() === targetId)
          
          console.log('Indexes - drag:', dragIndex, 'drop:', dropIndex)
          
          if (dragIndex !== -1 && dropIndex !== -1) {
            // Определяем позицию вставки на основе позиции мыши относительно целевого элемента
            const rect = targetCard.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const isDropAfter = x > centerX
            
            console.log('Drop position - x:', x, 'centerX:', centerX, 'isDropAfter:', isDropAfter)
            
            const newLists = [...customLists]
            const [movedItem] = newLists.splice(dragIndex, 1)
            
            // Пересчитываем индекс после удаления элемента
            let finalDropIndex = dropIndex
            if (dragIndex < dropIndex) {
              finalDropIndex = dropIndex - 1
            }
            
            // Вставляем в правильную позицию
            if (isDropAfter) {
              finalDropIndex = finalDropIndex + 1
            }
            
            newLists.splice(finalDropIndex, 0, movedItem)
            
            console.log('Reordering:', newLists.map(l => l.id))
            reorderCustomLists(newLists.map(l => l.id.toString()))
          }
        }
      } else {
        console.log('No target found, drag cancelled')
      }
      
      // Принудительный сброс состояния
      console.log('Resetting drag state')
      setDraggedItem(null)
      setDragOffset({ x: 0, y: 0 })
      setMousePos({ x: 0, y: 0 })
      
      console.log('Drag ended successfully')
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: false })
    document.addEventListener('mouseup', handleMouseUp, { passive: false })
    document.addEventListener('touchmove', handleMouseMove, { passive: false })
    document.addEventListener('touchend', handleMouseUp, { passive: false })

    return () => {
      console.log('Cleaning up event listeners')
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleMouseMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [draggedItem, customLists, mousePos, reorderCustomLists])

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
            {customLists.map(list => (
              <div 
                key={list.id} 
                className={`custom-list-card ${
                  draggedItem === list.id.toString() ? 'dragging' : ''
                }`}
                data-list-id={list.id}
                data-dragging={draggedItem === list.id.toString()}
                style={
                  draggedItem === list.id.toString() ? {
                    position: 'fixed',
                    left: mousePos.x - dragOffset.x,
                    top: mousePos.y - dragOffset.y,
                    zIndex: 1000,
                    transform: 'rotate(2deg) scale(1.05)',
                    transition: 'none'
                  } : {}
                }
              >
                <div 
                  className="custom-list-header" 
                  onMouseDown={(e) => startDrag(e, list.id.toString())}
                  onTouchStart={(e) => startDrag(e, list.id.toString())}
                >
                  <h3>{list.name}</h3>
                  <button 
                    className="remove-list-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      console.log('Removing list:', list.id)
                      removeCustomList(list.id)
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation() 
                      e.preventDefault()
                    }}
                    title={t('shopping.removeList')}
                  >
                    <FiX />
                  </button>
                </div>
                
                <div className="custom-list-items">
                  {list.items.map(item => {
                    const isEditing = editingItem && editingItem.listId === list.id && editingItem.itemId === item.id
                    
                    return (
                      <div key={item.id} className="custom-list-item">
                        {isEditing ? (
                          // Режим редактирования
                          <div className="edit-item-form">
                            <input
                              type="text"
                              value={editingItemText}
                              onChange={(e) => setEditingItemText(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  saveEditingItem(list.id, item.id)
                                } else if (e.key === 'Escape') {
                                  cancelEditingItem()
                                }
                              }}
                              onBlur={() => saveEditingItem(list.id, item.id)}
                              className="edit-item-input"
                              autoFocus
                            />
                            <div className="edit-item-buttons">
                              <button
                                onClick={() => saveEditingItem(list.id, item.id)}
                                className="save-edit-button"
                                title={t('shopping.saveEdit')}
                              >
                                <FiCheck />
                              </button>
                              <button
                                onClick={cancelEditingItem}
                                className="cancel-edit-button"
                                title={t('shopping.cancelEdit')}
                              >
                                <FiX />
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Режим просмотра
                          <>
                            <label className={`custom-item-checkbox ${item.checked ? 'checked' : ''}`}>
                              <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => toggleCustomListItem(list.id, item.id)}
                              />
                              <span className="custom-item-text">{item.name}</span>
                            </label>
                            <div className="item-actions">
                              <button 
                                className={`edit-item-button ${item.checked ? 'edit-item-button--disabled' : ''}`}
                                onClick={() => !item.checked && startEditingItem(list.id, item.id, item.name)}
                                disabled={item.checked}
                                title={item.checked ? t('shopping.editDisabledChecked') : t('shopping.editItem')}
                              >
                                <MdModeEditOutline />
                              </button>
                              <button 
                                className="remove-item-button"
                                onClick={() => removeItemFromCustomList(list.id, item.id)}
                                title={t('shopping.removeItem')}
                              >
                                <FiX />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                  
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
        )}
      </div>

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