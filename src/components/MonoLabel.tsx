import type { ReactNode } from 'react'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'

export const MonoLabel = ({ children, sx }: { children: ReactNode; sx?: SxProps<Theme> }) => (
  <Typography variant="overline" component="p" sx={[{ color: 'text.subtle', display: 'block' }, ...(Array.isArray(sx) ? sx : [sx])]}>
    {children}
  </Typography>
)
