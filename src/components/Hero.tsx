import type { CSSProperties } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { highlights, profile } from '../data'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export const Hero = () => {
  return (
    <Box
      component="section"
      id="top"
      aria-labelledby="hero-title"
      sx={{ position: 'relative', overflow: 'hidden', py: { xs: 8, md: 12 } }}
    >
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <Box
          sx={{
            position: 'absolute',
            width: { xs: 260, md: 460 },
            height: { xs: 260, md: 460 },
            borderRadius: '50%',
            filter: 'blur(80px)',
            bgcolor: 'primary.main',
            opacity: 0.35,
            top: '-12%',
            left: '-8%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: { xs: 220, md: 380 },
            height: { xs: 220, md: 380 },
            borderRadius: '50%',
            filter: 'blur(80px)',
            bgcolor: 'secondary.main',
            opacity: 0.45,
            top: '8%',
            right: '-10%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: { xs: 180, md: 320 },
            height: { xs: 180, md: 320 },
            borderRadius: '50%',
            filter: 'blur(80px)',
            bgcolor: '#f472b6',
            opacity: 0.28,
            bottom: '-30%',
            left: '30%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: (theme) => {
              const line = theme.palette.mode === 'dark' ? 'rgb(255 255 255 / 0.05)' : 'rgb(17 19 27 / 0.05)'
              return `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`
            },
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, #000 30%, transparent 75%)',
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {profile.availability && (
          <Chip
            data-reveal
            label={profile.availability}
            variant="outlined"
            icon={
              <Box
                sx={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  bgcolor: '#22c55e',
                  boxShadow: '0 0 0 4px rgb(34 197 94 / 0.18)',
                }}
              />
            }
            sx={{
              mb: 3,
              height: 34,
              px: 0.5,
              color: 'text.secondary',
              borderColor: 'divider',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgb(255 255 255 / 0.035)' : 'rgb(255 255 255 / 0.72)',
              '& .MuiChip-icon': { ml: 1 },
            }}
          />
        )}

        <Typography
          id="hero-title"
          variant="h1"
          data-reveal
          style={delay(60)}
          sx={{ fontSize: { xs: '3rem', md: '6rem' } }}
        >
          {profile.name}
        </Typography>

        <Typography variant="h5" data-reveal style={delay(120)} sx={{ mt: 2, fontWeight: 600 }}>
          <Box
            component="span"
            sx={{
              background: (theme) =>
                `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Frontend Engineer
          </Box>
          <Box component="span" sx={{ color: 'text.secondary' }}>
            {' '}
            · React, TypeScript
          </Box>
        </Typography>

        <Typography
          data-reveal
          style={delay(180)}
          color="text.secondary"
          sx={{ mt: 2.5, maxWidth: 760, fontSize: '1.05rem' }}
        >
          {profile.summary}
        </Typography>

        <Stack
          component="ul"
          aria-label="Links"
          data-reveal
          style={delay(240)}
          direction="row"
          useFlexGap
          sx={{ flexWrap: 'wrap', gap: 1.25, mt: 4, p: 0, listStyle: 'none' }}
        >
          <li>
            <Button variant="contained" href={`mailto:${profile.email}`} startIcon={<EmailOutlinedIcon />}>
              Email me
            </Button>
          </li>
          <li>
            <Button
              variant="outlined"
              color="inherit"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              endIcon={<OpenInNewIcon />}
            >
              LinkedIn
            </Button>
          </li>
          <li>
            <Button
              variant="outlined"
              color="inherit"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              endIcon={<OpenInNewIcon />}
            >
              GitHub
            </Button>
          </li>
          <li>
            <Button
              variant="outlined"
              color="inherit"
              href={profile.cvPath}
              target="_blank"
              rel="noreferrer"
              startIcon={<DownloadOutlinedIcon />}
              sx={{ bgcolor: 'transparent', borderColor: 'divider' }}
            >
              Download CV (PDF)
            </Button>
          </li>
        </Stack>

        <Box
          component="ul"
          aria-label="Highlights"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 2,
            mt: { xs: 6, md: 8 },
            p: 0,
            listStyle: 'none',
          }}
        >
          {highlights.map((item, index) => (
            <Paper
              key={item.label}
              component="li"
              variant="outlined"
              className="spot"
              data-reveal
              style={delay(300 + index * 80)}
              sx={{
                p: 2.5,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgb(255 255 255 / 0.035)' : 'rgb(255 255 255 / 0.72)',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {item.value}
              </Typography>
              <Typography color="text.secondary">{item.label}</Typography>
            </Paper>
          ))}
        </Box>

        <Typography data-reveal style={delay(540)} variant="body2" sx={{ mt: 3, color: 'text.subtle' }}>
          {profile.note}
        </Typography>
      </Container>
    </Box>
  )
}
