import { useEffect, useRef, useState } from 'react'
import { garmentCopy, type GarmentImage } from '../data/garmentEditorials'
import { useLocale } from '../i18n/useLocale'

export function EditorialGallery({ images, title }: { images: GarmentImage[]; title: string }) {
  const { locale } = useLocale()
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const media = images[active]
  const move = (direction: number) => setActive(current => (current + direction + images.length) % images.length)

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [open])

  if (!media) return null
  const picture = (expanded = false) => failedSource === media.name
    ? <p role="status">{garmentCopy.unavailable[locale]}</p>
    : <img
        src={`/garments/${media.name}.webp`}
        srcSet={expanded ? undefined : `/garments/${media.name}-small.webp ${media.width > media.height ? 640 : Math.round(800 * media.width / media.height)}w, /garments/${media.name}.webp ${media.width}w`}
        sizes={expanded ? undefined : '(max-width: 700px) calc(100vw - 40px), 46vw'}
        width={media.width} height={media.height} alt={media.alt[locale]}
        loading={expanded ? 'eager' : 'lazy'} decoding="async"
        onError={() => setFailedSource(media.name)}
      />

  return (
    <div className="garment-gallery">
      <button className="garment-gallery__stage" ref={triggerRef} type="button" onClick={() => setOpen(true)} aria-label={`${garmentCopy.enlarge[locale]}: ${title}`}>
        {picture()}
        <span className="garment-gallery__enlarge" aria-hidden="true">↗</span>
      </button>
      {images.length > 1 && <div className="garment-gallery__views" aria-label={title}>
        {images.map((item, index) => <button key={item.name} type="button" aria-pressed={index === active} aria-label={`${garmentCopy.show[locale]}: ${item.alt[locale]}`} onClick={() => setActive(index)}>
          <img src={`/garments/${item.name}-thumb.webp`} alt="" width={item.width} height={item.height} loading="lazy" />
        </button>)}
      </div>}
      <dialog ref={dialogRef} className="garment-lightbox" aria-label={title} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} onKeyDown={event => {
        if (event.key === 'Tab') {
          const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button')
          const first = buttons[0]
          const last = buttons[buttons.length - 1]
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
        }
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
      }} onClick={event => { if (event.target === event.currentTarget) setOpen(false) }}>
        {open && <div className="garment-lightbox__body">
          <button ref={closeRef} className="garment-lightbox__close" type="button" onClick={() => setOpen(false)}>{garmentCopy.close[locale]} ×</button>
          {picture(true)}
          <div className="garment-lightbox__caption">
            {images.length > 1 && <button type="button" aria-label={garmentCopy.previous[locale]} onClick={() => move(-1)}>←</button>}
            <p aria-live="polite">{media.alt[locale]}</p>
            {images.length > 1 && <button type="button" aria-label={garmentCopy.next[locale]} onClick={() => move(1)}>→</button>}
          </div>
        </div>}
      </dialog>
    </div>
  )
}
