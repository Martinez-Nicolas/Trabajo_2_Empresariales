/**
 * SearchBar.jsx
 * Barra de búsqueda para filtrar productos
 */

export const SearchBar = ({
  value,
  onChange,
  onSubmitSearch,
  placeholder = "Buscar por nombre o código..."
}) => {
  return (
    <div className="w-full bg-white/70 backdrop-blur-md border-b border-[#6D8EA0]/45 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">🔍</div>
            <input
              type="text"
              className="w-full pl-10 pr-10 py-2 border-2 border-[#6D8EA0]/70 rounded-lg bg-white/90 shadow-sm focus:outline-none focus:border-[#016FB9] transition-colors"
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6D8EA0] hover:text-[#182825] transition-colors"
                onClick={() => onChange('')}
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="button"
            className="px-6 py-2 bg-linear-to-r from-[#016FB9] to-[#22AED1] text-white font-semibold rounded-lg hover:from-[#015d9b] hover:to-[#1b9fc0] transition-all shadow-md hover:shadow-lg"
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