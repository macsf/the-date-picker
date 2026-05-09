import type { DatePickerTheme } from '../theme/types';
import type { Preset } from '../utils/presets';
import type { CustomHolidayConfig } from '../hooks/useHolidays';
export type { CustomHolidayConfig };
export interface DatePickerProps {
    numberOfMonths?: 1 | 2;
    selectionMode?: 'single' | 'range';
    value?: Date | [Date, Date] | null;
    onChange?: (value: Date | [Date, Date] | null) => void;
    locale?: 'th' | 'en';
    theme?: DatePickerTheme;
    presets?: Preset[];
    customHolidays?: CustomHolidayConfig[];
    holidayTypes?: Array<'public' | 'bank' | 'observance'>;
    showNaturalLanguageInput?: boolean;
    showPresets?: boolean;
    showHolidays?: boolean;
    showWeekNumbers?: boolean;
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: Date[];
    weekStartsOn?: 0 | 1;
    calendarSystem?: 'gregorian' | 'buddhist';
    mode?: 'inline' | 'popover';
    triggerFormat?: string;
    className?: string;
}
export declare function DatePicker({ numberOfMonths, selectionMode, value, onChange, locale, theme, presets, customHolidays, holidayTypes, showNaturalLanguageInput, showPresets, showHolidays, showWeekNumbers, minDate, maxDate, disabledDates, weekStartsOn, calendarSystem, mode, triggerFormat, className, }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
