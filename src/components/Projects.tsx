import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { projects } from '../data'
import { mono } from '../theme'
import { BulletList } from './BulletList'
import { MonoLabel } from './MonoLabel'
import { Section } from './Section'

const pad = (value: number) => String(value).padStart(2, '0')

export const Projects = () => {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]))
  const allOpen = open.size === projects.length

  const toggle = (index: number) => {
    setOpen((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const toggleAll = () => {
    setOpen(allOpen ? new Set() : new Set(projects.map((_, index) => index)))
  }

  return (
    <Section
      id="projects"
      index="02"
      title="Projects"
      intro="Everything I have worked on since 2021, newest first. Products are described without client names."
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 2,
          pb: 2,
          fontFamily: mono,
          fontSize: '0.75rem',
          color: 'text.subtle',
        }}
      >
        <span>{projects.length} projects · 2021 – 2026</span>
        <ButtonBase
          onClick={toggleAll}
          sx={{
            font: 'inherit',
            color: 'text.secondary',
            borderRadius: 1,
            px: 0.5,
            '&:hover': { color: 'text.primary' },
          }}
        >
          {allOpen ? 'Collapse all −' : 'Expand all +'}
        </ButtonBase>
      </Box>

      <Box
        component="ol"
        sx={{
          m: 0,
          p: 0,
          listStyle: 'none',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        {projects.map((project, index) => {
          const expanded = open.has(index)
          const panelId = `project-panel-${index}`
          const buttonId = `project-button-${index}`

          return (
            <Box
              key={project.title}
              component="li"
              data-reveal
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: -1,
                  height: '1px',
                  width: expanded ? '100%' : 0,
                  bgcolor: 'primary.main',
                  transition: 'width .6s cubic-bezier(0.16, 1, 0.3, 1)',
                },
              }}
            >
              <Typography variant="h3" sx={{ m: 0, fontSize: 'inherit' }}>
                <ButtonBase
                  id={buttonId}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '2rem minmax(0, 1fr) 1.5rem',
                      md: '2.5rem minmax(0, 9.5rem) minmax(0, 1fr) auto 1.5rem',
                    },
                    alignItems: 'baseline',
                    columnGap: { xs: 1.5, md: 2.5 },
                    rowGap: 0.75,
                    py: { xs: 2.25, md: 2.75 },
                    textAlign: 'left',
                    font: 'inherit',
                    color: 'text.primary',
                    '&:hover .project-title': { transform: 'translateX(4px)' },
                    '&:hover .project-index': { color: 'primary.main' },
                  }}
                >
                  <Box
                    component="span"
                    aria-hidden="true"
                    className="project-index"
                    sx={{
                      fontFamily: mono,
                      fontSize: '0.75rem',
                      color: expanded ? 'primary.main' : 'text.subtle',
                      transition: 'color .2s',
                    }}
                  >
                    {pad(index + 1)}
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      fontFamily: mono,
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                      gridColumn: { xs: 2, md: 'auto' },
                      gridRow: { xs: 2, md: 'auto' },
                    }}
                  >
                    {project.period}
                    <Box
                      component="span"
                      aria-hidden="true"
                      sx={{ display: { md: 'none' }, color: 'text.subtle' }}
                    >
                      {' '}
                      · {project.type}
                    </Box>
                  </Box>
                  <Box
                    component="span"
                    className="project-title"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '1.1rem', md: '1.3rem' },
                      letterSpacing: '-0.02em',
                      lineHeight: 1.25,
                      transition: 'transform .3s cubic-bezier(0.16, 1, 0.3, 1)',
                      gridColumn: { xs: 2, md: 'auto' },
                      gridRow: { xs: 1, md: 'auto' },
                    }}
                  >
                    {project.title}
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      display: { xs: 'none', md: 'inline-block' },
                      fontFamily: mono,
                      fontSize: '0.7rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'text.subtle',
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 999,
                      px: 1.25,
                      py: 0.25,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {project.type}
                  </Box>
                  <Box
                    component="span"
                    aria-hidden="true"
                    sx={{
                      gridColumn: { xs: 3, md: 'auto' },
                      gridRow: { xs: 1, md: 'auto' },
                      justifySelf: 'end',
                      fontFamily: mono,
                      fontSize: '1.1rem',
                      lineHeight: 1,
                      color: expanded ? 'primary.main' : 'text.secondary',
                      transform: expanded ? 'rotate(45deg)' : 'none',
                      transition:
                        'transform .3s cubic-bezier(0.16, 1, 0.3, 1), color .2s',
                    }}
                  >
                    +
                  </Box>
                </ButtonBase>
              </Typography>

              <Collapse in={expanded} timeout={350}>
                <Box
                  id={panelId}
                  sx={{
                    pb: { xs: 3, md: 3.5 },
                    pl: {
                      xs: 'calc(2rem + 12px)',
                      md: 'calc(2.5rem + 20px + 9.5rem + 20px)',
                    },
                    pr: { md: '3.5rem' },
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      md: 'minmax(0, 1fr) minmax(0, 1fr)',
                    },
                    gap: { xs: 2.5, md: 4 },
                  }}
                >
                  <div>
                    <MonoLabel sx={{ mb: 1 }}>About</MonoLabel>
                    <Typography color="text.secondary">
                      {project.about}
                    </Typography>
                    {project.stack.length > 0 && (
                      <>
                        <MonoLabel sx={{ mt: 2.5, mb: 1 }}>Stack</MonoLabel>
                        <Stack
                          component="ul"
                          direction="row"
                          useFlexGap
                          sx={{
                            flexWrap: 'wrap',
                            gap: 0.75,
                            m: 0,
                            p: 0,
                            listStyle: 'none',
                          }}
                        >
                          {project.stack.map((item) => (
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
                      </>
                    )}
                  </div>
                  <div>
                    <MonoLabel sx={{ mb: 1 }}>What I did</MonoLabel>
                    <BulletList items={project.did} />
                  </div>
                </Box>
              </Collapse>
            </Box>
          )
        })}
      </Box>
    </Section>
  )
}
