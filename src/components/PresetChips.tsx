import { isSameDay } from 'date-fns'
import type { Preset } from '../utils/presets'
import { builtInPresets } from '../utils/presets'
import { isDisabled } from '../utils/disabled'

interface PresetChipsProps {
  presets?: Preset[]
  value: [Date, Date] | null
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  onSelect: (range: [Date, Date]) => void
  display?: 'chips' | 'dropdown'
  dropdownPlaceholder?: string
  dropdownAriaLabel?: string
}

export function PresetChips({
  presets,
  value,
  minDate,
  maxDate,
  disabledDates,
  onSelect,
  display = 'chips',
  dropdownPlaceholder = 'Quick select range',
  dropdownAriaLabel = 'Quick select presets',
}: PresetChipsProps) {
  const activePresets = presets ?? builtInPresets

  const isPresetBlocked = (preset: Preset): boolean => {
    const [start, end] = preset.resolve()
    return isDisabled(start, minDate, maxDate, disabledDates) || isDisabled(end, minDate, maxDate, disabledDates)
  }

  const isActive = (preset: Preset): boolean => {
    if (!value) return false
    const [start, end] = preset.resolve()
    return isSameDay(start, value[0]) && isSameDay(end, value[1])
  }

  const activeIndex = activePresets.findIndex((preset) => isActive(preset))

  if (display === 'dropdown') {
    return (
      <div className="dp-preset-dropdown-wrap">
        <select
          className="dp-preset-select"
          aria-label={dropdownAriaLabel}
          value={activeIndex >= 0 ? String(activeIndex) : ''}
          onChange={(e) => {
            const nextIndex = e.target.value
            if (nextIndex === '') return
            onSelect(activePresets[Number(nextIndex)].resolve())
          }}
        >
          <option value="">{dropdownPlaceholder}</option>
          {activePresets.map((preset, i) => (
            <option key={i} value={i} disabled={isPresetBlocked(preset)}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className="dp-preset-chips" role="group" aria-label="Quick select presets">
      {activePresets.map((preset, i) => (
        <button
          key={i}
          className={['dp-chip', isActive(preset) ? 'dp-chip--active' : ''].join(' ')}
          onClick={() => onSelect(preset.resolve())}
          disabled={isPresetBlocked(preset)}
          type="button"
        >
          {preset.label}
        </button>
      ))}
    </div>
  )
}
