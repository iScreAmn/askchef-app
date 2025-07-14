import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../components/ui/Button/Button'
import { useAuthStore } from '../../store/authStore'
import mestoImage from '../../assets/images/covers/mesto_image.png'
import './MenuGuardPage.css'

const MenuGuardPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, register, isLoading, error } = useAuthStore()
  const [activeTab, setActiveTab] = useState('login')

  // Схемы валидации
  const loginSchema = yup.object({
    email: yup
      .string()
      .email('Неверный формат email')
      .required('Email обязателен'),
    password: yup
      .string()
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .required('Пароль обязателен')
  })

  const registerSchema = yup.object({
    name: yup
      .string()
      .min(2, 'Имя должно содержать минимум 2 символа')
      .required('Имя обязательно'),
    email: yup
      .string()
      .email('Неверный формат email')
      .required('Email обязателен'),
    password: yup
      .string()
      .min(6, 'Пароль должен содержать минимум 6 символов')
      .required('Пароль обязателен'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли не совпадают')
      .required('Подтверждение пароля обязательно')
  })

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(activeTab === 'login' ? loginSchema : registerSchema)
  })

  const onSubmit = async (data) => {
    try {
      if (activeTab === 'login') {
        await login(data)
      } else {
        await register(data)
      }
      navigate('/menu')
    } catch (err) {
      console.error('Auth error:', err)
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    reset()
  }

  return (
    <div className="menu-guard-container">
      <div className="menu-guard-image-section">
        <img 
          src={mestoImage} 
          alt="AskChef Menu Planning" 
          className="menu-guard-image"
        />
      </div>

      <div className="menu-guard-form-section">
        <div className="menu-guard-card">
          <h1 className="menu-guard-title">
            {t('menuGuard.title')}
          </h1>
          <p className="menu-guard-subtitle">
            {t('menuGuard.subtitle')}
          </p>

          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === 'login' ? 'tab-button--active' : 'tab-button--inactive'}`}
              onClick={() => handleTabChange('login')}
              type="button"
            >
              {t('auth.login')}
            </button>
            <button
              className={`tab-button ${activeTab === 'register' ? 'tab-button--active' : 'tab-button--inactive'}`}
              onClick={() => handleTabChange('register')}
              type="button"
            >
              {t('auth.register')}
            </button>
          </div>

          <form className="menu-guard-form" onSubmit={handleSubmit(onSubmit)}>
            {activeTab === 'register' && (
              <div className="form-group">
                <label className="form-label">{t('auth.name')}</label>
                <input
                  {...formRegister('name')}
                  type="text"
                  placeholder={t('auth.name')}
                  className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">{t('auth.email')}</label>
              <input
                {...formRegister('email')}
                type="email"
                placeholder={t('auth.email')}
                className={`form-input ${errors.email ? 'form-input--error' : ''}`}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">{t('auth.password')}</label>
              <input
                {...formRegister('password')}
                type="password"
                placeholder={t('auth.password')}
                className={`form-input ${errors.password ? 'form-input--error' : ''}`}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            {activeTab === 'register' && (
              <div className="form-group">
                <label className="form-label">{t('auth.confirmPassword')}</label>
                <input
                  {...formRegister('confirmPassword')}
                  type="password"
                  placeholder={t('auth.confirmPassword')}
                  className={`form-input ${errors.confirmPassword ? 'form-input--error' : ''}`}
                />
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword.message}</span>
                )}
              </div>
            )}

            {error && (
              <span className="error-message">{error}</span>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
            >
              {activeTab === 'login' ? t('menuGuard.loginToAccess') : t('menuGuard.registerToAccess')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MenuGuardPage 