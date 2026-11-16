import { useState } from 'react'
import { skillGroups } from '../data'
import { SectionHeading } from './SectionHeading'

const ALL = 'All'

export function Skills() {
  const [filter, setFilter] = useState(ALL)
  const filters = [ALL, ...skillGroups.map((group) => group.label)]
  const visibleGroups =
    filter === ALL ? skillGroups : skillGroups.filter((group) => group.label === filter)
  const total = visibleGroups.reduce((sum, group) => sum + group.items.length, 0)

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" index="03" title="Skills" />

        <div className="filters" role="group" aria-label="Filter skills" data-reveal>
          {filters.map((label) => (
            <button
              key={label}
              type="button"
              className="chip"
              aria-pressed={filter === label}
              onClick={() => setFilter(label)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="filters__count" aria-live="polite">
          {total} {total === 1 ? 'skill' : 'skills'}
          {filter !== ALL && ` in ${filter}`}
        </p>

        <div className="skills-grid">
          {visibleGroups.map((group) => (
            <div key={group.label} className="card skill-card">
              <h3>{group.label}</h3>
              <ul className="tags">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
