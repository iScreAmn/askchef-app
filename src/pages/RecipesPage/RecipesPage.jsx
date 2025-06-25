import { useTranslation } from 'react-i18next'
import './RecipesPage.css'

const RecipesPage = () => {
  const { t } = useTranslation()

  return (
    <div className="page-container">
      <h1 className="page-title">{t('navigation.recipes')}</h1>
      <p>Страница рецептов в разработке...</p>
    </div>
  )
}

export default RecipesPage 