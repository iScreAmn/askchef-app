import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'
import { useAuthStore } from '../../../store/authStore'
import { logo } from '../../../assets/images'
import Button from '../../ui/Button/Button'
import './Header.css'

const Header = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', key: 'home' },
    { path: '/menu', key: 'menu' },
    { path: '/recipes', key: 'recipes' },
    { path: '/shopping', key: 'shopping' }
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="header-container">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src={logo} alt="AskChef" className="logo-image" />
          AskChef
        </Link>

        <nav className={`nav ${isMobileMenuOpen ? 'nav--open' : 'nav--closed'}`}>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'nav-link--active' : ''}`}
                onClick={closeMobileMenu}
              >
                {t(`navigation.${item.key}`)}
              </Link>
            ))}
          </div>

          <div className="user-section">
            {isAuthenticated ? (
              <>
                <div className="user-info">
                  <FiUser />
                  <span>{user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  icon={<FiLogOut />}
                >
                  {t('auth.logout')}
                </Button>
                <Link
                  to="/profile"
                  className={`nav-link ${location.pathname === '/profile' ? 'nav-link--active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {t('navigation.profile')}
                </Link>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  navigate('/auth')
                  closeMobileMenu()
                }}
              >
                {t('auth.login')}
              </Button>
            )}
          </div>
        </nav>

        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  )
}

export default Header 