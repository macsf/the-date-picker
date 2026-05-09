import { isSameDay, isBefore, isAfter, startOfDay } from 'date-fns'

export function isDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[],
): boolean {
  const d = startOfDay(date)
  if (minDate && isBefore(d, startOfDay(minDate))) return true
  if (maxDate && isAfter(d, startOfDay(maxDate))) return true
  if (disabledDates?.some((dd) => isSameDay(dd, d))) return true
  return false
}
