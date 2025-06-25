import { useTranslation } from 'react-i18next'
import './MenuPlanningPage.css'

const MenuPlanningPage = () => {
  const { t } = useTranslation()

  return (
    <div className="page-container">
      <h1 className="page-title">{t('menu.weeklyMenu')}</h1>
      <p>Страница планирования меню в разработке...</p>
    </div>
  )
}

export default MenuPlanningPage 