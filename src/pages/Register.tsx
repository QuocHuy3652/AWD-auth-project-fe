import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AppBar from '../components/AppBar/AppBar';
import Footer from '../components/Footer/Footer';
import { registerUser } from '../services/apiService';

interface UserInfo {
  id: string,
  email: string,
  createdAt: string
}

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isRegisterSuccessfull, setIsRegisterSuccessfull] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
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

    if (!confirmPassword) {
      setMessage('Confirm password are required.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Confirm password is different from password.');
      setIsLoading(false);
      return;
    }

    try {
      const data = await registerUser(email, password, confirmPassword);
      setUserInfo(data.result);
      setIsRegisterSuccessfull(true);
    } catch (error) {
      console.log('error: ', error);
      if (axios.isAxiosError(error) && error.status === 400) {
        setMessage(error.response?.data?.message);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar page='Register' />
      <Box sx={{
        width: '100%',
        height: 'calc(100vh - 58px - 58px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Paper elevation={3} style={{ padding: '20px', width: isRegisterSuccessfull ? 'auto' : '20rem' }}>
          {isRegisterSuccessfull ?
            <>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: 'green',
                gap: 2
              }}>
                <CheckCircleOutlineIcon />
                <Typography variant="h5">Registration Successful!</Typography>
              </Box>
              <Box textAlign='left' sx={{ p: 3 }}>
                <Typography variant='h6' sx={{ m: 1 }}><b>ID:</b> {userInfo?.id}</Typography>
                <Typography variant='h6' sx={{ m: 1 }}><b>Email:</b> {userInfo?.email}</Typography>
                <Typography variant='h6' sx={{ m: 1 }}><b>Create at:</b> {userInfo?.createdAt}</Typography>
              </Box>
              <Box display="flex" justifyContent="center" marginTop={2} maxWidth="100%">
                <Button component={Link} to="/login" variant="contained" color="primary" fullWidth>
                  Go to Login
                </Button>
              </Box>
            </>
            :
            <>
              <Typography variant="h4" gutterBottom align="center">
                Register
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
                <TextField
                  label="Confirm password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleToggleConfirmPasswordVisibility}
                          edge="end"
                        >
                          {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box marginTop={2} maxWidth="100%">
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                  </Button>
                </Box>
              </form>
              {message && <Typography color="error" align="center" sx={{ margin: 2 }} >{message}</Typography>}
              <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
                <Typography>Already have an account? </Typography>
                <Button component={Link} to="/login" color="primary" style={{ marginLeft: '5px' }}>
                  Login
                </Button>
              </Box>
            </>
          }
          <Box display="flex" justifyContent="center" marginTop={2} maxWidth="100%">
            <Button component={Link} to="/" variant="outlined" fullWidth>
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Box>

      <Footer />
    </Container >
  )
}

export default Register