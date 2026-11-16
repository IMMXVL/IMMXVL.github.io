import type { CSSProperties } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { cases } from '../data'
import { BulletList } from './BulletList'
import { Section } from './Section'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

export const Work = () => {
  return (
    <Section
      id="work"
      title="Selected work"
      intro="Case studies without client names or code. Details are shared on request."
    >
      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        }}
      >
        {cases.map((item, index) => (
          <Card
            key={item.title}
            variant="outlined"
            className="spot"
            data-reveal
            style={delay(index * 90)}
            sx={{ gridColumn: index === 0 ? { md: '1 / -1' } : undefined }}
          >
            <CardContent sx={{ p: { xs: 2.5, md: 3.5 }, '&:last-child': { pb: { xs: 2.5, md: 3.5 } } }}>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.3rem', md: '1.55rem' } }}>
                {item.title}
              </Typography>
              <Typography sx={{ mt: 0.75, mb: 2.5, color: 'text.subtle' }}>
                {item.context}
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: index === 0 ? { md: '1fr 1fr' } : '1fr',
                }}
              >
                <div>
                  <Typography variant="overline" sx={{ color: 'text.subtle' }}>
                    Problem
                  </Typography>
                  <Typography color="text.secondary">{item.problem}</Typography>
                </div>
                <div>
                  <Typography variant="overline" sx={{ color: 'text.subtle' }}>
                    My role
                  </Typography>
                  <Typography color="text.secondary">{item.role}</Typography>
                </div>
                <Box sx={{ gridColumn: index === 0 ? { md: '1 / -1' } : undefined }}>
                  <Typography variant="overline" sx={{ color: 'text.subtle' }}>
                    Decisions
                  </Typography>
                  <BulletList items={item.decisions} />
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 2.5,
                  p: 2,
                  borderRadius: 2,
                  border: 1,
                  borderColor: 'primary.main',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                }}
              >
                <Typography variant="overline" sx={{ color: (theme) => (theme.palette.mode === 'dark' ? '#c4b5fd' : '#5124c9') }}>
                  Outcome
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>{item.outcome}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Section>
  )
}
