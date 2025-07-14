import { useTranslation } from 'react-i18next'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import './ConfirmationModal.css'

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}) => {
  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
      <div className="confirmation-modal-content">
        {message && <p className="confirmation-message">{message}</p>}
        <div className="confirmation-actions">
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {t('auth.logout')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmationModal 