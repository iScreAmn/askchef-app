import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi'
import { useMenuStore } from '../../../store/menuStore'
import DayColumn from '../DayColumn/DayColumn'
import RecipeSidebar from '../RecipeSidebar/RecipeSidebar'
import './WeeklyCalendar.css'

const WeeklyCalendar = () => {
  const { t } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const {
    currentWeekStart,
    initializeCurrentWeek,
    goToNextWeek,
    goToPreviousWeek
  } = useMenuStore()
  
  // Инициализируем текущую неделю при первом рендере
  useState(() => {
    if (!currentWeekStart) {
      initializeCurrentWeek()
    }
  })

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
        formatted: date.toLocaleDateString('ru-RU', { 
          day: 'numeric', 
          month: 'short' 
        })
      })
    }
    
    return weekDays
  }

  const weekDays = getWeekDays()

  // Форматируем период недели для заголовка
  const getWeekPeriod = () => {
    if (!currentWeekStart) return ''
    
    const endDate = new Date(currentWeekStart)
    endDate.setDate(currentWeekStart.getDate() + 6)
    
    const startFormatted = currentWeekStart.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short'
    })
    
    const endFormatted = endDate.toLocaleDateString('ru-RU', {
      day: 'numeric', 
      month: 'short'
    })
    
    return `${startFormatted} - ${endFormatted}`
  }

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
        
        {/* Кнопка добавления рецептов */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="add-recipes-button"
          title={t('menu.addRecipe')}
        >
          <FiPlus />
          <span>{t('menu.addRecipe')}</span>
        </button>
      </div>

      {/* Сетка дней недели */}
      <div className="calendar-grid">
        {weekDays.map(day => (
          <DayColumn
            key={day.key}
            dayKey={day.key}
            dayName={day.dayName}
            date={day.formatted}
          />
        ))}
      </div>
      
      {/* Sidebar с рецептами */}
      <RecipeSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  )
}

export default WeeklyCalendar 