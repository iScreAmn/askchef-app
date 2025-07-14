import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiClock, FiUsers, FiDollarSign, FiTrendingUp, FiPieChart, FiInfo, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useMenuStore } from '../../../store/menuStore'
import './WeekStatsPanel.css'

const WeekStatsPanel = ({ isExpanded = false, onToggleExpanded }) => {
  const { t } = useTranslation()
  const { getCurrentWeekMenu } = useMenuStore()
  
  const weekMenu = getCurrentWeekMenu()
  
  // Вычисляем статистику недели
  const weekStats = useMemo(() => {
    const stats = {
      totalRecipes: 0,
      totalCookingTime: 0,
      totalServings: 0,
      estimatedCost: 0,
      mealDistribution: {
        breakfast: 0,
        lunch: 0,
        dinner: 0
      },
      categories: {},
      difficulties: {
        easy: 0,
        medium: 0,
        hard: 0
      },
      missingMeals: 0,
      completedDays: 0
    }

    if (!weekMenu) return stats

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    const mealTypes = ['breakfast', 'lunch', 'dinner']

    daysOfWeek.forEach(day => {
      const dayMenu = weekMenu[day]
      if (!dayMenu) return

      let dayMealsCompleted = 0

      mealTypes.forEach(mealType => {
        const recipes = dayMenu[mealType] || []
        
        if (recipes.length > 0) {
          dayMealsCompleted++
          stats.mealDistribution[mealType] += recipes.length
          
          recipes.forEach(recipe => {
            stats.totalRecipes++
            stats.totalCookingTime += recipe.cookingTime || 30
            stats.totalServings += recipe.servings || 2
            stats.estimatedCost += recipe.estimatedCost || 15

            // Категории
            if (recipe.category) {
              stats.categories[recipe.category] = (stats.categories[recipe.category] || 0) + 1
            }

            // Сложность
            if (recipe.difficulty) {
              stats.difficulties[recipe.difficulty] = (stats.difficulties[recipe.difficulty] || 0) + 1
            }
          })
        } else {
          stats.missingMeals++
        }
      })

      if (dayMealsCompleted === 3) {
        stats.completedDays++
      }
    })

    return stats
  }, [weekMenu])

  const averageCookingTime = useMemo(() => {
    if (weekStats.totalRecipes === 0) return 0
    return Math.round(weekStats.totalCookingTime / weekStats.totalRecipes)
  }, [weekStats.totalRecipes, weekStats.totalCookingTime])

  const getCompletionPercentage = () => {
    const totalSlots = 21 // 7 дней × 3 приема пищи
    const filledSlots = totalSlots - weekStats.missingMeals
    return Math.round((filledSlots / totalSlots) * 100)
  }

  const getMostPopularCategory = () => {
    const categories = Object.entries(weekStats.categories)
    if (categories.length === 0) return null
    
    return categories.reduce((max, current) => 
      current[1] > max[1] ? current : max
    )[0]
  }

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours > 0) {
      return `${hours}ч ${mins > 0 ? `${mins}мин` : ''}`
    }
    return `${mins}мин`
  }

  const formatCurrency = (amount) => {
    // Форматируем число и добавляем символ лари вручную
    return `${new Intl.NumberFormat('en-US').format(amount)} ₾`
  }

  if (!isExpanded) {
    return (
      <div className="week-stats-panel collapsed">
        <div 
          className="stats-header clickable"
          onClick={onToggleExpanded}
          title={t('menu.showStats')}
        >
          <div className="stats-title">
            <FiPieChart className="stats-icon" />
            <span className="stats-summary">
              {weekStats.totalRecipes} {t('recipes.recipes')} • {getCompletionPercentage()}%
            </span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onToggleExpanded()
            }}
            className="collapse-btn"
            title={t('menu.showStats')}
          >
            <FiChevronDown />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="week-stats-panel expanded">
      <div 
        className="stats-header clickable"
        onClick={onToggleExpanded}
        title={t('menu.hideStats')}
      >
        <div className="stats-title">
          <FiPieChart className="stats-icon" />
          <h3>{t('menu.weekStats')}</h3>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onToggleExpanded()
          }}
          className="collapse-btn"
          title={t('menu.hideStats')}
        >
          <FiChevronUp />
        </button>
      </div>

      <div className="stats-content">
        {/* Основные метрики */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper recipes">
              <FiPieChart />
            </div>
            <div className="stat-info">
              <span className="stat-value">{weekStats.totalRecipes}</span>
              <span className="stat-label">{t('recipes.recipes')}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper time">
              <FiClock />
            </div>
            <div className="stat-info">
              <span className="stat-value">{formatTime(averageCookingTime)}</span>
              <span className="stat-label">{t('menu.avgCookingTime')}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper servings">
              <FiUsers />
            </div>
            <div className="stat-info">
              <span className="stat-value">{weekStats.totalServings}</span>
              <span className="stat-label">{t('menu.servings')}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper cost">
              <span>₾</span>
            </div>
            <div className="stat-info">
              <span className="stat-value">{formatCurrency(weekStats.estimatedCost)}</span>
              <span className="stat-label">{t('menu.estimatedCost')}</span>
            </div>
          </div>
        </div>

        {/* Прогресс заполнения */}
        <div className="completion-section">
          <div className="completion-header">
            <span className="completion-label">{t('menu.weekCompletion')}</span>
            <span className="completion-percentage">{getCompletionPercentage()}%</span>
          </div>
          <div className="completion-bar">
            <div 
              className="completion-fill"
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
          <div className="completion-details">
            <span className="completed-days">
              {weekStats.completedDays}/7 {t('menu.daysCompleted')}
            </span>
            {weekStats.missingMeals > 0 && (
              <span className="missing-meals">
                {weekStats.missingMeals} {t('menu.missingMeals')}
              </span>
            )}
          </div>
        </div>

        {/* Распределение по приемам пищи */}
        <div className="meal-distribution">
          <h4 className="section-title">{t('menu.mealDistribution')}</h4>
          <div className="meal-bars">
            {Object.entries(weekStats.mealDistribution).map(([mealType, count]) => (
              <div key={mealType} className="meal-bar-item">
                <span className="meal-type-label">
                  {t(`menu.${mealType}`)}
                </span>
                <div className="meal-bar">
                  <div 
                    className={`meal-bar-fill ${mealType}`}
                    style={{ width: `${(count / Math.max(...Object.values(weekStats.mealDistribution))) * 100}%` }}
                  />
                </div>
                <span className="meal-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Дополнительная информация */}
        {(getMostPopularCategory() || Object.values(weekStats.difficulties).some(v => v > 0)) && (
          <div className="additional-info">
            {getMostPopularCategory() && (
              <div className="info-item">
                <FiInfo className="info-icon" />
                <span>
                  {t('menu.popularCategory')}: <strong>{getMostPopularCategory()}</strong>
                </span>
              </div>
            )}
            
            {weekStats.difficulties.easy > 0 && (
              <div className="info-item">
                <FiTrendingUp className="info-icon" />
                <span>
                                  {weekStats.difficulties.easy} {t('recipes.difficultyLevels.easy')},
                {weekStats.difficulties.medium} {t('recipes.difficultyLevels.medium')},
                {weekStats.difficulties.hard} {t('recipes.difficultyLevels.hard')}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default WeekStatsPanel 