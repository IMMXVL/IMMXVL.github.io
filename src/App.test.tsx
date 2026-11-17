import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { experience, profile, projects } from './data'

afterEach(() => {
  delete document.documentElement.dataset.theme
  localStorage.clear()
})

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
    for (const job of experience) {
      expect(
        within(section).getByRole('heading', { name: new RegExp(job.company) }),
      ).toBeInTheDocument()
    }
  })

  it('lists every project and expands its details', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Projects' })
    const buttons = within(section).getAllByRole('button', { expanded: false })
    expect(within(section).getAllByRole('heading', { level: 3 })).toHaveLength(projects.length)
    expect(within(section).getByRole('button', { name: new RegExp(projects[0].title) })).toHaveAttribute(
      'aria-expanded',
      'true',
    )

    const second = within(section).getByRole('button', { name: new RegExp(projects[1].title) })
    fireEvent.click(second)
    expect(second).toHaveAttribute('aria-expanded', 'true')
    expect(buttons.length).toBe(projects.length - 1)

    fireEvent.click(within(section).getByRole('button', { name: 'Expand all +' }))
    expect(within(section).getByRole('button', { name: 'Collapse all −' })).toBeInTheDocument()
  })

  it('has a skip link to the main content', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main')
  })
})

describe('theme toggle', () => {
  it('switches between dark and light and remembers the choice', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }))

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument()
  })
})

describe('mobile menu', () => {
  it('opens with the button and closes with Escape', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: 'Open menu' })
    expect(button).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(button).toHaveAccessibleName('Close menu')

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveFocus()
  })
})

describe('command menu', () => {
  it('opens with Ctrl+K and filters commands', () => {
    render(<App />)
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true })

    const input = screen.getByRole('combobox', { name: 'Search commands' })
    fireEvent.change(input, { target: { value: 'git' } })

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(1)
    expect(options[0]).toHaveTextContent('GitHub')
  })

  it('moves the selection with the arrow keys and runs it with Enter', () => {
    render(<App />)
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true })

    const input = screen.getByRole('combobox', { name: 'Search commands' })
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(screen.getByRole('option', { name: 'Experience' })).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(input, { key: 'Enter' })
    expect(window.location.hash).toBe('#experience')
  })
})

describe('skills filter', () => {
  it('shows only the selected group', () => {
    render(<App />)
    const section = screen.getByRole('region', { name: 'Skills' })
    const tools = within(section).getByRole('button', { name: 'Tools' })

    fireEvent.click(tools)

    expect(tools).toHaveAttribute('aria-pressed', 'true')
    expect(within(section).getByText('Docker')).toBeInTheDocument()
    expect(within(section).queryByText('Material UI')).not.toBeInTheDocument()
    expect(within(section).getByText(/skills in Tools/)).toBeInTheDocument()
  })
})

describe('copy email', () => {
  it('copies the email and confirms it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })

    render(<App />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Copy email' }))
    })

    expect(writeText).toHaveBeenCalledWith(profile.email)
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Email copied to clipboard')
  })
})
