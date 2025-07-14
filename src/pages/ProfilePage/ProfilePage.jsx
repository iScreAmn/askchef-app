import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiUser, FiCamera, FiEdit2, FiSave, FiX, FiLogOut } from 'react-icons/fi'
import { useAuthStore } from '../../store/authStore'
import LanguageSwitcher from '../../components/ui/LanguageSwitcher/LanguageSwitcher'
import ThemeSwitcher from '../../components/ui/ThemeSwitcher/ThemeSwitcher'
import Button from '../../components/ui/Button/Button'
import './ProfilePage.css'

const ProfilePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, logout, updateProfile } = useAuthStore()
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || '')
  const fileInputRef = useRef(null)

  const handleNameEdit = () => {
    setIsEditingName(true)
    setEditedName(user?.name || '')
  }

  const handleNameSave = () => {
    if (editedName.trim()) {
      updateProfile({ name: editedName.trim() })
      setIsEditingName(false)
    }
  }

  const handleNameCancel = () => {
    setIsEditingName(false)
    setEditedName(user?.name || '')
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        updateProfile({ avatar: e.target?.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{t('navigation.profile')}</h1>
      
      <div className="profile-content">
        <div className="profile-section">
          <h2 className="section-title">{t('profile.accountInfo')}</h2>
          
          <div className="profile-user-info">
            <div className="avatar-section">
              <div className="avatar-container" onClick={handleAvatarClick}>
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="user-avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    <FiUser size={32} />
                  </div>
                )}
                <div className="avatar-overlay">
                  <FiCamera size={20} />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <p className="avatar-hint">{t('profile.avatarHint')}</p>
            </div>

            <div className="name-section">
              <label className="field-label">{t('profile.userName')}</label>
              <div className="name-edit-container">
                {isEditingName ? (
                  <div className="name-edit-form">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="name-input"
                      placeholder={t('profile.userNamePlaceholder')}
                      autoFocus
                    />
                    <div className="edit-buttons">
                      <button 
                        onClick={handleNameSave}
                        className="save-button"
                        disabled={!editedName.trim()}
                      >
                        <FiSave size={16} />
                      </button>
                      <button 
                        onClick={handleNameCancel}
                        className="cancel-button"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="name-display">
                    <span className="user-name">{user?.name}</span>
                    <button onClick={handleNameEdit} className="edit-name-button">
                      <FiEdit2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="email-section">
              <label className="field-label">{t('profile.email')}</label>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>

          
        </div>

        <div className="profile-section">
          <h2 className="section-title">{t('profile.settings')}</h2>
          
          <div className="setting-item">
            <div className="setting-label">
              <h3>{t('profile.language')}</h3>
              <p className="setting-description">
                {t('profile.languageDescription')}
              </p>
            </div>
            <div className="setting-control">
              <LanguageSwitcher variant="buttons" />
            </div>
          </div>
          
          <ThemeSwitcher />
          <div className="logout-section">
            <Button
              variant="outline"
              onClick={handleLogout}
              icon={<FiLogOut />}
              className="logout-button"
            >
              {t('auth.logout')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage 