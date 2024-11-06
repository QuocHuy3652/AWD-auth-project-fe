import { Box } from "@mui/material";
import AppsIcon from '@mui/icons-material/Apps'
import Typography from '@mui/material/Typography'
import HomeIcon from '@mui/icons-material/Home';
import Profiles from "./Profiles";
import Button from '@mui/material/Button'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAuth } from "../../hooks/useAuth";

type AppBarProps = {
  page: string;
};

function AppBar({ page }: AppBarProps) {
  const { isAuthenticated } = useAuth();
  
  return (
    <Box
      sx={{
        width: '100%',
        height: '58px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: '#1565c0'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }} />
        <Box
          component={Link} to="/"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
          <HomeIcon sx={{ color: 'white' }} />
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
            Home
          </Typography>
        </Box>
        {page !== 'home' && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
          <ArrowForwardIosIcon sx={{ color: 'white' }} />
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 'normal', color: 'white' }}>
            {page}
          </Typography>
        </Box>}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {isAuthenticated ? <Profiles /> :
          <>
            <Button
              component={Link} to="/login"
              variant="outlined"
              startIcon={<AccountBoxIcon />}
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: '#145AA9'
                }
              }}
            >
              Login
            </Button>
            <Button
              component={Link} to="/register"
              variant="outlined"
              startIcon={<AccountBoxIcon />}
              sx={{
                bgcolor: 'white',
                color: 'primary',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: '#ECECEC'
                }
              }}
            >
              Register
            </Button>
          </>
        }
      </Box>
    </Box>
  )
}

export default AppBar