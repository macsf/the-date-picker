import { isSameDay, isWithinInterval, startOfDay } from 'date-fns'

export interface DayStateContext {
  today: Date
  selectionMode: 'single' | 'range'
  selectedDate: Date | null
  activeRange: [Date, Date] | null
}

export interface DayState {
  isSelected: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isInRange: boolean
  isToday: boolean
}

export function resolveDayState(date: Date, ctx: DayStateContext): DayState {
  const { today, selectionMode, selectedDate, activeRange } = ctx

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

  return { isSelected, isRangeStart, isRangeEnd, isInRange, isToday }
}
