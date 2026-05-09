export interface PopoverPosition {
    top: number;
    left: number;
    placement: 'bottom' | 'top';
}
export declare function usePopover(): {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    position: PopoverPosition;
    triggerRef: import("react").MutableRefObject<HTMLElement | null>;
    popoverRef: import("react").MutableRefObject<HTMLElement | null>;
};
