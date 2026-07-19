const officialLogo = '/brand/vhox-logo-source.png'

type BrandMarkProps = {
  className?: string
}

export function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`.trim()}>
      <img
        src={officialLogo}
        width="1254"
        height="1254"
        alt="VHOX"
        decoding="async"
      />
    </span>
  )
}
