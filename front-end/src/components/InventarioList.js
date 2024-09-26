import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventarioList = () => {
  const [inventarios, setInventarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/inventario')
      .then(res => setInventarios(res.data))
      .catch(err => console.log(err));
  }, []);

  const eliminarInventario = (id) => {
    axios.delete(`http://localhost:5000/api/inventario/${id}`)
      .then(() => setInventarios(inventarios.filter(inventario => inventario._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Lista de Inventarios</h2>
      <ul>
        {inventarios.map(inventario => (
          <li key={inventario._id}>
            {inventario.no_tela} - {inventario.talla} - {inventario.color} - {inventario.estilo} - {inventario.estado}
            <button onClick={() => eliminarInventario(inventario._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventarioList;
