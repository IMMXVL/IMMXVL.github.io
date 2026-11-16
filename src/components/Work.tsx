import type { CSSProperties, PointerEvent } from 'react'
import { cases } from '../data'
import { SectionHeading } from './SectionHeading'

function trackPointer(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
  card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
}

export function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          id="work-title"
          title="Selected work"
          intro="Case studies without client names or code. Details are shared on request."
        />
        <div className="bento">
          {cases.map((item, index) => (
            <div
              key={item.title}
              className="bento__cell"
              data-reveal
              style={{ '--delay': `${index * 90}ms` } as CSSProperties}
            >
              <article className="card case-card" onPointerMove={trackPointer}>
                <div className="case-card__top">
                  <h3>{item.title}</h3>
                  <p className="case-card__context">{item.context}</p>
                </div>

                <dl className="case-card__body">
                  <div>
                    <dt>Problem</dt>
                    <dd>{item.problem}</dd>
                  </div>
                  <div>
                    <dt>My role</dt>
                    <dd>{item.role}</dd>
                  </div>
                  <div className="case-card__decisions">
                    <dt>Decisions</dt>
                    <dd>
                      <ul className="bullets">
                        {item.decisions.map((decision) => (
                          <li key={decision}>{decision}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="case-card__outcome">
                  <span className="case-card__outcome-label">Outcome</span>
                  <p>{item.outcome}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
