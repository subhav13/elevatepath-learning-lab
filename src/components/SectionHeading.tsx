type SectionHeadingProps = {
  title: string
  description?: string
  level?: 2 | 3
}

export function SectionHeading({ title, description, level = 2 }: SectionHeadingProps) {
  const Heading = level === 3 ? 'h3' : 'h2'

  return (
    <div className="section-heading">
      <Heading>{title}</Heading>
      {description ? <p>{description}</p> : null}
    </div>
  )
}
