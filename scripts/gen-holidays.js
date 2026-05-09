// Generates src/data/th-holidays.json and src/data/holidays.json at build time.
// Produces: { "2020": [{date, name, nameTH, type}], ... } for years 2020-2030
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, '../src/data')
const thOutFile = resolve(outDir, 'th-holidays.json')
const combinedOutFile = resolve(outDir, 'holidays.json')
const customFile = resolve(outDir, 'custom-holidays.json')

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true })
}

console.log('Generating th-holidays.json from date-holidays...')

const require = createRequire(import.meta.url)
const Holidays = require('date-holidays')

const hdEN = new Holidays('TH')
const hdTH = new Holidays('TH')

const YEARS = Array.from({ length: 11 }, (_, i) => 2026 + i)
const result = {}
const customOverrides = JSON.parse(readFileSync(customFile, 'utf8'))

for (const year of YEARS) {
  const enHols = hdEN.getHolidays(year, 'en')
  const thHols = hdTH.getHolidays(year, 'th')

  // Build a map by ISO date string for TH names
  const thMap = {}
  for (const h of thHols) {
    const key = h.date.slice(0, 10)
    thMap[key] = h.name
  }

  result[year] = enHols.map((h) => ({
    date: h.date.slice(0, 10),
    name: h.name,
    nameTH: thMap[h.date.slice(0, 10)] ?? h.name,
    type: h.type,
  }))
}

writeFileSync(thOutFile, JSON.stringify(result))
console.log(`Written to ${thOutFile}`)

const combined = JSON.parse(JSON.stringify(result))

for (const [year, holidays] of Object.entries(customOverrides)) {
  if (!combined[year]) {
    combined[year] = []
  }

  const existingDates = new Set(combined[year].map((holiday) => holiday.date))
  const additions = holidays.filter((holiday) => !existingDates.has(holiday.date))
  combined[year] = [...combined[year], ...additions].sort((a, b) =>
    a.date.localeCompare(b.date),
  )
}

writeFileSync(combinedOutFile, JSON.stringify(combined))
console.log(`Written to ${combinedOutFile}`)
