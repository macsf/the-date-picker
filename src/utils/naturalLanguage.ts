import * as chrono from 'chrono-node'
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addWeeks,
  addMonths,
  subDays,
  subWeeks,
  subMonths,
} from 'date-fns'

export interface ParsedDates {
  single?: Date
  range?: [Date, Date]
  text: string
}

// "next N days/weeks/months" or "within N days/weeks/months" → duration range [today, today+N]
const FORWARD_RANGE = /^(?:next|within)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i

// "N days/weeks/months from now" → single target date (today+N)
const FORWARD_POINT = /^(\d+)\s+(day|days|week|weeks|month|months)\s+from\s+now$/i

// Matches: "last N days/weeks/months" or "past N days/weeks/months"
const BACKWARD_DURATION = /^(?:last|past)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i

// Named period: this/last/next week|month
const NAMED_PERIOD = /^(this|last|next)\s+(week|month)$/i

// Holiday names → fixed month/day
const HOLIDAYS: Record<string, [number, number]> = {
  christmas: [12, 25],
  'new year': [1, 1],
  'new years': [1, 1],
  "new year's": [1, 1],
  halloween: [10, 31],
  valentine: [2, 14],
  "valentine's day": [2, 14],
  'valentines day': [2, 14],
}

function nextOccurrence(month: number, day: number, ref: Date): Date {
  // Compare as local dates only (no time component)
  const refDay = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate())
  const thisYear = new Date(ref.getFullYear(), month - 1, day)
  if (thisYear >= refDay) return thisYear
  return new Date(ref.getFullYear() + 1, month - 1, day)
}

function resolveHoliday(text: string, ref: Date): Date | null {
  const key = text.toLowerCase().trim()
  // strip leading "next " for holiday lookup
  const stripped = key.replace(/^next\s+/, '')
  const entry = HOLIDAYS[stripped] ?? HOLIDAYS[key]
  if (!entry) return null
  return nextOccurrence(entry[0], entry[1], ref)
}

function addUnit(date: Date, n: number, unit: string): Date {
  const u = unit.toLowerCase()
  if (u.startsWith('day')) return addDays(date, n)
  if (u.startsWith('week')) return addWeeks(date, n)
  if (u.startsWith('month')) return addMonths(date, n)
  return date
}

function subUnit(date: Date, n: number, unit: string): Date {
  const u = unit.toLowerCase()
  if (u.startsWith('day')) return subDays(date, n)
  if (u.startsWith('week')) return subWeeks(date, n)
  if (u.startsWith('month')) return subMonths(date, n)
  return date
}

export function parseNaturalLanguage(text: string, ref: Date = new Date()): ParsedDates | null {
  const trimmed = text.trim()
  if (!trimmed) return null

  // 1a. Duration range: "next 10 days", "within 2 weeks" → [today, today+N]
  const forwardRangeMatch = trimmed.match(FORWARD_RANGE)
  if (forwardRangeMatch) {
    const n = parseInt(forwardRangeMatch[1], 10)
    const unit = forwardRangeMatch[2]
    return { range: [ref, addUnit(ref, n, unit)], text }
  }

  // 1b. Target date: "10 days from now" → single date today+N
  const forwardPointMatch = trimmed.match(FORWARD_POINT)
  if (forwardPointMatch) {
    const n = parseInt(forwardPointMatch[1], 10)
    const unit = forwardPointMatch[2]
    return { single: addUnit(ref, n, unit), text }
  }

  // 2. Backward duration: "last 30 days", "past 7 days"
  const backwardMatch = trimmed.match(BACKWARD_DURATION)
  if (backwardMatch) {
    const n = parseInt(backwardMatch[1], 10)
    const unit = backwardMatch[2]
    return { range: [subUnit(ref, n, unit), ref], text }
  }

  // 3. Named periods: "this week", "last month", "next week", etc.
  const periodMatch = trimmed.match(NAMED_PERIOD)
  if (periodMatch) {
    const modifier = periodMatch[1].toLowerCase()
    const period = periodMatch[2].toLowerCase()
    const weekOpts = { weekStartsOn: 1 as const }

    if (period === 'week') {
      let anchor = ref
      if (modifier === 'last') anchor = subWeeks(ref, 1)
      if (modifier === 'next') anchor = addWeeks(ref, 1)
      return {
        range: [startOfWeek(anchor, weekOpts), endOfWeek(anchor, weekOpts)],
        text,
      }
    }

    if (period === 'month') {
      let anchor = ref
      if (modifier === 'last') anchor = subMonths(ref, 1)
      if (modifier === 'next') anchor = addMonths(ref, 1)
      return {
        range: [startOfMonth(anchor), endOfMonth(anchor)],
        text,
      }
    }
  }

  // 4. Chrono-node for everything it can handle natively
  const results = chrono.parse(trimmed, ref)

  // Result with explicit end (e.g. "Jan 1 - Jan 15")
  if (results.length > 0) {
    const withEnd = results.find((r) => r.end != null)
    if (withEnd) {
      return { range: [withEnd.start.date(), withEnd.end!.date()], text }
    }

    // Two separate dates → range
    if (results.length >= 2) {
      const a = results[0].start.date()
      const b = results[1].start.date()
      return { range: [a < b ? a : b, a < b ? b : a], text }
    }

    // Single date from chrono (only if NOT a named-period word chrono misreads as a point)
    // e.g. "this week" → chrono gives Monday; we want the full week range handled above
    return { single: results[0].start.date(), text }
  }

  // 5. Holiday range: "next christmas to new year", "christmas to new year"
  const holidayRangeMatch = trimmed.match(/^(.+?)\s+to\s+(.+)$/i)
  if (holidayRangeMatch) {
    const start = resolveHoliday(holidayRangeMatch[1], ref)
    const end = resolveHoliday(holidayRangeMatch[2], start ?? ref)
    if (start && end) {
      return { range: [start, end], text }
    }
  }

  // 6. Single holiday: "christmas", "next christmas", "new year"
  const holiday = resolveHoliday(trimmed, ref)
  if (holiday) {
    return { single: holiday, text }
  }

  return null
}
