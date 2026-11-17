import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { cases } from '../data'
import { mono } from '../theme'
import { BulletList } from './BulletList'
import { MonoLabel } from './MonoLabel'
import { Section } from './Section'

const pad = (value: number) => String(value).padStart(2, '0')

export const Work = () => {
  return (
    <Section
      id="work"
      index="02"
      title="Selected work"
      intro="Case studies without client names or code. Details are shared on request."
    >
      <Box sx={{ display: 'grid', gap: { xs: 2, md: 2.5 } }}>
        {cases.map((item, index) => (
          <Box
            key={item.title}
            component="article"
            data-reveal
            sx={{
              p: { xs: 3, md: 4.5 },
              borderRadius: 4,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              transition: 'border-color .3s',
              '&:hover': { borderColor: (theme) => theme.palette.text.subtle },
            }}
          >
            <Typography sx={{ fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em' }}>
              <Box component="span" sx={{ color: 'primary.main' }}>
                CASE {pad(index + 1)}
              </Box>
              <Box component="span" sx={{ color: 'text.subtle' }}>
                {' '}
                / {pad(cases.length)}
              </Box>
            </Typography>

            <Typography variant="h3" sx={{ mt: 2, fontSize: { xs: '1.6rem', md: '2.25rem' }, maxWidth: '24ch' }}>
              {item.title}
            </Typography>
            <Typography sx={{ mt: 1.5, color: 'text.secondary' }}>{item.context}</Typography>

            <Box
              sx={{
                mt: { xs: 3.5, md: 4.5 },
                pt: { xs: 3, md: 3.5 },
                borderTop: 1,
                borderColor: 'divider',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
                gap: { xs: 3, md: 4 },
              }}
            >
              <div>
                <MonoLabel sx={{ mb: 1 }}>Problem</MonoLabel>
                <Typography color="text.secondary">{item.problem}</Typography>
              </div>
              <div>
                <MonoLabel sx={{ mb: 1 }}>My role</MonoLabel>
                <Typography color="text.secondary">{item.role}</Typography>
              </div>
              <div>
                <MonoLabel sx={{ mb: 1 }}>Decisions</MonoLabel>
                <BulletList items={item.decisions} />
              </div>
            </Box>

            <Box
              sx={{
                mt: { xs: 3.5, md: 4 },
                p: { xs: 2, md: 2.5 },
                borderRadius: 3,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgb(255 107 44 / 0.08)' : 'rgb(226 71 12 / 0.06)',
                border: 1,
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgb(255 107 44 / 0.22)' : 'rgb(226 71 12 / 0.2)',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { sm: 'baseline' },
                gap: { xs: 0.75, sm: 2.5 },
              }}
            >
              <MonoLabel sx={{ color: 'primary.main', flexShrink: 0 }}>Outcome →</MonoLabel>
              <Typography sx={{ fontWeight: 500, fontSize: '1.05rem', letterSpacing: '-0.015em' }}>
                {item.outcome}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Section>
  )
}
