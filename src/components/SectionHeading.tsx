type SectionHeadingProps = {
  id: string
  title: string
  intro?: string
}

export function SectionHeading({ id, title, intro }: SectionHeadingProps) {
  return (
    <div className="section-heading" data-reveal>
      <h2 id={id}>{title}</h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </div>
  )
}
