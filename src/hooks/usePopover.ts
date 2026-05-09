import { useState, useEffect, useRef, useCallback } from 'react'

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

  // Compute position relative to trigger
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const popoverRect = popoverRef.current.getBoundingClientRect()
    const viewportH = window.innerHeight
    const viewportW = window.innerWidth

    const spaceBelow = viewportH - triggerRect.bottom
    const spaceAbove = triggerRect.top
    const placement =
      spaceBelow >= popoverRect.height || spaceBelow >= spaceAbove
        ? 'bottom'
        : 'top'

    let left = triggerRect.left + window.scrollX
    if (left + popoverRect.width > viewportW) {
      left = viewportW - popoverRect.width - 8
    }
    left = Math.max(8, left)

    const top =
      placement === 'bottom'
        ? triggerRect.bottom + window.scrollY + 4
        : triggerRect.top + window.scrollY - popoverRect.height - 4

    setPosition({ top, left, placement })
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
