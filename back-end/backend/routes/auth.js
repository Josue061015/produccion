const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const router = express.Router();

// Registro de usuarios
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const nuevoUsuario = new Usuario({
      username,
      password: hashedPassword,
      role
    });
    await nuevoUsuario.save();
    res.json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login de usuarios
router.post('/login', async (req, res) => {

  const { username, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign({ id: usuario._id, role: usuario.role }, 'secreto', { expiresIn: '1h' });

    res.json({ token, role: usuario.role });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log("Datos recibidos:", req.body);  // Ver qué datos llegan al backend

  const user = await Usuario.findOne({ username });
  if (!user) return res.status(400).json({ mensaje: 'Usuario no encontrado' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ mensaje: 'Contraseña incorrecta' });

  res.json({ role: user.role });
});




module.exports = router;
