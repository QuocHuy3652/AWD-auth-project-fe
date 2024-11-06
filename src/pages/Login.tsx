import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AppBar from '../components/AppBar/AppBar';
import Footer from '../components/Footer/Footer';
import { login } from '../services/apiService';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (!email) {
      setMessage('Email are required.');
      setIsLoading(false);
      return;
    }

    if (!password) {
      setMessage('Password are required.');
      setIsLoading(false);
      return;
    }

    try {
      const data = await login(email, password);
      setToken(data.result.token);
      navigate('/');
    } catch (error) {
      console.log('error: ', error);
      if (axios.isAxiosError(error) && error.status === 401) {
        setMessage('Password is incorrect.');
      } else if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar page='Login'/>
      <Box sx={{
        width: '100%',
        height: 'calc(100vh - 58px - 58px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Paper elevation={3} style={{ padding: '20px', width: '20rem'  }}>
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box marginTop={2} maxWidth="100%">
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
            </Box>
          </form>
          {message && <Typography color="error" align="center" sx={{ margin: 2 }} >{message}</Typography>}

          <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
            <Typography>Don't have an account? </Typography>
            <Button component={Link} to="/register" color="primary" style={{ marginLeft: '5px' }}>
              Register
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" marginTop={2} maxWidth="100%">
            <Button component={Link} to="/" variant="outlined" fullWidth>
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Box>

      <Footer />
    </Container>
  )
}

export default Login