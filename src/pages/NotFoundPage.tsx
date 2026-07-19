import { useEffect } from 'react'
import { BrandMark } from '../components/BrandMark'

export function NotFoundPage() {
  useEffect(() => {
    document.title = '404 — VHOX'
  }, [])

  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <BrandMark />
      <span>VHOX / OUTSIDE THE SYSTEM</span>
      <h1 id="not-found-title">404.</h1>
      <a className="button" href="/">REGRESAR A VHOX</a>
    </section>
  )
}
