import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { profile } from '../data'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'

export const Contact = () => {
  const { copied, copy } = useCopyToClipboard()

  return (
    <Box
      component="section"
      id="contact"
      aria-labelledby="contact-title"
      sx={{ py: { xs: 8, md: 11 }, borderTop: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="lg">
        <Card
          className="spot"
          data-reveal
          sx={{
            position: 'relative',
            textAlign: 'center',
            border: '1px solid transparent',
            borderRadius: '34px',
            background: (theme) =>
              `linear-gradient(${theme.palette.background.paper}, ${theme.palette.background.paper}) padding-box, linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}) border-box`,
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: '-40% 10% auto',
              height: '80%',
              zIndex: 0,
              background: (theme) =>
                `radial-gradient(closest-side, color-mix(in srgb, ${theme.palette.primary.main} 22%, transparent), transparent)`,
              filter: 'blur(30px)',
              pointerEvents: 'none',
            },
          }}
        >
          <CardContent sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, md: 6 }, py: { xs: 5, md: 8 } }}>
            <Typography
              id="contact-title"
              variant="h2"
              sx={{ fontSize: { xs: '2.2rem', md: '3.75rem' } }}
            >
              Contact
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: '52ch', mx: 'auto', mt: 2 }}>
              Open to frontend roles with React and TypeScript. The easiest way to reach me is by email.
            </Typography>
            <Typography
              sx={{
                mt: 3,
                fontFamily: "'Space Grotesk Variable', sans-serif",
                fontWeight: 600,
                fontSize: { xs: '1.2rem', md: '1.75rem' },
                overflowWrap: 'anywhere',
              }}
            >
              <Link
                href={`mailto:${profile.email}`}
                underline="none"
                sx={{
                  color: 'text.primary',
                  backgroundImage: (theme) =>
                    `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundSize: '100% 2px',
                  backgroundPosition: '0 100%',
                  backgroundRepeat: 'no-repeat',
                  pb: '0.15rem',
                }}
              >
                {profile.email}
              </Link>
            </Typography>
            <Stack
              direction="row"
              useFlexGap
              sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1.25, mt: 4 }}
            >
              <Button variant="contained" href={`mailto:${profile.email}`} startIcon={<EmailOutlinedIcon />}>
                Write an email
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                onClick={() => copy(profile.email)}
              >
                {copied ? 'Copied' : 'Copy email'}
              </Button>
            </Stack>
            <Box
              component="p"
              role="status"
              sx={{
                position: 'absolute',
                width: 1,
                height: 1,
                overflow: 'hidden',
                clip: 'rect(0 0 0 0)',
              }}
            >
              {copied ? 'Email copied to clipboard' : ''}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
