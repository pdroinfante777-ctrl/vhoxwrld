import { useEffect, useRef } from 'react'

type VhoxCursorProps = {
  reducedMotion: boolean
}

export function VhoxCursor({ reducedMotion }: VhoxCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!cursor || !precisePointer.matches) return

    const root = document.documentElement
    let frame = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY

    const updateCursor = () => {
      if (reducedMotion) {
        currentX = targetX
        currentY = targetY
      } else {
        currentX += (targetX - currentX) * 0.28
        currentY += (targetY - currentY) * 0.28
      }
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      frame = window.requestAnimationFrame(updateCursor)
    }

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      cursor.classList.add('vhox-cursor--visible')
      const target = event.target instanceof Element ? event.target : null
      cursor.classList.toggle(
        'vhox-cursor--interactive',
        Boolean(target?.closest('a, button, input, select, textarea, [role="button"]')),
      )
    }
    const onPointerDown = () => cursor.classList.add('vhox-cursor--pressed')
    const onPointerUp = () => cursor.classList.remove('vhox-cursor--pressed')
    const onPointerLeave = () => cursor.classList.remove('vhox-cursor--visible')

    root.classList.add('vhox-cursor-active')
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onPointerLeave)
    frame = window.requestAnimationFrame(updateCursor)

    return () => {
      root.classList.remove('vhox-cursor-active')
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      document.documentElement.removeEventListener('mouseleave', onPointerLeave)
    }
  }, [reducedMotion])

  return (
    <div ref={cursorRef} className="vhox-cursor" aria-hidden="true">
      <svg viewBox="0 0 40 40" role="presentation">
        <path className="vhox-cursor__upper" d="M20 20 3.5 4.5 M20 20 36.5 4.5" />
        <path className="vhox-cursor__lower" d="M20 20 12.5 30 M20 20 27.5 30" />
        <circle cx="20" cy="20" r="1.35" />
      </svg>
    </div>
  )
}
