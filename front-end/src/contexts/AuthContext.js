import React, { createContext, useState } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  // Función para actualizar los datos de autenticación
  const login = (data) => {
    setAuthData(data);
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};