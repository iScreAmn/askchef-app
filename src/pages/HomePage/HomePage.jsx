import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiCalendar, FiBook, FiShoppingCart, FiUser } from 'react-icons/fi'
import Button from '../../components/ui/Button/Button'
import { useAuthStore } from '../../store/authStore'
import './HomePage.css'

const HomePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  const features = [
    {
      icon: <FiCalendar />,
      title: t('home.features.menuPlanning.title'),
      description: t('home.features.menuPlanning.description')
    },
    {
      icon: <FiBook />,
      title: t('home.features.recipeDatabase.title'),
      description: t('home.features.recipeDatabase.description')
    },
    {
      icon: <FiShoppingCart />,
      title: t('home.features.shoppingList.title'),
      description: t('home.features.shoppingList.description')
    },
    {
      icon: <FiUser />,
      title: t('home.features.aiAssistant.title'),
      description: t('home.features.aiAssistant.description')
    }
  ]

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/menu')
    } else {
      navigate('/menu-auth')
    }
  }

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{t('home.title')}</h1>
          <p className="hero-subtitle">
            {t('home.subtitle')}
          </p>
          <div className="cta-buttons">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleGetStarted}
            >
              {t('home.getStarted')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/recipes')}
            >
              {t('home.viewRecipes')}
            </Button>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-content">
          <h2 className="features-title">{t('home.featuresTitle')}</h2>
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