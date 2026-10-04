import type { Preset } from '../utils/presets';
interface PresetChipsProps {
    presets?: Preset[];
    value: [Date, Date] | null;
    minDate?: Date;
    maxDate?: Date;
    disabledDates?: Date[];
    onSelect: (range: [Date, Date]) => void;
    display?: 'chips' | 'dropdown';
    dropdownPlaceholder?: string;
    dropdownAriaLabel?: string;
}
export declare function PresetChips({ presets, value, minDate, maxDate, disabledDates, onSelect, display, dropdownPlaceholder, dropdownAriaLabel, }: PresetChipsProps): import("react/jsx-runtime").JSX.Element;
export {};
