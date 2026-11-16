import { profile } from '../data'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { CheckIcon, CopyIcon, MailIcon } from './icons'

export function Contact() {
  const { copied, copy } = useCopyToClipboard()

  return (
    <section id="contact" className="section section--last" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-card" data-reveal>
          <h2 id="contact-title">Contact</h2>
          <p className="contact-card__text">
            Open to frontend roles with React and TypeScript. The easiest way to reach me is by email.
          </p>
          <p className="contact-card__email">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <div className="contact-card__actions">
            <a className="button button--primary" href={`mailto:${profile.email}`}>
              <MailIcon />
              Write an email
            </a>
            <button type="button" className="button" onClick={() => copy(profile.email)}>
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>
          <p className="visually-hidden" role="status">
            {copied ? 'Email copied to clipboard' : ''}
          </p>
        </div>
      </div>
    </section>
  )
}
