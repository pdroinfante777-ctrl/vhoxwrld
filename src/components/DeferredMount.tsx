import { useEffect, useRef, useState, type ReactNode } from 'react'

type DeferredMountProps = {
  children: ReactNode
  id?: string
  className?: string
  minHeight: string
}

export function DeferredMount({ children, id, className = '', minHeight }: DeferredMountProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setReady(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true)
        observer.disconnect()
      }
    }, { rootMargin: '700px 0px' })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} id={id} className={className} style={{ minHeight }}>
      {ready ? children : <SectionPlaceholder />}
    </div>
  )
}

function SectionPlaceholder() {
  return <div className="section-placeholder" aria-hidden="true" />
}
