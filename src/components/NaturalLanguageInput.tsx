import { useNaturalLanguage } from '../hooks/useNaturalLanguage'

interface NaturalLanguageInputProps {
  selectionMode: 'single' | 'range'
  locale: 'th' | 'en'
  onCommit: (result: { single?: Date; range?: [Date, Date] }) => void
}

export function NaturalLanguageInput({
  selectionMode,
  locale,
  onCommit,
}: NaturalLanguageInputProps) {
  const { inputValue, preview, handleChange, setInputValue, setPreview } =
    useNaturalLanguage()

  const commit = () => {
    if (!preview) return
    onCommit(preview)
    setInputValue('')
    setPreview(null)
  }

  const previewText = (() => {
    if (!preview) return null
    if (preview.range) {
      const fmt = (d: Date) =>
        d.toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      return `${fmt(preview.range[0])} – ${fmt(preview.range[1])}`
    }
    if (preview.single) {
      return preview.single.toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    }
    return null
  })()

  return (
    <div className="dp-nl-input">
      <input
        className="dp-nl-field"
        type="text"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit()
        }}
        onBlur={commit}
        placeholder={
          selectionMode === 'range'
            ? 'e.g. Jan 1 - Jan 15 2024'
            : 'e.g. next Friday'
        }
        aria-label="Natural language date input (English only)"
      />
      {previewText && (
        <div className="dp-nl-preview" aria-live="polite">
          {previewText}
        </div>
      )}
    </div>
  )
}
