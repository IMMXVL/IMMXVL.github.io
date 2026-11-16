import type { CSSProperties, ReactNode } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

type SectionProps = {
  id: string
  title: string
  intro?: string
  children: ReactNode
}

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export const Section = ({ id, title, intro, children }: SectionProps) => {
  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={`${id}-title`}
      sx={{ py: { xs: 8, md: 11 }, borderTop: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="lg">
        <Typography
          id={`${id}-title`}
          variant="h2"
          data-reveal
          style={delay(0)}
          sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: intro ? 1.5 : 4 }}
        >
          {title}
        </Typography>
        {intro && (
          <Typography
            data-reveal
            color="text.secondary"
            style={delay(80)}
            sx={{ mb: 4, maxWidth: 680 }}
          >
            {intro}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  )
}
