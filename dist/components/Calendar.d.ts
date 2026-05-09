import { type CustomHolidayConfig } from '../hooks/useHolidays';
export interface CalendarConfig {
    locale: 'th' | 'en';
    weekStartsOn: 0 | 1;
    highlightWeekends: boolean;
    showWeekNumbers: boolean;
    showHolidays: boolean;
    holidayTypes: Array<'public' | 'bank' | 'observance'>;
    customHolidays: CustomHolidayConfig[];
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: Date[];
}
interface CalendarProps {
    month: Date;
    onMonthChange: (month: Date) => void;
    selectionMode: 'single' | 'range';
    selectedDate: Date | null;
    rangeValue: [Date, Date] | null;
    previewRange: [Date, Date] | null;
    onDayClick: (date: Date) => void;
    onDayHover: (date: Date | null) => void;
    onAnnounce: (msg: string) => void;
    config: CalendarConfig;
}
export declare function Calendar({ month, onMonthChange, selectionMode, selectedDate, rangeValue, previewRange, onDayClick, onDayHover, onAnnounce, config, }: CalendarProps): import("react/jsx-runtime").JSX.Element;
export {};
