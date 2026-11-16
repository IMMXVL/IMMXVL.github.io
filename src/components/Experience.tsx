import type { CSSProperties } from 'react'
import { experience } from '../data'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading id="experience-title" title="Experience" />
        <ol className="timeline">
          {experience.map((job, index) => {
            const isCurrent = job.period.includes('Present')
            return (
              <li
                key={`${job.company}-${job.period}`}
                className="timeline__item"
                data-current={isCurrent}
                data-reveal
                style={{ '--delay': `${index * 90}ms` } as CSSProperties}
              >
                <span className="timeline__dot" aria-hidden="true" />
                <div className="timeline__card">
                  <div className="timeline__header">
                    <h3>
                      {job.role} · {job.company}
                    </h3>
                    {isCurrent && <span className="badge">Current</span>}
                  </div>
                  <p className="timeline__meta">
                    {job.period} · {job.place}
                  </p>
                  <ul className="bullets">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
