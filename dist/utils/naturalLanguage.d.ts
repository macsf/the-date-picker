export interface ParsedDates {
    single?: Date;
    range?: [Date, Date];
    text: string;
}
export declare function parseNaturalLanguage(text: string, ref?: Date): ParsedDates | null;
