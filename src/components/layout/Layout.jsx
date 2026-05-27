import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import ScrollToTop from '../ui/ScrollToTop/ScrollToTop'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import './Layout.css'

const Layout = ({ children }) => {
  const isTouch =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0)

  return (
    <DndProvider
      backend={isTouch ? TouchBackend : HTML5Backend}
      options={isTouch ? { enableMouseEvents: true } : undefined}
    >
      <div className="layout-container">
        <Header />
        <main className="layout-main">
          {children || <Outlet />}
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </DndProvider>
  )
}

export default Layout 