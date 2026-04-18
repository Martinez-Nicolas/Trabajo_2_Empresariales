export const AlertsPanel = ({ criticalProducts = [] }) => {
  if (!criticalProducts.length) {
    return (
      <div className="w-full rounded-xl border border-[#22AED1]/45 bg-white/88 p-8 text-center shadow-xl backdrop-blur-md">
        <div className="text-5xl mb-4">✅</div>
        <p className="text-[#016FB9] font-bold text-lg">Sin alertas</p>
        <p className="text-[#182825] text-sm mt-2">Tu stock está en niveles saludables</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Encabezado */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#182825] flex items-center gap-2">
            <span className="text-3xl">⚠️</span>
            Alertas de Inventario
          </h2>
          <p className="text-[#182825] text-sm mt-1">Productos que requieren atención inmediata</p>
        </div>
        <div className="bg-[#6D8EA0]/25 text-[#182825] px-4 py-2 rounded-lg font-bold text-lg">
          {criticalProducts.length} producto{criticalProducts.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Grid de alertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {criticalProducts.map(product => (
          <div 
            key={product.id}
            className={`rounded-xl border-l-4 bg-white/88 p-5 shadow-lg backdrop-blur-md transition-all hover:shadow-xl ${
              product.severity === 'critico'
                ? 'bg-[#182825]/12 border-[#182825]'
                : 'bg-[#6D8EA0]/18 border-[#6D8EA0]'
            }`}
          >
            {/* Severidad */}
            <div className="flex items-center justify-between mb-3">
              <code className="bg-[#6D8EA0]/20 px-2 py-1 rounded text-xs font-mono font-semibold text-[#182825]">
                {product.code}
              </code>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                product.severity === 'critico'
                  ? 'bg-[#182825]/20 text-[#182825]'
                  : 'bg-[#6D8EA0]/25 text-[#182825]'
              }`}>
                {product.severity === 'critico' ? '🔴 Crítico' : '🟡 Stock Bajo'}
              </span>
            </div>

            {/* Nombre del producto */}
            <h3 className="font-bold text-[#182825] mb-3 text-lg">{product.name}</h3>

            {/* Información de stock */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-[#182825] font-medium text-sm">Stock actual:</span>
                <span className={`font-bold text-lg ${
                  product.severity === 'critico'
                    ? 'text-[#182825]'
                    : 'text-[#016FB9]'
                }`}>
                  {product.quantity} unidades
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#182825] font-medium text-sm">Reposición sugerida:</span>
                <span className="font-bold text-[#016FB9] text-lg">
                  {product.reorderSuggestion} unidades
                </span>
              </div>
            </div>

            {/* Barra de progreso visual */}
            <div className="w-full bg-[#6D8EA0]/20 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  product.severity === 'critico'
                    ? 'bg-[#182825]'
                    : 'bg-[#22AED1]'
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
