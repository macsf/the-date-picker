import { describe, it, expect } from 'vitest'
import { parseNaturalLanguage } from '../../utils/naturalLanguage'

// Fixed reference date: 2026-05-09 (Saturday) — constructed as local midnight
const REF = new Date(2026, 4, 9) // month is 0-indexed

function localDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function expectSingle(result: ReturnType<typeof parseNaturalLanguage>, iso: string) {
  expect(result?.single ? localDate(result.single) : undefined).toBe(iso)
  expect(result?.range).toBeUndefined()
}

function expectRange(result: ReturnType<typeof parseNaturalLanguage>, startIso: string, endIso: string) {
  expect(result?.range?.[0] ? localDate(result.range[0]) : undefined).toBe(startIso)
  expect(result?.range?.[1] ? localDate(result.range[1]) : undefined).toBe(endIso)
  expect(result?.single).toBeUndefined()
}

describe('parseNaturalLanguage', () => {
  describe('single dates', () => {
    it('parses "tomorrow"', () => {
      expectSingle(parseNaturalLanguage('tomorrow', REF), '2026-05-10')
    })

    it('parses "today"', () => {
      expectSingle(parseNaturalLanguage('today', REF), '2026-05-09')
    })

    it('parses "next friday"', () => {
      expectSingle(parseNaturalLanguage('next friday', REF), '2026-05-15')
    })

    it('parses "next christmas" as Dec 25 of next occurrence', () => {
      expectSingle(parseNaturalLanguage('next christmas', REF), '2026-12-25')
    })

    it('parses "christmas" as Dec 25 of next occurrence', () => {
      expectSingle(parseNaturalLanguage('christmas', REF), '2026-12-25')
    })

    it('parses explicit date "Jan 15 2025"', () => {
      expectSingle(parseNaturalLanguage('Jan 15 2025', REF), '2025-01-15')
    })
  })

  describe('explicit ranges', () => {
    it('parses "Jan 1 - Jan 15 2025"', () => {
      expectRange(parseNaturalLanguage('Jan 1 - Jan 15 2025', REF), '2025-01-01', '2025-01-15')
    })

    it('parses "Jan 1 and Mar 15" as two-date range', () => {
      expectRange(parseNaturalLanguage('Jan 1 and Mar 15', REF), '2026-01-01', '2026-03-15')
    })

    it('parses "next christmas to new year" as range', () => {
      expectRange(parseNaturalLanguage('next christmas to new year', REF), '2026-12-25', '2027-01-01')
    })
  })

  describe('duration ranges — forward', () => {
    it('parses "next 10 days" as range today → today+10 (duration)', () => {
      expectRange(parseNaturalLanguage('next 10 days', REF), '2026-05-09', '2026-05-19')
    })

    it('parses "within 10 days" as range today → today+10 (deadline)', () => {
      expectRange(parseNaturalLanguage('within 10 days', REF), '2026-05-09', '2026-05-19')
    })

    it('parses "next 2 weeks" as range today → today+14', () => {
      expectRange(parseNaturalLanguage('next 2 weeks', REF), '2026-05-09', '2026-05-23')
    })

    it('parses "next 3 months" as range today → today+3 months', () => {
      expectRange(parseNaturalLanguage('next 3 months', REF), '2026-05-09', '2026-08-09')
    })
  })

  describe('target dates — forward point', () => {
    it('parses "10 days from now" as single target date today+10', () => {
      expectSingle(parseNaturalLanguage('10 days from now', REF), '2026-05-19')
    })

    it('parses "2 weeks from now" as single target date today+14', () => {
      expectSingle(parseNaturalLanguage('2 weeks from now', REF), '2026-05-23')
    })

    it('parses "3 months from now" as single target date today+3 months', () => {
      expectSingle(parseNaturalLanguage('3 months from now', REF), '2026-08-09')
    })
  })

  describe('duration ranges — backward', () => {
    it('parses "last 7 days" as 7 days ago → today', () => {
      expectRange(parseNaturalLanguage('last 7 days', REF), '2026-05-02', '2026-05-09')
    })

    it('parses "last 30 days" as 30 days ago → today', () => {
      expectRange(parseNaturalLanguage('last 30 days', REF), '2026-04-09', '2026-05-09')
    })

    it('parses "past 7 days" as 7 days ago → today', () => {
      expectRange(parseNaturalLanguage('past 7 days', REF), '2026-05-02', '2026-05-09')
    })

    it('parses "past 30 days" as 30 days ago → today', () => {
      expectRange(parseNaturalLanguage('past 30 days', REF), '2026-04-09', '2026-05-09')
    })
  })

  describe('named period ranges', () => {
    it('parses "this week" as Mon–Sun of current week', () => {
      // REF is Saturday 2026-05-09, week Mon=2026-05-04 to Sun=2026-05-10
      expectRange(parseNaturalLanguage('this week', REF), '2026-05-04', '2026-05-10')
    })

    it('parses "last week" as Mon–Sun of previous week', () => {
      // REF is Saturday 2026-05-09, previous week Mon=2026-04-27 to Sun=2026-05-03
      expectRange(parseNaturalLanguage('last week', REF), '2026-04-27', '2026-05-03')
    })

    it('parses "next week" as Mon–Sun of next week', () => {
      // REF is Saturday 2026-05-09, next week Mon=2026-05-11 to Sun=2026-05-17
      expectRange(parseNaturalLanguage('next week', REF), '2026-05-11', '2026-05-17')
    })

    it('parses "this month" as first–last day of current month', () => {
      expectRange(parseNaturalLanguage('this month', REF), '2026-05-01', '2026-05-31')
    })

    it('parses "last month" as first–last day of previous month', () => {
      expectRange(parseNaturalLanguage('last month', REF), '2026-04-01', '2026-04-30')
    })

    it('parses "next month" as first–last day of next month', () => {
      expectRange(parseNaturalLanguage('next month', REF), '2026-06-01', '2026-06-30')
    })
  })

  describe('edge cases', () => {
    it('returns null for empty string', () => {
      expect(parseNaturalLanguage('', REF)).toBeNull()
    })

    it('returns null for unrecognized input', () => {
      expect(parseNaturalLanguage('foobar xyz', REF)).toBeNull()
    })
  })
})
