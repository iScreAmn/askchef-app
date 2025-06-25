import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../../components/ui/LanguageSwitcher/LanguageSwitcher'
import './ProfilePage.css'

const ProfilePage = () => {
  const { t } = useTranslation()

  return (
    <div className="page-container">
      <h1 className="page-title">{t('navigation.profile')}</h1>
      
      <div className="profile-content">
        <div className="profile-section">
          <h2 className="section-title">{t('profile.settings', 'Настройки')}</h2>
          
          <div className="setting-item">
            <div className="setting-label">
              <h3>{t('profile.language', 'Язык интерфейса')}</h3>
              <p className="setting-description">
                {t('profile.languageDescription', 'Выберите язык для отображения интерфейса приложения')}
              </p>
            </div>
            <div className="setting-control">
              <LanguageSwitcher variant="buttons" />
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <h2 className="section-title">{t('profile.accountInfo', 'Информация об аккаунте')}</h2>
          <p className="section-placeholder">
            {t('profile.inDevelopment', 'Эта секция находится в разработке...')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage 