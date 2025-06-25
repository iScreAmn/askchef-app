import { useState, useEffect } from 'react'

const useTheme = () => {
  // Получаем сохраненную тему или используем светлую по умолчанию
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('askchef-theme')
    return savedTheme || 'light'
  })

  // Применяем тему к document при изменении
  useEffect(() => {
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }
    
    // Сохраняем тему в localStorage
    localStorage.setItem('askchef-theme', theme)
  }, [theme])

  // Функция переключения темы
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  // Функция установки конкретной темы
  const setSpecificTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme)
    }
  }

  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isDark: theme === 'dark'
  }
}

export default useTheme 