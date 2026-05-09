import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subDays,
  subMonths,
} from 'date-fns'

export interface Preset {
  label: string
  resolve: () => [Date, Date]
}

export const builtInPresets: Preset[] = [
  {
    label: 'This week',
    resolve: () => {
      const now = new Date()
      return [startOfWeek(now, { weekStartsOn: 1 }), endOfWeek(now, { weekStartsOn: 1 })]
    },
  },
  {
    label: 'Last 7 days',
    resolve: () => {
      const now = new Date()
      return [subDays(now, 6), now]
    },
  },
  {
    label: 'Last 30 days',
    resolve: () => {
      const now = new Date()
      return [subDays(now, 29), now]
    },
  },
  {
    label: 'This month',
    resolve: () => {
      const now = new Date()
      return [startOfMonth(now), endOfMonth(now)]
    },
  },
  {
    label: 'Last month',
    resolve: () => {
      const lastMonth = subMonths(new Date(), 1)
      return [startOfMonth(lastMonth), endOfMonth(lastMonth)]
    },
  },
]
