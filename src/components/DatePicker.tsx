import React, { useState, useCallback, useMemo } from 'react'
import { format, isSameMonth } from 'date-fns'
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
import { toLocalDate } from '../utils/dateNormalize'
import { isDisabled as checkDisabled } from '../utils/disabled'

export type { CustomHolidayConfig }

export interface DatePickerProps {
  numberOfMonths?: 1 | 2
  selectionMode?: 'single' | 'range'
  value?: Date | [Date, Date] | null
  onChange?: (value: Date | [Date, Date] | null) => void
  locale?: 'th' | 'en'
  theme?: DatePickerTheme
  presets?: Preset[]
  presetDisplay?: 'chips' | 'dropdown'
  presetDropdownPlaceholder?: string
  presetDropdownAriaLabel?: string
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
  highlightWeekends?: boolean
  showTodayButton?: boolean
  todayButtonLabel?: string
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
  presetDisplay = 'chips',
  presetDropdownPlaceholder = 'Quick select range',
  presetDropdownAriaLabel = 'Quick select presets',
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
  highlightWeekends = true,
  showTodayButton = false,
  todayButtonLabel = 'Today',
  calendarSystem = 'gregorian',
  mode = 'inline',
  triggerFormat,
  className,
}: DatePickerProps) {
  const themeVars = useMemo(() => injectTheme({ ...lightTheme, ...theme }), [theme])
  const popover = usePopover()

  const [leftMonth, setLeftMonth] = useState<Date>(() => {
    const now = toLocalDate(new Date())
    if (Array.isArray(value) && value[0]) {
      const normalized = toLocalDate(value[0])
      return new Date(normalized.getFullYear(), normalized.getMonth(), 1)
    }
    if (value instanceof Date) {
      const normalized = toLocalDate(value)
      return new Date(normalized.getFullYear(), normalized.getMonth(), 1)
    }
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [rightMonth, setRightMonth] = useState<Date>(() => {
    if (Array.isArray(value) && value[1]) {
      const start = value[0] ? toLocalDate(value[0]) : null
      const normalized = toLocalDate(value[1])
      if (start && !isSameMonth(start, normalized)) {
        return new Date(normalized.getFullYear(), normalized.getMonth(), 1)
      }
      return new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1, 1)
    }
    return new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1, 1)
  })

  const [announcement, setAnnouncement] = useState('')

  const selectedDate = selectionMode === 'single' && value instanceof Date ? value : null
  const rangeValue = selectionMode === 'range' && Array.isArray(value) ? (value as [Date, Date]) : null

  const { pendingStart, previewRange, handleDayClick, handleDayHover } = useDateRange({
    value: rangeValue,
    onChange: (r) => onChange?.(r),
  })

  const setVisibleMonthsForRange = useCallback(
    (start: Date, end?: Date) => {
      const normalizedStart = toLocalDate(start)
      setLeftMonth(new Date(normalizedStart.getFullYear(), normalizedStart.getMonth(), 1))

      if (numberOfMonths === 2) {
        const normalizedEnd = toLocalDate(end ?? start)
        const nextRight = isSameMonth(normalizedStart, normalizedEnd)
          ? new Date(normalizedStart.getFullYear(), normalizedStart.getMonth() + 1, 1)
          : new Date(normalizedEnd.getFullYear(), normalizedEnd.getMonth(), 1)
        setRightMonth(nextRight)
      }
    },
    [numberOfMonths],
  )

  const handleSingleClick = useCallback(
    (date: Date) => {
      const normalized = toLocalDate(date)
      onChange?.(normalized)
      setLeftMonth(new Date(normalized.getFullYear(), normalized.getMonth(), 1))
      if (numberOfMonths === 2) {
        setRightMonth(new Date(normalized.getFullYear(), normalized.getMonth() + 1, 1))
      }
      if (mode === 'popover') {
        popover.close()
      }
    },
    [numberOfMonths, onChange, mode, popover],
  )

  const applyTodaySelection = useCallback(() => {
    const today = toLocalDate(new Date())

    if (selectionMode === 'range') {
      onChange?.([today, today])
      setVisibleMonthsForRange(today, today)
    } else {
      onChange?.(today)
      setLeftMonth(new Date(today.getFullYear(), today.getMonth(), 1))
      if (numberOfMonths === 2) {
        setRightMonth(new Date(today.getFullYear(), today.getMonth() + 1, 1))
      }
    }

    if (mode === 'popover') {
      popover.close()
    }
  }, [selectionMode, onChange, setVisibleMonthsForRange, numberOfMonths, mode, popover])

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
      setVisibleMonthsForRange(range[0], range[1])
    },
    [onChange, setVisibleMonthsForRange],
  )

  const handleNLCommit = useCallback(
    (result: { single?: Date; range?: [Date, Date] }) => {
      if (selectionMode === 'single' && result.single) {
        const normalized = toLocalDate(result.single)
        onChange?.(normalized)
        setVisibleMonthsForRange(normalized, new Date(normalized.getFullYear(), normalized.getMonth() + 1, 1))
      } else if (selectionMode === 'range' && result.range) {
        const normalized = [toLocalDate(result.range[0]), toLocalDate(result.range[1])] as [Date, Date]
        onChange?.(normalized)
        setVisibleMonthsForRange(normalized[0], normalized[1])
      } else if (selectionMode === 'range' && result.single) {
        const normalized = toLocalDate(result.single)
        onChange?.([normalized, normalized])
        setVisibleMonthsForRange(normalized, normalized)
      } else if (result.single) {
        const normalized = toLocalDate(result.single)
        onChange?.(normalized)
        setVisibleMonthsForRange(normalized, new Date(normalized.getFullYear(), normalized.getMonth() + 1, 1))
      }
    },
    [selectionMode, onChange, setVisibleMonthsForRange],
  )

  const dayClickHandler = selectionMode === 'range' ? handleRangeClick : handleSingleClick
  const todayDisabled = checkDisabled(toLocalDate(new Date()), minDate, maxDate, disabledDates)

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
    highlightWeekends,
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
          display={presetDisplay}
          dropdownPlaceholder={presetDropdownPlaceholder}
          dropdownAriaLabel={presetDropdownAriaLabel}
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
            onMonthChange={setRightMonth}
          />
        )}
      </div>
      {showTodayButton && (
        <div className="dp-footer-actions">
          <button
            type="button"
            className="dp-footer-btn"
            onClick={applyTodaySelection}
            disabled={todayDisabled}
          >
            {todayButtonLabel}
          </button>
        </div>
      )}
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
