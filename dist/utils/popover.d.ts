import type { PopoverPosition } from '../hooks/usePopover';
export interface PopoverMeasurements {
    triggerRect: DOMRect;
    popoverRect: DOMRect;
    viewportWidth: number;
    viewportHeight: number;
    scrollX: number;
    scrollY: number;
}
export declare function computePopoverPosition(m: PopoverMeasurements): PopoverPosition;
