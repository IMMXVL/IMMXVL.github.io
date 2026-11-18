import { useEffect, useMemo, useState } from 'react'
import type { User } from 'firebase/auth'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import type { Theme } from '../hooks/useTheme'
import { mono } from '../theme'
import {
  allowedEmail,
  isTrackerConfigured,
  removeApplication,
  removeInterview,
  saveApplication,
  saveInterview,
  signIn,
  signOutTracker,
  watchAuth,
  watchData,
} from './cloud'
import {
  blankApplication,
  blankInterview,
  interviewStatuses,
  isFollowUpDue,
  nextNumber,
  sources,
  statusColor,
  statuses,
  today,
  workFormats,
  type Application,
  type InterviewNote,
  type Status,
  type TrackerData,
  type WorkFormat,
} from './model'

type TrackerPageProps = {
  theme: Theme
  onToggleTheme: () => void
}

const pad = (value: number) => String(value).padStart(2, '0')

export const TrackerPage = ({ theme, onToggleTheme }: TrackerPageProps) => {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    const previous = document.title
    document.title = 'Applications'
    return () => {
      meta.remove()
      document.title = previous
    }
  }, [])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box>
            <Typography sx={{ fontFamily: mono, fontSize: '0.75rem', color: 'primary.main', mb: 1 }}>
              Private
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.6rem' } }}>
              Applications
            </Typography>
          </Box>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <Button href="#top" color="inherit" sx={{ fontFamily: mono, fontSize: '0.75rem' }}>
              Site
            </Button>
            <IconButton aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} onClick={onToggleTheme}>
              {theme === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
          </Stack>
        </Stack>
        {isTrackerConfigured ? <SignedInTracker /> : <Setup />}
      </Container>
    </Box>
  )
}

const Setup = () => (
  <Box sx={{ maxWidth: 640 }}>
    <Typography color="text.secondary">
      Records are stored in Firebase under your Google account, so the same list opens in any browser. The project
      config is not connected yet.
    </Typography>
    <Typography sx={{ mt: 2, fontFamily: mono, fontSize: '0.8rem', color: 'text.subtle' }}>
      Only {allowedEmail} can read and write the data.
    </Typography>
  </Box>
)

const SignedInTracker = () => {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)
  const [denied, setDenied] = useState(false)
  const [data, setData] = useState<TrackerData>({ applications: [], interviews: [] })
  const [error, setError] = useState('')

  useEffect(() => {
    return watchAuth((next) => {
      if (next && next.email !== allowedEmail) {
        setDenied(true)
        setUser(null)
        void signOutTracker()
        return
      }
      setDenied(false)
      setUser(next)
      setReady(true)
    })
  }, [])

  useEffect(() => {
    if (!user) return
    return watchData(user.uid, setData)
  }, [user])

  if (!ready) {
    return <Typography color="text.secondary">Loading…</Typography>
  }

  if (denied || !user) {
    return (
      <Box>
        <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 560 }}>
          {denied
            ? `Sign in with ${allowedEmail}. Other Google accounts cannot open this list.`
            : 'Sign in with Google. The list is saved to your account and stays available in every browser.'}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            void signIn().catch((error: unknown) => {
              const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : ''
              setError(code ? `Google sign-in failed: ${code}` : 'Google sign-in did not finish.')
            })
          }}
        >
          Sign in with Google
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    )
  }

  return <Board user={user} data={data} onError={setError} error={error} />
}

const Board = ({
  user,
  data,
  error,
  onError,
}: {
  user: User
  data: TrackerData
  error: string
  onError: (message: string) => void
}) => {
  const [tab, setTab] = useState(0)
  const run = async (action: Promise<void>) => {
    try {
      await action
    } catch {
      onError('Could not save. Check the connection and try again.')
    }
  }

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', gap: 2, mb: 3 }}>
        <Typography sx={{ fontFamily: mono, fontSize: '0.8rem', color: 'text.subtle' }}>{user.email}</Typography>
        <Stack direction="row" sx={{ gap: 1 }}>
          <Button color="inherit" onClick={() => download(data)} sx={{ fontFamily: mono, fontSize: '0.75rem' }}>
            Export
          </Button>
          <Button color="inherit" onClick={() => void signOutTracker()} sx={{ fontFamily: mono, fontSize: '0.75rem' }}>
            Sign out
          </Button>
        </Stack>
      </Stack>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Stats applications={data.applications} />
      <Tabs value={tab} onChange={(_event, value: number) => setTab(value)} sx={{ mt: 3, mb: 2 }}>
        <Tab label="Applications" />
        <Tab label="Interview notes" />
      </Tabs>
      {tab === 0 ? (
        <Applications
          items={data.applications}
          onSave={(item) => run(saveApplication(user.uid, item))}
          onDelete={(id) => run(removeApplication(user.uid, id))}
        />
      ) : (
        <Interviews
          items={data.interviews}
          onSave={(item) => run(saveInterview(user.uid, item))}
          onDelete={(id) => run(removeInterview(user.uid, id))}
        />
      )}
    </Box>
  )
}

const Stats = ({ applications }: { applications: Application[] }) => {
  const due = applications.filter(isFollowUpDue).length
  const cards = [
    ['Total', applications.length],
    ['Interviews', applications.filter((item) => interviewStatuses.includes(item.status)).length],
    ['Offers', applications.filter((item) => item.status === 'Offer').length],
    ['Rejections', applications.filter((item) => item.status === 'Rejected').length],
  ] as const

  return (
    <Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' }, gap: 1.5 }}>
        {cards.map(([label, value]) => (
          <Box key={label} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, px: 2, py: 1.5 }}>
            <Typography sx={{ fontFamily: mono, fontSize: '0.7rem', color: 'text.subtle' }}>{label}</Typography>
            <Typography sx={{ fontSize: '1.8rem', fontWeight: 600, letterSpacing: '-0.04em' }}>{value}</Typography>
          </Box>
        ))}
      </Box>
      {due > 0 && (
        <Typography sx={{ mt: 1.5, fontFamily: mono, fontSize: '0.8rem', color: 'primary.main' }}>
          {due} follow-up{due === 1 ? '' : 's'} due
        </Typography>
      )}
    </Box>
  )
}

const Applications = ({
  items,
  onSave,
  onDelete,
}: {
  items: Application[]
  onSave: (item: Application) => void
  onDelete: (id: string) => void
}) => {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<Status | ''>('')
  const [format, setFormat] = useState<WorkFormat | ''>('')
  const [draft, setDraft] = useState<Application | null>(null)

  const visible = useMemo(() => {
    const text = query.trim().toLowerCase()
    return items
      .filter((item) => !status || item.status === status)
      .filter((item) => !format || item.workFormat === format)
      .filter((item) => {
        if (!text) return true
        return `${item.company} ${item.position} ${item.location}`.toLowerCase().includes(text)
      })
      .sort((a, b) => b.dateApplied.localeCompare(a.dateApplied) || b.number - a.number)
  }, [items, query, status, format])

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ gap: 1.5, mb: 2 }}>
        <TextField size="small" label="Company or role" value={query} onChange={(event) => setQuery(event.target.value)} />
        <TextField select size="small" label="Status" value={status} onChange={(event) => setStatus(event.target.value as Status | '')} sx={{ minWidth: 180 }}>
          <MenuItem value="">All</MenuItem>
          {statuses.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <TextField select size="small" label="Format" value={format} onChange={(event) => setFormat(event.target.value as WorkFormat | '')} sx={{ minWidth: 140 }}>
          <MenuItem value="">All</MenuItem>
          {workFormats.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ flex: 1 }} />
        <Button variant="contained" onClick={() => setDraft(blankApplication(nextNumber(items)))}>
          Add application
        </Button>
      </Stack>
      {visible.length === 0 ? (
        <Typography color="text.secondary">No applications yet.</Typography>
      ) : (
        <Box sx={{ overflowX: 'auto', borderTop: 1, borderColor: 'divider' }}>
          {visible.map((item) => (
            <Box
              key={item.id}
              component="button"
              onClick={() => setDraft(item)}
              sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: { xs: '4.5rem 1fr', md: '4.5rem 7rem minmax(0, 1.2fr) minmax(0, 1.4fr) 6rem minmax(8rem, 0.8fr) minmax(0, 1fr) 7rem' },
                gap: 1.5,
                alignItems: 'baseline',
                textAlign: 'left',
                py: 1.75,
                px: 0,
                border: 0,
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: isFollowUpDue(item) ? 'rgb(255 107 44 / 0.06)' : 'transparent',
                color: 'text.primary',
                font: 'inherit',
                cursor: 'pointer',
              }}
            >
              <Typography sx={{ fontFamily: mono, fontSize: '0.75rem', color: 'text.subtle' }}>{pad(item.number)}</Typography>
              <Typography sx={{ fontFamily: mono, fontSize: '0.75rem', color: 'text.secondary', display: { xs: 'none', md: 'block' } }}>
                {item.dateApplied || '—'}
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>{item.company}</Typography>
              <Typography sx={{ color: 'text.secondary', display: { xs: 'none', md: 'block' } }}>{item.position}</Typography>
              <Typography sx={{ fontFamily: mono, fontSize: '0.75rem', color: 'text.subtle', display: { xs: 'none', md: 'block' } }}>
                {item.workFormat || '—'}
              </Typography>
              <StatusText status={item.status} />
              <Typography sx={{ color: 'text.secondary', display: { xs: 'none', md: 'block' } }}>{item.nextStep || '—'}</Typography>
              <Typography sx={{ fontFamily: mono, fontSize: '0.75rem', color: isFollowUpDue(item) ? 'primary.main' : 'text.subtle', display: { xs: 'none', md: 'block' } }}>
                {item.nextFollowUp || '—'}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      <ApplicationDialog
        draft={draft}
        saved={Boolean(draft && items.some((item) => item.id === draft.id))}
        onChange={setDraft}
        onSave={() => {
          if (!draft?.company.trim() || !draft.position.trim()) return
          onSave(draft)
          setDraft(null)
        }}
        onDelete={() => {
          if (!draft) return
          onDelete(draft.id)
          setDraft(null)
        }}
      />
    </Box>
  )
}

const StatusText = ({ status }: { status: Status }) => (
  <Typography sx={{ fontFamily: mono, fontSize: '0.75rem', color: statusColor(status) }}>{status}</Typography>
)

const ApplicationDialog = ({
  draft,
  saved,
  onChange,
  onSave,
  onDelete,
}: {
  draft: Application | null
  saved: boolean
  onChange: (item: Application | null) => void
  onSave: () => void
  onDelete: () => void
}) => {
  const set = (key: keyof Application, value: string) => {
    if (!draft) return
    onChange({ ...draft, [key]: value })
  }

  return (
    <Dialog open={Boolean(draft)} onClose={() => onChange(null)} fullWidth maxWidth="md">
      <DialogTitle>{draft ? `${pad(draft.number)}  ${draft.company || 'New application'}` : ''}</DialogTitle>
      <DialogContent>
        {draft && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, pt: 1 }}>
            <TextField type="date" label="Date applied" value={draft.dateApplied} onChange={(event) => set('dateApplied', event.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
            <TextField label="Company" value={draft.company} onChange={(event) => set('company', event.target.value)} required />
            <TextField label="Position" value={draft.position} onChange={(event) => set('position', event.target.value)} required />
            <TextField label="Location" value={draft.location} onChange={(event) => set('location', event.target.value)} />
            <TextField select label="Work format" value={draft.workFormat} onChange={(event) => set('workFormat', event.target.value)}>
              <MenuItem value="">—</MenuItem>
              {workFormats.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </TextField>
            <TextField label="Job link" value={draft.jobLink} onChange={(event) => set('jobLink', event.target.value)} />
            <TextField select label="Source" value={draft.source} onChange={(event) => set('source', event.target.value)}>
              <MenuItem value="">—</MenuItem>
              {sources.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </TextField>
            <TextField label="Salary range" value={draft.salaryRange} onChange={(event) => set('salaryRange', event.target.value)} />
            <TextField label="CV version" value={draft.cvVersion} onChange={(event) => set('cvVersion', event.target.value)} />
            <TextField select label="Status" value={draft.status} onChange={(event) => set('status', event.target.value)}>
              {statuses.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </TextField>
            <TextField type="date" label="Last contact" value={draft.lastContact} onChange={(event) => set('lastContact', event.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
            <TextField label="Next step" value={draft.nextStep} onChange={(event) => set('nextStep', event.target.value)} />
            <TextField type="date" label="Next follow-up" value={draft.nextFollowUp} onChange={(event) => set('nextFollowUp', event.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
            <TextField type="date" label="Interview date" value={draft.interviewDate} onChange={(event) => set('interviewDate', event.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
            <TextField label="Contact person" value={draft.contactPerson} onChange={(event) => set('contactPerson', event.target.value)} />
            <TextField label="Contact email" value={draft.contactEmail} onChange={(event) => set('contactEmail', event.target.value)} />
            <TextField label="Notes" value={draft.notes} onChange={(event) => set('notes', event.target.value)} multiline minRows={3} sx={{ gridColumn: { sm: '1 / -1' } }} />
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
        {saved ? (
          <Button color="inherit" onClick={onDelete}>Delete</Button>
        ) : (
          <span />
        )}
        <Stack direction="row" sx={{ gap: 1 }}>
          <Button color="inherit" onClick={() => onChange(null)}>Cancel</Button>
          <Button variant="contained" onClick={onSave} disabled={!draft?.company.trim() || !draft.position.trim()}>
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}

const Interviews = ({
  items,
  onSave,
  onDelete,
}: {
  items: InterviewNote[]
  onSave: (item: InterviewNote) => void
  onDelete: (id: string) => void
}) => {
  const [draft, setDraft] = useState<InterviewNote | null>(null)
  const sorted = [...items].sort((a, b) => a.company.localeCompare(b.company))

  return (
    <Box>
      <Button variant="contained" onClick={() => setDraft(blankInterview())} sx={{ mb: 2 }}>
        Add note
      </Button>
      {sorted.length === 0 ? (
        <Typography color="text.secondary">No interview notes yet.</Typography>
      ) : (
        <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
          {sorted.map((item) => (
            <Box
              key={item.id}
              component="button"
              onClick={() => setDraft(item)}
              sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.4fr)' },
                gap: 1.5,
                textAlign: 'left',
                py: 1.75,
                border: 0,
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: 'transparent',
                color: 'text.primary',
                font: 'inherit',
                cursor: 'pointer',
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{item.company}</Typography>
              <Typography sx={{ fontFamily: mono, fontSize: '0.75rem', color: 'text.secondary' }}>{item.stage}</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{item.topics || '—'}</Typography>
            </Box>
          ))}
        </Box>
      )}
      <InterviewDialog
        draft={draft}
        saved={Boolean(draft && items.some((item) => item.id === draft.id))}
        onChange={setDraft}
        onSave={() => {
          if (!draft?.company.trim()) return
          onSave(draft)
          setDraft(null)
        }}
        onDelete={() => {
          if (!draft) return
          onDelete(draft.id)
          setDraft(null)
        }}
      />
    </Box>
  )
}

const InterviewDialog = ({
  draft,
  saved,
  onChange,
  onSave,
  onDelete,
}: {
  draft: InterviewNote | null
  saved: boolean
  onChange: (item: InterviewNote | null) => void
  onSave: () => void
  onDelete: () => void
}) => {
  const set = (key: keyof InterviewNote, value: string) => {
    if (!draft) return
    onChange({ ...draft, [key]: value })
  }

  return (
    <Dialog open={Boolean(draft)} onClose={() => onChange(null)} fullWidth maxWidth="sm">
      <DialogTitle>{draft?.company || 'Interview note'}</DialogTitle>
      <DialogContent>
        {draft && (
          <Stack sx={{ gap: 2, pt: 1 }}>
            <TextField label="Company" value={draft.company} onChange={(event) => set('company', event.target.value)} required />
            <TextField select label="Interview stage" value={draft.stage} onChange={(event) => set('stage', event.target.value)}>
              {interviewStatuses.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </TextField>
            <TextField label="Topics to prepare" value={draft.topics} onChange={(event) => set('topics', event.target.value)} multiline minRows={2} />
            <TextField label="Questions asked" value={draft.questions} onChange={(event) => set('questions', event.target.value)} multiline minRows={2} />
            <TextField label="My answers" value={draft.answers} onChange={(event) => set('answers', event.target.value)} multiline minRows={2} />
            <TextField label="Feedback" value={draft.feedback} onChange={(event) => set('feedback', event.target.value)} multiline minRows={2} />
            <TextField label="Areas to improve" value={draft.improve} onChange={(event) => set('improve', event.target.value)} multiline minRows={2} />
          </Stack>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
        {saved ? <Button color="inherit" onClick={onDelete}>Delete</Button> : <span />}
        <Stack direction="row" sx={{ gap: 1 }}>
          <Button color="inherit" onClick={() => onChange(null)}>Cancel</Button>
          <Button variant="contained" onClick={onSave} disabled={!draft?.company.trim()}>Save</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}

const download = (data: TrackerData) => {
  const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = `applications-${today()}.json`
  link.click()
  URL.revokeObjectURL(url)
}
