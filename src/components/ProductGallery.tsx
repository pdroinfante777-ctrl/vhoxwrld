import { useEffect, useRef, useState } from 'react'
import type { Product } from '../data/products'

export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const pointerStart = useRef<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const lightboxTriggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const activeMedia = product.media[activeIndex]

  useEffect(() => {
    setActiveIndex(0)
    setLightboxOpen(false)
  }, [product.id])

  useEffect(() => {
    if (!lightboxOpen) return
    const previousOverflow = document.body.style.overflow
    const triggerAtOpen = lightboxTriggerRef.current
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      triggerAtOpen?.focus()
    }
  }, [lightboxOpen])

  const move = (direction: number) => {
    if (product.media.length < 2) return
    setActiveIndex((current) => (current + direction + product.media.length) % product.media.length)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') move(-1)
    if (event.key === 'ArrowRight') move(1)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const image = galleryRef.current?.querySelector<HTMLElement>('.product-gallery__main-media')
    if (!image) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    image.style.transformOrigin = `${x.toFixed(1)}% ${y.toFixed(1)}%`
  }

  return (
    <div className="product-gallery" aria-label={`Galería de ${product.name}`}>
      <div
        ref={galleryRef}
        className="product-gallery__stage"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerMove={handlePointerMove}
        onPointerDown={(event) => { pointerStart.current = event.clientX }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return
          const distance = event.clientX - pointerStart.current
          pointerStart.current = null
          if (Math.abs(distance) > 44) move(distance > 0 ? -1 : 1)
        }}
      >
        {activeMedia ? (
          activeMedia.type === 'image' ? (
            <button ref={lightboxTriggerRef} className="product-gallery__lightbox-trigger" type="button" onClick={() => setLightboxOpen(true)} aria-label="Ampliar imagen">
              <img
                key={activeMedia.src}
                className="product-gallery__main-media"
                src={activeMedia.src}
                alt={activeMedia.alt}
                style={{ objectFit: activeMedia.objectFit ?? 'contain', objectPosition: activeMedia.objectPosition }}
              />
            </button>
          ) : (
            <video key={activeMedia.src} className="product-gallery__main-media" src={activeMedia.src} poster={activeMedia.poster} controls playsInline aria-label={activeMedia.alt} />
          )
        ) : (
          <div className={`product-gallery__placeholder product-card__visual--${product.visual}`}>
            <span className="product-card__geometry" aria-hidden="true" />
            <span className="product-card__garment-guide" aria-hidden="true" />
            <span>APPROVED PRODUCT PHOTOGRAPHY PENDING</span>
          </div>
        )}

        {product.media.length > 1 && (
          <div className="product-gallery__arrows">
            <button type="button" aria-label="Imagen anterior" onClick={() => move(-1)}>←</button>
            <span>{String(activeIndex + 1).padStart(2, '0')} / {String(product.media.length).padStart(2, '0')}</span>
            <button type="button" aria-label="Imagen siguiente" onClick={() => move(1)}>→</button>
          </div>
        )}
      </div>

      {product.media.length > 1 && (
        <div className="product-gallery__thumbs" aria-label="Miniaturas del producto">
          {product.media.map((media, index) => (
            <button key={media.src} type="button" aria-label={`Mostrar vista ${index + 1}`} aria-pressed={activeIndex === index} onClick={() => setActiveIndex(index)}>
              {media.thumbnail || media.type === 'image'
                ? <img src={media.thumbnail ?? media.src} alt="" loading="lazy" />
                : <span>{String(index + 1).padStart(2, '0')}</span>}
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && activeMedia?.type === 'image' && (
        <div className="product-lightbox" role="dialog" aria-modal="true" aria-label={`Vista ampliada de ${product.name}`} onMouseDown={(event) => {
          if (event.target === event.currentTarget) setLightboxOpen(false)
        }}>
          <button ref={closeButtonRef} type="button" onClick={() => setLightboxOpen(false)} aria-label="Cerrar imagen ampliada">CERRAR / ESC</button>
          <img src={activeMedia.src} alt={activeMedia.alt} />
        </div>
      )}
    </div>
  )
}
