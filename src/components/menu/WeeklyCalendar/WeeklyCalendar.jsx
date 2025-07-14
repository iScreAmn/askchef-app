import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronLeft, FiChevronRight, FiPlus, FiShoppingCart, FiBookmark } from 'react-icons/fi'
import { useMenuStore } from '../../../store/menuStore'

import { mockRecipes } from '../../../data/mockData'
import DayColumn from '../DayColumn/DayColumn'
import RecipeSidebar from '../RecipeSidebar/RecipeSidebar'
import RecipePickerModal from '../RecipePickerModal/RecipePickerModal'
import RecipeFilters from '../RecipeFilters/RecipeFilters'
import WeekStatsPanel from '../WeekStatsPanel/WeekStatsPanel'
import WeekTemplateManager from '../WeekTemplateManager/WeekTemplateManager'
import ShoppingListSuccessModal from '../ShoppingListSuccessModal/ShoppingListSuccessModal'
import './WeeklyCalendar.css'

const WeeklyCalendar = () => {
  const { t, i18n } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isPickerModalOpen, setIsPickerModalOpen] = useState(false)
  const [selectedMealSlot, setSelectedMealSlot] = useState({ dayKey: null, mealType: null })
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false)
  const [isStatsExpanded, setIsStatsExpanded] = useState(false)
  const [isTemplateManagerOpen, setIsTemplateManagerOpen] = useState(false)
  const [recipeFilters, setRecipeFilters] = useState({})
  const [currentDayIndex, setCurrentDayIndex] = useState(0) // Индекс первого видимого дня (0-4)
  const [showShoppingListModal, setShowShoppingListModal] = useState(false)
  const [generatedListName, setGeneratedListName] = useState('')
  
  const {
    currentWeekStart,
    initializeCurrentWeek,
    goToNextWeek,
    goToPreviousWeek,
    generateShoppingListFromWeek
  } = useMenuStore()

  
  // Инициализируем текущую неделю при первом рендере
  useEffect(() => {
    if (!currentWeekStart) {
      initializeCurrentWeek()
    }
  }, [currentWeekStart, initializeCurrentWeek])

  // Получаем дни недели
  const getWeekDays = () => {
    if (!currentWeekStart) return []
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    const weekDays = []
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart)
      date.setDate(currentWeekStart.getDate() + i)
      
      weekDays.push({
        key: days[i],
        date,
        dayName: t(`menu.${days[i]}`),
        formatted: date.toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'en-US', { 
          day: 'numeric', 
          month: 'short' 
        })
      })
    }
    
    return weekDays
  }

  const weekDays = getWeekDays()

  // Определяем количество видимых дней в зависимости от размера экрана
  const [visibleDaysCount, setVisibleDaysCount] = useState(3)
  
  useEffect(() => {
    const updateVisibleDaysCount = () => {
      if (window.innerWidth <= 768) {
        setVisibleDaysCount(1) // На мобильных показываем 1 день
      } else {
        setVisibleDaysCount(3) // На десктопе показываем 3 дня
      }
    }
    
    updateVisibleDaysCount()
    window.addEventListener('resize', updateVisibleDaysCount)
    
    return () => window.removeEventListener('resize', updateVisibleDaysCount)
  }, [])

  // Сбрасываем индекс при изменении количества видимых дней
  useEffect(() => {
    const maxIndex = 7 - visibleDaysCount
    if (currentDayIndex > maxIndex) {
      setCurrentDayIndex(Math.max(0, maxIndex))
    }
  }, [visibleDaysCount, currentDayIndex])
  
  // Получаем видимые дни
  const visibleDays = weekDays.slice(currentDayIndex, currentDayIndex + visibleDaysCount)
  
  // Навигация по дням недели
  const goToPreviousDays = () => {
    setCurrentDayIndex(Math.max(0, currentDayIndex - 1))
  }
  
  const goToNextDays = () => {
    const maxIndex = 7 - visibleDaysCount // Максимальный индекс зависит от количества видимых дней
    setCurrentDayIndex(Math.min(maxIndex, currentDayIndex + 1))
  }
  
  // Проверяем доступность кнопок навигации
  const canGoPrevious = currentDayIndex > 0
  const canGoNext = currentDayIndex < (7 - visibleDaysCount)

  // Форматируем период недели для заголовка
  const getWeekPeriod = () => {
    if (!currentWeekStart) return ''
    
    const endDate = new Date(currentWeekStart)
    endDate.setDate(currentWeekStart.getDate() + 6)
    
    const startFormatted = currentWeekStart.toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'en-US', {
      day: 'numeric',
      month: 'short'
    })
    
    const endFormatted = endDate.toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'en-US', {
      day: 'numeric', 
      month: 'short'
    })
    
    return `${startFormatted} - ${endFormatted}`
  }

  // Обработчик добавления рецепта из пустого слота
  const handleAddRecipe = (dayKey, mealType) => {
    setSelectedMealSlot({ dayKey, mealType })
    setIsPickerModalOpen(true)
  }

  // Закрытие модального окна
  const handleClosePickerModal = () => {
    setIsPickerModalOpen(false)
    setSelectedMealSlot({ dayKey: null, mealType: null })
  }

  // Генерация списка покупок из недельного меню
  const handleGenerateShoppingList = () => {
    try {
      // Получаем название созданного списка заранее
      const weekPeriod = getWeekPeriod()
      const listName = `Меню на неделю (${weekPeriod})`
      
      generateShoppingListFromWeek()
      
      // Показываем модальное окно с небольшой задержкой, чтобы список успел создаться
      setTimeout(() => {
        setGeneratedListName(listName)
        setShowShoppingListModal(true)
      }, 300)
    } catch (error) {
      console.error('Ошибка при создании списка покупок:', error)
    }
  }

  const handleCloseShoppingListModal = () => {
    setShowShoppingListModal(false)
    setGeneratedListName('')
  }

  // Подготовка данных для фильтров
  const availableCategories = [...new Set(mockRecipes.map(recipe => recipe.category).filter(Boolean))]
  const availableIngredients = [...new Set(
    mockRecipes.flatMap(recipe => recipe.ingredients || []).map(ing => 
      typeof ing === 'string' ? ing : ing.name
    ).filter(Boolean)
  )]

  if (!currentWeekStart) {
    return <div className="weekly-calendar-loading">Загрузка...</div>
  }

  return (
    <div className="weekly-calendar">
      {/* Заголовок с навигацией */}
      <div className="calendar-header">
        <div className="week-navigation">
          <button 
            onClick={goToPreviousWeek}
            className="nav-button"
            title={t('menu.previousWeek')}
          >
            <FiChevronLeft />
          </button>
          
          <div className="week-period">
            <h2>{getWeekPeriod()}</h2>
            <span className="current-year">
              {currentWeekStart.getFullYear()}
            </span>
          </div>
          
          <button 
            onClick={goToNextWeek}
            className="nav-button"
            title={t('menu.nextWeek')}
          >
            <FiChevronRight />
          </button>
        </div>
        
        {/* Действия */}
        <div className="calendar-actions">
          <button 
            onClick={() => setIsTemplateManagerOpen(true)}
            className="action-button secondary"
            title={t('menu.weekTemplates')}
          >
            <FiBookmark />
            <span>{t('menu.templates')}</span>
          </button>
          
          <button 
            onClick={handleGenerateShoppingList}
            className="action-button secondary"
            title={t('menu.generateShoppingList')}
          >
            <FiShoppingCart />
            <span>{t('menu.shoppingList')}</span>
          </button>
          
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="action-button primary"
            title={t('menu.addRecipe')}
          >
            <FiPlus />
            <span>{t('menu.addRecipe')}</span>
          </button>
        </div>
      </div>

      {/* Статистика недели */}
      <WeekStatsPanel
        isExpanded={isStatsExpanded}
        onToggleExpanded={() => setIsStatsExpanded(!isStatsExpanded)}
      />

      {/* Фильтры рецептов */}
      <RecipeFilters
        filters={recipeFilters}
        onFiltersChange={setRecipeFilters}
        availableCategories={availableCategories}
        availableIngredients={availableIngredients}
        isExpanded={isFiltersExpanded}
        onToggleExpanded={() => setIsFiltersExpanded(!isFiltersExpanded)}
      />

      {/* Навигация по дням */}
      <div className="days-navigation">
        <button 
          onClick={goToPreviousDays}
          className={`days-nav-button ${!canGoPrevious ? 'disabled' : ''}`}
          disabled={!canGoPrevious}
          title="Предыдущие дни"
        >
          <FiChevronLeft />
        </button>
        
        <div className="visible-days-info">
          {visibleDays.length > 0 && (
            <div>
              <span className="days-range">
                {visibleDaysCount === 1 
                  ? visibleDays[0].dayName 
                  : `${visibleDays[0].dayName} - ${visibleDays[visibleDays.length - 1].dayName}`
                }
              </span>
              <div className="carousel-dots">
                {Array.from({ length: 7 - visibleDaysCount + 1 }).map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${index === currentDayIndex ? 'active' : ''}`}
                    onClick={() => setCurrentDayIndex(index)}
                    title={`Перейти к ${weekDays[index]?.dayName}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button 
          onClick={goToNextDays}
          className={`days-nav-button ${!canGoNext ? 'disabled' : ''}`}
          disabled={!canGoNext}
          title="Следующие дни"
        >
          <FiChevronRight />
        </button>
      </div>

      {/* Карусель дней недели */}
      <div className="calendar-carousel">
        <div className="calendar-grid">
          {visibleDays.map(day => (
            <DayColumn
              key={day.key}
              dayKey={day.key}
              dayName={day.dayName}
              date={day.formatted}
              onAddRecipe={handleAddRecipe}
            />
          ))}
        </div>
      </div>
      
      {/* Sidebar с рецептами для drag&drop */}
      <RecipeSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Модальное окно выбора рецептов */}
      <RecipePickerModal
        isOpen={isPickerModalOpen}
        onClose={handleClosePickerModal}
        dayKey={selectedMealSlot.dayKey}
        mealType={selectedMealSlot.mealType}
      />

      {/* Менеджер шаблонов недель */}
      <WeekTemplateManager
        isOpen={isTemplateManagerOpen}
        onClose={() => setIsTemplateManagerOpen(false)}
      />

      {/* Модальное окно успешного создания списка покупок */}
      <ShoppingListSuccessModal
        isOpen={showShoppingListModal}
        onClose={handleCloseShoppingListModal}
        listName={generatedListName}
      />
    </div>
  )
}

export default WeeklyCalendar 