export const statuses = [
  'Interested',
  'Applied',
  'Recruiter Screening',
  'Technical Interview',
  'HR Interview',
  'Assignment',
  'Final Interview',
  'Offer',
  'Rejected',
  'No Response',
  'Withdrawn',
] as const

export type Status = (typeof statuses)[number]

export const workFormats = ['Remote', 'Hybrid', 'On-site'] as const
export type WorkFormat = (typeof workFormats)[number]

export const sources = ['LinkedIn', 'Indeed', 'hh.ru', 'Referral', 'Company site', 'Other'] as const

export const interviewStatuses: readonly Status[] = [
  'Recruiter Screening',
  'Technical Interview',
  'HR Interview',
  'Assignment',
  'Final Interview',
]

const closedStatuses: readonly Status[] = ['Offer', 'Rejected', 'Withdrawn']

export type Application = {
  id: string
  number: number
  dateApplied: string
  company: string
  position: string
  location: string
  workFormat: WorkFormat | ''
  jobLink: string
  source: string
  salaryRange: string
  cvVersion: string
  status: Status
  lastContact: string
  nextStep: string
  nextFollowUp: string
  interviewDate: string
  contactPerson: string
  contactEmail: string
  notes: string
}

export type InterviewNote = {
  id: string
  company: string
  stage: string
  topics: string
  questions: string
  answers: string
  feedback: string
  improve: string
}

export type TrackerData = {
  applications: Application[]
  interviews: InterviewNote[]
}

export const today = () => {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export const blankApplication = (number: number): Application => ({
  id: crypto.randomUUID(),
  number,
  dateApplied: today(),
  company: '',
  position: '',
  location: '',
  workFormat: '',
  jobLink: '',
  source: '',
  salaryRange: '',
  cvVersion: '',
  status: 'Applied',
  lastContact: '',
  nextStep: '',
  nextFollowUp: '',
  interviewDate: '',
  contactPerson: '',
  contactEmail: '',
  notes: '',
})

export const blankInterview = (): InterviewNote => ({
  id: crypto.randomUUID(),
  company: '',
  stage: 'Technical Interview',
  topics: '',
  questions: '',
  answers: '',
  feedback: '',
  improve: '',
})

export const nextNumber = (items: Application[]) => items.reduce((max, item) => Math.max(max, item.number), 0) + 1

export const isFollowUpDue = (item: Application) =>
  Boolean(item.nextFollowUp) && !closedStatuses.includes(item.status) && item.nextFollowUp <= today()

export const statusColor = (status: Status) => {
  if (status === 'Offer') return '#22c55e'
  if (status === 'Rejected') return '#ef4444'
  if (status === 'Applied') return '#3b82f6'
  if (interviewStatuses.includes(status)) return '#eab308'
  return '#8a8a8a'
}
