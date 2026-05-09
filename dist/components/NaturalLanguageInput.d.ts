interface NaturalLanguageInputProps {
    selectionMode: 'single' | 'range';
    locale: 'th' | 'en';
    onCommit: (result: {
        single?: Date;
        range?: [Date, Date];
    }) => void;
}
export declare function NaturalLanguageInput({ selectionMode, locale, onCommit, }: NaturalLanguageInputProps): import("react/jsx-runtime").JSX.Element;
export {};
