import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { skillGroups } from '../data'
import { mono } from '../theme'
import { Section } from './Section'

const ALL = 'All'

export const Skills = () => {
  const [filter, setFilter] = useState(ALL)
  const filters = [ALL, ...skillGroups.map((group) => group.label)]
  const visibleGroups =
    filter === ALL ? skillGroups : skillGroups.filter((group) => group.label === filter)
  const total = visibleGroups.reduce((sum, group) => sum + group.items.length, 0)

  return (
    <Section id="skills" index="03" title="Skills">
      <Box
        role="group"
        aria-label="Filter skills"
        data-reveal
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.5,
          p: 0.5,
          borderRadius: 3,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          width: 'fit-content',
          maxWidth: '100%',
        }}
      >
        {filters.map((label) => {
          const pressed = filter === label
          return (
            <ButtonBase
              key={label}
              type="button"
              aria-pressed={pressed}
              onClick={() => setFilter(label)}
              sx={{
                px: 1.5,
                py: 0.85,
                borderRadius: 2,
                fontSize: '0.85rem',
                fontWeight: 500,
                color: pressed ? 'background.default' : 'text.secondary',
                bgcolor: pressed ? 'text.primary' : 'transparent',
                transition: 'background-color .2s, color .2s',
                '&:hover': { color: pressed ? 'background.default' : 'text.primary' },
              }}
            >
              {label}
            </ButtonBase>
          )
        })}
      </Box>

      <Typography
        aria-live="polite"
        sx={{ fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', color: 'text.subtle', my: 3 }}
      >
        {total} {total === 1 ? 'skill' : 'skills'}
        {filter !== ALL && ` in ${filter}`}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: visibleGroups.length % 2 === 0 ? 'repeat(2, minmax(0, 1fr))' : '1fr',
          },
          gap: '1px',
          bgcolor: 'divider',
          border: 1,
          borderColor: 'divider',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {visibleGroups.map((group) => (
          <Box key={group.label} sx={{ bgcolor: 'background.default', p: { xs: 2.5, md: 3 } }}>
            <Typography
              variant="h3"
              sx={{ fontSize: '1rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', gap: 2 }}
            >
              {group.label}
              <Box
                component="span"
                aria-hidden="true"
                sx={{ fontFamily: mono, fontSize: '0.75rem', fontWeight: 400, color: 'text.subtle' }}
              >
                {String(group.items.length).padStart(2, '0')}
              </Box>
            </Typography>
            <Box
              component="ul"
              sx={{ m: 0, mt: 2, p: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 0.75 }}
            >
              {group.items.map((item) => (
                <Box
                  key={item}
                  component="li"
                  sx={{
                    px: 1.25,
                    py: 0.5,
                    borderRadius: 1.5,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    fontSize: '0.85rem',
                    color: 'text.secondary',
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Section>
  )
}
