import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { education, languages } from '../data'
import { Section } from './Section'

export const Education = () => {
  return (
    <Section id="education" title="Education and languages">
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        <Card variant="outlined" className="spot" data-reveal>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="overline" sx={{ color: 'text.subtle' }}>
              Education
            </Typography>
            <Typography variant="h3" sx={{ fontSize: '1.3rem' }}>
              {education.degree}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              {education.school}, {education.year}
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className="spot" data-reveal>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="overline" sx={{ color: 'text.subtle' }}>
              Languages
            </Typography>
            <Stack spacing={1.25} sx={{ mt: 1 }}>
              {languages.map((language) => (
                <div key={language.name}>
                  <Typography sx={{ fontWeight: 650 }}>{language.name}</Typography>
                  <Typography sx={{ color: 'text.subtle' }}>{language.level}</Typography>
                </div>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Section>
  )
}
