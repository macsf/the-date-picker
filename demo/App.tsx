import React, { useState } from 'react'
import { DatePicker, lightTheme, darkTheme } from 'the-date-picker'
import type { DatePickerTheme, CustomHolidayConfig } from 'the-date-picker'

// ---- Utility: format value for display ----
function fmtValue(v: Date | [Date, Date] | null): string {
  if (!v) return 'null'
  if (Array.isArray(v)) {
    return JSON.stringify([v[0].toISOString().slice(0, 10), v[1].toISOString().slice(0, 10)])
  }
  return JSON.stringify(v.toISOString().slice(0, 10))
}

// ---- Code block renderer ----
function CodeBlock({ code }: { code: string }) {
  // Simple token colorizer for JSX props
  const colored = code
    .replace(/(<\/?)([A-Za-z]+)/g, (_, slash, tag) => `${slash}<span class="token-tag">${tag}</span>`)
    .replace(/\b([a-zA-Z]+)=/g, '<span class="token-prop">$1</span>=')
    .replace(/"([^"]*)"/g, '"<span class="token-str">$1</span>"')
    .replace(/\{(true|false)\}/g, '{<span class="token-bool">$1</span>}')
    .replace(/\{(\d+)\}/g, '{<span class="token-num">$1</span>}')

  return (
    <div
      className="demo-code"
      dangerouslySetInnerHTML={{ __html: colored }}
    />
  )
}

// ---- Value display ----
function ValueDisplay({ value }: { value: Date | [Date, Date] | null }) {
  return (
    <div>
      <div className="demo-value-label">Selected value</div>
      <div className="demo-value">{fmtValue(value)}</div>
    </div>
  )
}

// ---- Nav items ----
const SECTIONS = [
  { id: 'single', label: '1. Single date' },
  { id: 'range', label: '2. Date range' },
  { id: 'double', label: '3. Double month' },
  { id: 'nl', label: '4. Natural language' },
  { id: 'holidays', label: '5. Holiday display' },
  { id: 'custom-holidays', label: '6. Custom holidays' },
  { id: 'theming', label: '7. Theming' },
  { id: 'popover', label: '8. Popover mode' },
  { id: 'buddhist', label: '9. Buddhist Era' },
  { id: 'disabled', label: '10. Disabled dates' },
]

// ==============================================================
// Sections
// ==============================================================

function SingleSection() {
  const [value, setValue] = useState<Date | null>(null)
  return (
    <div>
      <h1 className="demo-section-title">Single date picker</h1>
      <p className="demo-section-desc">Click any day to select a single date.</p>
      <div className="demo-row">
        <div className="demo-preview">
          <DatePicker
            selectionMode="single"
            value={value}
            onChange={(v) => setValue(v as Date | null)}
          />
        </div>
        <div className="demo-info">
          <ValueDisplay value={value} />
          <CodeBlock code={`<DatePicker\n  selectionMode="single"\n  value={value}\n  onChange={setValue}\n/>`} />
        </div>
      </div>
    </div>
  )
}

function RangeSection() {
  const [value, setValue] = useState<[Date, Date] | null>(null)
  return (
    <div>
      <h1 className="demo-section-title">Date range picker</h1>
      <p className="demo-section-desc">
        First click sets start, hover previews the range, second click confirms.
      </p>
      <div className="demo-row">
        <div className="demo-preview">
          <DatePicker
            selectionMode="range"
            value={value}
            onChange={(v) => setValue(v as [Date, Date] | null)}
            showPresets
          />
        </div>
        <div className="demo-info">
          <ValueDisplay value={value} />
          <CodeBlock
            code={`<DatePicker\n  selectionMode="range"\n  value={value}\n  onChange={setValue}\n  showPresets={true}\n/>`}
          />
        </div>
      </div>
    </div>
  )
}

function DoubleSection() {
  const [value, setValue] = useState<[Date, Date] | null>(null)
  return (
    <div>
      <h1 className="demo-section-title">Double month view</h1>
      <p className="demo-section-desc">Two months side by side. Each panel navigates independently.</p>
      <div className="demo-row">
        <div className="demo-preview">
          <DatePicker
            numberOfMonths={2}
            selectionMode="range"
            value={value}
            onChange={(v) => setValue(v as [Date, Date] | null)}
          />
        </div>
        <div className="demo-info">
          <ValueDisplay value={value} />
          <CodeBlock
            code={`<DatePicker\n  numberOfMonths={2}\n  selectionMode="range"\n  value={value}\n  onChange={setValue}\n/>`}
          />
        </div>
      </div>
    </div>
  )
}

function NLSection() {
  const [value, setValue] = useState<Date | [Date, Date] | null>(null)
  return (
    <div>
      <h1 className="demo-section-title">Natural language input</h1>
      <p className="demo-section-desc">
        Type expressions like "next Friday", "last 30 days", or "Jan 1 - Jan 15 2025" (English only).
      </p>
      <div className="demo-row">
        <div className="demo-preview">
          <DatePicker
            selectionMode="range"
            value={value}
            onChange={setValue}
            showNaturalLanguageInput
          />
        </div>
        <div className="demo-info">
          <ValueDisplay value={value} />
          <CodeBlock
            code={`<DatePicker\n  selectionMode="range"\n  value={value}\n  onChange={setValue}\n  showNaturalLanguageInput={true}\n/>`}
          />
        </div>
      </div>
    </div>
  )
}

function HolidaySection() {
  const [value, setValue] = useState<Date | null>(null)
  return (
    <div>
      <h1 className="demo-section-title">Holiday display</h1>
      <p className="demo-section-desc">
        Thai public holidays shown as colored dots. Hover a dot to see the holiday name.
      </p>
      <div className="demo-row">
        <div className="demo-preview">
          <DatePicker
            selectionMode="single"
            value={value}
            onChange={(v) => setValue(v as Date | null)}
            showHolidays
            holidayTypes={['public']}
            locale="en"
          />
        </div>
        <div className="demo-info">
          <ValueDisplay value={value} />
          <CodeBlock
            code={`<DatePicker\n  selectionMode="single"\n  showHolidays={true}\n  holidayTypes={["public"]}\n  locale="en"\n/>`}
          />
        </div>
      </div>
    </div>
  )
}

const DEFAULT_CUSTOM_JSON = JSON.stringify(
  [
    {
      date: '2026-11-20',
      nameTH: 'วันบริษัท',
      nameEN: 'Company Day',
      dotColor: '#8B5CF6',
    },
  ],
  null,
  2,
)

function CustomHolidaySection() {
  const [value, setValue] = useState<Date | null>(null)
  const [json, setJson] = useState(DEFAULT_CUSTOM_JSON)
  const [jsonError, setJsonError] = useState<string | null>(null)

  let parsedHolidays: CustomHolidayConfig[] = []
  try {
    parsedHolidays = JSON.parse(json) as CustomHolidayConfig[]
  } catch {
    // handled by jsonError display
  }

  const handleJsonChange = (v: string) => {
    setJson(v)
    try {
      JSON.parse(v)
      setJsonError(null)
    } catch (e) {
      setJsonError((e as Error).message)
    }
  }

  return (
    <div>
      <h1 className="demo-section-title">Custom holidays</h1>
      <p className="demo-section-desc">
        Edit the JSON below to add custom holiday dots. Changes apply live.
      </p>
      <div className="demo-row">
        <div className="demo-preview">
          <DatePicker
            selectionMode="single"
            value={value}
            onChange={(v) => setValue(v as Date | null)}
            showHolidays
            customHolidays={jsonError ? [] : parsedHolidays}
          />
        </div>
        <div className="demo-info">
          <textarea
            className="json-editor"
            value={json}
            onChange={(e) => handleJsonChange(e.target.value)}
            spellCheck={false}
          />
          {jsonError && <div className="json-error">{jsonError}</div>}
        </div>
      </div>
    </div>
  )
}

function ThemingSection() {
  const [value, setValue] = useState<Date | null>(null)
  const [isDark, setIsDark] = useState(false)
  const [primary, setPrimary] = useState('#2563eb')
  const [bg, setBg] = useState('#ffffff')
  const [fontSize, setFontSize] = useState(14)
  const [daySize, setDaySize] = useState(36)
  const [borderRadius, setBorderRadius] = useState(12)

  const theme: DatePickerTheme = isDark
    ? {
        ...darkTheme,
        primaryColor: primary,
        fontSize: `${fontSize}px`,
        daySize,
        borderRadius: `${borderRadius}px`,
      }
    : {
        ...lightTheme,
        primaryColor: primary,
        backgroundColor: bg,
        fontSize: `${fontSize}px`,
        daySize,
        borderRadius: `${borderRadius}px`,
      }

  return (
    <div>
      <h1 className="demo-section-title">Theming</h1>
      <p className="demo-section-desc">Live theme editor. All changes apply instantly.</p>
      <div className="demo-row">
        <div className="demo-preview">
          <DatePicker
            selectionMode="single"
            value={value}
            onChange={(v) => setValue(v as Date | null)}
            theme={theme}
          />
        </div>
        <div className="demo-info">
          <div className="theme-editor">
            <div className="theme-field">
              <label>Primary color</label>
              <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} />
            </div>
            {!isDark && (
              <div className="theme-field">
                <label>Background color</label>
                <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
              </div>
            )}
            <div className="theme-field">
              <label>Font size <span className="range-value">{fontSize}px</span></label>
              <input type="range" min={12} max={18} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />
            </div>
            <div className="theme-field">
              <label>Day size <span className="range-value">{daySize}px</span></label>
              <input type="range" min={28} max={48} value={daySize} onChange={(e) => setDaySize(Number(e.target.value))} />
            </div>
            <div className="theme-field">
              <label>Border radius <span className="range-value">{borderRadius}px</span></label>
              <input type="range" min={0} max={24} value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} />
            </div>
            <div className="theme-field">
              <label>Dark mode</label>
              <input type="checkbox" checked={isDark} onChange={(e) => setIsDark(e.target.checked)} />
            </div>
          </div>
          <ValueDisplay value={value} />
        </div>
      </div>
    </div>
  )
}

function PopoverSection() {
  const [value, setValue] = useState<Date | null>(null)
  return (
    <div>
      <h1 className="demo-section-title">Popover mode</h1>
      <p className="demo-section-desc">Calendar opens in a floating layer from a trigger input.</p>
      <div className="demo-row">
        <div className="demo-preview">
          <DatePicker
            mode="popover"
            selectionMode="single"
            value={value}
            onChange={(v) => setValue(v as Date | null)}
          />
        </div>
        <div className="demo-info">
          <ValueDisplay value={value} />
          <CodeBlock
            code={`<DatePicker\n  mode="popover"\n  selectionMode="single"\n  value={value}\n  onChange={setValue}\n/>`}
          />
        </div>
      </div>
    </div>
  )
}

function BuddhistSection() {
  const [value, setValue] = useState<Date | null>(null)
  return (
    <div>
      <h1 className="demo-section-title">Buddhist Era year display</h1>
      <p className="demo-section-desc">
        Year shown as BE (e.g. 2569). Internal Date objects remain Gregorian.
      </p>
      <div className="demo-row">
        <div className="demo-preview">
          <DatePicker
            selectionMode="single"
            value={value}
            onChange={(v) => setValue(v as Date | null)}
            calendarSystem="buddhist"
            locale="th"
          />
        </div>
        <div className="demo-info">
          <ValueDisplay value={value} />
          <CodeBlock
            code={`<DatePicker\n  calendarSystem="buddhist"\n  locale="th"\n  value={value}\n  onChange={setValue}\n/>`}
          />
        </div>
      </div>
    </div>
  )
}

function DisabledSection() {
  const [value, setValue] = useState<Date | null>(null)
  const today = new Date()
  const minDate = new Date(today.getFullYear(), today.getMonth(), 5)
  const maxDate = new Date(today.getFullYear(), today.getMonth(), 25)
  const disabledDates = [
    new Date(today.getFullYear(), today.getMonth(), 10),
    new Date(today.getFullYear(), today.getMonth(), 15),
  ]

  return (
    <div>
      <h1 className="demo-section-title">Disabled dates + min/max</h1>
      <p className="demo-section-desc">
        min=5th, max=25th of this month. 10th and 15th explicitly disabled.
      </p>
      <div className="demo-row">
        <div className="demo-preview">
          <DatePicker
            selectionMode="single"
            value={value}
            onChange={(v) => setValue(v as Date | null)}
            minDate={minDate}
            maxDate={maxDate}
            disabledDates={disabledDates}
          />
        </div>
        <div className="demo-info">
          <ValueDisplay value={value} />
          <CodeBlock
            code={`<DatePicker\n  minDate={new Date(2026, 4, 5)}\n  maxDate={new Date(2026, 4, 25)}\n  disabledDates={[new Date(2026, 4, 10)]}\n/>`}
          />
        </div>
      </div>
    </div>
  )
}

// ==============================================================
// App
// ==============================================================

const SECTION_MAP: Record<string, React.FC> = {
  single: SingleSection,
  range: RangeSection,
  double: DoubleSection,
  nl: NLSection,
  holidays: HolidaySection,
  'custom-holidays': CustomHolidaySection,
  theming: ThemingSection,
  popover: PopoverSection,
  buddhist: BuddhistSection,
  disabled: DisabledSection,
}

export default function App() {
  const [active, setActive] = useState('single')
  const SectionComponent = SECTION_MAP[active]

  return (
    <div className="demo-layout">
      <aside className="demo-sidebar">
        <div className="demo-sidebar-title">DatePicker</div>
        <nav>
          <ul className="demo-nav">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  className={['demo-nav-item', active === s.id ? 'active' : ''].join(' ')}
                  onClick={() => setActive(s.id)}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="demo-content">
        <SectionComponent />
      </main>
    </div>
  )
}
