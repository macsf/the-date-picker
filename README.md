# the-date-picker

A standalone React date picker library written in TypeScript (strict mode).
Thai public holidays · natural language input · range selection · theming · Buddhist Era support.

---

## Installation

```bash
pnpm add the-date-picker date-fns
```

Import the CSS once in your app entry:

```ts
import 'the-date-picker/datepicker.css'
```

---

## Build steps

The library requires a pre-build step to generate Thai holiday data:

```bash
# generates src/data/th-holidays.json using the date-holidays package
node scripts/gen-holidays.js
```

This runs automatically via the `prebuild` npm hook when you run `pnpm build`.

To update holiday data (e.g. for a new year range), re-run the script and rebuild.

---

## Quick start

```tsx
import { DatePicker } from 'the-date-picker'
import 'the-date-picker/datepicker.css'

function App() {
  const [value, setValue] = useState<Date | null>(null)

  return (
    <DatePicker
      selectionMode="single"
      value={value}
      onChange={(v) => setValue(v as Date)}
    />
  )
}
```

---

## Props reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `numberOfMonths` | `1 \| 2` | `1` | Number of calendar months to display |
| `selectionMode` | `"single" \| "range"` | `"single"` | Single date or date range selection |
| `value` | `Date \| [Date, Date] \| null` | `null` | Controlled value |
| `onChange` | `(value: Date \| [Date, Date] \| null) => void` | — | Change handler |
| `locale` | `"th" \| "en"` | `"en"` | Language for month names and holiday tooltips |
| `theme` | `DatePickerTheme` | `lightTheme` | Theme override object |
| `presets` | `Preset[]` | built-in | Custom preset chips (replaces built-ins entirely) |
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
| `calendarSystem` | `"gregorian" \| "buddhist"` | `"gregorian"` | Display year as BE (+543) when `"buddhist"` |
| `mode` | `"inline" \| "popover"` | `"inline"` | Inline calendar or floating popover |
| `triggerFormat` | `string` | `"dd MMM yyyy"` | date-fns format string for popover trigger label |
| `className` | `string` | — | Extra class name on the root element |

---

## Theme keys reference

Pass a partial `DatePickerTheme` object to the `theme` prop. Any omitted key falls back to `lightTheme`.

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
    nameTH: 'วันบริษัท',
    nameEN: 'Company Day',
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
