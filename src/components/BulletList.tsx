import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const BulletList = ({ items }: { items: readonly string[] }) => {
  return (
    <Box component="ul" sx={{ m: 0, p: 0, display: 'grid', gap: 1, listStyle: 'none' }}>
      {items.map((item) => (
        <Typography
          key={item}
          component="li"
          color="text.secondary"
          sx={{
            position: 'relative',
            pl: '1.2rem',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '0.68em',
              width: '0.4rem',
              height: '0.4rem',
              borderRadius: '50%',
              background: (theme) =>
                `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  )
}
