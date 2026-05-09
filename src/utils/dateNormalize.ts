// Timezone-safe date handling. Always works with local midnight dates (00:00:00 in user's timezone).
// Prevents timezone drift when user selects dates in different geographic locations.

export function toLocalDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function toDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function fromDateString(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function isSameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
