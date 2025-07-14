import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSave, FiDownload, FiTrash2, FiEdit, FiPlus, FiCopy } from 'react-icons/fi'
import { useMenuStore } from '../../../store/menuStore'
import Modal from '../../ui/Modal/Modal'
import './WeekTemplateManager.css'

const WeekTemplateManager = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')
  
  const {
    weekTemplates,
    saveWeekAsTemplate,
    loadWeekTemplate,
    deleteWeekTemplate,
    getCurrentWeekMenu
  } = useMenuStore()

  const currentWeek = getCurrentWeekMenu()
  const hasRecipes = currentWeek && Object.values(currentWeek).some(day =>
    Object.values(day || {}).some(meal => meal && meal.length > 0)
  )

  const handleSaveTemplate = () => {
    if (!templateName.trim()) return
    
    saveWeekAsTemplate(templateName, templateDescription)
    setTemplateName('')
    setTemplateDescription('')
    setShowCreateModal(false)
    setEditingTemplate(null)
  }

  const handleLoadTemplate = (template) => {
    if (window.confirm(t('menu.confirmLoadTemplate'))) {
      loadWeekTemplate(template.id)
      onClose()
    }
  }

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm(t('menu.confirmDeleteTemplate'))) {
      deleteWeekTemplate(templateId)
    }
  }

  const handleEditTemplate = (template) => {
    setEditingTemplate(template)
    setTemplateName(template.name)
    setTemplateDescription(template.description || '')
    setShowCreateModal(true)
  }

  const openCreateModal = () => {
    setEditingTemplate(null)
    setTemplateName('')
    setTemplateDescription('')
    setShowCreateModal(true)
  }

  const closeCreateModal = () => {
    setShowCreateModal(false)
    setEditingTemplate(null)
    setTemplateName('')
    setTemplateDescription('')
  }

  const getTemplateStats = (template) => {
    const stats = { recipes: 0, meals: 0 }
    if (!template.weekData) return stats

    Object.values(template.weekData).forEach(day => {
      if (!day) return
      Object.values(day).forEach(meal => {
        if (meal && meal.length > 0) {
          stats.meals++
          stats.recipes += meal.length
        }
      })
    })

    return stats
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t('menu.weekTemplates')}
        size="large"
        className="week-template-manager"
      >
        <div className="template-manager-content">
          {/* Заголовок с кнопкой создания */}
          <div className="template-header">
            <div className="template-info">
              <p className="template-description">
                {t('menu.templateDescription')}
              </p>
            </div>
            
            <button
              onClick={openCreateModal}
              className="create-template-btn"
              disabled={!hasRecipes}
              title={!hasRecipes ? t('menu.needRecipesToSave') : t('menu.saveCurrentWeek')}
            >
              <FiSave />
              {t('menu.saveAsTemplate')}
            </button>
          </div>

          {/* Список шаблонов */}
          <div className="templates-list">
            {weekTemplates.length > 0 ? (
              weekTemplates.map(template => {
                const stats = getTemplateStats(template)
                
                return (
                  <div key={template.id} className="template-card">
                    <div className="template-main">
                      <div className="template-info">
                        <h3 className="template-name">{template.name}</h3>
                        {template.description && (
                          <p className="template-description">{template.description}</p>
                        )}
                        
                        <div className="template-stats">
                          <span className="stat-item">
                            {stats.recipes} {t('recipes.recipes')}
                          </span>
                          <span className="stat-item">
                            {stats.meals} {t('menu.filledMeals')}
                          </span>
                          <span className="stat-item">
                            {new Date(template.createdAt).toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'en-US')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="template-actions">
                        <button
                          onClick={() => handleLoadTemplate(template)}
                          className="template-action-btn primary"
                          title={t('menu.loadTemplate')}
                        >
                          <FiDownload />
                        </button>
                        
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="template-action-btn secondary"
                          title={t('menu.editTemplate')}
                        >
                          <FiEdit />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="template-action-btn danger"
                          title={t('menu.deleteTemplate')}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="no-templates">
                <div className="no-templates-icon">
                  <FiCopy />
                </div>
                <h3>{t('menu.noTemplates')}</h3>
                <p>{t('menu.noTemplatesDescription')}</p>
                {hasRecipes && (
                  <button
                    onClick={openCreateModal}
                    className="create-first-template-btn"
                  >
                    <FiPlus />
                    {t('menu.createFirstTemplate')}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Модальное окно создания/редактирования шаблона */}
      <Modal
        isOpen={showCreateModal}
        onClose={closeCreateModal}
        title={editingTemplate ? t('menu.editTemplate') : t('menu.createTemplate')}
        size="medium"
      >
        <div className="create-template-form">
          <div className="form-group">
            <label className="form-label">
              {t('menu.templateName')} *
            </label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder={t('menu.templateNamePlaceholder')}
              className="form-input"
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {t('menu.templateDescription')}
            </label>
            <textarea
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              placeholder={t('menu.templateDescriptionPlaceholder')}
              className="form-textarea"
              rows={3}
              maxLength={200}
            />
          </div>

          <div className="form-actions">
            <button
              onClick={closeCreateModal}
              className="form-button secondary"
            >
              {t('common.cancel')}
            </button>
            
            <button
              onClick={handleSaveTemplate}
              className="form-button primary"
              disabled={!templateName.trim()}
            >
              <FiSave />
              {editingTemplate ? t('common.save') : t('menu.createTemplate')}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default WeekTemplateManager 