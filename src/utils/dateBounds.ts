import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  startOfDay,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns'

/** Years offered before a max-only bound, so a birthday max can still reach older years. */
export const OPEN_PAST_YEAR_SPAN = 120

/** Years offered after a min-only bound. */
export const OPEN_FUTURE_YEAR_SPAN = 10

/** Years on each side of the visible year when neither bound is set. */
export const UNBOUNDED_YEAR_SPAN = 10

function monthStart(year: number, monthIndex: number): Date {
  return new Date(year, monthIndex, 1)
}

export function clampVisibleMonth(month: Date, minDate?: Date, maxDate?: Date): Date {
  let visible = monthStart(month.getFullYear(), month.getMonth())

  if (minDate) {
    const minMonth = monthStart(minDate.getFullYear(), minDate.getMonth())
    if (visible.getTime() < minMonth.getTime()) visible = minMonth
  }

  if (maxDate) {
    const maxMonth = monthStart(maxDate.getFullYear(), maxDate.getMonth())
    if (visible.getTime() > maxMonth.getTime()) visible = maxMonth
  }

  return visible
}

function calendarDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/** Today when it can be selected, otherwise the nearest in-range day. */
export function getAnchorDate(minDate?: Date, maxDate?: Date, today: Date = new Date()): Date {
  const now = calendarDay(today)
  if (maxDate && now.getTime() > calendarDay(maxDate).getTime()) return calendarDay(maxDate)
  if (minDate && now.getTime() < calendarDay(minDate).getTime()) return calendarDay(minDate)
  return now
}

/**
 * Months to show when the picker opens.
 * One month shows the anchor month.
 * Two months put the anchor month on the right and the previous month on the left.
 */
export function getVisibleMonths(
  numberOfMonths: 1 | 2,
  minDate?: Date,
  maxDate?: Date,
  today: Date = new Date(),
): { left: Date; right: Date } {
  const anchor = getAnchorDate(minDate, maxDate, today)
  const right = clampVisibleMonth(monthStart(anchor.getFullYear(), anchor.getMonth()), minDate, maxDate)
  if (numberOfMonths === 1) return { left: right, right }

  const left = clampVisibleMonth(
    monthStart(right.getFullYear(), right.getMonth() - 1),
    minDate,
    maxDate,
  )
  return { left, right }
}

export function getSelectableYears(
  visibleYear: number,
  minDate?: Date,
  maxDate?: Date,
): number[] {
  let start: number
  let end: number

  if (minDate && maxDate) {
    start = minDate.getFullYear()
    end = maxDate.getFullYear()
  } else if (maxDate) {
    end = maxDate.getFullYear()
    start = end - OPEN_PAST_YEAR_SPAN
  } else if (minDate) {
    start = minDate.getFullYear()
    end = Math.max(visibleYear, start) + OPEN_FUTURE_YEAR_SPAN
  } else {
    start = visibleYear - UNBOUNDED_YEAR_SPAN
    end = visibleYear + UNBOUNDED_YEAR_SPAN
  }

  if (end < start) end = start

  const years: number[] = []
  for (let year = start; year <= end; year += 1) years.push(year)
  return years
}

const RELATIVE_SHIFTS = {
  yearsAgo: subYears,
  yearsFromNow: addYears,
  monthsAgo: subMonths,
  monthsFromNow: addMonths,
  weeksAgo: subWeeks,
  weeksFromNow: addWeeks,
  daysAgo: subDays,
  daysFromNow: addDays,
} as const

type RelativeUnit = keyof typeof RELATIVE_SHIFTS

/** A day counted from today. Use one field. Counts are zero or greater. */
export type RelativeBound = 'today' | 'yesterday' | { [Unit in RelativeUnit]: { [Key in Unit]: number } }[RelativeUnit]

function offsetCount(value: unknown): number | undefined {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return undefined
  return value
}

/** The calendar day for a relative bound. An invalid bound resolves to nothing. */
export function resolveRelativePoint(bound: RelativeBound | undefined, today: Date): Date | undefined {
  if (!bound) return undefined
  if (bound === 'today') return startOfDay(today)
  if (bound === 'yesterday') return startOfDay(subDays(today, 1))
  if (typeof bound !== 'object') return undefined

  const fields = bound as Partial<Record<RelativeUnit, number>>
  const matches = (Object.keys(RELATIVE_SHIFTS) as RelativeUnit[]).flatMap((unit) => {
    if (!(unit in bound)) return []
    const count = offsetCount(fields[unit])
    return count == null ? [] : [[unit, count] as const]
  })
  if (matches.length !== 1) return undefined

  const [unit, count] = matches[0]
  return startOfDay(RELATIVE_SHIFTS[unit](today, count))
}

export function resolveRelativeBounds(input: {
  minDate?: Date
  maxDate?: Date
  from?: RelativeBound
  until?: RelativeBound
  today?: Date
}): { minDate?: Date; maxDate?: Date } {
  const today = input.today ?? new Date()
  let minDate = input.minDate
  let maxDate = input.maxDate

  const earliest = resolveRelativePoint(input.from, today)
  if (earliest && (!minDate || earliest.getTime() > startOfDay(minDate).getTime())) minDate = earliest

  const latest = resolveRelativePoint(input.until, today)
  if (latest && (!maxDate || latest.getTime() < startOfDay(maxDate).getTime())) maxDate = latest

  return { minDate, maxDate }
}

export function isMonthDisabled(
  year: number,
  monthIndex: number,
  minDate?: Date,
  maxDate?: Date,
): boolean {
  const start = monthStart(year, monthIndex)
  const end = new Date(year, monthIndex + 1, 0)

  if (minDate && startOfDay(end).getTime() < startOfDay(minDate).getTime()) return true
  if (maxDate && startOfDay(start).getTime() > startOfDay(maxDate).getTime()) return true
  return false
}
