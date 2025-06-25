import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../../ui/LanguageSwitcher/LanguageSwitcher'
import './Footer.css'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <p className="copyright">
            © {currentYear} AskChef. {t('footer.allRightsReserved')}.
          </p>
        </div>
        <div className="footer-right">
          <LanguageSwitcher variant="footer" />
        </div>
      </div>
    </footer>
  )
}

export default Footer 