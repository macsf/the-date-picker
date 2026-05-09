import { describe, it, expect } from 'vitest'
import { computePopoverPosition, type PopoverMeasurements } from '../../utils/popover'

function measurements(overrides: Partial<PopoverMeasurements> = {}): PopoverMeasurements {
  return {
    triggerRect: { top: 100, bottom: 130, left: 50, right: 150, width: 100, height: 30 } as DOMRect,
    popoverRect: { width: 200, height: 80 } as DOMRect,
    viewportWidth: 800,
    viewportHeight: 600,
    scrollX: 0,
    scrollY: 0,
    ...overrides,
  }
}

describe('computePopoverPosition', () => {
  describe('placement', () => {
    it('places below when there is enough space below', () => {
      const result = computePopoverPosition(measurements())
      expect(result.placement).toBe('bottom')
    })

    it('places above when there is not enough space below but enough above', () => {
      const result = computePopoverPosition(
        measurements({
          triggerRect: { top: 500, bottom: 530, left: 50, right: 150, width: 100, height: 30 } as DOMRect,
          viewportHeight: 600,
        }),
      )
      expect(result.placement).toBe('top')
    })

    it('prefers below when space below equals space above', () => {
      const result = computePopoverPosition(
        measurements({
          triggerRect: { top: 300, bottom: 330, left: 50, right: 150, width: 100, height: 30 } as DOMRect,
          viewportHeight: 600,
        }),
      )
      expect(result.placement).toBe('bottom')
    })
  })

  describe('top position', () => {
    it('positions below the trigger with gap', () => {
      const result = computePopoverPosition(measurements())
      // triggerRect.bottom(130) + scrollY(0) + TRIGGER_GAP(4)
      expect(result.top).toBe(134)
    })

    it('positions above the trigger with gap', () => {
      const result = computePopoverPosition(
        measurements({
          triggerRect: { top: 500, bottom: 530, left: 50, right: 150, width: 100, height: 30 } as DOMRect,
          viewportHeight: 600,
        }),
      )
      // triggerRect.top(500) + scrollY(0) - popoverHeight(80) - TRIGGER_GAP(4)
      expect(result.top).toBe(416)
    })

    it('accounts for scrollY', () => {
      const result = computePopoverPosition(measurements({ scrollY: 200 }))
      expect(result.top).toBe(334) // 130 + 200 + 4
    })
  })

  describe('left position', () => {
    it('aligns with trigger left edge', () => {
      const result = computePopoverPosition(measurements())
      expect(result.left).toBe(50)
    })

    it('clamps to viewport right edge with margin when popover would overflow', () => {
      const result = computePopoverPosition(
        measurements({
          triggerRect: { top: 100, bottom: 130, left: 650, right: 750, width: 100, height: 30 } as DOMRect,
        }),
      )
      // viewportWidth(800) - popoverWidth(200) - VIEWPORT_MARGIN(8)
      expect(result.left).toBe(592)
    })

    it('clamps to minimum left margin', () => {
      const result = computePopoverPosition(
        measurements({
          triggerRect: { top: 100, bottom: 130, left: 0, right: 100, width: 100, height: 30 } as DOMRect,
          scrollX: -20,
        }),
      )
      expect(result.left).toBe(8)
    })

    it('accounts for scrollX', () => {
      const result = computePopoverPosition(measurements({ scrollX: 100 }))
      expect(result.left).toBe(150) // triggerLeft(50) + scrollX(100)
    })
  })
})
