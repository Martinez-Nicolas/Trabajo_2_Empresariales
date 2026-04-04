/**
 * App.jsx
 * Componente principal de la aplicación
 */

import React from 'react';
import Products from './pages/Products';
import './styles/globals.css';

function App() {
  return (
    <div className="app">
      <Products />
      <footer className="app-footer">
        <p>Control de Inventario © 2024 - Sprint 1 (60%) - v0.1.0</p>
        <p className="footer-info">Desarrollado con React + Vite</p>
      </footer>
    </div>
  );
}

export default App;