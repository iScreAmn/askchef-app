import { useTranslation } from 'react-i18next'
import { useMenuStore } from '../../../store/menuStore'
import MealSlot from '../MealSlot/MealSlot'
import './DayColumn.css'

const DayColumn = ({ dayKey, dayName, date }) => {
  const { t } = useTranslation()
  const { mealTypes } = useMenuStore()

  return (
    <div className="day-column">
      <div className="day-header">
        <h3 className="day-name">{dayName}</h3>
        <span className="day-date">{date}</span>
      </div>
      
      <div className="day-meals">
        {mealTypes.map(mealType => (
          <MealSlot 
            key={mealType}
            dayKey={dayKey}
            mealType={mealType}
            mealName={t(`menu.${mealType}`)}
          />
        ))}
      </div>
    </div>
  )
}

export default DayColumn 