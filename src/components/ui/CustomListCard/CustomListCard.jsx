import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FiX, FiCheck } from 'react-icons/fi'
import { MdModeEditOutline } from 'react-icons/md'
import { useDrag, useDrop } from 'react-dnd'
import './CustomListCard.css'

const CustomListCard = ({ 
  list, 
  index, 
  moveCard, 
  onRemoveList, 
  onAddItem, 
  onRemoveItem, 
  onToggleItem,
  newItemInputs,
  onInputChange,
  editingItem,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
  editingItemText,
  onEditingTextChange
}) => {
  const { t } = useTranslation()
  const ref = useRef(null)

  const [{ isOver }, drop] = useDrop({
    accept: 'CUSTOM_LIST',
    hover: (item, monitor) => {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

      const hoverRect = ref.current.getBoundingClientRect()
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return

      const diff = monitor.getDifferenceFromInitialOffset()
      const isHorizontal = diff && Math.abs(diff.x) > Math.abs(diff.y)

      if (isHorizontal) {
        const hoverMiddleX = (hoverRect.right - hoverRect.left) / 2
        const hoverClientX = clientOffset.x - hoverRect.left
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return
      } else {
        const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2
        const hoverClientY = clientOffset.y - hoverRect.top
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'CUSTOM_LIST',
    item: () => ({ id: list.id, index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  // Make the entire card draggable and droppable
  drop(ref)
  drag(ref)

  const handleRemoveList = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onRemoveList(list.id)
  }

  const handleAddItem = () => {
    const itemName = newItemInputs[list.id]?.trim()
    if (itemName) {
      onAddItem(list.id, itemName)
    }
  }

  const handleInputChange = (value) => {
    onInputChange(list.id, value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem()
    }
  }

  const startEditingItem = (itemId, itemName) => {
    onStartEditing(list.id, itemId, itemName)
  }

  const saveEditingItem = (itemId) => {
    onSaveEditing(list.id, itemId)
  }

  const cancelEditingItem = () => {
    onCancelEditing()
  }

  return (
    <div
      ref={ref}
      className={`custom-list-card ${isDragging ? 'dragging' : ''} ${isOver ? 'drag-over' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}
    >
      <div className="custom-list-header">
        <h3>{list.name}</h3>
        <button 
          className="remove-list-button"
          onClick={handleRemoveList}
          title={t('shopping.removeList')}
        >
          <FiX />
        </button>
      </div>

      <div className="custom-list-items">
        {list.items.map(item => {
          const isEditing = editingItem && editingItem.listId === list.id && editingItem.itemId === item.id
          
          return (
            <div key={item.id} className="custom-list-item">
              {isEditing ? (
                // Режим редактирования
                <div className="edit-item-form">
                  <input
                    type="text"
                    value={editingItemText}
                    onChange={(e) => onEditingTextChange(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        saveEditingItem(item.id)
                      } else if (e.key === 'Escape') {
                        cancelEditingItem()
                      }
                    }}
                    onBlur={() => saveEditingItem(item.id)}
                    className="edit-item-input"
                    autoFocus
                  />
                  <div className="edit-item-buttons">
                    <button
                      onClick={() => saveEditingItem(item.id)}
                      className="save-edit-button"
                      title={t('shopping.saveEdit')}
                    >
                      <FiCheck />
                    </button>
                    <button
                      onClick={cancelEditingItem}
                      className="cancel-edit-button"
                      title={t('shopping.cancelEdit')}
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              ) : (
                // Обычный режим отображения
                <>
                  <label className={`custom-item-checkbox ${item.checked ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => onToggleItem(list.id, item.id)}
                    />
                    <span className="custom-item-text">{item.name}</span>
                  </label>
                  <div className="item-actions">
                    <button 
                      className={`edit-item-button ${item.checked ? 'edit-item-button--disabled' : ''}`}
                      onClick={() => !item.checked && startEditingItem(item.id, item.name)}
                      disabled={item.checked}
                      title={item.checked ? t('shopping.editDisabledChecked') : t('shopping.editItem')}
                    >
                      <MdModeEditOutline />
                    </button>
                    <button 
                      className="remove-item-button"
                      onClick={() => onRemoveItem(list.id, item.id)}
                      title={t('shopping.removeItem')}
                    >
                      <FiX />
                    </button>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Форма добавления нового элемента */}
      <div className="add-item-form">
        <div className="add-item-input-group">
          <input
            type="text"
            value={newItemInputs[list.id] || ''}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('shopping.addItemPlaceholder')}
            className="add-item-input"
          />
          <button
            onClick={handleAddItem}
            disabled={!newItemInputs[list.id]?.trim()}
            className="add-item-button"
            title={t('shopping.addItem')}
          >
            <FiCheck />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomListCard
