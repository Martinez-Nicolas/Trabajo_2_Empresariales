import React from 'react';
import { formatCurrency } from '../utils/formatters';

export const ReportsPanel = ({ reportSummary }) => {
  const summary = reportSummary || {
    totalMovements: 0,
    totalEntries: 0,
    totalExits: 0,
    unitsIn: 0,
    unitsOut: 0,
    inventoryValue: 0,
    topOutgoingProducts: [],
    inactiveProducts: []
  };

  return (
    <div className="w-full space-y-6">
      {/* Encabezado */}
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <span className="text-3xl">📊</span>
        Reporte Ejecutivo Rápido
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Movimientos */}
        <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-5 border border-blue-200 hover:shadow-xl transition-all">
          <div className="text-sm font-semibold text-blue-700 mb-2">📈 Movimientos</div>
          <div className="text-3xl font-bold text-blue-900">{summary.totalMovements}</div>
        </div>

        {/* Entradas */}
        <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-5 border border-green-200 hover:shadow-xl transition-all">
          <div className="text-sm font-semibold text-green-700 mb-2">📥 Entradas</div>
          <div className="text-3xl font-bold text-green-900">{summary.totalEntries}</div>
        </div>

        {/* Salidas */}
        <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-5 border border-orange-200 hover:shadow-xl transition-all">
          <div className="text-sm font-semibold text-orange-700 mb-2">📦 Salidas</div>
          <div className="text-3xl font-bold text-orange-900">{summary.totalExits}</div>
        </div>

        {/* Valor Inventario */}
        <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-5 border border-purple-200 hover:shadow-xl transition-all">
          <div className="text-sm font-semibold text-purple-700 mb-2">💰 Valor Inventario</div>
          <div className="text-2xl font-bold text-purple-900 truncate">{formatCurrency(summary.inventoryValue)}</div>
        </div>
      </div>

      {/* Unidades In/Out Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-green-200/70 bg-white/75 p-6 shadow-xl backdrop-blur-md">
          <div className="text-lg font-bold text-green-700 mb-2">📥 Unidades Entrada</div>
          <div className="text-4xl font-bold text-green-600">{summary.unitsIn || 0}</div>
          <p className="text-sm text-gray-600 mt-2">Total ingresado al inventario</p>
        </div>
        <div className="rounded-xl border border-orange-200/70 bg-white/75 p-6 shadow-xl backdrop-blur-md">
          <div className="text-lg font-bold text-orange-700 mb-2">📦 Unidades Salida</div>
          <div className="text-4xl font-bold text-orange-600">{summary.unitsOut || 0}</div>
          <p className="text-sm text-gray-600 mt-2">Total egresado del inventario</p>
        </div>
      </div>

      {/* Secciones de análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top productos con mayor salida */}
        <div className="rounded-xl border border-white/60 bg-white/75 p-6 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🏆</span>
            Top Productos (Mayor Salida)
          </h3>
          {!summary.topOutgoingProducts?.length ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No hay salidas registradas aún</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {summary.topOutgoingProducts.map((item, idx) => (
                <li key={item.productId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-400">#{idx + 1}</span>
                    <div>
                      <div className="font-semibold text-gray-800">{item.productName}</div>
                      <div className="text-xs text-gray-500">{item.productCode}</div>
                    </div>
                  </div>
                  <span className="font-bold text-blue-600">{item.quantity} un.</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Productos sin movimiento */}
        <div className="rounded-xl border border-white/60 bg-white/75 p-6 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>😴</span>
            Productos Inactivos (15 días)
          </h3>
          {!summary.inactiveProducts?.length ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">Todos los productos tienen movimiento reciente</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {summary.inactiveProducts.slice(0, 5).map((item) => (
                <li key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <div className="font-semibold text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.code}</div>
                  </div>
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded">
                    +{item.reorderSuggestion}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPanel;
