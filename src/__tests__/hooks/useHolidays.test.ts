import { describe, expect, it, vi } from 'vitest'

import { formatDateKey } from '../../hooks/useHolidays'

describe('formatDateKey', () => {
  it('formats the date using local calendar fields', () => {
    const toISOStringSpy = vi.spyOn(Date.prototype, 'toISOString')
    const date = new Date(2026, 4, 2)

    expect(formatDateKey(date)).toBe('2026-05-02')
    expect(toISOStringSpy).not.toHaveBeenCalled()

    toISOStringSpy.mockRestore()
  })
})
