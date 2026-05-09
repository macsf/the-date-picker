import { useState, useCallback } from 'react'
import { isBefore } from 'date-fns'

interface UseDateRangeOptions {
  value: [Date, Date] | null
  onChange: (value: [Date, Date] | null) => void
}

export function useDateRange({ value, onChange }: UseDateRangeOptions) {
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  // pendingStart: first click in range selection before second click confirms
  const [pendingStart, setPendingStart] = useState<Date | null>(null)

  const handleDayClick = useCallback(
    (date: Date) => {
      if (pendingStart === null) {
        setPendingStart(date)
        onChange(null)
      } else {
        const start = isBefore(date, pendingStart) ? date : pendingStart
        const end = isBefore(date, pendingStart) ? pendingStart : date
        onChange([start, end])
        setPendingStart(null)
        setHoverDate(null)
      }
    },
    [pendingStart, onChange],
  )

  const handleDayHover = useCallback(
    (date: Date | null) => {
      if (pendingStart !== null) setHoverDate(date)
    },
    [pendingStart],
  )

  // Preview range while hovering after first click
  const previewRange: [Date, Date] | null = (() => {
    if (pendingStart) {
      if (hoverDate) {
        const start = isBefore(hoverDate, pendingStart) ? hoverDate : pendingStart
        const end = isBefore(hoverDate, pendingStart) ? pendingStart : hoverDate
        return [start, end]
      }
      return [pendingStart, pendingStart]
    }
    return value
  })()

  return {
    pendingStart,
    hoverDate,
    previewRange,
    handleDayClick,
    handleDayHover,
  }
}
