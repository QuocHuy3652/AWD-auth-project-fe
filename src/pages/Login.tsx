import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper, IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('This feature will be coming soon.');
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
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
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </form>
        {message && <Typography color="error" align="center" sx={{margin: 2}} >{message}</Typography>}

        <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
          <Typography>Don't have an account? </Typography>
          <Button component={Link} to="/register" color="primary" style={{ marginLeft: '5px' }}>
            Register
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button component={Link} to="/" variant="outlined">
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login