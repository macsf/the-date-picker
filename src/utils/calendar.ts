import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  getISOWeek,
  getWeek,
  addMonths,
} from 'date-fns'

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  weekNumber?: number
}

export interface CalendarGrid {
  weeks: CalendarDay[][]
  month: Date
}

export function buildCalendarGrid(
  month: Date,
  weekStartsOn: 0 | 1 = 0,
): CalendarGrid {
  const monthStart = startOfMonth(month)
  const monthEnd = endOfMonth(month)
  const gridStart = startOfWeek(monthStart, { weekStartsOn })
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn })

  const days = eachDayOfInterval({ start: gridStart, end: gridEnd })
  const weeks: CalendarDay[][] = []
  let week: CalendarDay[] = []

  days.forEach((date, i) => {
    week.push({
      date,
      isCurrentMonth: date >= monthStart && date <= monthEnd,
    })
    if ((i + 1) % 7 === 0) {
      weeks.push(week)
      week = []
    }
  })

  return { weeks, month }
}

export function getWeekNumber(date: Date, weekStartsOn: 0 | 1 = 0): number {
  // ISO week numbers when Monday start, local week numbers when Sunday start
  if (weekStartsOn === 1) return getISOWeek(date)
  return getWeek(date, { weekStartsOn: 0 })
}

export function toBuddhistYear(year: number): number {
  return year + 543
}

export function formatMonthYear(
  date: Date,
  locale: 'th' | 'en',
  calendarSystem: 'gregorian' | 'buddhist',
): string {
  const month = date.toLocaleString(locale === 'th' ? 'th-TH' : 'en-US', {
    month: 'long',
  })
  const year =
    calendarSystem === 'buddhist'
      ? toBuddhistYear(date.getFullYear())
      : date.getFullYear()
  return `${month} ${year}`
}

export function nextMonth(date: Date): Date {
  return addMonths(date, 1)
}

export function prevMonth(date: Date): Date {
  return addMonths(date, -1)
}
