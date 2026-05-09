export interface Preset {
    label: string;
    resolve: () => [Date, Date];
}
export declare const builtInPresets: Preset[];
