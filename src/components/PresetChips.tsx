import { isSameDay } from 'date-fns'
import type { Preset } from '../utils/presets'
import { builtInPresets } from '../utils/presets'

interface PresetChipsProps {
  presets?: Preset[]
  value: [Date, Date] | null
  onSelect: (range: [Date, Date]) => void
}

export function PresetChips({ presets, value, onSelect }: PresetChipsProps) {
  const activePresets = presets ?? builtInPresets

  const isActive = (preset: Preset): boolean => {
    if (!value) return false
    const [start, end] = preset.resolve()
    return isSameDay(start, value[0]) && isSameDay(end, value[1])
  }

  return (
    <div className="dp-preset-chips" role="group" aria-label="Quick select presets">
      {activePresets.map((preset, i) => (
        <button
          key={i}
          className={['dp-chip', isActive(preset) ? 'dp-chip--active' : ''].join(' ')}
          onClick={() => onSelect(preset.resolve())}
          type="button"
        >
          {preset.label}
        </button>
      ))}
    </div>
  )
}
