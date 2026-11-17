import { alpha, createTheme } from '@mui/material/styles'
import type { Theme } from './hooks/useTheme'

declare module '@mui/material/styles' {
  interface TypeText {
    subtle: string
  }
}

export const sans = "'Geist Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
export const mono = "'Geist Mono Variable', ui-monospace, 'SF Mono', Menlo, monospace"

export function createAppTheme(mode: Theme) {
  const dark = mode === 'dark'
  const ink = dark ? '#ededed' : '#0a0a0a'
  const canvas = dark ? '#0a0a0a' : '#fafaf9'
  const raised = dark ? '#111111' : '#ffffff'
  const accent = dark ? '#ff6b2c' : '#e2470c'
  const line = dark ? 'rgb(255 255 255 / 0.09)' : 'rgb(10 10 10 / 0.09)'
  const lineStrong = dark ? 'rgb(255 255 255 / 0.2)' : 'rgb(10 10 10 / 0.22)'

  return createTheme({
    palette: {
      mode,
      primary: { main: accent, contrastText: '#0a0a0a' },
      secondary: { main: ink },
      background: { default: canvas, paper: raised },
      text: {
        primary: ink,
        secondary: dark ? '#a1a1a1' : '#555555',
        subtle: dark ? '#6f6f6f' : '#8a8a8a',
      },
      divider: line,
    },
    typography: {
      fontFamily: sans,
      h1: { fontWeight: 600, letterSpacing: '-0.06em', lineHeight: 0.88 },
      h2: { fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.05 },
      h3: { fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.2 },
      body1: { lineHeight: 1.65, letterSpacing: '-0.005em' },
      body2: { lineHeight: 1.6 },
      button: { fontWeight: 550, textTransform: 'none', letterSpacing: '-0.01em' },
      overline: {
        fontFamily: mono,
        fontWeight: 500,
        fontSize: '0.72rem',
        letterSpacing: '0.08em',
        lineHeight: 1.4,
        textTransform: 'uppercase',
      },
    },
    // sx borderRadius values are multiples of this: 2 = 8px, 4 = 16px.
    shape: { borderRadius: 4 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth' },
          body: {
            backgroundImage: 'none',
            WebkitFontSmoothing: 'antialiased',
            fontFeatureSettings: "'ss01', 'cv11'",
          },
          '::selection': { background: accent, color: '#0a0a0a' },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 10,
            minHeight: '2.75rem',
            paddingInline: '1.1rem',
            transition: 'background-color .2s, border-color .2s, color .2s, transform .2s',
            '&:active': { transform: 'translateY(1px)' },
          },
          contained: {
            backgroundColor: ink,
            color: canvas,
            '&:hover': { backgroundColor: dark ? '#ffffff' : '#262626' },
          },
          outlined: {
            borderColor: line,
            backgroundColor: raised,
            color: ink,
            '&:hover': { borderColor: lineStrong, backgroundColor: raised },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            '&:hover': { backgroundColor: alpha(ink, 0.06) },
          },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiAppBar: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: raised,
            border: `1px solid ${line}`,
            borderRadius: 16,
            boxShadow: dark ? '0 30px 80px rgb(0 0 0 / 0.6)' : '0 30px 80px rgb(10 10 10 / 0.18)',
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: dark ? 'rgb(0 0 0 / 0.6)' : 'rgb(10 10 10 / 0.25)',
            backdropFilter: 'blur(4px)',
          },
        },
      },
    },
  })
}
