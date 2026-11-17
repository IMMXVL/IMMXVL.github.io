import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { profile } from '../data'
import { mono } from '../theme'

type ContactProps = {
  copied: boolean
  onCopy: () => void
}

export const Contact = ({ copied, onCopy }: ContactProps) => {
  return (
    <Box
      component="section"
      id="contact"
      aria-labelledby="contact-title"
      sx={{ py: { xs: 10, md: 16 }, borderTop: 1, borderColor: 'divider', overflow: 'hidden' }}
    >
      <Container maxWidth="lg">
        <Typography
          aria-hidden="true"
          data-reveal
          sx={{ fontFamily: mono, fontSize: '0.8rem', color: 'primary.main', mb: 3 }}
        >
          (05) Contact
        </Typography>

        <Typography
          id="contact-title"
          variant="h2"
          data-reveal
          sx={{ fontSize: { xs: '2.75rem', sm: '4rem', md: '6rem' }, lineHeight: 0.95, letterSpacing: '-0.055em' }}
        >
          Have a role in mind?{' '}
          <Box component="br" sx={{ display: { xs: 'none', md: 'block' } }} />
          <Box component="span" className="lets-talk" sx={{ color: 'primary.main' }}>
            Let’s talk.
          </Box>
        </Typography>

        <Box
          data-reveal
          sx={{
            mt: { xs: 6, md: 9 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 7fr) minmax(0, 5fr)' },
            gap: { xs: 4, md: 6 },
            alignItems: 'end',
          }}
        >
          <div>
            <Typography sx={{ fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', color: 'text.subtle', mb: 1.5 }}>
              EMAIL
            </Typography>
            <Link
              href={`mailto:${profile.email}`}
              underline="none"
              className="arrow-link"
              sx={{
                display: 'inline-flex',
                alignItems: 'baseline',
                gap: '0.3em',
                color: 'text.primary',
                fontSize: { xs: '1.6rem', sm: '2.25rem', md: '3rem' },
                fontWeight: 600,
                letterSpacing: '-0.04em',
                overflowWrap: 'anywhere',
                backgroundImage: (theme) => `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.main})`,
                backgroundSize: '0% 2px',
                backgroundPosition: '0 100%',
                backgroundRepeat: 'no-repeat',
                transition: 'background-size .5s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover, &:focus-visible': { backgroundSize: '100% 2px' },
              }}
            >
              {profile.email}
              <Box component="span" className="arrow" aria-hidden="true" sx={{ color: 'primary.main' }}>
                ↗
              </Box>
            </Link>
          </div>

          <div>
            <Typography color="text.secondary" sx={{ maxWidth: '44ch' }}>
              Open to frontend roles with React and TypeScript. The easiest way to reach me is by email.
            </Typography>
            <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1, mt: 3 }}>
              <Button variant="contained" href={`mailto:${profile.email}`}>
                Write an email
              </Button>
              <Button
                variant="outlined"
                startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                onClick={onCopy}
              >
                {copied ? 'Copied' : 'Copy email'}
              </Button>
            </Stack>
          </div>
        </Box>

        <Box
          component="p"
          role="status"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '1px',
            height: '1px',
            m: '-1px',
            p: 0,
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          {copied ? 'Email copied to clipboard' : ''}
        </Box>
      </Container>
    </Box>
  )
}
