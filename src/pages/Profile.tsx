import { useEffect, useState } from 'react';
import { Typography, Container, Box, CircularProgress, Paper } from '@mui/material';
import AppBar from '../components/AppBar/AppBar';
import Footer from '../components/Footer/Footer';
import { getProfile } from '../services/apiService';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  id: string,
  email: string,
  createdAt: string
}

function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUserInfo(data.result);
      } catch (error) {
        console.error('Failed to fetch profile', error);
        logout();
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [logout, navigate]);

  if (loading) {
    return <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar page='Profile' />
      <Box sx={{
        width: '100%',
        height: 'calc(100vh - 58px - 58px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <CircularProgress />
      </Box>
      <Footer />
    </Container>;
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar page='Profile' />
      <Box sx={{
        width: '100%',
        height: 'calc(100vh - 58px - 58px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Paper elevation={3} style={{ padding: '20px', width: '40rem', height: '30rem' }}>
          <Typography textAlign={'center'} variant="h4">Profile user</Typography>
          <Box textAlign='left' sx={{ p: 3 }}>
            <Typography variant='h6' sx={{ m: 1 }}><b>ID:</b> {userInfo?.id}</Typography>
            <Typography variant='h6' sx={{ m: 1 }}><b>Email:</b> {userInfo?.email}</Typography>
            <Typography variant='h6' sx={{ m: 1 }}><b>Create at:</b> {userInfo?.createdAt}</Typography>
          </Box>
        </Paper>
      </Box>
      <Footer />
    </Container>
  )
}

export default Profile