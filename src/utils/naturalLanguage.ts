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
  getDay,
  setDay,
} from 'date-fns'

export interface ParsedDates {
  single?: Date
  range?: [Date, Date]
  text: string
}

// ─── Patterns ─────────────────────────────────────────────────────────────────

// "next N days/weeks/months" or "within N days/weeks/months" → range [today, today+N]
const FORWARD_RANGE = /^(?:next|within)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i

// "N days/weeks/months from now" → single target date
const FORWARD_POINT = /^(\d+)\s+(day|days|week|weeks|month|months)\s+from\s+now$/i

// "last/past N days/weeks/months" → range [today-N, today]
const BACKWARD_DURATION = /^(?:last|past)\s+(\d+)\s+(day|days|week|weeks|month|months)$/i

// "this/last/next week|month" → full period range
const NAMED_PERIOD = /^(this|last|next)\s+(week|month)$/i

// "end of this/next month", "beginning of this/next month"
const MONTH_BOUNDARY = /^(end|beginning)\s+of\s+(this|next)\s+month$/i

// "the Nth of next/this month"
const NTH_OF_MONTH = /^(?:the\s+)?(\d+)(?:st|nd|rd|th)?\s+of\s+(this|next)\s+month$/i

// "first/second/third/last <weekday> of <month>"
const ORDINAL_WEEKDAY_OF_MONTH = /^(first|second|third|fourth|last)\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+of\s+(\w+)$/i

// "upcoming <weekday>" → next future occurrence
const UPCOMING_WEEKDAY = /^upcoming\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/i

// "day after tomorrow", "day before yesterday"
const DAY_OFFSET_COMPOUND = /^day\s+(after\s+tomorrow|before\s+yesterday)$/i

// "the <weekday> after next" → skip the immediate next, take the one after
const WEEKDAY_AFTER_NEXT = /^(?:the\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s+after\s+next$/i

// "N unit(s) from <anchor>", "a unit from <anchor>" — e.g. "two weeks from yesterday", "a week from tomorrow"
const UNIT_FROM_ANCHOR = /^(a|\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(day|days|week|weeks|month|months)\s+from\s+(.+)$/i

// Holiday names → fixed [month, day]
const HOLIDAYS: Record<string, [number, number]> = {
  christmas: [12, 25],
  'christmas day': [12, 25],
  'new year': [1, 1],
  'new years': [1, 1],
  "new year's": [1, 1],
  "new year's day": [1, 1],
  "new year's eve": [12, 31],
  'new years eve': [12, 31],
  halloween: [10, 31],
  'halloween day': [10, 31],
  valentine: [2, 14],
  "valentine's day": [2, 14],
  'valentines day': [2, 14],
  'independence day': [7, 4],
  'july 4th': [7, 4],
  'july fourth': [7, 4],
  'st. patrick\'s day': [3, 17],
  'st patricks day': [3, 17],
  'cinco de mayo': [5, 5],
  'veterans day': [11, 11],
}

const WEEKDAY_MAP: Record<string, number> = {
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
  thursday: 4, friday: 5, saturday: 6,
}

const ORDINAL_MAP: Record<string, number> = {
  first: 1, second: 2, third: 3, fourth: 4,
}

const WORD_NUMBER: Record<string, number> = {
  a: 1, one: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function nextOccurrence(month: number, day: number, ref: Date): Date {
  const refDay = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate())
  const thisYear = new Date(ref.getFullYear(), month - 1, day)
  if (thisYear >= refDay) return thisYear
  return new Date(ref.getFullYear() + 1, month - 1, day)
}

function resolveHoliday(text: string, ref: Date): Date | null {
  const key = text.toLowerCase().trim().replace(/^next\s+/, '')
  const entry = HOLIDAYS[key]
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

// Next occurrence of a weekday strictly after ref (or same day if allowSame)
function nextWeekday(ref: Date, weekday: number, allowSame = false): Date {
  const refDay = getDay(ref)
  let daysAhead = weekday - refDay
  if (daysAhead < 0 || (!allowSame && daysAhead === 0)) daysAhead += 7
  return addDays(ref, daysAhead)
}

// Nth weekday of a given month/year (n=1..4); n=-1 = last
function nthWeekdayOfMonth(year: number, month: number, weekday: number, n: number): Date | null {
  if (n > 0) {
    const first = new Date(year, month, 1)
    const firstWd = getDay(first)
    let daysAhead = weekday - firstWd
    if (daysAhead < 0) daysAhead += 7
    const date = new Date(year, month, 1 + daysAhead + (n - 1) * 7)
    // Guard: didn't overflow into next month
    if (date.getMonth() !== month) return null
    return date
  } else {
    // last occurrence: start from last day of month and walk back
    const last = new Date(year, month + 1, 0)
    const lastWd = getDay(last)
    let daysBehind = lastWd - weekday
    if (daysBehind < 0) daysBehind += 7
    return new Date(year, month, last.getDate() - daysBehind)
  }
}

// Parse a month name to 0-indexed month number
function parseMonthName(name: string): number | null {
  const months = ['january','february','march','april','may','june',
                  'july','august','september','october','november','december']
  const idx = months.indexOf(name.toLowerCase())
  return idx === -1 ? null : idx
}

// ─── Main function ────────────────────────────────────────────────────────────

export function parseNaturalLanguage(text: string, ref: Date = new Date()): ParsedDates | null {
  const trimmed = text.trim()
  if (!trimmed) return null
  const lower = trimmed.toLowerCase()

  // 1. Duration range: "next 10 days", "within 2 weeks" → [today, today+N]
  const forwardRangeMatch = trimmed.match(FORWARD_RANGE)
  if (forwardRangeMatch) {
    const n = parseInt(forwardRangeMatch[1], 10)
    return { range: [ref, addUnit(ref, n, forwardRangeMatch[2])], text }
  }

  // 2. Target date: "10 days from now" → single today+N
  const forwardPointMatch = trimmed.match(FORWARD_POINT)
  if (forwardPointMatch) {
    const n = parseInt(forwardPointMatch[1], 10)
    return { single: addUnit(ref, n, forwardPointMatch[2]), text }
  }

  // 3. Backward duration: "last 30 days", "past 7 days" → [today-N, today]
  const backwardMatch = trimmed.match(BACKWARD_DURATION)
  if (backwardMatch) {
    const n = parseInt(backwardMatch[1], 10)
    return { range: [subUnit(ref, n, backwardMatch[2]), ref], text }
  }

  // 4. Named period: "this/last/next week|month" → full range
  const periodMatch = trimmed.match(NAMED_PERIOD)
  if (periodMatch) {
    const modifier = periodMatch[1].toLowerCase()
    const period = periodMatch[2].toLowerCase()
    const weekOpts = { weekStartsOn: 1 as const }
    if (period === 'week') {
      const anchor = modifier === 'last' ? subWeeks(ref, 1) : modifier === 'next' ? addWeeks(ref, 1) : ref
      return { range: [startOfWeek(anchor, weekOpts), endOfWeek(anchor, weekOpts)], text }
    }
    if (period === 'month') {
      const anchor = modifier === 'last' ? subMonths(ref, 1) : modifier === 'next' ? addMonths(ref, 1) : ref
      return { range: [startOfMonth(anchor), endOfMonth(anchor)], text }
    }
  }

  // 5. Month boundary: "end of this month", "beginning of next month"
  const boundaryMatch = lower.match(MONTH_BOUNDARY)
  if (boundaryMatch) {
    const isNext = boundaryMatch[2] === 'next'
    const anchor = isNext ? addMonths(ref, 1) : ref
    const date = boundaryMatch[1] === 'end' ? endOfMonth(anchor) : startOfMonth(anchor)
    return { single: date, text }
  }

  // 6. Nth of month: "the 15th of next month"
  const nthMatch = lower.match(NTH_OF_MONTH)
  if (nthMatch) {
    const day = parseInt(nthMatch[1], 10)
    const anchor = nthMatch[2] === 'next' ? addMonths(ref, 1) : ref
    return { single: new Date(anchor.getFullYear(), anchor.getMonth(), day), text }
  }

  // 7. Ordinal weekday of month: "first Monday of June", "last Friday of May"
  const ordinalMatch = lower.match(ORDINAL_WEEKDAY_OF_MONTH)
  if (ordinalMatch) {
    const ordinal = ordinalMatch[1]
    const weekday = WEEKDAY_MAP[ordinalMatch[2]]
    const monthIdx = parseMonthName(ordinalMatch[3])
    if (monthIdx !== null && weekday !== undefined) {
      const n = ordinal === 'last' ? -1 : (ORDINAL_MAP[ordinal] ?? 1)
      // Use current year; if the month has passed, try next year
      const year = ref.getFullYear()
      let date = nthWeekdayOfMonth(year, monthIdx, weekday, n)
      if (!date || date < ref) date = nthWeekdayOfMonth(year + 1, monthIdx, weekday, n)
      if (date) return { single: date, text }
    }
  }

  // 8. "upcoming <weekday>" → strictly next future occurrence
  const upcomingMatch = lower.match(UPCOMING_WEEKDAY)
  if (upcomingMatch) {
    const weekday = WEEKDAY_MAP[upcomingMatch[1]]
    return { single: nextWeekday(ref, weekday, false), text }
  }

  // 9. "day after tomorrow" / "day before yesterday"
  const compoundMatch = lower.match(DAY_OFFSET_COMPOUND)
  if (compoundMatch) {
    const offset = compoundMatch[1].startsWith('after') ? 2 : -2
    return { single: addDays(ref, offset), text }
  }

  // 10. "<weekday> after next" → the occurrence after "next <weekday>"
  // "next <weekday>" conventionally skips to the following week's instance,
  // so "after next" adds another 7 days on top of that
  const afterNextMatch = lower.match(WEEKDAY_AFTER_NEXT)
  if (afterNextMatch) {
    const weekday = WEEKDAY_MAP[afterNextMatch[1]]
    // setDay with weekStartsOn:1 finds the weekday in the *next* week from ref
    const nextWeek = addWeeks(ref, 1)
    const nextOccur = setDay(nextWeek, weekday, { weekStartsOn: 1 })
    return { single: addWeeks(nextOccur, 1), text }
  }

  // 11. "N unit(s) from <anchor>" — e.g. "two weeks from yesterday", "a week from tomorrow"
  const unitFromMatch = lower.match(UNIT_FROM_ANCHOR)
  if (unitFromMatch) {
    const nRaw = unitFromMatch[1]
    const n = WORD_NUMBER[nRaw] ?? parseInt(nRaw, 10)
    const unit = unitFromMatch[2]
    const anchorText = unitFromMatch[3]
    // Recursively resolve the anchor
    const anchorResult = parseNaturalLanguage(anchorText, ref)
    const anchorDate = anchorResult?.single ?? anchorResult?.range?.[0]
    if (anchorDate) return { single: addUnit(anchorDate, n, unit), text }
  }

  // 12. Chrono-node for everything it handles natively
  const results = chrono.parse(trimmed, ref)
  if (results.length > 0) {
    const withEnd = results.find((r) => r.end != null)
    if (withEnd) return { range: [withEnd.start.date(), withEnd.end!.date()], text }
    if (results.length >= 2) {
      const a = results[0].start.date()
      const b = results[1].start.date()
      return { range: [a < b ? a : b, a < b ? b : a], text }
    }
    return { single: results[0].start.date(), text }
  }

  // 13. Holiday range: "christmas to new year"
  const holidayRangeMatch = trimmed.match(/^(.+?)\s+to\s+(.+)$/i)
  if (holidayRangeMatch) {
    const start = resolveHoliday(holidayRangeMatch[1], ref)
    const end = resolveHoliday(holidayRangeMatch[2], start ?? ref)
    if (start && end) return { range: [start, end], text }
  }

  // 14. Single holiday: "christmas", "next christmas"
  const holiday = resolveHoliday(trimmed, ref)
  if (holiday) return { single: holiday, text }

  return null
}
