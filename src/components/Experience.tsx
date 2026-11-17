import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { experience } from '../data'
import { mono } from '../theme'
import { BulletList } from './BulletList'
import { MonoLabel } from './MonoLabel'
import { Section } from './Section'

export const Experience = () => {
  return (
    <Section id="experience" index="01" title="Experience">
      <Box component="ol" sx={{ m: 0, p: 0, listStyle: 'none' }}>
        {experience.map((job) => {
          return (
            <Box
              key={`${job.company}-${job.period}`}
              component="li"
              data-reveal
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 3fr) minmax(0, 6fr)' },
                gap: { xs: 2, sm: 4 },
                py: { xs: 0, md: 0.5 },
              }}
            >
              <Box>
                <Typography sx={{ fontFamily: mono, fontSize: '0.8rem', color: 'text.secondary' }}>
                  {job.period}
                </Typography>
                <Typography sx={{ fontFamily: mono, fontSize: '0.8rem', color: 'text.subtle', mt: 0.5 }}>
                  {job.place}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.85rem' } }}>
                  {job.role}{' '}
                  <Box component="span" sx={{ color: 'text.subtle' }}>
                    · {job.company}
                  </Box>
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <BulletList items={job.bullets} />
                </Box>

                <MonoLabel sx={{ mt: 4, mb: 1.25 }}>Stack</MonoLabel>
                <Stack component="ul" direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 0.75, m: 0, p: 0, listStyle: 'none' }}>
                  {job.stack.map((item) => (
                    <Box
                      key={item}
                      component="li"
                      sx={{
                        px: 1.25,
                        py: 0.5,
                        borderRadius: 1.5,
                        bgcolor: 'background.paper',
                        border: 1,
                        borderColor: 'divider',
                        fontSize: '0.8rem',
                        color: 'text.secondary',
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Section>
  )
}
