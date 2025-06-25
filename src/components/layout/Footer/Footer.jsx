import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="copyright">
          © {currentYear} AskChef. Все права защищены.
        </p>
      </div>
    </footer>
  )
}

export default Footer 