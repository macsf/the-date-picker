import thHolidays from '../data/th-holidays.json'
import customHolidays from '../data/custom-holidays.json'

export interface Holiday {
  date: string
  name: string
  nameTH: string
  type: 'public' | 'observance'
}

export type HolidaysByYear = Record<string, Holiday[]>

export function mergeHolidays(): HolidaysByYear {
  const merged: HolidaysByYear = JSON.parse(JSON.stringify(thHolidays))

  for (const [year, holidays] of Object.entries(customHolidays)) {
    if (!merged[year]) {
      merged[year] = []
    }

    const existingDates = new Set(merged[year].map(h => h.date))
    const customToAdd = (holidays as Holiday[]).filter(h => !existingDates.has(h.date))

    merged[year] = [...merged[year], ...customToAdd].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  }

  return merged
}
