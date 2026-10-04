import { describe, expect, it } from 'vitest'

import {
  OPEN_FUTURE_YEAR_SPAN,
  OPEN_PAST_YEAR_SPAN,
  UNBOUNDED_YEAR_SPAN,
  clampVisibleMonth,
  getVisibleMonths,
  getSelectableYears,
  isMonthDisabled,
  resolveRelativeBounds,
  resolveRelativePoint,
  type RelativeBound,
} from '../../utils/dateBounds'

describe('clampVisibleMonth', () => {
  it('moves a month after maxDate back to the max month', () => {
    const visible = clampVisibleMonth(new Date(2026, 9, 1), undefined, new Date(2008, 5, 15))
    expect(visible).toEqual(new Date(2008, 5, 1))
  })

  it('moves a month before minDate forward to the min month', () => {
    const visible = clampVisibleMonth(new Date(2020, 0, 1), new Date(2030, 2, 10))
    expect(visible).toEqual(new Date(2030, 2, 1))
  })

  it('keeps a month that sits inside the bounds', () => {
    const visible = clampVisibleMonth(new Date(2024, 3, 1), new Date(2024, 0, 1), new Date(2024, 11, 31))
    expect(visible).toEqual(new Date(2024, 3, 1))
  })
})

describe('getVisibleMonths', () => {
  const today = new Date(2026, 9, 4)

  it('puts today on the right and the previous month on the left', () => {
    expect(getVisibleMonths(2, undefined, undefined, today)).toEqual({
      left: new Date(2026, 8, 1),
      right: new Date(2026, 9, 1),
    })
  })

  it('puts the latest available month on the right when today is later', () => {
    expect(getVisibleMonths(2, new Date(1966, 9, 4), new Date(2008, 9, 4), today).right).toEqual(
      new Date(2008, 9, 1),
    )
  })

  it('puts the month before the latest available month on the left', () => {
    expect(getVisibleMonths(2, new Date(1966, 9, 4), new Date(2008, 9, 4), today).left).toEqual(
      new Date(2008, 8, 1),
    )
  })

  it('shows the anchor month when only one month is visible', () => {
    expect(getVisibleMonths(1, undefined, new Date(2008, 5, 15), today).left).toEqual(new Date(2008, 5, 1))
  })
})

describe('getSelectableYears', () => {
  it('ends at the max year and reaches 120 years earlier when only maxDate is set', () => {
    const years = getSelectableYears(2026, undefined, new Date(2008, 5, 15))
    expect(years).toEqual(
      Array.from({ length: OPEN_PAST_YEAR_SPAN + 1 }, (_, index) => 2008 - OPEN_PAST_YEAR_SPAN + index),
    )
  })

  it('starts at the min year when only minDate is set', () => {
    const years = getSelectableYears(2030, new Date(2030, 0, 1))
    expect(years[0]).toBe(2030)
  })

  it('extends 10 years past the visible year when only minDate is set', () => {
    const years = getSelectableYears(2030, new Date(2030, 0, 1))
    expect(years[years.length - 1]).toBe(2030 + OPEN_FUTURE_YEAR_SPAN)
  })

  it('lists every year from minDate through maxDate', () => {
    const years = getSelectableYears(2026, new Date(2006, 9, 4), new Date(2008, 9, 4))
    expect(years).toEqual([2006, 2007, 2008])
  })

  it('starts ten years before the visible year when no bounds are set', () => {
    const years = getSelectableYears(2026)
    expect(years[0]).toBe(2026 - UNBOUNDED_YEAR_SPAN)
  })

  it('ends ten years after the visible year when no bounds are set', () => {
    const years = getSelectableYears(2026)
    expect(years[years.length - 1]).toBe(2026 + UNBOUNDED_YEAR_SPAN)
  })
})

describe('relative year bounds', () => {
  const today = new Date(2026, 9, 4)

  it('places a day 60 years ago', () => {
    expect(resolveRelativePoint({ yearsAgo: 60 }, today)).toEqual(new Date(1966, 9, 4))
  })

  it('places a day 18 years ago', () => {
    expect(resolveRelativePoint({ yearsAgo: 18 }, today)).toEqual(new Date(2008, 9, 4))
  })

  it('places a day 5 years from now', () => {
    expect(resolveRelativePoint({ yearsFromNow: 5 }, today)).toEqual(new Date(2031, 9, 4))
  })

  it('places a day 10 days ago', () => {
    expect(resolveRelativePoint({ daysAgo: 10 }, today)).toEqual(new Date(2026, 8, 24))
  })

  it('places a day 2 weeks ago', () => {
    expect(resolveRelativePoint({ weeksAgo: 2 }, today)).toEqual(new Date(2026, 8, 20))
  })

  it('places a day 1 month ago', () => {
    expect(resolveRelativePoint({ monthsAgo: 1 }, today)).toEqual(new Date(2026, 8, 4))
  })

  it('places a day 3 days from now', () => {
    expect(resolveRelativePoint({ daysFromNow: 3 }, today)).toEqual(new Date(2026, 9, 7))
  })

  it('places a day 2 weeks from now', () => {
    expect(resolveRelativePoint({ weeksFromNow: 2 }, today)).toEqual(new Date(2026, 9, 18))
  })

  it('places a day 1 month from now', () => {
    expect(resolveRelativePoint({ monthsFromNow: 1 }, today)).toEqual(new Date(2026, 10, 4))
  })

  it('ignores a bound that sets two units', () => {
    expect(resolveRelativePoint({ daysAgo: 1, weeksAgo: 1 } as RelativeBound, today)).toBeUndefined()
  })

  it('places today on the word today', () => {
    expect(resolveRelativePoint('today', today)).toEqual(new Date(2026, 9, 4))
  })

  it('places yesterday on the word yesterday', () => {
    expect(resolveRelativePoint('yesterday', today)).toEqual(new Date(2026, 9, 3))
  })

  it('ignores a negative year count', () => {
    expect(resolveRelativePoint({ yearsAgo: -18 }, today)).toBeUndefined()
  })

  it('resolves from 60 years ago until 18 years ago', () => {
    expect(
      resolveRelativeBounds({
        from: { yearsAgo: 60 },
        until: { yearsAgo: 18 },
        today,
      }),
    ).toEqual({
      minDate: new Date(1966, 9, 4),
      maxDate: new Date(2008, 9, 4),
    })
  })

  it('keeps an explicit minDate that is later than from', () => {
    const bounds = resolveRelativeBounds({
      minDate: new Date(1990, 0, 1),
      from: { yearsAgo: 60 },
      today,
    })
    expect(bounds.minDate).toEqual(new Date(1990, 0, 1))
  })

  it('keeps an explicit maxDate that is earlier than until', () => {
    const bounds = resolveRelativeBounds({
      maxDate: new Date(2000, 0, 1),
      until: { yearsAgo: 18 },
      today,
    })
    expect(bounds.maxDate).toEqual(new Date(2000, 0, 1))
  })
})

describe('isMonthDisabled', () => {
  it('disables months that end before minDate', () => {
    expect(isMonthDisabled(2020, 1, new Date(2020, 2, 10))).toBe(true)
  })

  it('keeps a month that still contains dates on or after minDate', () => {
    expect(isMonthDisabled(2020, 2, new Date(2020, 2, 10))).toBe(false)
  })

  it('disables months that start after maxDate', () => {
    expect(isMonthDisabled(2008, 6, undefined, new Date(2008, 5, 15))).toBe(true)
  })

  it('keeps a month that still contains dates on or before maxDate', () => {
    expect(isMonthDisabled(2008, 5, undefined, new Date(2008, 5, 15))).toBe(false)
  })
})
