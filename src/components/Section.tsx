import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { mono } from '../theme'

type SectionProps = {
  id: string
  index: string
  title: string
  intro?: string
  children: ReactNode
}

export const Section = ({ id, index, title, intro, children }: SectionProps) => {
  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={`${id}-title`}
      sx={{ py: { xs: 9, md: 14 }, borderTop: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 3fr) minmax(0, 9fr)' },
            columnGap: 6,
            rowGap: 4,
          }}
        >
          <Box sx={{ position: { md: 'sticky' }, top: { md: '6.5rem' }, alignSelf: 'start' }}>
            <Typography
              aria-hidden="true"
              data-reveal
              sx={{ fontFamily: mono, fontSize: '0.8rem', color: 'primary.main', mb: 1.5 }}
            >
              ({index})
            </Typography>
            <Typography
              id={`${id}-title`}
              variant="h2"
              data-reveal
              sx={{ fontSize: { xs: '2.25rem', md: '2.6rem' } }}
            >
              {title}
            </Typography>
            {intro && (
              <Typography
                data-reveal
                variant="body2"
                sx={{ mt: 2, color: 'text.secondary', maxWidth: 320 }}
              >
                {intro}
              </Typography>
            )}
          </Box>
          <Box sx={{ minWidth: 0 }}>{children}</Box>
        </Box>
      </Container>
    </Box>
  )
}
