import { Typography, Container, Box } from '@mui/material';
import AppBar from '../components/AppBar/AppBar';
import Footer from '../components/Footer/Footer';

function Home() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar page='home' />
      <Box sx={{
        width: '100%',
        height: 'calc(100vh - 58px - 58px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <Typography variant="h2" gutterBottom>
          Welcome to My Application!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Explore the features and functionalities.
        </Typography>
      </Box>
      <Footer />
    </Container>
  )
}

export default Home