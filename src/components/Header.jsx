/**
 * Header.jsx
 * Encabezado principal con información de la app
 */

import { formatCurrency } from '../utils/formatters';

export const Header = ({ stats }) => {
  return (
    <header className="w-full bg-gradient-to-r from-[#182825] via-[#016FB9] to-[#22AED1] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-6">
          {/* Header Info */}
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 w-fit">
              <div className="w-3 h-3 bg-[#22AED1] rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-white/90">Sincronizado con base de datos</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              📦 Control de Inventario
            </h1>
            <p className="text-white/85 text-sm sm:text-base font-medium">
              Administra productos y movimientos en tiempo real para tomar mejores decisiones
            </p>
          </div>

          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {/* Total Productos */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-xs font-semibold text-white/85 uppercase tracking-wider mb-1">
                  Productos
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stats.totalProducts || 0}
                </div>
              </div>

              {/* Stock Bajo */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-xs font-semibold text-white/85 uppercase tracking-wider mb-1">
                  Stock Bajo ⚠️
                </div>
                <div className={`text-2xl sm:text-3xl font-bold ${
                  stats.lowStockCount > 0 ? 'text-[#22AED1]' : 'text-white'
                }`}>
                  {stats.lowStockCount || 0}
                </div>
              </div>

              {/* Total Items */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-xs font-semibold text-white/85 uppercase tracking-wider mb-1">
                  Total Items
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stats.totalItems || 0}
                </div>
              </div>

              {/* Movimientos Hoy */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-xs font-semibold text-white/85 uppercase tracking-wider mb-1">
                  Mov. Hoy
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stats.movementCountToday || 0}
                </div>
              </div>

              {/* Valor Inventario */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all col-span-2 sm:col-span-1">
                <div className="text-xs font-semibold text-white/85 uppercase tracking-wider mb-1">
                  Valor Total
                </div>
                <div className="text-lg sm:text-2xl font-bold text-white truncate">
                  {formatCurrency(stats.totalValue || 0)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;