/**
 * SearchBar.jsx
 * Barra de búsqueda para filtrar productos
 */

import React from 'react';

export const SearchBar = ({
  value,
  onChange,
  onSubmitSearch,
  placeholder = "Buscar por nombre o código..."
}) => {
  return (
    <div className="w-full bg-white/70 backdrop-blur-md border-b border-white/50 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">🔍</div>
            <input
              type="text"
              className="w-full pl-10 pr-10 py-2 border-2 border-gray-300/80 rounded-lg bg-white/90 shadow-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && onSubmitSearch) {
                  onSubmitSearch();
                }
              }}
              aria-label="Buscar productos"
            />
            {value && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => onChange('')}
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="button"
            className="px-6 py-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg"
            onClick={onSubmitSearch}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;