import { isSameDay, isWithinInterval, startOfDay } from 'date-fns'

export interface DayStateContext {
  today: Date
  selectionMode: 'single' | 'range'
  selectedDate: Date | null
  activeRange: [Date, Date] | null
  highlightWeekends: boolean
}

export interface DayState {
  isSelected: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isInRange: boolean
  isToday: boolean
  isWeekend: boolean
}

export function resolveDayState(date: Date, ctx: DayStateContext): DayState {
  const { today, selectionMode, selectedDate, activeRange, highlightWeekends } = ctx

  const isSelected =
    selectionMode === 'single' &&
    selectedDate != null &&
    isSameDay(date, selectedDate)

  const isRangeStart =
    selectionMode === 'range' &&
    activeRange != null &&
    isSameDay(date, activeRange[0])

  const isRangeEnd =
    selectionMode === 'range' &&
    activeRange != null &&
    isSameDay(date, activeRange[1])

  const isInRange =
    selectionMode === 'range' &&
    activeRange != null &&
    !isSameDay(activeRange[0], activeRange[1]) &&
    isWithinInterval(startOfDay(date), {
      start: startOfDay(activeRange[0]),
      end: startOfDay(activeRange[1]),
    }) &&
    !isSameDay(date, activeRange[0]) &&
    !isSameDay(date, activeRange[1])

  const isToday = isSameDay(date, today)
  const isWeekend = highlightWeekends && (date.getDay() === 0 || date.getDay() === 6)

  return { isSelected, isRangeStart, isRangeEnd, isInRange, isToday, isWeekend }
}
