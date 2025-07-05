import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import './CreateCustomListModal.css'

const CreateCustomListModal = ({ isOpen, onClose, onSave }) => {
  const { t } = useTranslation()
  const [listName, setListName] = useState('')

  const handleSave = () => {
    if (listName.trim()) {
      onSave(listName.trim())
      setListName('')
      onClose()
    }
  }

  const handleClose = () => {
    setListName('')
    onClose()
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSave()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('shopping.createCustomList')}
      size="sm"
    >
      <div className="create-list-form">
        <div className="form-group">
          <label htmlFor="listName" className="form-label">
            {t('shopping.listName')}
          </label>
          <input
            id="listName"
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('shopping.listNamePlaceholder')}
            className="form-input"
            autoFocus
          />
        </div>

        <div className="form-actions">
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            {t('common.cancel')}
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!listName.trim()}
          >
            {t('common.save')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateCustomListModal 