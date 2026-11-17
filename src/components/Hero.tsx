import type { CSSProperties } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import { highlights, profile } from '../data'
import { useLocalTime } from '../hooks/useLocalTime'
import { mono } from '../theme'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

const metaSx = {
  fontFamily: mono,
  fontSize: '0.75rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'text.subtle',
} as const

const LocalTime = () => {
  const time = useLocalTime(profile.timeZone)
  return (
    <Box component="span" sx={{ color: 'text.secondary' }}>
      <time>{time}</time> local
    </Box>
  )
}

export const Hero = () => {
  const [first, ...rest] = profile.name.split(' ')

  return (
    <Box
      component="section"
      id="top"
      aria-label="About"
      sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 8 }, overflow: 'hidden' }}
    >
      <Container maxWidth="lg">
        <Box
          className="fade-in"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
            gap: 1.5,
            pb: 2,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography sx={metaSx}>Frontend Engineer</Typography>
          <Typography sx={[metaSx, { textAlign: { sm: 'center' } }]}>
            {profile.location} · <LocalTime />
          </Typography>
          {profile.availability && (
            <Typography
              sx={[
                metaSx,
                {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  justifyContent: { sm: 'flex-end' },
                  color: 'text.secondary',
                },
              ]}
            >
              <span className="pulse" aria-hidden="true" />
              {profile.availability}
            </Typography>
          )}
        </Box>

        <Typography
          id="hero-title"
          variant="h1"
          sx={{
            mt: { xs: 5, md: 7 },
            ml: '-0.04em',
            fontSize: { xs: 'clamp(3.75rem, 19vw, 6rem)', md: 'clamp(6rem, 15vw, 12.5rem)' },
          }}
        >
          <span className="rise">
            <span style={delay(80)}>{first}</span>
          </span>{' '}
          <span className="rise">
            <span style={delay(180)}>
              {rest.join(' ')}
              <Box component="span" aria-hidden="true" sx={{ color: 'primary.main' }}>
                .
              </Box>
            </span>
          </span>
        </Typography>

        <Box
          sx={{
            mt: { xs: 5, md: 8 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
            gap: { xs: 3, md: 4 },
          }}
        >
          <Typography
            className="fade-in"
            style={delay(450)}
            sx={{
              gridColumn: { md: 'span 5' },
              fontSize: { xs: '1.5rem', md: '1.9rem' },
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 1.2,
            }}
          >
            {profile.tagline}
          </Typography>

          <Box className="fade-in" style={delay(550)} sx={{ gridColumn: { md: '7 / span 6' } }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.02rem' }}>{profile.summary}</Typography>

            <Stack
              component="ul"
              aria-label="Links"
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap', gap: 1, mt: 3.5, p: 0, listStyle: 'none' }}
            >
              <li>
                <Button
                  variant="contained"
                  href={`mailto:${profile.email}`}
                  endIcon={<ArrowForwardIcon />}
                  className="arrow-link"
                >
                  Email me
                </Button>
              </li>
              <li>
                <Button variant="outlined" href={profile.linkedin} target="_blank" rel="noreferrer" endIcon={<NorthEastIcon />}>
                  LinkedIn
                </Button>
              </li>
              <li>
                <Button variant="outlined" href={profile.github} target="_blank" rel="noreferrer" endIcon={<NorthEastIcon />}>
                  GitHub
                </Button>
              </li>
              <li>
                <Button
                  variant="outlined"
                  href={profile.cvPath}
                  target="_blank"
                  rel="noreferrer"
                  startIcon={<DownloadOutlinedIcon />}
                >
                  Download CV (PDF)
                </Button>
              </li>
            </Stack>
          </Box>
        </Box>

        <Box
          component="ul"
          aria-label="Highlights"
          className="fade-in"
          style={delay(700)}
          sx={{
            mt: { xs: 6, md: 8 },
            p: 0,
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
            borderTop: 1,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          {highlights.map((item, index) => (
            <Box
              key={item.label}
              component="li"
              sx={(theme) => {
                const line = index === 0 ? 'none' : `1px solid ${theme.palette.divider}`
                return {
                  py: { xs: 3, md: 4 },
                  pl: { sm: index === 0 ? 0 : 3 },
                  borderLeft: { xs: 'none', sm: line },
                  borderTop: { xs: line, sm: 'none' },
                }
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '2.25rem', md: '3rem' },
                  fontWeight: 600,
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                }}
              >
                {item.value}
              </Typography>
              <Typography sx={[metaSx, { mt: 1.5 }]}>{item.label}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
