import { useTranslation } from 'react-i18next'
import MealSlot from '../MealSlot/MealSlot'
import './DayColumn.css'

const DayColumn = ({ dayKey, dayName, date, onAddRecipe }) => {
  const { t } = useTranslation()
  
  const mealTypes = [
    { key: 'breakfast', name: t('menu.breakfast') },
    { key: 'lunch', name: t('menu.lunch') },
    { key: 'dinner', name: t('menu.dinner') }
  ]

  return (
    <div className="day-column">
      <div className="day-header">
        <h3 className="day-name">{dayName}</h3>
        <span className="day-date">{date}</span>
      </div>
      
      <div className="day-meals">
        {mealTypes.map(meal => (
          <MealSlot
            key={meal.key}
            dayKey={dayKey}
            mealType={meal.key}
            mealName={meal.name}
            onAddRecipe={onAddRecipe}
          />
        ))}
      </div>
    </div>
  )
}

export default DayColumn 