import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

const LanguageSwitcher = ({ variant = 'dropdown' }) => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(i18n.language)
  const dropdownRef = useRef(null)

  const languages = [
    { code: 'en', name: 'English', nameRu: 'Английский' },
    { code: 'ru', name: 'Русский', nameRu: 'Русский' }
  ]

  const getLanguageName = (lang) => {
    return currentLang === 'ru' ? lang.nameRu : lang.name
  }

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode)
    // Сохраняем выбранный язык в localStorage
    localStorage.setItem('askchef-language', langCode)
    setCurrentLang(langCode)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Отслеживаем изменения языка
  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(i18n.language)
    }

    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  if (variant === 'buttons') {
    return (
      <div className="language-switcher language-switcher--buttons">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`language-switcher__button ${
              currentLang === lang.code ? 'language-switcher__button--active' : ''
            }`}
            onClick={() => changeLanguage(lang.code)}
            title={getLanguageName(lang)}
          >
            <span className="language-switcher__name">{getLanguageName(lang)}</span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={`language-switcher ${variant === 'footer' ? 'language-switcher--footer' : ''}`} ref={dropdownRef}>
      <button
        className="language-switcher__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="language-switcher__name">{getLanguageName(currentLanguage)}</span>
        <span className={`language-switcher__arrow ${isOpen ? 'language-switcher__arrow--open' : ''}`}>
          {variant === 'footer' ? '▲' : '↓'}
        </span>
      </button>

      {isOpen && (
        <div className="language-switcher__dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-switcher__option ${
                currentLang === lang.code ? 'language-switcher__option--active' : ''
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="language-switcher__name">{getLanguageName(lang)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher 