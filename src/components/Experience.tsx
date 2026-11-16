import type { CSSProperties } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { experience } from '../data'
import { BulletList } from './BulletList'
import { Section } from './Section'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export const Experience = () => {
  return (
    <Section id="experience" title="Experience">
      <Box
        component="ol"
        sx={{
          position: 'relative',
          display: 'grid',
          gap: '1.25rem',
          m: 0,
          p: 0,
          listStyle: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: { xs: '0.4rem', sm: '0.55rem' },
            top: '0.5rem',
            bottom: '0.5rem',
            width: '2px',
            opacity: 0.6,
            background: (theme) =>
              `linear-gradient(${theme.palette.primary.main}, ${theme.palette.secondary.main} 60%, transparent)`,
          },
        }}
      >
        {experience.map((job, index) => {
          const isCurrent = job.period.includes('Present')
          return (
            <Box
              key={`${job.company}-${job.period}`}
              component="li"
              data-reveal
              style={delay(index * 90)}
              sx={{ position: 'relative', pl: { xs: '1.9rem', sm: '2.5rem' } }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  left: { xs: '-0.05rem', sm: '0.1rem' },
                  top: '1.75rem',
                  width: '1.05rem',
                  height: '1.05rem',
                  borderRadius: '50%',
                  boxSizing: 'border-box',
                  bgcolor: isCurrent ? 'transparent' : 'background.default',
                  background: (theme) =>
                    isCurrent
                      ? `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                      : undefined,
                  border: isCurrent ? 0 : '2px solid',
                  borderColor: 'primary.main',
                  boxShadow: (theme) =>
                    isCurrent ? `0 0 0 6px ${alpha(theme.palette.primary.main, 0.18)}` : 'none',
                }}
              />
              <Card variant="outlined" className="spot">
                <CardContent sx={{ p: { xs: 2.5, md: 3.5 }, '&:last-child': { pb: { xs: 2.5, md: 3.5 } } }}>
                  <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                      {job.role} · {job.company}
                    </Typography>
                    {isCurrent && (
                      <Chip
                        label="Current"
                        size="small"
                        sx={{
                          height: 24,
                          color: (theme) => (theme.palette.mode === 'dark' ? '#c4b5fd' : '#5124c9'),
                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
                          border: '1px solid',
                          borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                        }}
                      />
                    )}
                  </Stack>
                  <Typography sx={{ mt: 0.75, mb: 2, color: 'text.subtle' }}>
                    {job.period} · {job.place}
                  </Typography>
                  <BulletList items={job.bullets} />
                </CardContent>
              </Card>
            </Box>
          )
        })}
      </Box>
    </Section>
  )
}
