import React, { useState } from 'react';
import JefeView from './components/JefeView';
import OperarioView from './components/OperarioView';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

function App() {
  const [role, setRole] = useState(null); // Para almacenar el rol del usuario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth2/login', {
        username,
        password
      });

      setRole(response.data.role); // Asigna el rol recibido del backend
      setError(''); // Limpia cualquier error anterior
      setSuccess('Inicio de sesión exitoso'); // Muestra mensaje de éxito
    } catch (error) {
      setError('Error en las credenciales. Inténtelo de nuevo.');
      setSuccess(''); // Limpia cualquier mensaje de éxito anterior
    }
  };

  return (
    <div className="App">
      {!role ? (
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
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Login
            </Button>

            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </Box>
        </Container>
      ) : role === 'jefe' ? (
        <JefeView />
      ) : (
        <OperarioView />
      )}
    </div>
  );
}

export default App;
