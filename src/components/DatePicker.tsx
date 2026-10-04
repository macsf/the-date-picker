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
import { clampVisibleMonth, getVisibleMonths, resolveRelativeBounds, type RelativeBound } from '../utils/dateBounds'
import { toLocalDate } from '../utils/dateNormalize'
import { isDisabled as checkDisabled } from '../utils/disabled'

export type { CustomHolidayConfig }
export type { RelativeBound }

function monthStartFrom(date: Date): Date {
  const normalized = toLocalDate(date)
  return new Date(normalized.getFullYear(), normalized.getMonth(), 1)
}

function isDayInBounds(date: Date, minDate?: Date, maxDate?: Date): boolean {
  const day = toLocalDate(date).getTime()
  if (minDate && day < toLocalDate(minDate).getTime()) return false
  if (maxDate && day > toLocalDate(maxDate).getTime()) return false
  return true
}

function resolveVisibleMonths(
  value: Date | [Date, Date] | null,
  numberOfMonths: 1 | 2,
  minDate?: Date,
  maxDate?: Date,
): { left: Date; right: Date } {
  const opening = getVisibleMonths(numberOfMonths, minDate, maxDate)
  const selected = value instanceof Date ? value : Array.isArray(value) ? value[0] : null
  if (!selected || !isDayInBounds(selected, minDate, maxDate)) return opening

  const left = clampVisibleMonth(monthStartFrom(selected), minDate, maxDate)
  if (numberOfMonths === 1) return { left, right: left }

  const end = Array.isArray(value) ? value[1] : undefined
  const endMonth = end && isDayInBounds(end, minDate, maxDate) ? monthStartFrom(end) : null
  const right = clampVisibleMonth(
    endMonth && !isSameMonth(left, endMonth)
      ? endMonth
      : new Date(left.getFullYear(), left.getMonth() + 1, 1),
    minDate,
    maxDate,
  )
  return { left, right }
}

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
  /** Earliest day, counted from today. The later day wins when `minDate` is also set. */
  from?: RelativeBound
  /** Latest day, counted from today. The earlier day wins when `maxDate` is also set. */
  until?: RelativeBound
  disabledDates?: Date[]
  weekStartsOn?: 0 | 1
  highlightWeekends?: boolean
  showTodayButton?: boolean
  todayButtonLabel?: string
  mode?: 'inline' | 'popover'
  triggerFormat?: string
  /** Shown in the popover field before a date is chosen. */
  triggerPlaceholder?: string
  /** Accessible name for the default popover button. */
  triggerAriaLabel?: string
  /**
   * Render the form field yourself. Put `ref` and `onClick` on the control
   * that should open the calendar, and show `label` as its value.
   */
  trigger?: (field: DatePickerTriggerField) => React.ReactNode
  className?: string
}

export interface DatePickerTriggerField {
  ref: React.RefCallback<HTMLElement>
  onClick: () => void
  /** Formatted date, or an empty string when nothing is selected. */
  label: string
  placeholder: string
  isOpen: boolean
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
  minDate: minDateProp,
  maxDate: maxDateProp,
  from,
  until,
  disabledDates,
  weekStartsOn = 0,
  highlightWeekends = true,
  showTodayButton = false,
  todayButtonLabel = 'Today',
  mode = 'inline',
  triggerFormat,
  triggerPlaceholder = 'Select date',
  triggerAriaLabel,
  trigger,
  className,
}: DatePickerProps) {
  const { minDate, maxDate } = resolveRelativeBounds({
    minDate: minDateProp,
    maxDate: maxDateProp,
    from,
    until,
  })
  const themeVars = useMemo(() => injectTheme({ ...lightTheme, ...theme }), [theme])
  const popover = usePopover()

  const visibleMonths = resolveVisibleMonths(value, numberOfMonths, minDate, maxDate)
  const [leftMonth, setLeftMonth] = useState<Date>(visibleMonths.left)
  const [rightMonth, setRightMonth] = useState<Date>(visibleMonths.right)

  const boundsKey = `${minDate?.getTime() ?? ''}|${maxDate?.getTime() ?? ''}|${numberOfMonths}`
  const [appliedBoundsKey, setAppliedBoundsKey] = useState(boundsKey)
  if (appliedBoundsKey !== boundsKey) {
    setAppliedBoundsKey(boundsKey)
    const nextMonths = resolveVisibleMonths(value, numberOfMonths, minDate, maxDate)
    setLeftMonth(nextMonths.left)
    setRightMonth(nextMonths.right)
  }

  const [announcement, setAnnouncement] = useState('')

  const selectedDate = selectionMode === 'single' && value instanceof Date ? value : null
  const rangeValue = selectionMode === 'range' && Array.isArray(value) ? (value as [Date, Date]) : null

  const { pendingStart, previewRange, handleDayClick, handleDayHover } = useDateRange({
    value: rangeValue,
    onChange: (r) => onChange?.(r),
  })

  const isBlocked = useCallback(
    (date: Date) => checkDisabled(date, minDate, maxDate, disabledDates),
    [minDate, maxDate, disabledDates],
  )

  const changeLeftMonth = useCallback(
    (month: Date) => {
      setLeftMonth(clampVisibleMonth(month, minDate, maxDate))
    },
    [minDate, maxDate],
  )

  const changeRightMonth = useCallback(
    (month: Date) => {
      setRightMonth(clampVisibleMonth(month, minDate, maxDate))
    },
    [minDate, maxDate],
  )

  const setVisibleMonthsForRange = useCallback(
    (start: Date, end?: Date) => {
      const normalizedStart = toLocalDate(start)
      changeLeftMonth(normalizedStart)

      if (numberOfMonths === 2) {
        const normalizedEnd = toLocalDate(end ?? start)
        const nextRight = isSameMonth(normalizedStart, normalizedEnd)
          ? new Date(normalizedStart.getFullYear(), normalizedStart.getMonth() + 1, 1)
          : new Date(normalizedEnd.getFullYear(), normalizedEnd.getMonth(), 1)
        changeRightMonth(nextRight)
      }
    },
    [numberOfMonths, changeLeftMonth, changeRightMonth],
  )

  const handleSingleClick = useCallback(
    (date: Date) => {
      const normalized = toLocalDate(date)
      if (isBlocked(normalized)) return
      onChange?.(normalized)
      changeLeftMonth(normalized)
      if (numberOfMonths === 2) {
        changeRightMonth(new Date(normalized.getFullYear(), normalized.getMonth() + 1, 1))
      }
      if (mode === 'popover') {
        popover.close()
      }
    },
    [numberOfMonths, onChange, mode, popover, isBlocked, changeLeftMonth, changeRightMonth],
  )

  const applyTodaySelection = useCallback(() => {
    const today = toLocalDate(new Date())
    if (isBlocked(today)) return

    if (selectionMode === 'range') {
      onChange?.([today, today])
      setVisibleMonthsForRange(today, today)
    } else {
      onChange?.(today)
      changeLeftMonth(today)
      if (numberOfMonths === 2) {
        changeRightMonth(new Date(today.getFullYear(), today.getMonth() + 1, 1))
      }
    }

    if (mode === 'popover') {
      popover.close()
    }
  }, [selectionMode, onChange, setVisibleMonthsForRange, numberOfMonths, mode, popover, isBlocked, changeLeftMonth, changeRightMonth])

  const handleRangeClick = useCallback(
    (date: Date) => {
      const normalized = toLocalDate(date)
      if (isBlocked(normalized)) return
      const hadPendingStart = pendingStart !== null
      handleDayClick(normalized)
      if (mode === 'popover' && hadPendingStart) {
        popover.close()
      }
    },
    [pendingStart, handleDayClick, mode, popover, isBlocked],
  )

  const handleRangePresetSelect = useCallback(
    (range: [Date, Date]) => {
      const normalized: [Date, Date] = [toLocalDate(range[0]), toLocalDate(range[1])]
      if (isBlocked(normalized[0]) || isBlocked(normalized[1])) return
      onChange?.(normalized)
      setVisibleMonthsForRange(normalized[0], normalized[1])
    },
    [onChange, setVisibleMonthsForRange, isBlocked],
  )

  const handleNLCommit = useCallback(
    (result: { single?: Date; range?: [Date, Date] }) => {
      if (selectionMode === 'single' && result.single) {
        const normalized = toLocalDate(result.single)
        if (isBlocked(normalized)) return
        onChange?.(normalized)
        setVisibleMonthsForRange(normalized, new Date(normalized.getFullYear(), normalized.getMonth() + 1, 1))
      } else if (selectionMode === 'range' && result.range) {
        const normalized = [toLocalDate(result.range[0]), toLocalDate(result.range[1])] as [Date, Date]
        if (isBlocked(normalized[0]) || isBlocked(normalized[1])) return
        onChange?.(normalized)
        setVisibleMonthsForRange(normalized[0], normalized[1])
      } else if (selectionMode === 'range' && result.single) {
        const normalized = toLocalDate(result.single)
        if (isBlocked(normalized)) return
        onChange?.([normalized, normalized])
        setVisibleMonthsForRange(normalized, normalized)
      } else if (result.single) {
        const normalized = toLocalDate(result.single)
        if (isBlocked(normalized)) return
        onChange?.(normalized)
        setVisibleMonthsForRange(normalized, new Date(normalized.getFullYear(), normalized.getMonth() + 1, 1))
      }
    },
    [selectionMode, onChange, setVisibleMonthsForRange, isBlocked],
  )

  const dayClickHandler = selectionMode === 'range' ? handleRangeClick : handleSingleClick
  const todayDisabled = checkDisabled(toLocalDate(new Date()), minDate, maxDate, disabledDates)

  const defaultTriggerFormat =
    selectionMode === 'range' ? 'dd MMM yyyy' : 'dd MMM yyyy'

  const triggerValue = (() => {
    const fmt = triggerFormat ?? defaultTriggerFormat
    if (Array.isArray(value) && value[0] && value[1]) {
      return `${format(value[0], fmt)} - ${format(value[1], fmt)}`
    }
    if (value instanceof Date) {
      return format(value, fmt)
    }
    return ''
  })()

  const calendarConfig: CalendarConfig = {
    locale,
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
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
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
          onMonthChange={changeLeftMonth}
        />
        {numberOfMonths === 2 && (
          <Calendar
            {...sharedCalendarProps}
            month={rightMonth}
            onMonthChange={changeRightMonth}
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

  const bindTrigger = useCallback((node: HTMLElement | null) => {
    popover.triggerRef.current = node
  }, [popover.triggerRef])

  if (mode === 'popover') {
    const field: DatePickerTriggerField = {
      ref: bindTrigger,
      onClick: popover.toggle,
      label: triggerValue,
      placeholder: triggerPlaceholder,
      isOpen: popover.isOpen,
    }
    return (
      <>
        {trigger ? (
          trigger(field)
        ) : (
          <button
            ref={bindTrigger}
            className={['dp-trigger', triggerValue ? '' : 'dp-trigger--empty'].filter(Boolean).join(' ')}
            type="button"
            onClick={popover.toggle}
            aria-label={triggerAriaLabel}
            aria-haspopup="dialog"
            aria-expanded={popover.isOpen}
          >
            {triggerValue || triggerPlaceholder}
          </button>
        )}
        <Popover
          isOpen={popover.isOpen}
          placed={popover.placed}
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
