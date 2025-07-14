import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/authStore'
import WeeklyCalendar from '../../components/menu/WeeklyCalendar/WeeklyCalendar'
import './MenuPlanningPage.css'

const MenuPlanningPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/menu-auth')
    }
  }, [isAuthenticated, navigate])

  // Показываем пустую страницу во время перенаправления
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="menu-planning-page">
      <div className="menu-planning-page-header">
        <h1 className="page-title">{t('menu.weeklyMenu')}</h1>
        <p className="page-subtitle">{t('menu.weeklyMenuDescription')}</p>
      </div>
      
      <div className="menu-planning-content">
        <WeeklyCalendar />
      </div>
    </div>
  )
}

export default MenuPlanningPage 