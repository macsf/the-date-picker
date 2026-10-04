import { addDays, addMonths, addWeeks, addYears, subDays, subMonths, subWeeks, subYears } from 'date-fns';
/** Years offered before a max-only bound, so a birthday max can still reach older years. */
export declare const OPEN_PAST_YEAR_SPAN = 120;
/** Years offered after a min-only bound. */
export declare const OPEN_FUTURE_YEAR_SPAN = 10;
/** Years on each side of the visible year when neither bound is set. */
export declare const UNBOUNDED_YEAR_SPAN = 10;
export declare function clampVisibleMonth(month: Date, minDate?: Date, maxDate?: Date): Date;
export declare function getSelectableYears(visibleYear: number, minDate?: Date, maxDate?: Date): number[];
declare const RELATIVE_SHIFTS: {
    readonly yearsAgo: typeof subYears;
    readonly yearsFromNow: typeof addYears;
    readonly monthsAgo: typeof subMonths;
    readonly monthsFromNow: typeof addMonths;
    readonly weeksAgo: typeof subWeeks;
    readonly weeksFromNow: typeof addWeeks;
    readonly daysAgo: typeof subDays;
    readonly daysFromNow: typeof addDays;
};
type RelativeUnit = keyof typeof RELATIVE_SHIFTS;
/** A day counted from today. Use one field. Counts are zero or greater. */
export type RelativeBound = 'today' | 'yesterday' | {
    [Unit in RelativeUnit]: {
        [Key in Unit]: number;
    };
}[RelativeUnit];
/** The calendar day for a relative bound. An invalid bound resolves to nothing. */
export declare function resolveRelativePoint(bound: RelativeBound | undefined, today: Date): Date | undefined;
export declare function resolveRelativeBounds(input: {
    minDate?: Date;
    maxDate?: Date;
    from?: RelativeBound;
    until?: RelativeBound;
    today?: Date;
}): {
    minDate?: Date;
    maxDate?: Date;
};
export declare function isMonthDisabled(year: number, monthIndex: number, minDate?: Date, maxDate?: Date): boolean;
export {};
