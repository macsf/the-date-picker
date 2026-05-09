import { useState } from 'react'

interface HolidayInfo {
  name: string
  dotColor: string
}

interface DayCellProps {
  date: Date
  isCurrentMonth: boolean
  isSelected: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isInRange: boolean
  isRowStart: boolean
  isRowEnd: boolean
  isDisabled: boolean
  isToday: boolean
  isWeekend: boolean
  holidays: HolidayInfo[]
  onClick: (date: Date) => void
  onMouseEnter: (date: Date) => void
  onMouseLeave: () => void
}

export function DayCell({
  date,
  isCurrentMonth,
  isSelected,
  isRangeStart,
  isRangeEnd,
  isInRange,
  isRowStart,
  isRowEnd,
  isDisabled,
  isToday,
  isWeekend,
  holidays,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: DayCellProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const dayNumber = date.getDate()

  const classNames = ['dp-day']
  if (!isCurrentMonth) classNames.push('dp-day--other-month')
  if (isDisabled) classNames.push('dp-day--disabled')
  if (isToday) classNames.push('dp-day--today')
  if (isWeekend) classNames.push('dp-day--weekend')
  if (isSelected || isRangeStart || isRangeEnd) classNames.push('dp-day--selected')
  if (isInRange) classNames.push('dp-day--in-range')
  if (isRangeStart) classNames.push('dp-day--range-start')
  if (isRangeEnd) classNames.push('dp-day--range-end')
  if (isInRange && isRowStart) classNames.push('dp-day--row-start')
  if (isInRange && isRowEnd) classNames.push('dp-day--row-end')

  const label = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="dp-day-wrapper">
      {/* Range fill background layer */}
      {(isInRange || isRangeStart || isRangeEnd) && (
        <div
          className={[
            'dp-range-fill',
            isRangeStart ? 'dp-range-fill--start' : '',
            isRangeEnd ? 'dp-range-fill--end' : '',
            isRowStart && isInRange ? 'dp-range-fill--row-start' : '',
            isRowEnd && isInRange ? 'dp-range-fill--row-end' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        />
      )}
      <button
        className={classNames.join(' ')}
        onClick={() => !isDisabled && onClick(date)}
        onMouseEnter={() => !isDisabled && onMouseEnter(date)}
        onMouseLeave={onMouseLeave}
        disabled={isDisabled}
        aria-label={label}
        aria-pressed={isSelected || isRangeStart || isRangeEnd}
        tabIndex={isCurrentMonth && !isDisabled ? 0 : -1}
        type="button"
      >
        <span className="dp-day-number">{dayNumber}</span>
        {holidays.length > 0 && (
          <span
            className="dp-holiday-dots"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            {holidays.slice(0, 2).map((h, i) => (
              <span
                key={i}
                className="dp-holiday-dot"
                style={{ backgroundColor: h.dotColor }}
                aria-hidden="true"
              />
            ))}
            {tooltipVisible && (
              <span className="dp-holiday-tooltip" role="tooltip">
                {holidays.map((h) => h.name).join(', ')}
              </span>
            )}
          </span>
        )}
      </button>
    </div>
  )
}
