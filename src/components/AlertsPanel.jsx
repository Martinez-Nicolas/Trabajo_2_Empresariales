import React from 'react';

export const AlertsPanel = ({ criticalProducts = [] }) => {
  return (
    <div className="products-table-container alerts-panel">
      <div className="section-title-row">
        <h3>Alertas de Inventario</h3>
        <span className="table-caption">{criticalProducts.length} productos en riesgo</span>
      </div>

      {!criticalProducts.length ? (
        <div className="empty-message">Sin alertas: stock en niveles saludables.</div>
      ) : (
        <div className="alerts-list">
          {criticalProducts.map(product => (
            <article key={product.id} className={`alert-card ${product.severity}`}>
              <header>
                <h4>{product.code} - {product.name}</h4>
                <span className="alert-level">
                  {product.severity === 'critico' ? 'Critico' : 'Stock bajo'}
                </span>
              </header>
              <p>Stock actual: <strong>{product.quantity}</strong></p>
              <p>Sugerencia de reposicion: <strong>{product.reorderSuggestion} unidades</strong></p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;
