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
            {t('profile.theme')}
          </h3>
          <p className="theme-switcher__description">
            {t('profile.themeDescription')}
          </p>
        </div>
        
        <div className="theme-switcher__toggle">
          <button
            className={`theme-toggle ${isDark ? 'theme-toggle--dark' : 'theme-toggle--light'}`}
            onClick={toggleTheme}
            aria-label={t('profile.toggleTheme')}
          >
            <div className="theme-toggle__track">
              <div className="theme-toggle__thumb">
                {isDark ? <FiMoon size={16} /> : <FiSun size={16} />}
              </div>
            </div>
          </button>
          
          <span className="theme-switcher__label">
            {isDark 
              ? t('profile.darkTheme') 
              : t('profile.lightTheme')
            }
          </span>
        </div>
      </div>
    </div>
  )
}

export default ThemeSwitcher 