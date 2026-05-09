import React, { useState, useCallback } from 'react'
import { format } from 'date-fns'
import { Calendar, type CalendarConfig } from './Calendar'
import { PresetChips } from './PresetChips'
import { NaturalLanguageInput } from './NaturalLanguageInput'
import { Popover } from './Popover'
import { useDateRange } from '../hooks/useDateRange'
import { usePopover } from '../hooks/usePopover'
import { injectTheme } from '../theme/inject'
import { lightTheme } from '../theme/light'
import type { DatePickerTheme } from '../theme/types'
import type { Preset } from '../utils/presets'
import type { CustomHolidayConfig } from '../hooks/useHolidays'

export type { CustomHolidayConfig }

export interface DatePickerProps {
  numberOfMonths?: 1 | 2
  selectionMode?: 'single' | 'range'
  value?: Date | [Date, Date] | null
  onChange?: (value: Date | [Date, Date] | null) => void
  locale?: 'th' | 'en'
  theme?: DatePickerTheme
  presets?: Preset[]
  customHolidays?: CustomHolidayConfig[]
  holidayTypes?: Array<'public' | 'bank' | 'observance'>
  showNaturalLanguageInput?: boolean
  showPresets?: boolean
  showHolidays?: boolean
  showWeekNumbers?: boolean
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  weekStartsOn?: 0 | 1
  calendarSystem?: 'gregorian' | 'buddhist'
  mode?: 'inline' | 'popover'
  triggerFormat?: string
  className?: string
}

export function DatePicker({
  numberOfMonths = 1,
  selectionMode = 'single',
  value = null,
  onChange,
  locale = 'en',
  theme,
  presets,
  customHolidays = [],
  holidayTypes = ['public'],
  showNaturalLanguageInput = false,
  showPresets = false,
  showHolidays = true,
  showWeekNumbers = false,
  minDate,
  maxDate,
  disabledDates,
  weekStartsOn = 0,
  calendarSystem = 'gregorian',
  mode = 'inline',
  triggerFormat,
  className,
}: DatePickerProps) {
  const mergedTheme = { ...lightTheme, ...theme }
  const themeVars = injectTheme(mergedTheme)
  const popover = usePopover()

  const [leftMonth, setLeftMonth] = useState<Date>(() => {
    if (Array.isArray(value) && value[0]) return new Date(value[0].getFullYear(), value[0].getMonth(), 1)
    if (value instanceof Date) return new Date(value.getFullYear(), value.getMonth(), 1)
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  })

  const rightMonth = new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1, 1)

  const [announcement, setAnnouncement] = useState('')

  const selectedDate = selectionMode === 'single' && value instanceof Date ? value : null
  const rangeValue = selectionMode === 'range' && Array.isArray(value) ? (value as [Date, Date]) : null

  const { pendingStart, previewRange, handleDayClick, handleDayHover } = useDateRange({
    value: rangeValue,
    onChange: (r) => onChange?.(r),
  })

  const handleSingleClick = useCallback(
    (date: Date) => {
      onChange?.(date)
      if (mode === 'popover') {
        popover.close()
      }
    },
    [onChange, mode, popover],
  )

  const handleRangeClick = useCallback(
    (date: Date) => {
      const hadPendingStart = pendingStart !== null
      handleDayClick(date)
      if (mode === 'popover' && hadPendingStart) {
        popover.close()
      }
    },
    [pendingStart, handleDayClick, mode, popover],
  )

  const handleRangePresetSelect = useCallback(
    (range: [Date, Date]) => {
      onChange?.(range)
    },
    [onChange],
  )

  const handleNLCommit = useCallback(
    (result: { single?: Date; range?: [Date, Date] }) => {
      if (selectionMode === 'single' && result.single) {
        onChange?.(result.single)
        setLeftMonth(new Date(result.single.getFullYear(), result.single.getMonth(), 1))
      } else if (selectionMode === 'range' && result.range) {
        onChange?.(result.range)
        setLeftMonth(new Date(result.range[0].getFullYear(), result.range[0].getMonth(), 1))
      } else if (result.single) {
        onChange?.(result.single)
        setLeftMonth(new Date(result.single.getFullYear(), result.single.getMonth(), 1))
      }
    },
    [selectionMode, onChange],
  )

  const dayClickHandler = selectionMode === 'range' ? handleRangeClick : handleSingleClick

  const defaultTriggerFormat =
    selectionMode === 'range' ? 'dd MMM yyyy' : 'dd MMM yyyy'

  const triggerLabel = (() => {
    const fmt = triggerFormat ?? defaultTriggerFormat
    if (Array.isArray(value) && value[0] && value[1]) {
      return `${format(value[0], fmt)} - ${format(value[1], fmt)}`
    }
    if (value instanceof Date) {
      return format(value, fmt)
    }
    return 'Select date'
  })()

  const calendarConfig: CalendarConfig = {
    locale,
    calendarSystem,
    weekStartsOn,
    showWeekNumbers,
    showHolidays,
    holidayTypes,
    customHolidays,
    minDate,
    maxDate,
    disabledDates,
  }

  const sharedCalendarProps = {
    selectionMode,
    selectedDate,
    rangeValue,
    previewRange,
    onDayClick: dayClickHandler,
    onDayHover: selectionMode === 'range' ? handleDayHover : () => {},
    onAnnounce: setAnnouncement,
    config: calendarConfig,
  }

  const calendarContent = (
    <div
      className={['dp-calendar-panel', className].filter(Boolean).join(' ')}
      data-datepicker-root
      style={themeVars as React.CSSProperties}
    >
      {showNaturalLanguageInput && (
        <NaturalLanguageInput
          selectionMode={selectionMode}
          locale={locale}
          onCommit={handleNLCommit}
        />
      )}
      {showPresets && selectionMode === 'range' && (
        <PresetChips
          presets={presets}
          value={rangeValue}
          onSelect={handleRangePresetSelect}
        />
      )}
      <div className={`dp-months dp-months--${numberOfMonths}`}>
        <Calendar
          {...sharedCalendarProps}
          month={leftMonth}
          onMonthChange={setLeftMonth}
        />
        {numberOfMonths === 2 && (
          <Calendar
            {...sharedCalendarProps}
            month={rightMonth}
            onMonthChange={(m) => setLeftMonth(new Date(m.getFullYear(), m.getMonth() - 1, 1))}
          />
        )}
      </div>
      {/* aria-live region for screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="dp-sr-only"
      >
        {announcement}
      </div>
    </div>
  )

  if (mode === 'popover') {
    return (
      <>
        <button
          ref={popover.triggerRef as React.RefObject<HTMLButtonElement>}
          className="dp-trigger"
          onClick={popover.toggle}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={popover.isOpen}
        >
          {triggerLabel}
        </button>
        <Popover
          isOpen={popover.isOpen}
          position={popover.position}
          popoverRef={popover.popoverRef}
        >
          {calendarContent}
        </Popover>
      </>
    )
  }

  return calendarContent
}
