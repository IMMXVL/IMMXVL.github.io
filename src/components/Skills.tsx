import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { skillGroups } from '../data'
import { Section } from './Section'

const ALL = 'All'

export const Skills = () => {
  const [filter, setFilter] = useState(ALL)
  const filters = [ALL, ...skillGroups.map((group) => group.label)]
  const visibleGroups =
    filter === ALL ? skillGroups : skillGroups.filter((group) => group.label === filter)
  const total = visibleGroups.reduce((sum, group) => sum + group.items.length, 0)

  return (
    <Section id="skills" title="Skills">
      <Stack
        direction="row"
        useFlexGap
        role="group"
        aria-label="Filter skills"
        data-reveal
        sx={{ flexWrap: 'wrap', gap: 1 }}
      >
        {filters.map((label) => (
          <Button
            key={label}
            type="button"
            aria-pressed={filter === label}
            variant={filter === label ? 'contained' : 'outlined'}
            color={filter === label ? 'primary' : 'inherit'}
            onClick={() => setFilter(label)}
            sx={{ color: filter === label ? undefined : 'text.secondary' }}
          >
            {label}
          </Button>
        ))}
      </Stack>

      <Typography aria-live="polite" color="text.secondary" sx={{ my: 2 }}>
        {total} {total === 1 ? 'skill' : 'skills'}
        {filter !== ALL && ` in ${filter}`}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 17rem), 1fr))',
        }}
      >
        {visibleGroups.map((group) => (
          <Card key={group.label} variant="outlined" className="spot">
            <CardContent>
              <Typography variant="h3" sx={{ fontSize: '1.05rem', mb: 1.5 }}>
                {group.label}
              </Typography>
              <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                {group.items.map((item) => (
                  <Chip key={item} label={item} variant="outlined" size="small" />
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Section>
  )
}
