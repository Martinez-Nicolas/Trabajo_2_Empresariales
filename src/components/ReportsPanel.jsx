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
    <div className="products-table-container reports-panel">
      <h3>Reporte Ejecutivo Rapido</h3>

      <div className="report-kpis">
        <div className="kpi-card">
          <span>Movimientos</span>
          <strong>{summary.totalMovements}</strong>
        </div>
        <div className="kpi-card">
          <span>Entradas</span>
          <strong>{summary.totalEntries}</strong>
        </div>
        <div className="kpi-card">
          <span>Salidas</span>
          <strong>{summary.totalExits}</strong>
        </div>
        <div className="kpi-card">
          <span>Valor de Inventario</span>
          <strong>{formatCurrency(summary.inventoryValue)}</strong>
        </div>
      </div>

      <div className="report-grid">
        <section>
          <h4>Top productos con mayor salida</h4>
          {!summary.topOutgoingProducts.length ? (
            <p className="table-subtext">No hay salidas registradas.</p>
          ) : (
            <ul className="report-list">
              {summary.topOutgoingProducts.map(item => (
                <li key={item.productId}>
                  <span>{item.productCode} - {item.productName}</span>
                  <strong>{item.quantity} un.</strong>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h4>Productos sin movimiento (15 dias)</h4>
          {!summary.inactiveProducts.length ? (
            <p className="table-subtext">Todos los productos tienen movimiento reciente.</p>
          ) : (
            <ul className="report-list">
              {summary.inactiveProducts.slice(0, 5).map(item => (
                <li key={item.id}>
                  <span>{item.code} - {item.name}</span>
                  <strong>Sugerido: {item.reorderSuggestion}</strong>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default ReportsPanel;
