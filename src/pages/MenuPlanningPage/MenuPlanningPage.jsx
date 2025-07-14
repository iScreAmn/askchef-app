import { useTranslation } from 'react-i18next'
import WeeklyCalendar from '../../components/menu/WeeklyCalendar/WeeklyCalendar'
import './MenuPlanningPage.css'

const MenuPlanningPage = () => {
  const { t } = useTranslation()

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