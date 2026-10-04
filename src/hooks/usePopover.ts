import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { computePopoverPosition } from '../utils/popover'

export interface PopoverPosition {
  top: number
  left: number
  placement: 'bottom' | 'top'
}

function isTriggerTarget(trigger: HTMLElement | null, target: Node): boolean {
  if (!trigger) return false
  if (trigger.contains(target)) return true
  if (!(target instanceof Element)) return false
  const label = target.closest('label')
  if (!label) return false
  if (trigger.id && label.htmlFor === trigger.id) return true
  return label.contains(trigger)
}

export function usePopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<PopoverPosition>({
    top: 0,
    left: 0,
    placement: 'bottom',
  })
  const [placed, setPlaced] = useState(false)
  const triggerRef = useRef<HTMLElement | null>(null)
  const popoverRef = useRef<HTMLElement | null>(null)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return false
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
    return true
  }, [])

  useLayoutEffect(() => {
    if (!isOpen) {
      setPlaced(false)
      return
    }
    if (updatePosition()) setPlaced(true)
  }, [isOpen, updatePosition])

  useEffect(() => {
    if (!isOpen) return

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        !isTriggerTarget(triggerRef.current, target)
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
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, close, updatePosition])

  return { isOpen, open, close, toggle, position, placed, triggerRef, popoverRef }
}
