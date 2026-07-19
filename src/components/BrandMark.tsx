import { VHOX_BAT_PATH, VHOX_BAT_VIEWBOX } from '../assets/vhoxBat'

type BrandMarkProps = {
  className?: string
}

export function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`.trim()}>
      <svg viewBox="0 0 120 48" role="img" aria-label="VHOX">
        <g className="brand-mark__word" transform="translate(-59 0)" aria-hidden="true">
          <path d="M59 11h8l7 24 7-24h8L78 41h-8Z" />
          <path d="M94 11h7v11h11V11h7v30h-7V28h-11v13h-7Z" />
          <path fillRule="evenodd" d="M140 10c10 0 16 6 16 16s-6 16-16 16-16-6-16-16 6-16 16-16Zm0 7c-5 0-8 3-8 9s3 9 8 9 8-3 8-9-3-9-8-9Z" />
          <path d="m158 11 7 10 6-10h8l-10 15 10 15h-8l-7-10-6 10h-8l10-15-10-15Z" />
        </g>
      </svg>
    </span>
  )
}

type BatIsotypeProps = {
  className?: string
  decorative?: boolean
}

export function BatIsotype({ className = '', decorative = false }: BatIsotypeProps) {
  return (
    <svg
      className={`bat-isotype ${className}`.trim()}
      viewBox={VHOX_BAT_VIEWBOX}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : 'VHOX bat'}
    >
      <path d={VHOX_BAT_PATH} />
    </svg>
  )
}
