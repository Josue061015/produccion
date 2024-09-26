import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from 'xlsx';
import axios from 'axios';

const JefeView = () => {
  const [formData, setFormData] = useState({
    NoTela: '',
    Talla: '',
    Color: '',
    Estilo: '',
    Estado: ''
  });

  const [inventarios, setInventarios] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para el Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Mensaje del Snackbar

  // Obtener los datos de la base de datos cuando el componente se monte
  useEffect(() => {
    fetchInventarios();
  }, []);

  const fetchInventarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventario');
      setInventarios(response.data);
    } catch (error) {
      console.error('Error al obtener inventarios:', error);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Enviar el formulario para guardar los datos en la base de datos
  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/inventario', formData);
      fetchInventarios(); // Volver a obtener los datos para que la tabla se actualice
      setFormData({ NoTela: '', Talla: '', Color: '', Estilo: '', Estado: '' }); // Limpiar el formulario
      setSnackbarMessage('Inventario guardado exitosamente'); // Definir el mensaje
      setOpenSnackbar(true); // Abrir el Snackbar
    } catch (error) {
      console.error('Error al guardar inventario:', error);
      setSnackbarMessage('Error al guardar el inventario');
      setOpenSnackbar(true);
    }
  };

  // Eliminar un inventario por su ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/inventario/${id}`);
      fetchInventarios(); // Volver a obtener los datos para que la tabla se actualice
      setSnackbarMessage('Inventario eliminado exitosamente');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error al eliminar inventario:', error);
      setSnackbarMessage('Error al eliminar el inventario');
      setOpenSnackbar(true);
    }
  };

  // Exportar la tabla a un archivo Excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(inventarios);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventarios');
    XLSX.writeFile(workbook, 'inventarios.xlsx');
  };

  // Manejar el cierre del Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Inventario</h1>
      <FormControl style={{ width: '50%' }}>
        <TextField
          label="No. de Tela"
          name="NoTela"
          value={formData.NoTela}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Talla"
          name="Talla"
          value={formData.Talla}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Color"
          name="Color"
          value={formData.Color}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Estilo"
          name="Estilo"
          value={formData.Estilo}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Estado"
          name="Estado"
          value={formData.Estado}
          onChange={handleChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
          Guardar
        </Button>
        <Button variant="contained" color="secondary" onClick={handleExportExcel} style={{ marginTop: '10px' }}>
          Exportar a Excel
        </Button>
      </FormControl>

      <Table style={{ marginTop: '20px', width: '80%' }}>
        <TableHead>
          <TableRow>
            <TableCell>No. de Tela</TableCell>
            <TableCell>Talla</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Estilo</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventarios.map((inventario) => (
            <TableRow key={inventario._id}>
              <TableCell>{inventario.NoTela}</TableCell>
              <TableCell>{inventario.Talla}</TableCell>
              <TableCell>{inventario.Color}</TableCell>
              <TableCell>{inventario.Estilo}</TableCell>
              <TableCell>{inventario.Estado}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(inventario._id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Snackbar para mostrar mensajes de guardado/eliminación */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default JefeView;
