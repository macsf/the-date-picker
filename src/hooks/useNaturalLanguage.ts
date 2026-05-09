import { useState, useCallback } from 'react'
import { parseNaturalLanguage } from '../utils/naturalLanguage'

export type { ParsedDates } from '../utils/naturalLanguage'

export function useNaturalLanguage() {
  const [preview, setPreview] = useState<ReturnType<typeof parseNaturalLanguage>>(null)
  const [inputValue, setInputValue] = useState('')

  const handleChange = useCallback((text: string) => {
    setInputValue(text)
    setPreview(parseNaturalLanguage(text))
  }, [])

  return { inputValue, preview, handleChange, setInputValue, setPreview }
}
