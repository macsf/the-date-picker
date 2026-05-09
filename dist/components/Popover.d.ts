import React from 'react';
import type { PopoverPosition } from '../hooks/usePopover';
interface PopoverProps {
    isOpen: boolean;
    position: PopoverPosition;
    popoverRef: React.RefObject<HTMLElement>;
    children: React.ReactNode;
}
export declare function Popover({ isOpen, position, popoverRef, children }: PopoverProps): React.ReactPortal | null;
export {};
