import { describe, it, expect } from 'vitest'
import { resolveDayState, type DayStateContext } from './dayState'

const today = new Date(2024, 5, 15) // 2024-06-15, fixed for all tests
const jan1 = new Date(2024, 0, 1)
const jan5 = new Date(2024, 0, 5)
const jan10 = new Date(2024, 0, 10)

function ctx(overrides: Partial<DayStateContext> = {}): DayStateContext {
  return {
    today,
    selectionMode: 'single',
    selectedDate: null,
    activeRange: null,
    ...overrides,
  }
}

describe('resolveDayState', () => {
  describe('isToday', () => {
    it('is true when date matches today', () => {
      const result = resolveDayState(today, ctx())
      expect(result.isToday).toBe(true)
    })

    it('is false when date does not match today', () => {
      const result = resolveDayState(jan1, ctx())
      expect(result.isToday).toBe(false)
    })
  })

  describe('single mode', () => {
    it('isSelected is true when date matches selectedDate', () => {
      const result = resolveDayState(jan1, ctx({ selectedDate: jan1 }))
      expect(result.isSelected).toBe(true)
    })

    it('isSelected is false when date does not match selectedDate', () => {
      const result = resolveDayState(jan5, ctx({ selectedDate: jan1 }))
      expect(result.isSelected).toBe(false)
    })

    it('isSelected is false when selectedDate is null', () => {
      const result = resolveDayState(jan1, ctx())
      expect(result.isSelected).toBe(false)
    })

    it('range flags are always false in single mode', () => {
      const result = resolveDayState(jan5, ctx({ activeRange: [jan1, jan10] }))
      expect(result.isRangeStart).toBe(false)
      expect(result.isRangeEnd).toBe(false)
      expect(result.isInRange).toBe(false)
    })
  })

  describe('range mode', () => {
    const rangeCtx = (overrides: Partial<DayStateContext> = {}) =>
      ctx({ selectionMode: 'range', ...overrides })

    it('isRangeStart is true for the start date', () => {
      const result = resolveDayState(jan1, rangeCtx({ activeRange: [jan1, jan10] }))
      expect(result.isRangeStart).toBe(true)
    })

    it('isRangeEnd is true for the end date', () => {
      const result = resolveDayState(jan10, rangeCtx({ activeRange: [jan1, jan10] }))
      expect(result.isRangeEnd).toBe(true)
    })

    it('isInRange is true for a date strictly between start and end', () => {
      const result = resolveDayState(jan5, rangeCtx({ activeRange: [jan1, jan10] }))
      expect(result.isInRange).toBe(true)
    })

    it('isInRange is false for the start date', () => {
      const result = resolveDayState(jan1, rangeCtx({ activeRange: [jan1, jan10] }))
      expect(result.isInRange).toBe(false)
    })

    it('isInRange is false for the end date', () => {
      const result = resolveDayState(jan10, rangeCtx({ activeRange: [jan1, jan10] }))
      expect(result.isInRange).toBe(false)
    })

    it('isInRange is false when start and end are the same day', () => {
      const result = resolveDayState(jan1, rangeCtx({ activeRange: [jan1, jan1] }))
      expect(result.isInRange).toBe(false)
    })

    it('isInRange is false when activeRange is null', () => {
      const result = resolveDayState(jan5, rangeCtx({ activeRange: null }))
      expect(result.isInRange).toBe(false)
    })

    it('isSelected is always false in range mode', () => {
      const result = resolveDayState(jan1, rangeCtx({ selectedDate: jan1 }))
      expect(result.isSelected).toBe(false)
    })

    it('a date outside the range is not start, end, or in-range', () => {
      const outside = new Date(2024, 0, 20)
      const result = resolveDayState(outside, rangeCtx({ activeRange: [jan1, jan10] }))
      expect(result.isRangeStart).toBe(false)
      expect(result.isRangeEnd).toBe(false)
      expect(result.isInRange).toBe(false)
    })
  })
})
