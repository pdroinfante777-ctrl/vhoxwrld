type SectionHeadingProps = {
  id: string
  index: string
  label: string
  title: string
  description?: string
}

export function SectionHeading({ id, index, label, title, description }: SectionHeadingProps) {
  return (
    <header className="section-heading" data-reveal>
      <div className="section-heading__meta">
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  )
}
