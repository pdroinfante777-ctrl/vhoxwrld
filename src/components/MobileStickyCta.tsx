export function MobileStickyCta({ href, label, meta }: { href: string; label: string; meta?: string }) {
  return (
    <aside className="mobile-sticky-cta" aria-label={label}>
      {meta && <span>{meta}</span>}
      <a href={href}>{label}<b aria-hidden="true">↗</b></a>
    </aside>
  )
}
