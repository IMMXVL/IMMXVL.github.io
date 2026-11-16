type SectionHeadingProps = {
  id: string
  index: string
  title: string
  intro?: string
}

export function SectionHeading({ id, index, title, intro }: SectionHeadingProps) {
  return (
    <div className="section-heading" data-reveal>
      <p className="section-heading__index" aria-hidden="true">
        {index}
      </p>
      <h2 id={id}>{title}</h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </div>
  )
}
