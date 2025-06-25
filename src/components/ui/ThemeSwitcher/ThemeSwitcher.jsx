import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import useTheme from '../../../hooks/useTheme'
import './ThemeSwitcher.css'

const ThemeSwitcher = () => {
  const { t } = useTranslation()
  const { toggleTheme, isDark } = useTheme()

  return (
    <div className="theme-switcher">
      <div className="theme-switcher__content">
        <div className="theme-switcher__info">
          <h3 className="theme-switcher__title">
            {t('profile.theme', 'Тема оформления')}
          </h3>
          <p className="theme-switcher__description">
            {t('profile.themeDescription', 'Выберите светлую или темную тему интерфейса')}
          </p>
        </div>
        
        <div className="theme-switcher__toggle">
          <button
            className={`theme-toggle ${isDark ? 'theme-toggle--dark' : 'theme-toggle--light'}`}
            onClick={toggleTheme}
            aria-label={t('profile.toggleTheme', 'Переключить тему')}
          >
            <div className="theme-toggle__track">
              <div className="theme-toggle__thumb">
                {isDark ? <FiMoon size={16} /> : <FiSun size={16} />}
              </div>
            </div>
          </button>
          
          <span className="theme-switcher__label">
            {isDark 
              ? t('profile.darkTheme', 'Темная тема') 
              : t('profile.lightTheme', 'Светлая тема')
            }
          </span>
        </div>
      </div>
    </div>
  )
}

export default ThemeSwitcher 