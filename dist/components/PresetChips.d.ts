import type { Preset } from '../utils/presets';
interface PresetChipsProps {
    presets?: Preset[];
    value: [Date, Date] | null;
    onSelect: (range: [Date, Date]) => void;
}
export declare function PresetChips({ presets, value, onSelect }: PresetChipsProps): import("react/jsx-runtime").JSX.Element;
export {};
