import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import MenuGuardPage from './pages/AuthPage/MenuGuardPage'
import MenuPlanningPage from './pages/MenuPlanningPage/MenuPlanningPage'
import RecipesPage from './pages/RecipesPage/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage/RecipeDetailPage'
import ShoppingListPage from './pages/ShoppingListPage/ShoppingListPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

function App() {
  // Инициализация темы при загрузке приложения
  useEffect(() => {
    const savedTheme = localStorage.getItem('askchef-theme') || 'light'
    const root = document.documentElement
    
    // Временно отключаем переходы для избежания "мигания"
    root.classList.add('theme-transition-disabled')
    
    if (savedTheme === 'dark') {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }
    
    // Включаем переходы обратно через небольшую задержку
    const timer = setTimeout(() => {
      root.classList.remove('theme-transition-disabled')
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="menu-auth" element={<MenuGuardPage />} />
        <Route path="menu" element={<MenuPlanningPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/:id" element={<RecipeDetailPage />} />
        <Route path="shopping" element={<ShoppingListPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App
