import { useState, useEffect } from 'react'

export interface HolidayEntry {
  date: string
  name: string
  type: string
}

// Map<cacheKey, HolidayEntry[]>
const cache = new Map<string, HolidayEntry[]>()

function getCacheKey(year: number, locale: string, types: string[]): string {
  return `${year}-${locale}-${types.sort().join(',')}`
}

export function useHolidays(
  year: number,
  locale: 'th' | 'en',
  types: Array<'public' | 'bank' | 'observance'> = ['public'],
  enabled = true,
) {
  const [holidays, setHolidays] = useState<HolidayEntry[]>([])

  useEffect(() => {
    if (!enabled) return

    const key = getCacheKey(year, locale, types)
    if (cache.has(key)) {
      setHolidays(cache.get(key)!)
      return
    }

    let cancelled = false

    import('../data/th-holidays.json').then(({ default: rawData }) => {
      if (cancelled) return

      // rawData is { [year]: HolidayEntry[] }
      const yearData = (rawData as Record<string, HolidayEntry[]>)[String(year)] ?? []
      const filtered = yearData.filter((h) => (types as string[]).includes(h.type))

      // Pick the right locale name field — our JSON stores both 'name' (en) and 'nameTH'
      const localized = filtered.map((h) => ({
        ...h,
        name:
          locale === 'th' && (h as HolidayEntry & { nameTH?: string }).nameTH
            ? (h as HolidayEntry & { nameTH?: string }).nameTH!
            : h.name,
      }))

      cache.set(key, localized)
      setHolidays(localized)
    })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, locale, JSON.stringify(types), enabled])

  return holidays
}
