import { useEffect } from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';

function Home() {
  useEffect(() => {
    axios.get('/user');
  }, []);

  
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to My Application!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Explore the features and functionalities.
      </Typography>
      <Box>
        <Button component={Link} to="/login" variant="contained" color="primary"
          sx={{
            margin: '10px',
            '&:hover': {
              color: 'white',
            },
          }}
        >
          Login
        </Button>
        <Button component={Link} to="/register" variant="outlined" color="primary"
          sx={{
            margin: '10px',
            color: 'primary',
            '&:hover': {
              color: 'primary',
            },
          }}
        >
          Register
        </Button>
      </Box>
    </Container>
  )
}

export default Home