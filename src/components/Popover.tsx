import React from 'react'
import { createPortal } from 'react-dom'
import type { PopoverPosition } from '../hooks/usePopover'

interface PopoverProps {
  isOpen: boolean
  position: PopoverPosition
  popoverRef: React.RefObject<HTMLElement>
  children: React.ReactNode
}

export function Popover({ isOpen, position, popoverRef, children }: PopoverProps) {
  if (!isOpen) return null

  return createPortal(
    <div
      ref={popoverRef as React.RefObject<HTMLDivElement>}
      className="dp-popover"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 9999,
      }}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>,
    document.body,
  )
}
