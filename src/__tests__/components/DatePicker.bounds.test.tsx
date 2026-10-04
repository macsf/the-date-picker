import { useState } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DatePicker } from '../../components/DatePicker'
import { resolveRelativePoint, type RelativeBound } from '../../utils/dateBounds'

function boundDate(bound: RelativeBound): Date {
  const resolved = resolveRelativePoint(bound, new Date())
  if (!resolved) throw new Error('unresolved bound')
  return resolved
}

function dayLabel(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

describe('DatePicker min and max dates', () => {
  it('opens on the latest month a birthday max date allows', () => {
    render(<DatePicker maxDate={new Date(2008, 5, 15)} />)

    expect(screen.getByRole('combobox', { name: 'Select year' })).toHaveValue('2008')
  })

  it('opens on the latest month number a birthday max date allows', () => {
    render(<DatePicker maxDate={new Date(2008, 5, 15)} />)

    expect(screen.getByRole('combobox', { name: 'Select month' })).toHaveValue('5')
  })

  it('omits years after the max date from the year menu', () => {
    render(<DatePicker maxDate={new Date(2008, 5, 15)} />)

    const yearSelect = screen.getByRole('combobox', { name: 'Select year' })
    expect(within(yearSelect).queryByRole('option', { name: '2009' })).not.toBeInTheDocument()
  })

  it('includes a year 120 years before the max date', () => {
    render(<DatePicker maxDate={new Date(2008, 5, 15)} />)

    const yearSelect = screen.getByRole('combobox', { name: 'Select year' })
    expect(within(yearSelect).getByRole('option', { name: '1888' })).toBeInTheDocument()
  })

  it('disables months that fall after the max date', () => {
    render(<DatePicker maxDate={new Date(2008, 5, 15)} />)

    const monthSelect = screen.getByRole('combobox', { name: 'Select month' })
    expect(within(monthSelect).getByRole('option', { name: 'July' })).toBeDisabled()
  })

  it('keeps the max month selectable', () => {
    render(<DatePicker maxDate={new Date(2008, 5, 15)} />)

    const monthSelect = screen.getByRole('combobox', { name: 'Select month' })
    expect(within(monthSelect).getByRole('option', { name: 'June' })).toBeEnabled()
  })

  it('disables the day after the max date', () => {
    render(<DatePicker maxDate={new Date(2008, 5, 15)} />)

    expect(screen.getByRole('button', { name: dayLabel(new Date(2008, 5, 16)) })).toBeDisabled()
  })

  it('allows the max date itself', () => {
    render(<DatePicker maxDate={new Date(2008, 5, 15)} />)

    expect(screen.getByRole('button', { name: dayLabel(new Date(2008, 5, 15)) })).toBeEnabled()
  })

  it('selects the max date when that day is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<DatePicker maxDate={new Date(2008, 5, 15)} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: dayLabel(new Date(2008, 5, 15)) }))

    expect(onChange).toHaveBeenCalledWith(new Date(2008, 5, 15))
  })

  it('stops month navigation after the max month', () => {
    render(<DatePicker maxDate={new Date(2008, 5, 15)} />)

    expect(screen.getByRole('button', { name: 'Next month' })).toBeDisabled()
  })

  it('opens on the earliest month a min date allows', () => {
    render(<DatePicker minDate={new Date(2030, 0, 10)} />)

    expect(screen.getByRole('combobox', { name: 'Select year' })).toHaveValue('2030')
  })

  it('disables months that end before the min date', () => {
    render(<DatePicker minDate={new Date(2030, 2, 10)} maxDate={new Date(2030, 2, 20)} />)

    const monthSelect = screen.getByRole('combobox', { name: 'Select month' })
    expect(within(monthSelect).getByRole('option', { name: 'February' })).toBeDisabled()
  })

  it('disables the day before the min date', () => {
    render(<DatePicker minDate={new Date(2030, 2, 10)} maxDate={new Date(2030, 2, 20)} />)

    expect(screen.getByRole('button', { name: dayLabel(new Date(2030, 2, 9)) })).toBeDisabled()
  })

  it('allows the min date itself', () => {
    render(<DatePicker minDate={new Date(2030, 2, 10)} maxDate={new Date(2030, 2, 20)} />)

    expect(screen.getByRole('button', { name: dayLabel(new Date(2030, 2, 10)) })).toBeEnabled()
  })

  it('disables dates after today when maxDate is today', () => {
    const today = new Date()
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    render(<DatePicker maxDate={maxDate} />)

    expect(screen.getByRole('button', { name: dayLabel(tomorrow) })).toBeDisabled()
  })

  it('keeps today selectable when maxDate is today', () => {
    const today = new Date()
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    render(<DatePicker maxDate={maxDate} />)

    expect(screen.getByRole('button', { name: dayLabel(maxDate) })).toBeEnabled()
  })

  it('hides next year when nothing later than today is allowed', () => {
    const today = new Date()
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    render(<DatePicker maxDate={maxDate} />)

    const yearSelect = screen.getByRole('combobox', { name: 'Select year' })
    expect(
      within(yearSelect).queryByRole('option', { name: String(today.getFullYear() + 1) }),
    ).not.toBeInTheDocument()
  })

  it('opens the right month on the current month', () => {
    const today = new Date()
    render(<DatePicker numberOfMonths={2} selectionMode="range" />)

    const months = screen.getAllByRole('combobox', { name: 'Select month' })
    expect(months[1]).toHaveValue(String(today.getMonth()))
  })

  it('opens the left month one month before today', () => {
    const previous = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
    render(<DatePicker numberOfMonths={2} selectionMode="range" />)

    const months = screen.getAllByRole('combobox', { name: 'Select month' })
    expect(months[0]).toHaveValue(String(previous.getMonth()))
  })

  it('opens the right month on the latest available month', () => {
    const latest = boundDate({ yearsAgo: 18 })
    render(<DatePicker numberOfMonths={2} selectionMode="range" until={{ yearsAgo: 18 }} />)

    const years = screen.getAllByRole('combobox', { name: 'Select year' })
    expect(years[1]).toHaveValue(String(latest.getFullYear()))
  })

  it('opens the left month one month before the latest available month', () => {
    const latest = boundDate({ yearsAgo: 18 })
    const previous = new Date(latest.getFullYear(), latest.getMonth() - 1, 1)
    render(<DatePicker numberOfMonths={2} selectionMode="range" from={{ yearsAgo: 60 }} until={{ yearsAgo: 18 }} />)

    const months = screen.getAllByRole('combobox', { name: 'Select month' })
    expect(months[0]).toHaveValue(String(previous.getMonth()))
  })

  it('moves a two month range onto the latest month when a max date is applied', async () => {
    function LimitLater() {
      const [maxDate, setMaxDate] = useState<Date | undefined>(undefined)
      return (
        <>
          <button type="button" onClick={() => setMaxDate(new Date(2008, 9, 4))}>
            Apply limit
          </button>
          <DatePicker numberOfMonths={2} maxDate={maxDate} />
        </>
      )
    }

    const user = userEvent.setup()
    render(<LimitLater />)
    await user.click(screen.getByRole('button', { name: 'Apply limit' }))

    const years = screen.getAllByRole('combobox', { name: 'Select year' })
    expect(years[1]).toHaveValue('2008')
  })

  it('moves the left month to the month before that latest month', async () => {
    function LimitLater() {
      const [maxDate, setMaxDate] = useState<Date | undefined>(undefined)
      return (
        <>
          <button type="button" onClick={() => setMaxDate(new Date(2008, 9, 4))}>
            Apply limit
          </button>
          <DatePicker numberOfMonths={2} maxDate={maxDate} />
        </>
      )
    }

    const user = userEvent.setup()
    render(<LimitLater />)
    await user.click(screen.getByRole('button', { name: 'Apply limit' }))

    const months = screen.getAllByRole('combobox', { name: 'Select month' })
    expect(months[0]).toHaveValue('8')
  })

  it('moves onto the max month when maxDate is applied after mount', async () => {
    function LimitLater() {
      const [maxDate, setMaxDate] = useState<Date | undefined>(undefined)
      return (
        <>
          <button type="button" onClick={() => setMaxDate(new Date(2008, 5, 15))}>
            Apply limit
          </button>
          <DatePicker maxDate={maxDate} />
        </>
      )
    }

    const user = userEvent.setup()
    render(<LimitLater />)
    await user.click(screen.getByRole('button', { name: 'Apply limit' }))

    expect(screen.getByRole('combobox', { name: 'Select year' })).toHaveValue('2008')
  })

  it('opens on the latest year when until is 18 years ago', () => {
    const latest = boundDate({ yearsAgo: 18 })
    render(<DatePicker from={{ yearsAgo: 60 }} until={{ yearsAgo: 18 }} />)

    expect(screen.getByRole('combobox', { name: 'Select year' })).toHaveValue(String(latest.getFullYear()))
  })

  it('keeps the day 18 years ago selectable', () => {
    const latest = boundDate({ yearsAgo: 18 })
    render(<DatePicker from={{ yearsAgo: 60 }} until={{ yearsAgo: 18 }} />)

    expect(screen.getByRole('button', { name: dayLabel(latest) })).toBeEnabled()
  })

  it('disables the day after 18 years ago', () => {
    const latest = boundDate({ yearsAgo: 18 })
    const dayAfter = new Date(latest.getFullYear(), latest.getMonth(), latest.getDate() + 1)
    render(<DatePicker from={{ yearsAgo: 60 }} until={{ yearsAgo: 18 }} />)

    expect(screen.getByRole('button', { name: dayLabel(dayAfter) })).toBeDisabled()
  })

  it('includes the year 60 years ago', () => {
    const earliest = boundDate({ yearsAgo: 60 })
    render(<DatePicker from={{ yearsAgo: 60 }} until={{ yearsAgo: 18 }} />)

    const yearSelect = screen.getByRole('combobox', { name: 'Select year' })
    expect(within(yearSelect).getByRole('option', { name: String(earliest.getFullYear()) })).toBeInTheDocument()
  })

  it('omits the year before 60 years ago', () => {
    const earliest = boundDate({ yearsAgo: 60 })
    render(<DatePicker from={{ yearsAgo: 60 }} until={{ yearsAgo: 18 }} />)

    const yearSelect = screen.getByRole('combobox', { name: 'Select year' })
    expect(
      within(yearSelect).queryByRole('option', { name: String(earliest.getFullYear() - 1) }),
    ).not.toBeInTheDocument()
  })

  it('allows the day 60 years ago', async () => {
    const user = userEvent.setup()
    const earliest = boundDate({ yearsAgo: 60 })
    render(<DatePicker from={{ yearsAgo: 60 }} until={{ yearsAgo: 18 }} />)

    await user.selectOptions(screen.getByRole('combobox', { name: 'Select year' }), String(earliest.getFullYear()))
    await user.selectOptions(screen.getByRole('combobox', { name: 'Select month' }), String(earliest.getMonth()))

    expect(screen.getByRole('button', { name: dayLabel(earliest) })).toBeEnabled()
  })

  it('disables today when until is yesterday', () => {
    render(<DatePicker until="yesterday" />)

    expect(screen.getByRole('button', { name: dayLabel(new Date()) })).toBeDisabled()
  })

  it('keeps yesterday selectable when until is yesterday', () => {
    const yesterday = boundDate('yesterday')
    render(<DatePicker until="yesterday" />)

    expect(screen.getByRole('button', { name: dayLabel(yesterday) })).toBeEnabled()
  })

  it('disables today when until is 1 day ago', () => {
    render(<DatePicker until={{ daysAgo: 1 }} />)

    expect(screen.getByRole('button', { name: dayLabel(new Date()) })).toBeDisabled()
  })

  it('keeps the day 1 day ago selectable', () => {
    const yesterday = boundDate({ daysAgo: 1 })
    render(<DatePicker until={{ daysAgo: 1 }} />)

    expect(screen.getByRole('button', { name: dayLabel(yesterday) })).toBeEnabled()
  })

  it('disables range presets that fall outside the max date', () => {
    render(
      <DatePicker
        selectionMode="range"
        showPresets
        maxDate={new Date(2008, 5, 15)}
      />,
    )

    expect(screen.getByRole('button', { name: 'This week' })).toBeDisabled()
  })
})
