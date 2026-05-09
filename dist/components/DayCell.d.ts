interface HolidayInfo {
    name: string;
    dotColor: string;
}
interface DayCellProps {
    date: Date;
    isCurrentMonth: boolean;
    isSelected: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    isInRange: boolean;
    isRowStart: boolean;
    isRowEnd: boolean;
    isDisabled: boolean;
    isToday: boolean;
    holidays: HolidayInfo[];
    onClick: (date: Date) => void;
    onMouseEnter: (date: Date) => void;
    onMouseLeave: () => void;
}
export declare function DayCell({ date, isCurrentMonth, isSelected, isRangeStart, isRangeEnd, isInRange, isRowStart, isRowEnd, isDisabled, isToday, holidays, onClick, onMouseEnter, onMouseLeave, }: DayCellProps): import("react/jsx-runtime").JSX.Element;
export {};
