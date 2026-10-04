# the-date-picker

![CI](https://github.com/macsf/the-date-picker/actions/workflows/ci.yml/badge.svg)
![Version](https://img.shields.io/badge/version-0.3.3-blue)

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
3. Use `mode="inline"` when the calendar stays on the page. Use `mode="popover"` with `trigger` when your own field should open it.



### Inline

The calendar is always visible. `mode` defaults to `"inline"`.

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

If the page already has its own popup, keep the picker inline inside it. The library renders the calendar and reports the chosen date. Your button opens and closes the popup.

```tsx
<YourPopover open={open} onOpenChange={setOpen}>
  <DatePicker
    mode="inline"
    value={value}
    onChange={(nextValue) => {
      setValue(nextValue as Date | null)
      setOpen(false)
    }}
  />
</YourPopover>
```



### Trigger

`mode="popover"` floats the calendar from a field. Pass `trigger` to render that field yourself. Put `field.ref` and `field.onClick` on the control that should open the calendar, and show `field.label` as its value.

```tsx
function BirthdayField() {
  const [birthday, setBirthday] = useState<Date | null>(null)

  return (
    <DatePicker
      mode="popover"
      value={birthday}
      onChange={(nextValue) => setBirthday(nextValue as Date | null)}
      until={{ yearsAgo: 18 }}
      triggerFormat="dd/MM/yyyy"
      triggerPlaceholder="dd/mm/yyyy"
      trigger={(field) => (
        <div className="form_group mb-3">
          <label htmlFor="birth_date" className="form-label">Birthday</label>
          <input
            ref={field.ref}
            type="text"
            id="birth_date"
            name="birth_date"
            value={field.label}
            className="form-control"
            placeholder={field.placeholder}
            inputMode="numeric"
            maxLength={10}
            onClick={field.onClick}
            readOnly
          />
        </div>
      )}
    />
  )
}
```

`field.ref` is a callback. React calls it with the input element, and the calendar is positioned under that element. `field.label` is `""` until a date is chosen, then a [date-fns](https://date-fns.org/docs/format) string. `dd/MM/yyyy` is day, month, year (`MM` is the month; `mm` is minutes). `readOnly` keeps typing from replacing the chosen date. A label with `for="birth_date"` still opens the calendar, because it activates that input.

`field` values:


| Property      | What it is                                                  |
| ------------- | ----------------------------------------------------------- |
| `ref`         | Callback. Attach it to the control that opens the calendar. |
| `onClick`     | Opens the calendar, or closes it if it is already open.     |
| `label`       | Formatted selection, or `""` when nothing is selected.      |
| `placeholder` | The `triggerPlaceholder` value.                             |
| `isOpen`      | Whether the calendar is open.                               |


For a range, `label` stays `""` until both dates are chosen, then it is `start - end` using `triggerFormat`.

```tsx
<DatePicker
  mode="popover"
  selectionMode="range"
  numberOfMonths={2}
  value={period}
  onChange={setPeriod}
  triggerFormat="dd/MM/yyyy"
  triggerPlaceholder="dd/mm/yyyy - dd/mm/yyyy"
  trigger={(field) => (
    <input
      ref={field.ref}
      type="text"
      value={field.label}
      placeholder={field.placeholder}
      onClick={field.onClick}
      readOnly
    />
  )}
/>
```

Omit `trigger` to use the built-in button. It shows `triggerPlaceholder` (`"Select date"`) until a date is chosen.

Common options:

- `selectionMode="single"` for one date, `selectionMode="range"` for a start/end range.
- `locale="th"` to show Thai month names, Buddhist Era years, and holiday tooltips.
- `showHolidays` and `holidayTypes` to control holiday dots.
- `customHolidays` to add your own holiday markers.
- `theme` to override colors, radius, font, and day size.



### Fixed days

`minDate` is the earliest selectable day. `maxDate` is the latest. These stay on the calendar dates you pass.

```tsx
<DatePicker
  minDate={new Date(2026, 0, 1)}
  maxDate={new Date(2026, 11, 31)}
/>
```



### Days counted from today

`from` is the earliest day. `until` is the latest. The window moves as today changes. Each value is `"today"`, `"yesterday"`, or one count: `daysAgo`, `weeksAgo`, `monthsAgo`, `yearsAgo`, or the same unit with `FromNow`.

Nothing later than today:

```tsx
<DatePicker until="today" />
```

Nothing later than yesterday:

```tsx
<DatePicker until="yesterday" />
```

The last 30 days:

```tsx
<DatePicker from={{ daysAgo: 30 }} until="today" />
```

Two weeks on either side of today:

```tsx
<DatePicker from={{ weeksAgo: 2 }} until={{ weeksFromNow: 2 }} />
```

Six months on either side of today:

```tsx
<DatePicker from={{ monthsAgo: 6 }} until={{ monthsFromNow: 6 }} />
```

From 60 years ago until 18 years ago:

```tsx
<DatePicker from={{ yearsAgo: 60 }} until={{ yearsAgo: 18 }} />
```

If a fixed day and a counted day are both set, the tighter day wins. Here the latest day is today, because that is earlier than 1 January 2030:

```tsx
<DatePicker maxDate={new Date(2030, 0, 1)} until="today" />
```

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

This repo includes these automations:

- Pull requests: `.github/workflows/ci.yml` runs typecheck, lint, tests, and the library build.
- Main: `.github/workflows/release.yml` runs the same checks, builds the demo, and deploys it to GitHub Pages. It does not change the package version.
- Library updates: Dependabot opens weekly PRs for npm dependencies and GitHub Actions versions.
  - Config: `.github/dependabot.yml`
- Holiday updates: a scheduled workflow regenerates `src/data/th-holidays.json` and opens a PR when changes are detected.
  - Workflow: `.github/workflows/update-holidays.yml`
  - Schedule: monthly (`0 3 1 * *`) plus manual trigger (`workflow_dispatch`)



### Version

Change the version in `package.json` by hand. Keep the version badge at the top of this file on the same number.

### Commit flags


| Flag        | Effect                                                                          |
| ----------- | ------------------------------------------------------------------------------- |
| `[skip ci]` | Skips the release workflow on push to `main` (no validate, no build, no deploy) |


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


| Prop                        | Type                                           | Default                  | Description                                                                                                                                                                                                                                                             |
| --------------------------- | ---------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `numberOfMonths`            | `1 | 2`                                        | `1`                      | Number of calendar months to display. The calendar opens on today, or on the latest selectable day when today is unavailable. In `2`-month mode the right month is that day and the left month is the month before it. Each panel can still be navigated independently. |
| `selectionMode`             | `"single" | "range"`                           | `"single"`               | Single date or date range selection                                                                                                                                                                                                                                     |
| `value`                     | `Date | [Date, Date] | null`                   | `null`                   | Controlled value                                                                                                                                                                                                                                                        |
| `onChange`                  | `(value: Date | [Date, Date] | null) => void`  | —                        | Change handler                                                                                                                                                                                                                                                          |
| `locale`                    | `"th" | "en"`                                  | `"en"`                   | Language for month names and holiday tooltips. `"th"` also shows Buddhist Era years (Gregorian + 543).                                                                                                                                                                  |
| `theme`                     | `DatePickerTheme`                              | `lightTheme`             | Theme override object                                                                                                                                                                                                                                                   |
| `presets`                   | `Preset[]`                                     | built-in                 | Custom preset chips (replaces built-ins entirely)                                                                                                                                                                                                                       |
| `presetDisplay`             | `"chips" | "dropdown"`                         | `"chips"`                | Render range presets as chips or a select dropdown                                                                                                                                                                                                                      |
| `presetDropdownPlaceholder` | `string`                                       | `"Quick select range"`   | Placeholder option text for dropdown presets                                                                                                                                                                                                                            |
| `presetDropdownAriaLabel`   | `string`                                       | `"Quick select presets"` | Accessible label for dropdown presets                                                                                                                                                                                                                                   |
| `customHolidays`            | `CustomHolidayConfig[]`                        | `[]`                     | Custom holiday dots merged over built-in holidays                                                                                                                                                                                                                       |
| `holidayTypes`              | `Array<"public" | "bank" | "observance">`      | `["public"]`             | Which holiday types to display                                                                                                                                                                                                                                          |
| `showNaturalLanguageInput`  | `boolean`                                      | `false`                  | Show the natural language text input                                                                                                                                                                                                                                    |
| `showPresets`               | `boolean`                                      | `false`                  | Show quick-select preset chips                                                                                                                                                                                                                                          |
| `showHolidays`              | `boolean`                                      | `true`                   | Show holiday dots                                                                                                                                                                                                                                                       |
| `showWeekNumbers`           | `boolean`                                      | `false`                  | Show ISO week numbers in left gutter                                                                                                                                                                                                                                    |
| `minDate`                   | `Date`                                         | —                        | Earliest selectable date. Earlier days, months, and years are unavailable. With only `minDate` set, the year menu continues 10 years past the visible year.                                                                                                             |
| `maxDate`                   | `Date`                                         | —                        | Latest selectable date. Later days, months, and years are unavailable. With only `maxDate` set, the year menu goes back 120 years.                                                                                                                                      |
| `from`                      | `RelativeBound`                                | —                        | Earliest day, counted from today. `"today"`, `"yesterday"`, or one of `daysAgo`, `weeksAgo`, `monthsAgo`, `yearsAgo`, or the same unit with `FromNow`. When `minDate` is also set, the later day wins.                                                                  |
| `until`                     | `RelativeBound`                                | —                        | Latest day, counted from today. `"today"`, `"yesterday"`, or one of `daysAgo`, `weeksAgo`, `monthsAgo`, `yearsAgo`, or the same unit with `FromNow`. When `maxDate` is also set, the earlier day wins.                                                                  |
| `disabledDates`             | `Date[]`                                       | —                        | Specific dates to disable                                                                                                                                                                                                                                               |
| `weekStartsOn`              | `0 | 1`                                        | `0`                      | Week start: 0 = Sunday, 1 = Monday                                                                                                                                                                                                                                      |
| `highlightWeekends`         | `boolean`                                      | `true`                   | Highlight Saturday and Sunday dates with the theme weekend color                                                                                                                                                                                                        |
| `showTodayButton`           | `boolean`                                      | `false`                  | Show a footer action that selects today immediately                                                                                                                                                                                                                     |
| `todayButtonLabel`          | `string`                                       | `"Today"`                | Override the footer action label                                                                                                                                                                                                                                        |
| `mode`                      | `"inline" | "popover"`                         | `"inline"`               | `"inline"` keeps the calendar on the page. `"popover"` floats it from a field.                                                                                                                                                                                          |
| `triggerFormat`             | `string`                                       | `"dd MMM yyyy"`          | date-fns format for the field text. A complete range is `start - end`.                                                                                                                                                                                                  |
| `triggerPlaceholder`        | `string`                                       | `"Select date"`          | Field text before a date is chosen.                                                                                                                                                                                                                                     |
| `triggerAriaLabel`          | `string`                                       | —                        | Accessible name for the built-in popover button. Ignored when `trigger` is set.                                                                                                                                                                                         |
| `trigger`                   | `(field: DatePickerTriggerField) => ReactNode` | —                        | Render your own field. Put `field.ref` and `field.onClick` on the control, and show `field.label` as its value. See Usage.                                                                                                                                              |
| `className`                 | `string`                                       | —                        | Extra class name on the root element                                                                                                                                                                                                                                    |


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


| Key                      | Type     | Default (light)                        | Description                                     |
| ------------------------ | -------- | -------------------------------------- | ----------------------------------------------- |
| `fontFamily`             | `string` | `system-ui, -apple-system, sans-serif` | Font family                                     |
| `fontSize`               | `string` | `"14px"`                               | Base font size, scales all text                 |
| `primaryColor`           | `string` | `"#2563EB"`                            | Selected date fill + active chip                |
| `primaryTextColor`       | `string` | `"#FFFFFF"`                            | Text on `primaryColor` background               |
| `rangeColor`             | `string` | `"#DBEAFE"`                            | In-range day fill                               |
| `weekendHeaderTextColor` | `string` | `"#FCA5A5"`                            | Weekend column header text                      |
| `weekendTextColor`       | `string` | `"#DC2626"`                            | Weekend day text                                |
| `textColor`              | `string` | `"#111827"`                            | Default day text                                |
| `mutedTextColor`         | `string` | `"#9CA3AF"`                            | Out-of-month day text                           |
| `backgroundColor`        | `string` | `"#FFFFFF"`                            | Calendar widget background                      |
| `surfaceColor`           | `string` | `"#F3F4F6"`                            | Day cell hover background                       |
| `borderColor`            | `string` | `"#E5E7EB"`                            | Widget border                                   |
| `borderRadius`           | `string` | `"12px"`                               | Widget corner radius                            |
| `daySize`                | `number` | `36`                                   | Day cell diameter in px, scales the entire grid |
| `shadow`                 | `string` | `"0 4px 16px rgba(0,0,0,0.10)"`        | Box shadow on widget                            |


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
