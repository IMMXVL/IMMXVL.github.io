import { createTheme } from '@mui/material/styles'
import type { Theme } from './hooks/useTheme'

declare module '@mui/material/styles' {
  interface TypeText {
    subtle: string
  }
}

const sans = "'Inter Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
const display = "'Space Grotesk Variable', " + sans

export function createAppTheme(mode: Theme) {
  const dark = mode === 'dark'
  const primary = dark ? '#a78bfa' : '#5b2fd6'
  const secondary = dark ? '#22d3ee' : '#0e7490'
  const surface = dark ? 'rgb(255 255 255 / 0.035)' : 'rgb(255 255 255 / 0.72)'
  const surfaceHover = dark ? 'rgb(255 255 255 / 0.06)' : '#ffffff'
  const border = dark ? 'rgb(255 255 255 / 0.09)' : 'rgb(17 19 27 / 0.09)'
  const borderStrong = dark ? 'rgb(255 255 255 / 0.18)' : 'rgb(17 19 27 / 0.2)'
  const gradient = `linear-gradient(120deg, ${primary}, ${secondary})`

  return createTheme({
    palette: {
      mode,
      primary: { main: primary },
      secondary: { main: secondary },
      background: {
        default: dark ? '#0a0b10' : '#f6f6fa',
        paper: dark ? '#10121a' : '#ffffff',
      },
      text: {
        primary: dark ? '#eceef4' : '#12141b',
        secondary: dark ? '#a3aaba' : '#4d5465',
        subtle: dark ? '#7d8596' : '#636b7c',
      },
      divider: border,
    },
    typography: {
      fontFamily: sans,
      h1: { fontFamily: display, fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 0.98 },
      h2: { fontFamily: display, fontWeight: 650, letterSpacing: '-0.03em', lineHeight: 1.1 },
      h3: { fontFamily: display, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.25 },
      body1: { lineHeight: 1.6 },
      body2: { lineHeight: 1.6 },
      button: { fontWeight: 600, textTransform: 'none', fontSize: '0.95rem' },
      overline: { letterSpacing: '0.08em', fontWeight: 600, lineHeight: 1.4 },
    },
    shape: { borderRadius: 18 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth' },
          body: { backgroundImage: 'none', lineHeight: 1.6 },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
            minHeight: '2.9rem',
            paddingInline: '1.15rem',
          },
          contained: {
            border: '1px solid transparent',
            background: gradient,
            color: dark ? '#0a0b10' : '#ffffff',
            boxShadow: `0 10px 30px -12px color-mix(in srgb, ${primary} 70%, transparent)`,
            '&:hover': {
              background: gradient,
              boxShadow: `0 14px 36px -12px color-mix(in srgb, ${primary} 85%, transparent)`,
            },
          },
          outlined: {
            borderColor: borderStrong,
            backgroundColor: surface,
            color: dark ? '#eceef4' : '#12141b',
            '&:hover': {
              borderColor: borderStrong,
              backgroundColor: surfaceHover,
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: 28,
            backgroundColor: surface,
            borderColor: border,
            '&:hover': { borderColor: borderStrong },
          },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiAppBar: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderColor: border,
            backgroundColor: surfaceHover,
            color: dark ? '#eceef4' : '#12141b',
          },
        },
      },
    },
  })
}
