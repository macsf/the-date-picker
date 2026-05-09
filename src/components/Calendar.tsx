import { useCallback } from 'react'
import { isSameDay, isWithinInterval, startOfDay } from 'date-fns'
import { buildCalendarGrid, getWeekNumber } from '../utils/calendar'
import { isDisabled as checkDisabled } from '../utils/disabled'
import { DayCell } from './DayCell'
import { MonthNav } from './MonthNav'
import { WeekNumbers } from './WeekNumbers'
import { useHolidays, type HolidayEntry } from '../hooks/useHolidays'
import type { CustomHolidayConfig } from './DatePicker'

const WEEKDAY_LABELS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const WEEKDAY_LABELS_TH = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']

interface CalendarProps {
  month: Date
  onMonthChange: (month: Date) => void
  selectionMode: 'single' | 'range'
  selectedDate: Date | null
  rangeValue: [Date, Date] | null
  previewRange: [Date, Date] | null
  onDayClick: (date: Date) => void
  onDayHover: (date: Date | null) => void
  locale: 'th' | 'en'
  calendarSystem: 'gregorian' | 'buddhist'
  weekStartsOn: 0 | 1
  showWeekNumbers: boolean
  showHolidays: boolean
  holidayTypes: Array<'public' | 'bank' | 'observance'>
  customHolidays: CustomHolidayConfig[]
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  // aria-live announcement target
  onAnnounce: (msg: string) => void
}

export function Calendar({
  month,
  onMonthChange,
  selectionMode,
  selectedDate,
  rangeValue,
  previewRange,
  onDayClick,
  onDayHover,
  locale,
  calendarSystem,
  weekStartsOn,
  showWeekNumbers,
  showHolidays,
  holidayTypes,
  customHolidays,
  minDate,
  maxDate,
  disabledDates,
  onAnnounce,
}: CalendarProps) {
  const { weeks } = buildCalendarGrid(month, weekStartsOn)
  const year = month.getFullYear()
  const rawHolidays = useHolidays(year, locale, holidayTypes, showHolidays)

  // Build a map of date-string -> holiday info for O(1) lookup
  const holidayMap = new Map<string, { name: string; dotColor: string }[]>()

  rawHolidays.forEach((h: HolidayEntry) => {
    const key = h.date.slice(0, 10)
    const existing = holidayMap.get(key) ?? []
    existing.push({ name: h.name, dotColor: '#EF4444' })
    holidayMap.set(key, existing)
  })

  // Custom holidays override built-in by date key
  customHolidays.forEach((ch) => {
    const name = locale === 'th' ? ch.nameTH : ch.nameEN
    holidayMap.set(ch.date, [{ name, dotColor: ch.dotColor ?? '#EF4444' }])
  })

  const weekdays = locale === 'th' ? WEEKDAY_LABELS_TH : WEEKDAY_LABELS_EN
  const orderedWeekdays =
    weekStartsOn === 1
      ? [...weekdays.slice(1), weekdays[0]]
      : weekdays

  const weekNumbers = weeks.map((w) => getWeekNumber(w[0].date, weekStartsOn))

  const handlePrev = useCallback(() => {
    const next = new Date(month.getFullYear(), month.getMonth() - 1, 1)
    onMonthChange(next)
    const label = next.toLocaleString(locale === 'th' ? 'th-TH' : 'en-US', {
      month: 'long',
      year: 'numeric',
    })
    onAnnounce(label)
  }, [month, onMonthChange, locale, onAnnounce])

  const handleNext = useCallback(() => {
    const next = new Date(month.getFullYear(), month.getMonth() + 1, 1)
    onMonthChange(next)
    const label = next.toLocaleString(locale === 'th' ? 'th-TH' : 'en-US', {
      month: 'long',
      year: 'numeric',
    })
    onAnnounce(label)
  }, [month, onMonthChange, locale, onAnnounce])

  const handleMonthSelect = useCallback(
    (m: number) => {
      onMonthChange(new Date(month.getFullYear(), m, 1))
    },
    [month, onMonthChange],
  )

  const handleYearSelect = useCallback(
    (y: number) => {
      onMonthChange(new Date(y, month.getMonth(), 1))
    },
    [month, onMonthChange],
  )

  const activeRange = previewRange ?? rangeValue

  return (
    <div className="dp-calendar">
      <MonthNav
        month={month}
        onPrev={handlePrev}
        onNext={handleNext}
        onMonthSelect={handleMonthSelect}
        onYearSelect={handleYearSelect}
        locale={locale}
        calendarSystem={calendarSystem}
        minDate={minDate}
        maxDate={maxDate}
      />
      <div className="dp-grid-container">
        {showWeekNumbers && <WeekNumbers weekNumbers={weekNumbers} />}
        <div className="dp-grid">
          {/* Weekday headers */}
          <div className="dp-weekday-row">
            {orderedWeekdays.map((d, i) => (
              <div key={i} className="dp-weekday-label" aria-hidden="true">
                {d}
              </div>
            ))}
          </div>
          {/* Day cells */}
          {weeks.map((week, wi) => (
            <div key={wi} className="dp-week-row">
              {week.map((day, di) => {
                const dateKey = day.date.toISOString().slice(0, 10)
                const dayHolidays = holidayMap.get(dateKey) ?? []
                const disabled = checkDisabled(day.date, minDate, maxDate, disabledDates)

                const isSelected =
                  selectionMode === 'single' &&
                  selectedDate != null &&
                  isSameDay(day.date, selectedDate)

                const isRangeStart =
                  selectionMode === 'range' &&
                  activeRange != null &&
                  isSameDay(day.date, activeRange[0])

                const isRangeEnd =
                  selectionMode === 'range' &&
                  activeRange != null &&
                  isSameDay(day.date, activeRange[1])

                const isInRange =
                  selectionMode === 'range' &&
                  activeRange != null &&
                  !isSameDay(activeRange[0], activeRange[1]) &&
                  isWithinInterval(startOfDay(day.date), {
                    start: startOfDay(activeRange[0]),
                    end: startOfDay(activeRange[1]),
                  }) &&
                  !isSameDay(day.date, activeRange[0]) &&
                  !isSameDay(day.date, activeRange[1])

                const isToday = isSameDay(day.date, new Date())

                return (
                  <DayCell
                    key={di}
                    date={day.date}
                    isCurrentMonth={day.isCurrentMonth}
                    isSelected={isSelected}
                    isRangeStart={isRangeStart}
                    isRangeEnd={isRangeEnd}
                    isInRange={isInRange}
                    isRowStart={di === 0}
                    isRowEnd={di === 6}
                    isDisabled={disabled}
                    isToday={isToday}
                    holidays={dayHolidays}
                    onClick={onDayClick}
                    onMouseEnter={onDayHover}
                    onMouseLeave={() => onDayHover(null)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
