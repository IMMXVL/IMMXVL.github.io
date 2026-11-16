import { education, languages } from '../data'
import { SectionHeading } from './SectionHeading'

export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading id="education-title" title="Education and languages" />
        <div className="two-up">
          <div className="card info-card spot" data-reveal>
            <p className="info-card__label">Education</p>
            <h3>{education.degree}</h3>
            <p className="info-card__meta">
              {education.school}, {education.year}
            </p>
          </div>
          <div className="card info-card spot" data-reveal>
            <p className="info-card__label">Languages</p>
            <ul className="language-list">
              {languages.map((language) => (
                <li key={language.name}>
                  <span className="language-list__name">{language.name}</span>
                  <span className="language-list__level">{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
