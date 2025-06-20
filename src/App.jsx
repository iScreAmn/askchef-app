import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import MenuPlanningPage from './pages/MenuPlanningPage/MenuPlanningPage'
import RecipesPage from './pages/RecipesPage/RecipesPage'
import ShoppingListPage from './pages/ShoppingListPage/ShoppingListPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="menu" element={<MenuPlanningPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="shopping" element={<ShoppingListPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App
