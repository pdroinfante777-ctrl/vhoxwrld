import { useEffect, useRef } from 'react'

type VhoxCursorProps = {
  reducedMotion: boolean
}

export function VhoxCursor({ reducedMotion }: VhoxCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!cursor || !precisePointer.matches || reducedMotion) return

    const root = document.documentElement
    let frame = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY

    const updateCursor = () => {
      currentX += (targetX - currentX) * 0.22
      currentY += (targetY - currentY) * 0.22
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      frame = window.requestAnimationFrame(updateCursor)
    }

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      cursor.classList.add('vhox-cursor--visible')
      const target = event.target instanceof Element ? event.target : null
      const textField = target?.closest('input:not([type="range"]):not([type="button"]), textarea, [contenteditable="true"]')
      const editorialTarget = target?.closest<HTMLElement>('[data-cursor]')
      cursor.classList.toggle(
        'vhox-cursor--interactive',
        Boolean(target?.closest('a, button, input, select, textarea, [role="button"]')),
      )
      cursor.classList.toggle('vhox-cursor--field', Boolean(textField))
      cursor.classList.toggle('vhox-cursor--expanded', Boolean(editorialTarget))
      if (labelRef.current) labelRef.current.textContent = editorialTarget?.dataset.cursor ?? ''
    }
    const onPointerDown = () => cursor.classList.add('vhox-cursor--pressed')
    const onPointerUp = () => cursor.classList.remove('vhox-cursor--pressed')
    const onPointerLeave = () => cursor.classList.remove('vhox-cursor--visible')
    const onPointerEnter = () => cursor.classList.add('vhox-cursor--visible')

    root.classList.add('vhox-cursor-active')
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onPointerLeave)
    document.documentElement.addEventListener('mouseenter', onPointerEnter)
    frame = window.requestAnimationFrame(updateCursor)

    return () => {
      root.classList.remove('vhox-cursor-active')
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      document.documentElement.removeEventListener('mouseleave', onPointerLeave)
      document.documentElement.removeEventListener('mouseenter', onPointerEnter)
    }
  }, [reducedMotion])

  return (
    <div ref={cursorRef} className="vhox-cursor" aria-hidden="true">
      <span className="vhox-cursor__dot" />
      <span ref={labelRef} className="vhox-cursor__label" />
    </div>
  )
}
