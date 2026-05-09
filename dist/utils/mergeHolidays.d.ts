export interface Holiday {
    date: string;
    name: string;
    nameTH: string;
    type: 'public' | 'observance';
}
export type HolidaysByYear = Record<string, Holiday[]>;
export declare function mergeHolidays(): HolidaysByYear;
