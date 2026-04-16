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
      <h2 className="text-3xl font-bold text-[#182825] flex items-center gap-2">
        <span className="text-3xl">📊</span>
        Reporte Ejecutivo Rápido
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Movimientos */}
        <div className="bg-white/88 rounded-xl shadow-lg p-5 border border-[#016FB9]/30 hover:shadow-xl transition-all">
          <div className="text-sm font-semibold text-[#182825] mb-2">📈 Movimientos</div>
          <div className="text-3xl font-bold text-[#016FB9]">{summary.totalMovements}</div>
        </div>

        {/* Entradas */}
        <div className="bg-white/88 rounded-xl shadow-lg p-5 border border-[#22AED1]/45 hover:shadow-xl transition-all">
          <div className="text-sm font-semibold text-[#182825] mb-2">📥 Entradas</div>
          <div className="text-3xl font-bold text-[#22AED1]">{summary.totalEntries}</div>
        </div>

        {/* Salidas */}
        <div className="bg-white/88 rounded-xl shadow-lg p-5 border border-[#6D8EA0]/45 hover:shadow-xl transition-all">
          <div className="text-sm font-semibold text-[#182825] mb-2">📦 Salidas</div>
          <div className="text-3xl font-bold text-[#6D8EA0]">{summary.totalExits}</div>
        </div>

        {/* Valor Inventario */}
        <div className="bg-white/88 rounded-xl shadow-lg p-5 border border-[#182825]/35 hover:shadow-xl transition-all">
          <div className="text-sm font-semibold text-[#182825] mb-2">💰 Valor Inventario</div>
          <div className="text-2xl font-bold text-[#016FB9] truncate">{formatCurrency(summary.inventoryValue)}</div>
        </div>
      </div>

      {/* Unidades In/Out Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#22AED1]/40 bg-white/88 p-6 shadow-xl backdrop-blur-md">
          <div className="text-lg font-bold text-[#016FB9] mb-2">📥 Unidades Entrada</div>
          <div className="text-4xl font-bold text-[#22AED1]">{summary.unitsIn || 0}</div>
          <p className="text-sm text-[#182825] mt-2">Total ingresado al inventario</p>
        </div>
        <div className="rounded-xl border border-[#6D8EA0]/45 bg-white/88 p-6 shadow-xl backdrop-blur-md">
          <div className="text-lg font-bold text-[#182825] mb-2">📦 Unidades Salida</div>
          <div className="text-4xl font-bold text-[#6D8EA0]">{summary.unitsOut || 0}</div>
          <p className="text-sm text-[#182825] mt-2">Total egresado del inventario</p>
        </div>
      </div>

      {/* Secciones de análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top productos con mayor salida */}
        <div className="rounded-xl border border-white/60 bg-white/78 p-6 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-[#182825] mb-4 flex items-center gap-2">
            <span>🏆</span>
            Top Productos (Mayor Salida)
          </h3>
          {!summary.topOutgoingProducts?.length ? (
            <div className="text-center py-8">
              <p className="text-[#182825] text-sm">No hay salidas registradas aún</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {summary.topOutgoingProducts.map((item, idx) => (
                <li key={item.productId} className="flex items-center justify-between p-3 bg-[#6D8EA0]/10 rounded-lg hover:bg-[#6D8EA0]/18 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-[#6D8EA0]">#{idx + 1}</span>
                    <div>
                      <div className="font-semibold text-[#182825]">{item.productName}</div>
                      <div className="text-xs text-[#182825]">{item.productCode}</div>
                    </div>
                  </div>
                  <span className="font-bold text-[#016FB9]">{item.quantity} un.</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Productos sin movimiento */}
        <div className="rounded-xl border border-white/60 bg-white/78 p-6 shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-bold text-[#182825] mb-4 flex items-center gap-2">
            <span>😴</span>
            Productos Inactivos (15 días)
          </h3>
          {!summary.inactiveProducts?.length ? (
            <div className="text-center py-8">
              <p className="text-[#182825] text-sm">Todos los productos tienen movimiento reciente</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {summary.inactiveProducts.slice(0, 5).map((item) => (
                <li key={item.id} className="flex items-center justify-between p-3 bg-[#6D8EA0]/10 rounded-lg hover:bg-[#6D8EA0]/18 transition-colors">
                  <div>
                    <div className="font-semibold text-[#182825]">{item.name}</div>
                    <div className="text-xs text-[#182825]">{item.code}</div>
                  </div>
                  <span className="text-xs font-bold bg-[#6D8EA0]/25 text-[#182825] px-2 py-1 rounded">
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
