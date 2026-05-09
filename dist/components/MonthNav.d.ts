interface MonthNavProps {
    month: Date;
    onPrev: () => void;
    onNext: () => void;
    onMonthSelect: (month: number) => void;
    onYearSelect: (year: number) => void;
    locale: 'th' | 'en';
    calendarSystem: 'gregorian' | 'buddhist';
    minDate?: Date;
    maxDate?: Date;
}
export declare function MonthNav({ month, onPrev, onNext, onMonthSelect, onYearSelect, locale, calendarSystem, minDate, maxDate, }: MonthNavProps): import("react/jsx-runtime").JSX.Element;
export {};
