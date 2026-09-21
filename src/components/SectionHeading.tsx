type SectionHeadingProps = {
  id: string
  index: string
  label: string
  title: string
  description?: string
}

export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <header className="section-heading" data-reveal>
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  )
}
