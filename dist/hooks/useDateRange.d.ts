interface UseDateRangeOptions {
    value: [Date, Date] | null;
    onChange: (value: [Date, Date] | null) => void;
}
export declare function useDateRange({ value, onChange }: UseDateRangeOptions): {
    pendingStart: Date | null;
    hoverDate: Date | null;
    previewRange: [Date, Date] | null;
    handleDayClick: (date: Date) => void;
    handleDayHover: (date: Date | null) => void;
};
export {};
