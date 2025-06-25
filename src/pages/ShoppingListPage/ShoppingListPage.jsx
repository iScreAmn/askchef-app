import { useTranslation } from 'react-i18next'
import './ShoppingListPage.css'

const ShoppingListPage = () => {
  const { t } = useTranslation()

  return (
    <div className="page-container">
      <h1 className="page-title">{t('navigation.shopping')}</h1>
      <p>Страница списка покупок в разработке...</p>
    </div>
  )
}

export default ShoppingListPage 