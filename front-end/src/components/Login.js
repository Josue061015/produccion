import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';

const Login = ({ setUserRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth2/login', {
        username,
        password
      });

      const { role } = response.data;

      setUserRole(role);
      setError('');
      setSuccess('Inicio de sesión exitoso');

      if (role === 'jefe') {
        console.log('Redirigir a vista de jefe');
      } else if (role === 'operario') {
        console.log('Redirigir a vista de operario');
      }
    } catch (error) {
      console.log('Error en login:', error); // Para ver el error que devuelve el backend
      setError('Credenciales incorrectas');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        mt={10} 
        p={3} 
        boxShadow={3}
        borderRadius={2}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            HOLA
          </Button>
        </form>

        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
    </Container>
  );
};

export default Login;
