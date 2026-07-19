type BrandMarkProps = {
  compact?: boolean
  className?: string
}

export function BrandMark({ compact = false, className = '' }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''} ${className}`.trim()}>
      <svg viewBox={compact ? '0 0 48 48' : '0 0 178 48'} role="img" aria-label="VHOX">
        <path className="brand-mark__signal" d="M2 8 12 24 2 40l18-8 4 12 4-12 18 8-10-16L46 8 28 17 24 4l-4 13Z" />
        {!compact && (
          <g className="brand-mark__word" aria-hidden="true">
            <path d="M59 11h8l7 24 7-24h8L78 41h-8Z" />
            <path d="M94 11h7v11h11V11h7v30h-7V28h-11v13h-7Z" />
            <path fillRule="evenodd" d="M140 10c10 0 16 6 16 16s-6 16-16 16-16-6-16-16 6-16 16-16Zm0 7c-5 0-8 3-8 9s3 9 8 9 8-3 8-9-3-9-8-9Z" />
            <path d="m158 11 7 10 6-10h8l-10 15 10 15h-8l-7-10-6 10h-8l10-15-10-15Z" />
          </g>
        )}
      </svg>
      <span className="brand-mark__fallback-note" aria-hidden="true">WEB MARK / REPLACE WITH MASTER LOGO</span>
    </span>
  )
}
