import { useState, useEffect, useRef, useCallback } from 'react'
import { computePopoverPosition } from '../utils/popover'

export interface PopoverPosition {
  top: number
  left: number
  placement: 'bottom' | 'top'
}

export function usePopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<PopoverPosition>({
    top: 0,
    left: 0,
    placement: 'bottom',
  })
  const triggerRef = useRef<HTMLElement | null>(null)
  const popoverRef = useRef<HTMLElement | null>(null)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return
    setPosition(
      computePopoverPosition({
        triggerRect: triggerRef.current.getBoundingClientRect(),
        popoverRect: popoverRef.current.getBoundingClientRect(),
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      }),
    )
  }, [])

  useEffect(() => {
    if (!isOpen) return

    // Wait for popover to mount before measuring
    const frame = requestAnimationFrame(updatePosition)

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        close()
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, close, updatePosition])

  return { isOpen, open, close, toggle, position, triggerRef, popoverRef }
}
