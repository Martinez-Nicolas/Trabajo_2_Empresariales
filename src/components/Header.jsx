/**
 * Header.jsx
 * Encabezado principal con información de la app
 */

import React from 'react';
import '../styles/components.css';

export const Header = ({ stats }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="header-title">📦 Control de Inventario</h1>
          <p className="header-subtitle">Gestión simple y eficiente de tu stock</p>
        </div>
        
        <div className="header-stats">
          {stats && (
            <div className="stats-group">
              <div className="stat-item">
                <span className="stat-label">Productos</span>
                <span className="stat-value">{stats.totalProducts}</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-label">Stock Bajo</span>
                <span className="stat-value" style={{ color: '#F39C12' }}>
                  {stats.lowStockCount}
                </span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-label">Total Items</span>
                <span className="stat-value">{stats.totalItems}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;