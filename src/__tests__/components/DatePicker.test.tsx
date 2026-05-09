import { useState } from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { DatePicker } from '../../components/DatePicker'

function ControlledRangeNaturalLanguagePicker() {
  const [value, setValue] = useState<Date | [Date, Date] | null>(null)

  return (
    <DatePicker
      selectionMode="range"
      value={value}
      onChange={setValue}
      showNaturalLanguageInput
    />
  )
}

describe('DatePicker popover mode', () => {
  it('closes after selecting a single date', async () => {
    const user = userEvent.setup()
    render(<DatePicker mode="popover" selectionMode="single" />)

    await user.click(screen.getByRole('button', { name: 'Select date' }))

    const dialog = screen.getByRole('dialog')
    const dayButtons = within(dialog)
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-label')?.includes(','))

    expect(dayButtons.length).toBeGreaterThan(0)
    await user.click(dayButtons[0])

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('stays open after first range click and closes after second', async () => {
    const user = userEvent.setup()
    render(<DatePicker mode="popover" selectionMode="range" />)

    await user.click(screen.getByRole('button', { name: 'Select date' }))

    const firstDialog = screen.getByRole('dialog')
    const firstDayButtons = within(firstDialog)
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-label')?.includes(','))

    expect(firstDayButtons.length).toBeGreaterThan(0)
    await user.click(firstDayButtons[0])

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    const secondDialog = screen.getByRole('dialog')
    const secondDayButtons = within(secondDialog)
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-label')?.includes(','))

    expect(secondDayButtons.length).toBeGreaterThan(0)
    await user.click(secondDayButtons[0])

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})

describe('DatePicker natural language input', () => {
  it('selects a one-day range when a single-date phrase is entered in range mode', async () => {
    const user = userEvent.setup()
    render(<ControlledRangeNaturalLanguagePicker />)

    await user.type(
      screen.getByRole('textbox', { name: 'Natural language date input (English only)' }),
      'today{enter}',
    )

    const todayLabel = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    await waitFor(() => {
      expect(screen.getByRole('button', { name: todayLabel })).toHaveAttribute(
        'aria-pressed',
        'true',
      )
    })
  })
})

describe('DatePicker range selection', () => {
  it('shows the new start immediately after completing an earlier range', async () => {
    const user = userEvent.setup()
    render(<ControlledRangeNaturalLanguagePicker />)

    const currentMonthDays = screen
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-label')?.includes(',') && button.tabIndex === 0)

    expect(currentMonthDays.length).toBeGreaterThan(12)

    const firstStart = currentMonthDays[0]
    const firstEnd = currentMonthDays[3]
    const nextStart = currentMonthDays[10]
    const nextEnd = currentMonthDays[12]

    await user.click(firstStart)
    await user.click(firstEnd)

    expect(firstStart).toHaveAttribute('aria-pressed', 'true')
    expect(firstEnd).toHaveAttribute('aria-pressed', 'true')

    await user.click(nextStart)

    expect(firstStart).toHaveAttribute('aria-pressed', 'false')
    expect(firstEnd).toHaveAttribute('aria-pressed', 'false')
    expect(nextStart).toHaveAttribute('aria-pressed', 'true')

    await user.click(nextEnd)

    expect(nextStart).toHaveAttribute('aria-pressed', 'true')
    expect(nextEnd).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('DatePicker two-month navigation', () => {
  it('lets left and right visible months change independently', async () => {
    const user = userEvent.setup()

    render(
      <DatePicker
        numberOfMonths={2}
        selectionMode="range"
        value={[new Date(2026, 10, 10), new Date(2026, 10, 12)]}
      />,
    )

    const monthSelects = screen.getAllByRole('combobox', { name: 'Select month' })
    const yearSelects = screen.getAllByRole('combobox', { name: 'Select year' })

    expect(monthSelects).toHaveLength(2)
    expect(yearSelects).toHaveLength(2)

    expect(monthSelects[0]).toHaveValue('10')
    expect(yearSelects[0]).toHaveValue('2026')
    expect(monthSelects[1]).toHaveValue('11')
    expect(yearSelects[1]).toHaveValue('2026')

    await user.selectOptions(yearSelects[1], '2027')
    await user.selectOptions(monthSelects[1], '0')

    expect(monthSelects[0]).toHaveValue('10')
    expect(yearSelects[0]).toHaveValue('2026')
    expect(monthSelects[1]).toHaveValue('0')
    expect(yearSelects[1]).toHaveValue('2027')

    await user.selectOptions(yearSelects[0], '2028')
    await user.selectOptions(monthSelects[0], '4')

    expect(monthSelects[0]).toHaveValue('4')
    expect(yearSelects[0]).toHaveValue('2028')
    expect(monthSelects[1]).toHaveValue('0')
    expect(yearSelects[1]).toHaveValue('2027')
  })
})
