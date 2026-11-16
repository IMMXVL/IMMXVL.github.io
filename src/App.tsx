import {
  cases,
  education,
  experience,
  languages,
  profile,
  skillGroups,
} from './data'

const currentYear = new Date().getFullYear()

const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Selected work' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container site-header__inner">
          <a className="site-header__name" href="#top">
            {profile.name}
          </a>
          <nav aria-label="Main">
            <ul className="site-nav">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" className="container">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">{profile.location}</p>
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero__role">{profile.title}</p>
          <p className="hero__summary">{profile.summary}</p>
          <p className="hero__note">{profile.note}</p>

          <ul className="actions" aria-label="Links">
            <li>
              <a className="button button--primary" href={`mailto:${profile.email}`}>
                Email me
              </a>
            </li>
            <li>
              <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="button" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a className="button" href={profile.cvPath} target="_blank" rel="noreferrer">
                Download CV (PDF)
              </a>
            </li>
          </ul>
        </section>

        <section id="experience" className="block" aria-labelledby="experience-title">
          <h2 id="experience-title">Experience</h2>
          <ol className="timeline">
            {experience.map((job) => (
              <li key={`${job.company}-${job.period}`} className="timeline__item">
                <header className="timeline__header">
                  <h3>
                    {job.role} · {job.company}
                  </h3>
                  <p className="timeline__meta">
                    {job.period} · {job.place}
                  </p>
                </header>
                <ul className="bullets">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section id="work" className="block" aria-labelledby="work-title">
          <h2 id="work-title">Selected work</h2>
          <p className="block__intro">
            Case studies without client names or code. Details are shared on request.
          </p>
          <div className="cards">
            {cases.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p className="card__context">{item.context}</p>
                <dl className="card__details">
                  <dt>Problem</dt>
                  <dd>{item.problem}</dd>
                  <dt>My role</dt>
                  <dd>{item.role}</dd>
                  <dt>Decisions</dt>
                  <dd>
                    <ul className="bullets">
                      {item.decisions.map((decision) => (
                        <li key={decision}>{decision}</li>
                      ))}
                    </ul>
                  </dd>
                  <dt>Outcome</dt>
                  <dd>{item.outcome}</dd>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="block" aria-labelledby="skills-title">
          <h2 id="skills-title">Skills</h2>
          <dl className="skills">
            {skillGroups.map((group) => (
              <div key={group.label} className="skills__group">
                <dt>{group.label}</dt>
                <dd>
                  <ul className="tags">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="education" className="block" aria-labelledby="education-title">
          <h2 id="education-title">Education and languages</h2>
          <div className="two-columns">
            <div>
              <h3>{education.degree}</h3>
              <p>
                {education.school}, {education.year}
              </p>
            </div>
            <div>
              <h3>Languages</h3>
              <ul className="plain-list">
                {languages.map((language) => (
                  <li key={language.name}>
                    <strong>{language.name}:</strong> {language.level}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="block block--last" aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <p>
            Open to frontend roles with React and TypeScript. The easiest way to reach me is by email.
          </p>
          <p>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            © {currentYear} {profile.name}
          </p>
        </div>
      </footer>
    </>
  )
}
