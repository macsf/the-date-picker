import holidays from '../data/holidays.json'

export interface Holiday {
  date: string
  name: string
  nameTH: string
  type: 'public' | 'observance'
}

export type HolidaysByYear = Record<string, Holiday[]>

export function mergeHolidays(): HolidaysByYear {
  return JSON.parse(JSON.stringify(holidays))
}
