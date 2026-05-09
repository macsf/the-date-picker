import { useState, useEffect, useMemo } from 'react'
import { mergeHolidays } from '../utils/mergeHolidays'

export interface CustomHolidayConfig {
  date: string
  nameTH: string
  nameEN: string
  dotColor?: string
}

export interface HolidayEntry {
  date: string
  name: string
  type: string
}

export interface HolidayDot {
  name: string
  dotColor: string
}

export interface HolidayMap {
  getHolidaysForDate(date: Date): HolidayDot[]
}

// Module-level cache shared across all hook instances
const cache = new Map<string, HolidayEntry[]>()

export function formatDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getCacheKey(year: number, locale: string, types: string[]): string {
  return `${year}-${locale}-${types.sort().join(',')}`
}

const DEFAULT_DOT_COLOR = '#EF4444'

export function useHolidays(
  year: number,
  locale: 'th' | 'en',
  types: Array<'public' | 'bank' | 'observance'> = ['public'],
  enabled = true,
  customHolidays: CustomHolidayConfig[] = [],
): HolidayMap {
  const [builtIn, setBuiltIn] = useState<HolidayEntry[]>([])

  useEffect(() => {
    if (!enabled) return

    const key = getCacheKey(year, locale, types)
    if (cache.has(key)) {
      setBuiltIn(cache.get(key)!)
      return
    }

    const merged = mergeHolidays()
    const yearData = merged[String(year)] ?? []
    const filtered = yearData.filter((h) => (types as string[]).includes(h.type))

    // JSON stores both 'name' (en) and 'nameTH'
    const localized = filtered.map((h) => ({
      ...h,
      name:
        locale === 'th' && (h as HolidayEntry & { nameTH?: string }).nameTH
          ? (h as HolidayEntry & { nameTH?: string }).nameTH!
          : h.name,
    }))

    cache.set(key, localized)
    setBuiltIn(localized)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, locale, JSON.stringify(types), enabled])

  const holidayMap = useMemo(() => {
    const map = new Map<string, HolidayDot[]>()

    builtIn.forEach((h) => {
      const key = h.date.slice(0, 10)
      const existing = map.get(key) ?? []
      existing.push({ name: h.name, dotColor: DEFAULT_DOT_COLOR })
      map.set(key, existing)
    })

    // Custom holidays override built-in by date key
    customHolidays.forEach((ch) => {
      const name = locale === 'th' ? ch.nameTH : ch.nameEN
      map.set(ch.date, [{ name, dotColor: ch.dotColor ?? DEFAULT_DOT_COLOR }])
    })

    return map
  }, [builtIn, customHolidays, locale])

  return {
    getHolidaysForDate(date: Date): HolidayDot[] {
      return holidayMap.get(formatDateKey(date)) ?? []
    },
  }
}
