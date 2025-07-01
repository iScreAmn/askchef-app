import { useState, useEffect } from 'react'
import { FiChevronUp } from 'react-icons/fi'
import './ScrollToTop.css'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [buttonStyle, setButtonStyle] = useState({})

  // Показываем кнопку когда пользователь прокрутил вниз и контролируем позицию относительно футера
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const footer = document.querySelector('footer')
      
      // Показываем/скрываем кнопку
      if (scrolled > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Проверяем позицию футера
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const bottomMargin = 20 // 2rem в пикселях
        
        // Если футер виден в viewport
        if (footerRect.top < windowHeight) {
          const newBottom = windowHeight - footerRect.top + bottomMargin
          setButtonStyle({ bottom: `${newBottom}px` })
        } else {
          setButtonStyle({ bottom: '2rem' })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Вызываем сразу для начальной позиции
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Плавный скролл наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div 
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      style={buttonStyle}
    >
      <button 
        onClick={scrollToTop}
        className="scroll-button"
        aria-label="Scroll to top"
      >
        <FiChevronUp />
      </button>
    </div>
  )
}

export default ScrollToTop 