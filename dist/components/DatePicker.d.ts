import type { DatePickerTheme } from '../theme/types';
import type { Preset } from '../utils/presets';
import type { CustomHolidayConfig } from '../hooks/useHolidays';
import { type RelativeBound } from '../utils/dateBounds';
export type { CustomHolidayConfig };
export type { RelativeBound };
export interface DatePickerProps {
    numberOfMonths?: 1 | 2;
    selectionMode?: 'single' | 'range';
    value?: Date | [Date, Date] | null;
    onChange?: (value: Date | [Date, Date] | null) => void;
    locale?: 'th' | 'en';
    theme?: DatePickerTheme;
    presets?: Preset[];
    presetDisplay?: 'chips' | 'dropdown';
    presetDropdownPlaceholder?: string;
    presetDropdownAriaLabel?: string;
    customHolidays?: CustomHolidayConfig[];
    holidayTypes?: Array<'public' | 'bank' | 'observance'>;
    showNaturalLanguageInput?: boolean;
    showPresets?: boolean;
    showHolidays?: boolean;
    showWeekNumbers?: boolean;
    minDate?: Date;
    maxDate?: Date;
    /** Earliest day, counted from today. The later day wins when `minDate` is also set. */
    from?: RelativeBound;
    /** Latest day, counted from today. The earlier day wins when `maxDate` is also set. */
    until?: RelativeBound;
    disabledDates?: Date[];
    weekStartsOn?: 0 | 1;
    highlightWeekends?: boolean;
    showTodayButton?: boolean;
    todayButtonLabel?: string;
    mode?: 'inline' | 'popover';
    triggerFormat?: string;
    className?: string;
}
export declare function DatePicker({ numberOfMonths, selectionMode, value, onChange, locale, theme, presets, presetDisplay, presetDropdownPlaceholder, presetDropdownAriaLabel, customHolidays, holidayTypes, showNaturalLanguageInput, showPresets, showHolidays, showWeekNumbers, minDate: minDateProp, maxDate: maxDateProp, from, until, disabledDates, weekStartsOn, highlightWeekends, showTodayButton, todayButtonLabel, mode, triggerFormat, className, }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
