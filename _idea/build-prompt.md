Build a publishable npm React date picker library (TypeScript, strict mode)
with a fully featured interactive demo app.

---

## 0. Project type and tech stack

This is a publishable npm library built with Vite in lib mode.
- src/ is the library source, published as dist/ to npm
- demo/ is a local Vite app that imports from src/ via path alias
- react and react-dom are peerDependencies, not bundled
- Build outputs ESM and CJS formats with TypeScript declarations
- Use pnpm as the package manager

Dependencies allowed:
- react, react-dom (peer)
- date-fns (date math)
- chrono-node (natural language parsing, lazy-loaded)
- date-holidays-parser (runtime holiday engine)
- th-holidays.json (pre-built at build time, see section 6)

No CSS frameworks. No moment.js. Named exports only (tree-shakeable).

### Styling approach

- All component styles use CSS custom properties scoped to [data-datepicker-root]
- The [data-datepicker-root] attribute is placed on the portal root element in
  popover mode so scoping applies regardless of DOM position
- Do not rely on DOM nesting for scoping
- Ship a single datepicker.css that consumers import once
- No inline styles except for dynamic values (e.g. daySize calculations)
- No CSS framework in either the library or the demo

### Tree-shaking

- lightTheme, darkTheme, and defaultPresets are plain exported objects/arrays
- Keep them as separate named exports so bundlers can strip unused ones:
    export { lightTheme } from './theme/light'
    export { darkTheme } from './theme/dark'
    export { defaultPresets } from './utils/presets'
- Do not group them under a default export object

---

## 1. Layout modes

- Prop: `numberOfMonths: 1 | 2`
- Single: one calendar month
- Double: two months side by side, left = current, right = next
- Each panel navigates independently with prev/next arrows
- Month and year labels are clickable dropdowns for fast navigation

---

## 2. Selection modes

- Prop: `selectionMode: "single" | "range"`
- Prop: `value: Date | [Date, Date] | null`
- Prop: `onChange: (value: Date | [Date, Date] | null) => void`

### Single mode
- One click picks one date

### Range mode
- First click sets start, hover previews end, second click confirms
- Range must be a single continuous block -- no multi-segment, no skipped dates
- value[0] is always the earlier date regardless of click order

### Range hover behavior
- If the user hovers a date before the start date, the preview range reverses:
  hovered date becomes the visual start, original click becomes the visual end
- On second click the range is committed as [earlier, later]
- Show the reversed preview identically to a forward preview (same fill, same caps)
- Do not show an error state or block the interaction
- If the user hovers over or clicks a disabled date while a start is set,
  the range preview stops at the last valid date before the disabled one

### Range visual
- Filled circle on start and end dates
- Semi-transparent fill on in-range days
- Row-wrap edges get half-rounded caps:

  SUN  MON  TUE  WED  THU  FRI  SAT
  ·    ·    ·   [16  17   18   19]   <- right cap on SAT (end of row)
  [20  21   22   23   24   25   26]  <- full row fill, no caps
  [27  28   29   30]  ·    ·    ·    <- left cap on SUN (start of row)

  [ = range fill
  16 = start date (full circle)
  30 = end date (full circle)
  Rows that start mid-range: left half-circle on the first cell of that row
  Rows that end mid-range: right half-circle on the last cell of that row
  Start and end dates always get a full filled circle rendered on top

---

## 3. Theming

Expose a `theme` prop accepting a plain object. Inject all values as CSS
custom properties on the [data-datepicker-root] element.

```ts
interface DatePickerTheme {
  fontFamily?: string
  fontSize?: string          // e.g. "14px", scales text throughout
  primaryColor?: string      // selected date fill + chip active state
  primaryTextColor?: string  // text on primaryColor background
  rangeColor?: string        // in-range day fill
  textColor?: string         // default day text
  mutedTextColor?: string    // out-of-month days
  backgroundColor?: string   // calendar widget background
  surfaceColor?: string      // day cell hover background
  borderColor?: string       // widget border
  borderRadius?: string      // widget corner radius
  daySize?: number           // px diameter of day cells (scales entire grid)
  shadow?: string            // box-shadow on widget
}
```

Ship two built-in themes as named exports:
- `lightTheme` (default)
- `darkTheme`

---

## 4. Natural language input

- Shown when prop `showNaturalLanguageInput={true}`
- Text field above the calendar
- Parser: chrono-node (no AI, fully deterministic)
- Lazy-load chrono-node only when this prop is true
- Supported expressions:
  - Exact: "Jan 15 2024", "2024-01-15"
  - Relative: "today", "tomorrow", "yesterday"
  - Named: "next Friday", "last Monday"
  - Offset ranges: "next 2 weeks", "last 30 days"
  - Explicit ranges: "jan 1 - jan 15 2024"
- For range mode: use result[0].start + result[0].end if present,
  else result[0] + result[1]
- Show a resolved date preview below the input before committing
- Commit on Enter or blur
- Input is English only (chrono-node does not support Thai)
- Resolved dates display using the active locale

---

## 5. Quick-select preset chips

- Shown when prop `showPresets={true}`
- Horizontally scrollable chip row above the calendar
- Built-in presets resolved with date-fns (no chrono dependency):
  - This week
  - Last 7 days
  - Last 30 days
  - This month
  - Last month
- Prop: `presets?: Array<{ label: string; resolve: () => [Date, Date] }>`
  Supplying this prop replaces the built-in presets entirely
- Active chip: the chip whose resolved range exactly matches current value
  is highlighted using primaryColor; if no chip matches, none is highlighted;
  if multiple match, highlight the first in the array
- All preset logic uses Gregorian dates regardless of calendarSystem setting;
  to show BE month labels in chips, pass custom presets via the presets prop

---

## 6. Holiday display

- Shown when prop `showHolidays={true}` (default: true)
- Small colored dot rendered below the day number
- Tooltip on hover showing holiday name in the active locale

### Data source

Use date-holidays-parser with a pre-built Thailand-only data file.

Build step -- add to package.json scripts:
  "holidays:update": "holidays2json --pick TH --min -o src/data/th-holidays.json"
  "prebuild": "pnpm holidays:update"

This file is generated at build time. Do not commit it.
Add a generation timestamp comment at the top of the file.
Consumers re-run `pnpm holidays:update` once per year to pick up new
official holiday announcements.

Runtime usage:
  import Holidays from 'date-holidays-parser'
  import data from './data/th-holidays.json'
  const hd = new Holidays(data)
  hd.init('TH')
  const holidays = hd.getHolidays(year, locale) // 'th' or 'en'

Cache results per year in a Map -- do not recompute on every render.

### Holiday props

- Prop: `locale: "th" | "en"` -- controls holiday name language in tooltips
- Prop: `showHolidays?: boolean` -- default: true
- Prop: `holidayTypes?: Array<"public" | "bank" | "observance">` -- default: ["public"]
- Prop: `customHolidays?: CustomHolidayConfig[]`

```ts
interface CustomHolidayConfig {
  date: string      // "YYYY-MM-DD"
  nameTH: string
  nameEN: string
  dotColor?: string // default: "#EF4444"
}
```

Custom holidays merge over built-in holidays by date key after
date-holidays resolves, so they can override built-in entries.

### Staleness warning

Expose prop `holidayDataYear?: number`. In development, if the calendar
displays a year outside the range covered by th-holidays.json, log a
console.warn once.

### Next.js webpack config

Add to next.config.js to exclude unused astronomy planet data:
  webpack: (config) => {
    config.plugins.push(new webpack.IgnorePlugin({
      resourceRegExp: /\/astronomia\/data$/,
    }))
    return config
  }

---

## 7. Additional calendar features

- Prop: `minDate?: Date` -- dates before this are disabled
- Prop: `maxDate?: Date` -- dates after this are disabled
- Prop: `disabledDates?: Date[]` -- specific dates to disable
- Prop: `weekStartsOn?: 0 | 1` -- 0 = Sunday (default), 1 = Monday
- Prop: `showWeekNumbers?: boolean` -- ISO 8601 week numbers in left gutter
- Prop: `calendarSystem?: "gregorian" | "buddhist"`
  buddhist: display year as BE (e.g. 2569 instead of 2026)
  Only affects display -- all internal Date objects stay Gregorian

### Disabled date behavior

- Disabled dates: 40% opacity, cursor: not-allowed
- No strikethrough
- Disabled dates cannot be hovered or focused (tabIndex=-1)
- In range selection, range preview stops at the last valid date
  before a disabled one

### Week numbers

- Always ISO 8601 (week 1 = first week with a Thursday, always starts Monday)
- weekStartsOn affects column order of the grid only
- These two settings are intentionally decoupled

---

## 8. Animations

- Month navigation: slide transition, 200ms ease-out
  - Forward: incoming month slides in from the right
  - Back: incoming month slides in from the left
  - Use CSS transform: translateX() + opacity, not layout-affecting properties
- Popover open/close: fade + scale, 150ms ease-out, transform-origin: top left
- Date cell selection: no animation, highlight is instant
- Respect prefers-reduced-motion:
  @media (prefers-reduced-motion: reduce) { transition: none }

---

## 9. Accessibility

- Full keyboard navigation: Arrow keys move focus, Enter selects,
  Escape clears or closes
- aria-label on all interactive elements
- aria-live region announces month/year on navigation (e.g. "May 2026")
- WCAG 2.1 AA contrast compliance in both light and dark themes

### Focus trap

- Inline mode: no focus trap -- Tab moves naturally through the document
- Popover mode: focus trap active while popover is open
  - On open: focus moves to selected date cell, or today if none selected
  - Trap scope is the popover root element only
  - If DatePicker is inside a modal, popover trap takes over for its duration;
    modal trap is restored on popover close
  - Escape: closes popover, returns focus to trigger input

---

## 10. Inline vs popover mode

- Prop: `mode?: "inline" | "popover"` (default: "inline")
- inline: calendar renders in place
- popover: trigger input opens a floating calendar via React portal
  - Portal appended to document.body
  - Portal root carries data-datepicker-root for CSS scoping
  - Prop: `triggerFormat?: string` -- date-fns format string
    Default: "dd MMM yyyy" for single, "dd MMM yyyy - dd MMM yyyy" for range
  - Closes on outside click or Escape
  - Positions itself to stay within viewport

---

## 11. Full component API

```tsx
<DatePicker
  numberOfMonths={1 | 2}
  selectionMode={"single" | "range"}
  value={Date | [Date, Date] | null}
  onChange={(value) => void}
  locale={"th" | "en"}
  theme={DatePickerTheme}
  presets={[...]}
  customHolidays={[...]}
  holidayTypes={["public"]}
  showNaturalLanguageInput={boolean}
  showPresets={boolean}
  showHolidays={boolean}
  showWeekNumbers={boolean}
  holidayDataYear={number}
  minDate={Date}
  maxDate={Date}
  disabledDates={Date[]}
  weekStartsOn={0 | 1}
  calendarSystem={"gregorian" | "buddhist"}
  mode={"inline" | "popover"}
  triggerFormat={string}
  className={string}
/>
```

---

## 12. File structure

src/
  components/
    DatePicker.tsx           # main export, orchestrates all props
    Calendar.tsx             # single month grid
    DayCell.tsx              # day cell: dot, tooltip, range highlight, disabled
    MonthNav.tsx             # prev/next arrows + month/year dropdowns
    NaturalLanguageInput.tsx
    PresetChips.tsx
    Popover.tsx              # portal, viewport-aware positioning, focus trap
    WeekNumbers.tsx
  data/
    th-holidays.json         # generated at build time -- do not commit
  hooks/
    useDateRange.ts          # range state, hover preview, reverse range
    useHolidays.ts           # date-holidays-parser wrapper with year cache
    useNaturalLanguage.ts    # chrono-node wrapper, lazy-loaded
    usePopover.ts            # floating position + outside click
  theme/
    light.ts
    dark.ts
    types.ts
    inject.ts                # maps theme object to CSS custom properties
  utils/
    calendar.ts              # grid generation, week numbers, BE year display
    presets.ts               # built-in preset resolvers using date-fns
    disabled.ts              # isDisabled(date, minDate, maxDate, disabledDates)
  index.ts                   # public named exports

---

## 13. Demo app

Build a demo app in demo/ that imports the library from src/ via path alias.
The demo is not published -- it is a development and showcase tool.

### Design

- Style: clean SaaS documentation style (reference: Radix UI docs,
  React Day Picker docs)
- Neutral gray base, strong typographic hierarchy, ample whitespace
- Left sidebar navigation, content area on the right
- Plain CSS modules -- no framework
- Fully responsive down to 768px

### Sections

Each section shows:
- Live interactive calendar
- Selected value displayed as formatted JSON below the calendar
- Minimal TSX code snippet (props only, no imports or boilerplate)

Sections:
  1.  Single date picker
  2.  Date range picker
  3.  Double month view
  4.  Natural language input
  5.  Holiday display (TH public holidays, dots + tooltips)
  6.  Custom holidays (live JSON editor -- see below)
  7.  Theming (live theme editor -- see below)
  8.  Popover mode
  9.  Buddhist Era year display
  10. Disabled dates + min/max range

### Code snippet styling

- Dark background: #1e1e1e
- Monospace font
- Token colors (inline spans, no external library):
  - Prop names: #9CDCFE
  - String values: #CE9178
  - Boolean/number values: #B5CEA8
  - Component tags: #4EC9B0

### Live theme editor (section 7)

Controls:
- Primary color -- color input
- Background color -- color input
- Font size -- range slider 12px to 18px
- Day size -- range slider 28px to 48px
- Border radius -- range slider 0px to 24px
- Dark mode toggle

All changes apply instantly to the calendar preview beside the controls.

### Live custom holidays editor (section 6)

Textarea pre-filled with:
[
  {
    "date": "2026-11-20",
    "nameTH": "วันบริษัท",
    "nameEN": "Company Day",
    "dotColor": "#8B5CF6"
  }
]

Parse JSON on every keystroke and pass to customHolidays prop live.
Show a parse error message if JSON is invalid.

---

## 14. Deliverables

1. All library source files (src/)
2. Demo app source (demo/)
3. README.md:
   - Installation
   - Build steps including the holidays2json prebuild
   - Full props table with types and defaults
   - Theme keys reference table
   - customHolidays JSON example
   - Next.js integration example (with webpack IgnorePlugin) with documentation
   - Vite integration example with documentation
5. package.json with all scripts including prebuild and holidays:update
