import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { authApi } from '../../api/auth';
import { useAuthStore } from '../../stores/authStore';

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('SecurePass123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUser, token } = useAuthStore();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', username);
      
      // Login to get token
      const response = await authApi.login({ username, password });
      console.log('Login response:', response);
      
      setToken(response.access_token);
      
      // Get current user info
      const user = await authApi.getCurrentUser();
      console.log('User info:', user);
      
      setUser(user);
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', mt: 4 }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
            Employee Management System
          </Typography>
          
          <Typography component="h2" variant="h6" align="center" gutterBottom sx={{ mb: 3, color: 'text.secondary' }}>
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
           
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
