import { useState } from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { DatePicker } from './DatePicker'

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
