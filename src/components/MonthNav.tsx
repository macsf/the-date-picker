import { addMonths, getMonth, getYear } from 'date-fns'

interface MonthNavProps {
  month: Date
  onPrev: () => void
  onNext: () => void
  onMonthSelect: (month: number) => void
  onYearSelect: (year: number) => void
  locale: 'th' | 'en'
  calendarSystem: 'gregorian' | 'buddhist'
  minDate?: Date
  maxDate?: Date
}

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const MONTHS_TH = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
]

export function MonthNav({
  month,
  onPrev,
  onNext,
  onMonthSelect,
  onYearSelect,
  locale,
  calendarSystem,
  minDate,
  maxDate,
}: MonthNavProps) {
  const currentMonth = getMonth(month)
  const currentYear = getYear(month)
  const months = locale === 'th' ? MONTHS_TH : MONTHS_EN

  // Year range: 10 years back and 10 years forward from current
  const years: number[] = []
  for (let y = currentYear - 10; y <= currentYear + 10; y++) {
    years.push(y)
  }

  const prevDisabled = minDate
    ? addMonths(month, -1) < new Date(minDate.getFullYear(), minDate.getMonth(), 1)
    : false
  const nextDisabled = maxDate
    ? addMonths(month, 1) > new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)
    : false

  return (
    <div className="dp-month-nav">
      <button
        className="dp-nav-btn"
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label="Previous month"
      >
        ‹
      </button>
      <div className="dp-month-year-labels">
        <select
          className="dp-month-select"
          value={currentMonth}
          onChange={(e) => onMonthSelect(Number(e.target.value))}
          aria-label="Select month"
        >
          {months.map((m, i) => (
            <option key={i} value={i}>
              {m}
            </option>
          ))}
        </select>
        <select
          className="dp-year-select"
          value={currentYear}
          onChange={(e) => onYearSelect(Number(e.target.value))}
          aria-label="Select year"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {calendarSystem === 'buddhist' ? y + 543 : y}
            </option>
          ))}
        </select>
      </div>
      <button
        className="dp-nav-btn"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="Next month"
      >
        ›
      </button>
    </div>
  )
}
