import { useNavigate } from 'react-router-dom'
import { FiCalendar, FiBook, FiShoppingCart, FiUser } from 'react-icons/fi'
import Button from '../../components/ui/Button/Button'
import { useAuthStore } from '../../store/authStore'
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  const features = [
    {
      icon: <FiCalendar />,
      title: 'Планирование меню',
      description: 'Составляйте меню на неделю и никогда не думайте о том, что приготовить'
    },
    {
      icon: <FiBook />,
      title: 'База рецептов',
      description: 'Тысячи проверенных рецептов с пошаговыми инструкциями'
    },
    {
      icon: <FiShoppingCart />,
      title: 'Список покупок',
      description: 'Автоматическая генерация списка покупок на основе вашего меню'
    },
    {
      icon: <FiUser />,
      title: 'AI помощник',
      description: 'Умный бот подскажет рецепты из имеющихся ингредиентов'
    }
  ]

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/menu')
    } else {
      navigate('/auth')
    }
  }

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">AskChef</h1>
          <p className="hero-subtitle">
            Планировщик рецептов и покупок для умной кухни
          </p>
          <div className="cta-buttons">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleGetStarted}
            >
              Начать планирование
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/recipes')}
            >
              Смотреть рецепты
            </Button>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-content">
          <h2 className="features-title">Возможности AskChef</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage 