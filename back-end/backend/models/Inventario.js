const mongoose = require('mongoose');

const InventarioSchema = new mongoose.Schema({
  NoTela: { type: String, required: true },
  Talla: { type: String, required: true },
  Color: { type: String, required: true },
  Estilo: { type: String, required: true },
  Estado: { type: String, required: true }
});

module.exports = mongoose.model('Inventario', InventarioSchema);

