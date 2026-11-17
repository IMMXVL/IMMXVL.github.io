import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const BulletList = ({ items }: { items: readonly string[] }) => {
  return (
    <Box component="ul" sx={{ m: 0, p: 0, display: 'grid', gap: 1.5, listStyle: 'none' }}>
      {items.map((item) => (
        <Typography
          key={item}
          component="li"
          color="text.secondary"
          sx={{
            position: 'relative',
            pl: '1.5rem',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '0.8em',
              width: '0.6rem',
              height: '1px',
              bgcolor: 'primary.main',
            },
          }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  )
}
