const express = require('express');
const router = express.Router();
const Inventario = require('../models/Inventario');

// Ruta para obtener un inventario por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const inventario = await Inventario.findById(id);
    if (!inventario) {
      return res.status(404).json({ mensaje: 'Inventario no encontrado' });
    }
    res.status(200).json({
      mensaje: 'Inventario obtenido exitosamente',
      inventario: inventario
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener el inventario',
      details: error.message
    });
  }
});

// Ruta para obtener todos los inventarios (accesible para cualquier usuario autenticado)
router.get('/', async (req, res) => {
  try {
    const inventarios = await Inventario.find(); // Obtener todos los registros de inventario
    res.status(200).json(inventarios); // Enviar respuesta con los inventarios
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los inventarios', details: error.message });
  }
});




// Ruta para agregar un nuevo inventario (operario o jefe puede agregar)
router.post('/', async (req, res) => {
  const nuevoInventario = new Inventario(req.body);
  try {
    await nuevoInventario.save();
    res.status(201).json({
      mensaje: 'Inventario guardado exitosamente'
    });
  } catch (error) {
    console.error('Error al guardar el inventario:', error);  // Añadir este log para ver más detalles del error
    res.status(500).json({ error: 'Error al guardar el inventario', details: error.message });  // Devolver el mensaje del error
  }
});



// Ruta para eliminar un inventario (solo el jefe puede eliminar)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const inventario = await Inventario.findById(id);
    if (!inventario) {
      return res.status(404).json({ mensaje: 'Inventario no encontrado' });
    }
    
    await Inventario.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Inventario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el inventario', details: error.message });
  }
});


module.exports = router;
