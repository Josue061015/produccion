const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const inventarioRoutes = require('./routes/inventario');
const authRoutes2 = require('./routes/auth2'); // Importar la ruta auth

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth2', authRoutes2); // Usar la ruta auth2


// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/produccion', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Puerto de escucha
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Definir rutas
app.use('/api/inventario', inventarioRoutes);  // Manejar las rutas de inventario

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);  // Manejar las rutas de autenticación




