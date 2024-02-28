import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import axios from "axios"
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!email || !password) {
      setError("Please enter a valid email or password");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setLoading(false)
      router.push('/submitpage')
    } catch (error) {
      setError('Invalid email or password');
    }

  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h4" align="center" sx={{ marginBottom: "2rem" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Grid>
          </Grid>
          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 1, mb: 1 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            {loading ? "Login..." : 'Login'}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;