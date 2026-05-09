import type { DatePickerTheme } from './types'

// Maps a DatePickerTheme object to CSS custom properties as inline style object.
export function injectTheme(theme: DatePickerTheme): Record<string, string> {
  const vars: Record<string, string> = {}

  if (theme.fontFamily) vars['--dp-font-family'] = theme.fontFamily
  if (theme.fontSize) vars['--dp-font-size'] = theme.fontSize
  if (theme.primaryColor) vars['--dp-primary'] = theme.primaryColor
  if (theme.primaryTextColor) vars['--dp-primary-text'] = theme.primaryTextColor
  if (theme.rangeColor) vars['--dp-range'] = theme.rangeColor
  if (theme.textColor) vars['--dp-text'] = theme.textColor
  if (theme.mutedTextColor) vars['--dp-muted'] = theme.mutedTextColor
  if (theme.backgroundColor) vars['--dp-bg'] = theme.backgroundColor
  if (theme.surfaceColor) vars['--dp-surface'] = theme.surfaceColor
  if (theme.borderColor) vars['--dp-border'] = theme.borderColor
  if (theme.borderRadius) vars['--dp-radius'] = theme.borderRadius
  if (theme.daySize != null) vars['--dp-day-size'] = `${theme.daySize}px`
  if (theme.shadow) vars['--dp-shadow'] = theme.shadow

  return vars
}
