// auth2.js
const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario'); // Asegúrate de usar "Usuario"
const router = express.Router();
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken
module.exports = router;

// Ruta para registrar un nuevo usuario
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario
  const user = await Usuario.findOne({ username });
  if (!user) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
  }

  // Comparar contraseñas
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
  }
  
  return res.status(200).json({ mensaje: 'Contraseña correcta' , role:user.role });
});





// Ruta para login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Verificar si los datos están llegando correctamente
  console.log("Datos recibidos: ", { username, password });

  // Buscar el usuario en la base de datos
  const user = await Usuario.findOne({ username });
  if (!user) {
      console.log('Usuario no encontrado');
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
  }

  console.log('Usuario encontrado: ', user);

  // Validar contraseña
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
      console.log('Contraseña incorrecta');
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
  }

  console.log('Contraseña correcta');

  // Generar el token JWT
  try {
      const token = jwt.sign(
          { id: user._id, role: user.role },
          'secreto', // Cambia esto por un secreto más seguro
          { expiresIn: '1h' }
      );

      console.log('Token generado: ', token);

      // Enviar el token en la respuesta junto con el mensaje de éxito
      return res.status(200).json({ mensaje: 'Contraseña correcta', role: user.role, token });
  } catch (error) {
      console.log('Error generando el token: ', error);
      return res.status(500).json({ mensaje: 'Error al generar el token' });
  }
});


module.exports = router;



