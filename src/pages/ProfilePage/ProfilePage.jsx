import { useTranslation } from 'react-i18next'
import './ProfilePage.css'

const ProfilePage = () => {
  const { t } = useTranslation()

  return (
    <div className="page-container">
      <h1 className="page-title">{t('navigation.profile')}</h1>
      <p>Страница профиля в разработке...</p>
    </div>
  )
}

export default ProfilePage 