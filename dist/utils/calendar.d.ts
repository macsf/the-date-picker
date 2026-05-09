export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    weekNumber?: number;
}
export interface CalendarGrid {
    weeks: CalendarDay[][];
    month: Date;
}
export declare function buildCalendarGrid(month: Date, weekStartsOn?: 0 | 1): CalendarGrid;
export declare function getWeekNumber(date: Date, weekStartsOn?: 0 | 1): number;
export declare function toBuddhistYear(year: number): number;
export declare function formatMonthYear(date: Date, locale: 'th' | 'en'): string;
export declare function nextMonth(date: Date): Date;
export declare function prevMonth(date: Date): Date;
