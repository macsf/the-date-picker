import { useState, useCallback } from 'react'

export interface ParsedDates {
  single?: Date
  range?: [Date, Date]
  text: string
}

export function useNaturalLanguage() {
  const [preview, setPreview] = useState<ParsedDates | null>(null)
  const [inputValue, setInputValue] = useState('')

  const parse = useCallback(async (text: string): Promise<ParsedDates | null> => {
    if (!text.trim()) return null

    // Lazy-load chrono-node
    const chrono = await import('chrono-node')
    const results = chrono.parse(text)

    if (results.length === 0) return null

    // Try range: first result with both start and end
    const withEnd = results.find((r) => r.end != null)
    if (withEnd) {
      return {
        range: [withEnd.start.date(), withEnd.end!.date()],
        text,
      }
    }

    // Two results: treat as start + end
    if (results.length >= 2) {
      return {
        range: [results[0].start.date(), results[1].start.date()],
        text,
      }
    }

    // Single date
    return { single: results[0].start.date(), text }
  }, [])

  const handleChange = useCallback(
    async (text: string) => {
      setInputValue(text)
      const result = await parse(text)
      setPreview(result)
    },
    [parse],
  )

  return { inputValue, preview, handleChange, setInputValue, setPreview }
}
