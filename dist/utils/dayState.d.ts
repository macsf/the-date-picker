export interface DayStateContext {
    today: Date;
    selectionMode: 'single' | 'range';
    selectedDate: Date | null;
    activeRange: [Date, Date] | null;
    highlightWeekends: boolean;
}
export interface DayState {
    isSelected: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    isInRange: boolean;
    isToday: boolean;
    isWeekend: boolean;
}
export declare function resolveDayState(date: Date, ctx: DayStateContext): DayState;
