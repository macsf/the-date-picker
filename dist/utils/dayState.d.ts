export interface DayStateContext {
    today: Date;
    selectionMode: 'single' | 'range';
    selectedDate: Date | null;
    activeRange: [Date, Date] | null;
}
export interface DayState {
    isSelected: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    isInRange: boolean;
    isToday: boolean;
}
export declare function resolveDayState(date: Date, ctx: DayStateContext): DayState;
