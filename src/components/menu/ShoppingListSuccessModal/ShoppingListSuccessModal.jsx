import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { FiCheck, FiShoppingCart, FiArrowRight } from 'react-icons/fi'
import Modal from '../../ui/Modal/Modal'
import './ShoppingListSuccessModal.css'

const ShoppingListSuccessModal = ({ isOpen, onClose, listName }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleGoToShoppingList = () => {
    navigate('/shopping', { state: { scrollToWeeklyList: true } })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('menu.shoppingListCreated')}
      size="small"
      className="shopping-list-success-modal"
    >
      <div className="success-modal-content">
        <div className="success-icon-wrapper">
          <FiCheck className="success-icon" />
        </div>
        <h3 className="success-title">{t('menu.shoppingListGenerated')}</h3>
        <p className="success-message">
          <FiShoppingCart className="shopping-icon" />
          <strong>{listName}</strong> {t('menu.shoppingListReady')}
        </p>
        <div className="success-actions">
          <button 
            onClick={handleGoToShoppingList} 
            className="success-primary-button"
          >
            <FiArrowRight />
            {t('menu.goToShoppingList')}
          </button>
          <button 
            onClick={onClose} 
            className="success-secondary-button"
          >
            {t('menu.excellent')}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ShoppingListSuccessModal 