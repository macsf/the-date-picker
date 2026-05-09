import type { PopoverPosition } from '../hooks/usePopover'

const VIEWPORT_MARGIN = 8
const TRIGGER_GAP = 4

export interface PopoverMeasurements {
  triggerRect: DOMRect
  popoverRect: DOMRect
  viewportWidth: number
  viewportHeight: number
  scrollX: number
  scrollY: number
}

export function computePopoverPosition(m: PopoverMeasurements): PopoverPosition {
  const { triggerRect, popoverRect, viewportWidth, viewportHeight, scrollX, scrollY } = m

  const spaceBelow = viewportHeight - triggerRect.bottom
  const spaceAbove = triggerRect.top
  const placement =
    spaceBelow >= popoverRect.height || spaceBelow >= spaceAbove ? 'bottom' : 'top'

  let left = triggerRect.left + scrollX
  if (left + popoverRect.width > viewportWidth) {
    left = viewportWidth - popoverRect.width - VIEWPORT_MARGIN
  }
  left = Math.max(VIEWPORT_MARGIN, left)

  const top =
    placement === 'bottom'
      ? triggerRect.bottom + scrollY + TRIGGER_GAP
      : triggerRect.top + scrollY - popoverRect.height - TRIGGER_GAP

  return { top, left, placement }
}
