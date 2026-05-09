import type { Preset } from '../utils/presets';
interface PresetChipsProps {
    presets?: Preset[];
    value: [Date, Date] | null;
    onSelect: (range: [Date, Date]) => void;
    display?: 'chips' | 'dropdown';
    dropdownPlaceholder?: string;
    dropdownAriaLabel?: string;
}
export declare function PresetChips({ presets, value, onSelect, display, dropdownPlaceholder, dropdownAriaLabel, }: PresetChipsProps): import("react/jsx-runtime").JSX.Element;
export {};
