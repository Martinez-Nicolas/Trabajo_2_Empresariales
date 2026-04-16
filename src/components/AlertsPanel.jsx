import React from 'react';

export const AlertsPanel = ({ criticalProducts = [] }) => {
  if (!criticalProducts.length) {
    return (
      <div className="w-full rounded-xl border border-green-200/70 bg-linear-to-br from-green-50/90 to-emerald-50/90 p-8 text-center shadow-xl backdrop-blur-md">
        <div className="text-5xl mb-4">✅</div>
        <p className="text-green-700 font-bold text-lg">Sin alertas</p>
        <p className="text-green-600 text-sm mt-2">Tu stock está en niveles saludables</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Encabezado */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-3xl">⚠️</span>
            Alertas de Inventario
          </h2>
          <p className="text-gray-600 text-sm mt-1">Productos que requieren atención inmediata</p>
        </div>
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold text-lg">
          {criticalProducts.length} producto{criticalProducts.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Grid de alertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {criticalProducts.map(product => (
          <div 
            key={product.id}
            className={`rounded-xl border-l-4 bg-white/75 p-5 shadow-lg backdrop-blur-md transition-all hover:shadow-xl ${
              product.severity === 'critico'
                ? 'bg-red-50 border-red-500'
                : 'bg-amber-50 border-amber-500'
            }`}
          >
            {/* Severidad */}
            <div className="flex items-center justify-between mb-3">
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono font-semibold text-gray-800">
                {product.code}
              </code>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                product.severity === 'critico'
                  ? 'bg-red-200 text-red-700'
                  : 'bg-amber-200 text-amber-700'
              }`}>
                {product.severity === 'critico' ? '🔴 Crítico' : '🟡 Stock Bajo'}
              </span>
            </div>

            {/* Nombre del producto */}
            <h3 className="font-bold text-gray-800 mb-3 text-lg">{product.name}</h3>

            {/* Información de stock */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium text-sm">Stock actual:</span>
                <span className={`font-bold text-lg ${
                  product.severity === 'critico'
                    ? 'text-red-600'
                    : 'text-amber-600'
                }`}>
                  {product.quantity} unidades
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium text-sm">Reposición sugerida:</span>
                <span className="font-bold text-blue-600 text-lg">
                  {product.reorderSuggestion} unidades
                </span>
              </div>
            </div>

            {/* Barra de progreso visual */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  product.severity === 'critico'
                    ? 'bg-red-500'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min((product.quantity / product.reorderSuggestion) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
