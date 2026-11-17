import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { education, languages } from '../data'
import { mono } from '../theme'
import { MonoLabel } from './MonoLabel'
import { Section } from './Section'

export const Education = () => {
  return (
    <Section id="education" index="04" title="Education and languages">
      <Box
        data-reveal
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          gap: '1px',
          bgcolor: 'divider',
          border: 1,
          borderColor: 'divider',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ bgcolor: 'background.default', p: { xs: 3, md: 4 } }}>
          <MonoLabel>Education</MonoLabel>
          <Typography variant="h3" sx={{ mt: 2, fontSize: '1.4rem' }}>
            {education.degree}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            {education.school}
          </Typography>
          <Typography sx={{ mt: 3, fontFamily: mono, fontSize: '0.8rem', color: 'text.subtle' }}>
            {education.year}
          </Typography>
        </Box>
        <Box sx={{ bgcolor: 'background.default', p: { xs: 3, md: 4 } }}>
          <MonoLabel>Languages</MonoLabel>
          <Box component="dl" sx={{ m: 0, mt: 2, display: 'grid', gap: 2 }}>
            {languages.map((language) => (
              <Box key={language.name} sx={{ pb: 2, borderBottom: 1, borderColor: 'divider', '&:last-of-type': { pb: 0, borderBottom: 0 } }}>
                <Typography component="dt" sx={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
                  {language.name}
                </Typography>
                <Typography component="dd" sx={{ m: 0, mt: 0.25, color: 'text.secondary' }}>
                  {language.level}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Section>
  )
}
