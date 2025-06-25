import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import './Layout.css'

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-main">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  )
}

export default Layout 