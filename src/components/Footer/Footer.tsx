import { Box } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '58px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: '#1565c0',
        color: 'white'
      }}
    >
      © 21120467 - Ngo Quoc Huy
    </Box>
  )
}

export default Footer