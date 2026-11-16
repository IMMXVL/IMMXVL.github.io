import type { CSSProperties } from 'react'
import { highlights, profile } from '../data'
import { ArrowUpRightIcon, DownloadIcon, MailIcon } from './icons'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true">
        <span className="blob blob--violet" />
        <span className="blob blob--cyan" />
        <span className="blob blob--pink" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        {profile.availability && (
          <p className="status-pill" data-reveal>
            <span className="status-pill__dot" aria-hidden="true" />
            {profile.availability}
          </p>
        )}

        <h1 id="hero-title" className="hero__title" data-reveal style={delay(60)}>
          {profile.name}
        </h1>

        <p className="hero__role" data-reveal style={delay(120)}>
          <span className="gradient-text">Frontend Engineer</span>
          <span className="hero__role-stack"> · React, TypeScript</span>
        </p>

        <p className="hero__summary" data-reveal style={delay(180)}>
          {profile.summary}
        </p>

        <ul className="actions" aria-label="Links" data-reveal style={delay(240)}>
          <li>
            <a className="button button--primary" href={`mailto:${profile.email}`}>
              <MailIcon />
              Email me
            </a>
          </li>
          <li>
            <a className="button" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
              <ArrowUpRightIcon />
            </a>
          </li>
          <li>
            <a className="button" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
              <ArrowUpRightIcon />
            </a>
          </li>
          <li>
            <a className="button button--ghost" href={profile.cvPath} target="_blank" rel="noreferrer">
              <DownloadIcon />
              Download CV (PDF)
            </a>
          </li>
        </ul>

        <ul className="highlights" aria-label="Highlights">
          {highlights.map((item, index) => (
            <li key={item.label} className="highlight" data-reveal style={delay(300 + index * 80)}>
              <span className="highlight__value">{item.value}</span>
              <span className="highlight__label">{item.label}</span>
            </li>
          ))}
        </ul>

        <p className="hero__note" data-reveal style={delay(540)}>
          {profile.note}
        </p>
      </div>
    </section>
  )
}
