import { type Holiday } from "./mergeHolidays";
export type HolidayType = "public" | "bank" | "observance";
export type HolidayLocale = "th" | "en";
export interface PublicHolidayEntry {
    date: string;
    name: string;
    nameTH?: string;
    type: HolidayType;
}
export declare function getHolidaysForYear(year: number, locale?: HolidayLocale, types?: HolidayType[]): PublicHolidayEntry[];
export declare function getHolidayMapForYear(year: number, locale?: HolidayLocale, types?: HolidayType[]): Map<string, PublicHolidayEntry[]>;
export type { Holiday };
