# the-date-picker

[![CI](https://github.com/macsf/the-date-picker/actions/workflows/ci.yml/badge.svg)](https://github.com/macsf/the-date-picker/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-0.1.2-blue)](./package.json)

A standalone React date picker library written in TypeScript (strict mode).
Thai public holidays · natural language input · range selection · theming · Buddhist Era support.

---

## Installation

```bash
pnpm add github:macsf/the-date-picker date-fns
```

This package is installed directly from GitHub, not from the npm registry.
The repo builds from source during install via `prepare`, so developers only need to add the dependency and import the package.

## Usage

1. Import the component and the stylesheet once in your app entry.
2. Keep the selected value in state and pass it back through `onChange`.
3. Set `selectionMode` and `mode` for the behavior you want.

```tsx
import { useState } from 'react'

import { DatePicker } from 'the-date-picker'
import 'the-date-picker/datepicker.css'

function App() {
  const [value, setValue] = useState<Date | null>(null)

  return (
    <DatePicker
      selectionMode="single"
      mode="inline"
      value={value}
      onChange={(nextValue) => setValue(nextValue as Date | null)}
    />
  )
}
```

For a floating calendar, switch to popover mode:

```tsx
<DatePicker
  mode="popover"
  selectionMode="range"
  value={value}
  onChange={setValue}
/>
```

Common options:

- `selectionMode="single"` for one date, `selectionMode="range"` for a start/end range.
- `locale="th"` to show Thai month names and holiday tooltips.
- `showHolidays` and `holidayTypes` to control holiday dots.
- `customHolidays` to add your own holiday markers.
- `theme` to override colors, radius, font, and day size.

Import the CSS once in your app entry if your bundler does not pick it up automatically:

```ts
import 'the-date-picker/datepicker.css'
```

Holiday data is also available as a public package export:

```ts
import holidaysByYear from 'the-date-picker/holidays.json'
import { getHolidaysForYear, getHolidayMapForYear } from 'the-date-picker'
```

---

## Build steps

The library keeps Thailand holiday data generated from source as part of the build:

```bash
# generates:
# - src/data/th-holidays.json from date-holidays
# - src/data/holidays.json as built-in + package custom overrides
node scripts/gen-holidays.js
```

This runs automatically via the `prebuild` npm hook when you run `pnpm build`, and via `prepare` when the package is installed from GitHub.

Use `pnpm gen:holidays` if you need to refresh holiday data manually, then rebuild or reinstall.

## GitHub automation

This repo includes two automations:

- Library updates: Dependabot opens weekly PRs for npm dependencies and GitHub Actions versions.
  - Config: `.github/dependabot.yml`
- Holiday updates: a scheduled workflow regenerates `src/data/th-holidays.json` and opens a PR when changes are detected.
  - Workflow: `.github/workflows/update-holidays.yml`
  - Schedule: monthly (`0 3 1 * *`) plus manual trigger (`workflow_dispatch`)

---

## Date handling & timezone safety

This library stores and transmits **date-only values** (no time component), formatted as `YYYY-MM-DD`.
All dates are normalized to local midnight in the user's timezone before being passed to `onChange`.

**Why this matters:** If your backend runs in a different timezone (e.g., GMT) than your users (e.g., Bangkok), dates won't drift.
A Bangkok user selecting "May 10" will always be stored as `2026-05-10`, never as `2026-05-09`.

Internally, the library uses `toLocalDate()` to strip time components and prevent UTC conversion issues.
If you serialize dates to a backend, send them as ISO date strings (`"2026-05-10"`), not as timestamps.

---

## Props reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `numberOfMonths` | `1 \| 2` | `1` | Number of calendar months to display. In `2`-month mode, left and right visible months can be navigated independently. |
| `selectionMode` | `"single" \| "range"` | `"single"` | Single date or date range selection |
| `value` | `Date \| [Date, Date] \| null` | `null` | Controlled value |
| `onChange` | `(value: Date \| [Date, Date] \| null) => void` | — | Change handler |
| `locale` | `"th" \| "en"` | `"en"` | Language for month names and holiday tooltips |
| `theme` | `DatePickerTheme` | `lightTheme` | Theme override object |
| `presets` | `Preset[]` | built-in | Custom preset chips (replaces built-ins entirely) |
| `presetDisplay` | `"chips" \| "dropdown"` | `"chips"` | Render range presets as chips or a select dropdown |
| `presetDropdownPlaceholder` | `string` | `"Quick select range"` | Placeholder option text for dropdown presets |
| `presetDropdownAriaLabel` | `string` | `"Quick select presets"` | Accessible label for dropdown presets |
| `customHolidays` | `CustomHolidayConfig[]` | `[]` | Custom holiday dots merged over built-in holidays |
| `holidayTypes` | `Array<"public" \| "bank" \| "observance">` | `["public"]` | Which holiday types to display |
| `showNaturalLanguageInput` | `boolean` | `false` | Show the natural language text input |
| `showPresets` | `boolean` | `false` | Show quick-select preset chips |
| `showHolidays` | `boolean` | `true` | Show holiday dots |
| `showWeekNumbers` | `boolean` | `false` | Show ISO week numbers in left gutter |
| `minDate` | `Date` | — | Dates before this are disabled |
| `maxDate` | `Date` | — | Dates after this are disabled |
| `disabledDates` | `Date[]` | — | Specific dates to disable |
| `weekStartsOn` | `0 \| 1` | `0` | Week start: 0 = Sunday, 1 = Monday |
| `highlightWeekends` | `boolean` | `true` | Highlight Saturday and Sunday dates with the theme weekend color |
| `showTodayButton` | `boolean` | `false` | Show a footer action that selects today immediately |
| `todayButtonLabel` | `string` | `"Today"` | Override the footer action label |
| `calendarSystem` | `"gregorian" \| "buddhist"` | `"gregorian"` | Display year as BE (+543) when `"buddhist"` |
| `mode` | `"inline" \| "popover"` | `"inline"` | Inline calendar or floating popover |
| `triggerFormat` | `string` | `"dd MMM yyyy"` | date-fns format string for popover trigger label |
| `className` | `string` | — | Extra class name on the root element |

---

## Public holiday data

For consumers that need holiday data outside the picker UI, the package exports:

- `getHolidaysForYear(year, locale, types)` → filtered holiday array
- `getHolidayMapForYear(year, locale, types)` → `Map<YYYY-MM-DD, holidays[]>`
- `the-date-picker/holidays.json` → the combined built holiday dataset

Example:

```ts
import { getHolidaysForYear } from 'the-date-picker'

const holidays = getHolidaysForYear(2026, 'en', ['public'])
```

The exported JSON is the combined dataset after package-level custom holiday overrides are merged over generated Thailand holiday data.

---

## Theme keys reference

Pass a partial `DatePickerTheme` object to the `theme` prop. Any omitted key falls back to `lightTheme`.
Weekend header labels use `weekendHeaderTextColor`, while weekend day cells use `weekendTextColor`.

| Key | Type | Default (light) | Description |
|-----|------|-----------------|-------------|
| `fontFamily` | `string` | `system-ui, sans-serif` | Font family |
| `fontSize` | `string` | `"14px"` | Base font size, scales all text |
| `primaryColor` | `string` | `"#2563EB"` | Selected date fill + active chip |
| `primaryTextColor` | `string` | `"#FFFFFF"` | Text on `primaryColor` background |
| `rangeColor` | `string` | `"#DBEAFE"` | In-range day fill |
| `textColor` | `string` | `"#111827"` | Default day text |
| `mutedTextColor` | `string` | `"#9CA3AF"` | Out-of-month day text |
| `backgroundColor` | `string` | `"#FFFFFF"` | Calendar widget background |
| `surfaceColor` | `string` | `"#F3F4F6"` | Day cell hover background |
| `borderColor` | `string` | `"#E5E7EB"` | Widget border |
| `borderRadius` | `string` | `"12px"` | Widget corner radius |
| `daySize` | `number` | `36` | Day cell diameter in px, scales the entire grid |
| `shadow` | `string` | `"0 4px 16px rgba(0,0,0,0.10)"` | Box shadow on widget |

Two built-in themes are exported:

```ts
import { lightTheme, darkTheme } from 'the-date-picker'
```

---

## customHolidays example

```tsx
import { DatePicker } from 'the-date-picker'

const myHolidays = [
  {
    date: '2026-11-20',
    nameTH: 'วันหยุดบริษัท',
    nameEN: 'Company Holiday',
    dotColor: '#8B5CF6',
  },
]

<DatePicker
  showHolidays
  customHolidays={myHolidays}
  locale="en"
/>
```

Custom holidays override built-in holidays on the same date.
`dotColor` defaults to `#EF4444` if omitted.

---

## Next.js integration

Add a webpack `IgnorePlugin` to your `next.config.js` to strip unused astronomy data from `date-holidays`:

```js
// next.config.js
const webpack = require('webpack')

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /\/astronomia\/data$/,
      }),
    )
    return config
  },
}
```

Then import the CSS in `_app.tsx` (Pages Router) or `layout.tsx` (App Router):

```ts
import 'the-date-picker/datepicker.css'
```

---

## Vite integration

No extra config needed. Import the CSS in your entry file:

```ts
// main.tsx
import 'the-date-picker/datepicker.css'
```

---

## Dev & demo

```bash
pnpm install
pnpm dev          # starts the demo app at http://localhost:5173
pnpm build        # builds the library to dist/
pnpm build:demo   # builds the demo to dist-demo/
pnpm typecheck    # TypeScript strict check
pnpm lint         # ESLint
pnpm test         # Vitest
```
