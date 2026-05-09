export type { ParsedDates } from '../utils/naturalLanguage';
export declare function useNaturalLanguage(): {
    inputValue: string;
    preview: import("./useNaturalLanguage").ParsedDates | null;
    handleChange: (text: string) => void;
    setInputValue: import("react").Dispatch<import("react").SetStateAction<string>>;
    setPreview: import("react").Dispatch<import("react").SetStateAction<import("./useNaturalLanguage").ParsedDates | null>>;
};
