export interface CustomHolidayConfig {
    date: string;
    nameTH: string;
    nameEN: string;
    dotColor?: string;
}
export interface HolidayEntry {
    date: string;
    name: string;
    type: string;
}
export interface HolidayDot {
    name: string;
    dotColor: string;
}
export interface HolidayMap {
    getHolidaysForDate(date: Date): HolidayDot[];
}
export declare function formatDateKey(date: Date): string;
export declare function useHolidays(year: number, locale: 'th' | 'en', types?: Array<'public' | 'bank' | 'observance'>, enabled?: boolean, customHolidays?: CustomHolidayConfig[]): HolidayMap;
