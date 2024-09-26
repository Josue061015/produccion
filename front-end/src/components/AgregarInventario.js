import React, { useState } from 'react';
import axios from 'axios';

const AgregarInventario = () => {
  const [inventario, setInventario] = useState({
    no_tela: '',
    talla: '',
    color: '',
    estilo: '',
    estado: ''
  });

  const handleChange = (e) => {
    setInventario({ ...inventario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/inventario', inventario)
      .then(res => console.log('Inventario agregado:', res.data))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Agregar Inventario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="no_tela" placeholder="No. de tela" onChange={handleChange} required />
        <input type="text" name="talla" placeholder="Talla" onChange={handleChange} required />
        <input type="text" name="color" placeholder="Color" onChange={handleChange} required />
        <input type="text" name="estilo" placeholder="Estilo" onChange={handleChange} required />
        <input type="text" name="estado" placeholder="Estado" onChange={handleChange} required />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default AgregarInventario;
