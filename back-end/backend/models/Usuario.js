const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // Para encriptar contraseñas

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['jefe', 'operario'], required: true },  // Solo dos roles posibles
});

// Método para encriptar contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);  // Encriptar la contraseña
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
