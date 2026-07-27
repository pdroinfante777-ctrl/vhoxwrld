const officialLogo = '/brand/vhox-logo-source.png'
const officialBat = '/brand/vhox-bat-header-symbol.png'

type BrandMarkProps = {
  className?: string
  decorative?: boolean
  variant?: 'wordmark' | 'bat'
}

export function BrandMark({
  className = '',
  decorative = false,
  variant = 'wordmark',
}: BrandMarkProps) {
  const isBat = variant === 'bat'

  return (
    <span className={`brand-mark brand-mark--${variant} ${className}`.trim()}>
      <img
        src={isBat ? officialBat : officialLogo}
        width={isBat ? '992' : '1254'}
        height={isBat ? '536' : '1254'}
        alt={decorative ? '' : isBat ? 'VHOX bat symbol' : 'VHOX'}
        aria-hidden={decorative || undefined}
        decoding="async"
      />
    </span>
  )
}
