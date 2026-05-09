import { describe, it, expect } from 'vitest'
import { parseNaturalLanguage } from '../../utils/naturalLanguage'

// Fixed reference: Saturday, 2026-05-09
const REF = new Date(2026, 4, 9)

function ld(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function expectSingle(result: ReturnType<typeof parseNaturalLanguage>, iso: string) {
  expect(result?.single ? ld(result.single) : undefined).toBe(iso)
  expect(result?.range).toBeUndefined()
}

function expectRange(result: ReturnType<typeof parseNaturalLanguage>, startIso: string, endIso: string) {
  expect(result?.range?.[0] ? ld(result.range[0]) : undefined).toBe(startIso)
  expect(result?.range?.[1] ? ld(result.range[1]) : undefined).toBe(endIso)
  expect(result?.single).toBeUndefined()
}

// ─── Group 1: Simple Relative Days ────────────────────────────────────────────

describe('1. Simple relative days', () => {
  it('"today"              → 2026-05-09', () => expectSingle(parseNaturalLanguage('today', REF), '2026-05-09'))
  it('"tomorrow"          → 2026-05-10', () => expectSingle(parseNaturalLanguage('tomorrow', REF), '2026-05-10'))
  it('"yesterday"         → 2026-05-08', () => expectSingle(parseNaturalLanguage('yesterday', REF), '2026-05-08'))
  it('"day after tomorrow"  → 2026-05-11', () => expectSingle(parseNaturalLanguage('day after tomorrow', REF), '2026-05-11'))
  it('"day before yesterday" → 2026-05-07', () => expectSingle(parseNaturalLanguage('day before yesterday', REF), '2026-05-07'))
})

// ─── Group 2: Specific Number Offsets ─────────────────────────────────────────

describe('2. Specific number offsets', () => {
  it('"in 5 days"          → 2026-05-14 (single)', () => expectSingle(parseNaturalLanguage('in 5 days', REF), '2026-05-14'))
  it('"10 days from now"   → 2026-05-19 (single target date)', () => expectSingle(parseNaturalLanguage('10 days from now', REF), '2026-05-19'))
  it('"8 days ago"         → 2026-05-01 (single)', () => expectSingle(parseNaturalLanguage('8 days ago', REF), '2026-05-01'))
  it('"in 2 weeks"         → 2026-05-23 (single)', () => expectSingle(parseNaturalLanguage('in 2 weeks', REF), '2026-05-23'))
  it('"3 weeks ago"        → 2026-04-18 (single)', () => expectSingle(parseNaturalLanguage('3 weeks ago', REF), '2026-04-18'))
})

// ─── Group 3: Weekday Anchors ──────────────────────────────────────────────────

describe('3. Weekday anchors', () => {
  it('"this coming Monday" → 2026-05-11', () => expectSingle(parseNaturalLanguage('this coming Monday', REF), '2026-05-11'))
  it('"upcoming Wednesday" → 2026-05-13', () => expectSingle(parseNaturalLanguage('upcoming Wednesday', REF), '2026-05-13'))
  it('"this Sunday"        → 2026-05-10 (tomorrow)', () => expectSingle(parseNaturalLanguage('this Sunday', REF), '2026-05-10'))
  it('"next Sunday"        → 2026-05-17', () => expectSingle(parseNaturalLanguage('next Sunday', REF), '2026-05-17'))
  it('"last Friday"        → 2026-05-08', () => expectSingle(parseNaturalLanguage('last Friday', REF), '2026-05-08'))
})

// ─── Group 4: Calendar Month/Year Positions ────────────────────────────────────

describe('4. Calendar month/year positions', () => {
  it('"end of this month"       → 2026-05-31', () => expectSingle(parseNaturalLanguage('end of this month', REF), '2026-05-31'))
  it('"beginning of next month" → 2026-06-01', () => expectSingle(parseNaturalLanguage('beginning of next month', REF), '2026-06-01'))
  it('"the 15th of next month"  → 2026-06-15', () => expectSingle(parseNaturalLanguage('the 15th of next month', REF), '2026-06-15'))
  it('"first Monday of June"    → 2026-06-01', () => expectSingle(parseNaturalLanguage('first Monday of June', REF), '2026-06-01'))
  it('"last Friday of May"      → 2026-05-29', () => expectSingle(parseNaturalLanguage('last Friday of May', REF), '2026-05-29'))
})

// ─── Group 5: Holiday Anchors ──────────────────────────────────────────────────

describe('5. Holiday anchors', () => {
  it('"next Christmas"    → 2026-12-25', () => expectSingle(parseNaturalLanguage('next Christmas', REF), '2026-12-25'))
  it('"next Halloween"    → 2026-10-31', () => expectSingle(parseNaturalLanguage('next Halloween', REF), '2026-10-31'))
  it('"Independence Day"  → 2026-07-04', () => expectSingle(parseNaturalLanguage('Independence Day', REF), '2026-07-04'))
  it('"New Year\'s Eve"   → 2026-12-31', () => expectSingle(parseNaturalLanguage("New Year's Eve", REF), '2026-12-31'))
})

// ─── Group 6: Complex/Nested Phrases ──────────────────────────────────────────

describe('6. Complex/nested phrases', () => {
  it('"the Sunday after next"      → 2026-05-24', () => expectSingle(parseNaturalLanguage('the Sunday after next', REF), '2026-05-24'))
  it('"10 days after next Friday"  → 2026-05-25', () => expectSingle(parseNaturalLanguage('10 days after next Friday', REF), '2026-05-25'))
  it('"two weeks from yesterday"   → 2026-05-22', () => expectSingle(parseNaturalLanguage('two weeks from yesterday', REF), '2026-05-22'))
  it('"a week from tomorrow"       → 2026-05-17', () => expectSingle(parseNaturalLanguage('a week from tomorrow', REF), '2026-05-17'))
})

// ─── Duration/Period Ranges ────────────────────────────────────────────────────

describe('7. Duration ranges — forward', () => {
  it('"next 10 days"    → range [today, today+10]', () => expectRange(parseNaturalLanguage('next 10 days', REF), '2026-05-09', '2026-05-19'))
  it('"within 10 days" → range [today, today+10]', () => expectRange(parseNaturalLanguage('within 10 days', REF), '2026-05-09', '2026-05-19'))
  it('"next 2 weeks"   → range [today, today+14]', () => expectRange(parseNaturalLanguage('next 2 weeks', REF), '2026-05-09', '2026-05-23'))
  it('"next 3 months"  → range [today, today+3mo]', () => expectRange(parseNaturalLanguage('next 3 months', REF), '2026-05-09', '2026-08-09'))
})

describe('8. Duration ranges — backward', () => {
  it('"last 7 days"   → range [today-7, today]', () => expectRange(parseNaturalLanguage('last 7 days', REF), '2026-05-02', '2026-05-09'))
  it('"last 30 days"  → range [today-30, today]', () => expectRange(parseNaturalLanguage('last 30 days', REF), '2026-04-09', '2026-05-09'))
  it('"past 7 days"   → range [today-7, today]', () => expectRange(parseNaturalLanguage('past 7 days', REF), '2026-05-02', '2026-05-09'))
  it('"past 30 days"  → range [today-30, today]', () => expectRange(parseNaturalLanguage('past 30 days', REF), '2026-04-09', '2026-05-09'))
})

describe('9. Named period ranges', () => {
  it('"this week"   → Mon 2026-05-04 to Sun 2026-05-10', () => expectRange(parseNaturalLanguage('this week', REF), '2026-05-04', '2026-05-10'))
  it('"last week"   → Mon 2026-04-27 to Sun 2026-05-03', () => expectRange(parseNaturalLanguage('last week', REF), '2026-04-27', '2026-05-03'))
  it('"next week"   → Mon 2026-05-11 to Sun 2026-05-17', () => expectRange(parseNaturalLanguage('next week', REF), '2026-05-11', '2026-05-17'))
  it('"this month"  → 2026-05-01 to 2026-05-31', () => expectRange(parseNaturalLanguage('this month', REF), '2026-05-01', '2026-05-31'))
  it('"last month"  → 2026-04-01 to 2026-04-30', () => expectRange(parseNaturalLanguage('last month', REF), '2026-04-01', '2026-04-30'))
  it('"next month"  → 2026-06-01 to 2026-06-30', () => expectRange(parseNaturalLanguage('next month', REF), '2026-06-01', '2026-06-30'))
})

describe('10. Explicit ranges', () => {
  it('"Jan 1 - Jan 15 2025"          → range', () => expectRange(parseNaturalLanguage('Jan 1 - Jan 15 2025', REF), '2025-01-01', '2025-01-15'))
  it('"Jan 1 and Mar 15"             → range', () => expectRange(parseNaturalLanguage('Jan 1 and Mar 15', REF), '2026-01-01', '2026-03-15'))
  it('"next christmas to new year"   → range', () => expectRange(parseNaturalLanguage('next christmas to new year', REF), '2026-12-25', '2027-01-01'))
})

describe('11. Edge cases', () => {
  it('empty string → null', () => expect(parseNaturalLanguage('', REF)).toBeNull())
  it('unrecognized input → null', () => expect(parseNaturalLanguage('foobar xyz', REF)).toBeNull())
})
