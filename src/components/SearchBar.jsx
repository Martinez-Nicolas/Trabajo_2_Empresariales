/**
 * SearchBar.jsx
 * Barra de búsqueda para filtrar productos
 */

import React from 'react';

export const SearchBar = ({ value, onChange, placeholder = "Buscar por nombre o código..." }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Buscar productos"
        />
        {value && (
          <button 
            className="search-clear"
            onClick={() => onChange('')}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;