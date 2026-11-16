import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { cases, experience, profile } from './data'

describe('App', () => {
  it('shows the name as the main heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
  })

  it('links to the CV, GitHub and LinkedIn', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Download CV (PDF)' })).toHaveAttribute(
      'href',
      profile.cvPath,
    )
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', profile.github)
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', profile.linkedin)
  })

  it('renders every job from the experience data', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Experience' })
    const items = within(section).getAllByRole('listitem')
    expect(items.length).toBeGreaterThan(0)
    for (const job of experience) {
      expect(within(section).getByRole('heading', { name: new RegExp(job.company) })).toBeInTheDocument()
    }
  })

  it('renders every case study with its outcome', () => {
    render(<App />)
    for (const item of cases) {
      expect(screen.getByRole('heading', { level: 3, name: item.title })).toBeInTheDocument()
      expect(screen.getByText(item.outcome)).toBeInTheDocument()
    }
  })

  it('has a skip link to the main content', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main')
  })
})
