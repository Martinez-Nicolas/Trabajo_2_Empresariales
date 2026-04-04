/**
 * ProductTable.jsx
 * Tabla para mostrar productos con acciones
 */

import React from 'react';
import { formatCurrency, formatQuantity, getStockStatus, formatDate } from '../utils/formatters';

export const ProductTable = ({ 
  products, 
  searchQuery = '',
  highlightedProductId = null,
  onEdit, 
  onDelete, 
  isLoading = false,
  emptyMessage = "No hay productos registrados"
}) => {
  if (isLoading) {
    return (
      <div className="products-table-container">
        <div className="loading-message">Cargando productos...</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="products-table-container">
        <div className="empty-message">
          📭 {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="products-table-container">
      <div className="table-responsive">
        <table className="products-table">
          <thead>
            <tr>
              <th className="code-col">Código</th>
              <th className="name-col">Nombre</th>
              <th className="numeric quantity-col">Cantidad</th>
              <th className="numeric price-col">Precio Unit.</th>
              <th className="numeric total-col">Stock Total</th>
              <th className="status-col">Estado</th>
              <th className="actions-col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const stockStatus = getStockStatus(product.quantity);
              const totalValue = product.quantity * product.price;
              const normalizedQuery = searchQuery.toLowerCase().trim();
              const matchesQuery = normalizedQuery && (
                product.name.toLowerCase().includes(normalizedQuery) ||
                product.code.toLowerCase().includes(normalizedQuery) ||
                String(product.quantity).includes(normalizedQuery) ||
                String(product.price).includes(normalizedQuery)
              );

              const rowClassName = [
                'product-row',
                matchesQuery ? 'product-row-match' : '',
                highlightedProductId === product.id ? 'product-row-highlighted' : ''
              ].filter(Boolean).join(' ');

              return (
                <tr key={product.id} id={`product-row-${product.id}`} className={rowClassName}>
                  <td className="code-cell code-col">
                    <code>{product.code}</code>
                  </td>
                  <td className="name-cell name-col">{product.name}</td>
                  <td className="numeric quantity-col">
                    {formatQuantity(product.quantity)}
                  </td>
                  <td className="numeric price-col">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="numeric total-col">
                    <strong>{formatCurrency(totalValue)}</strong>
                  </td>
                  <td className="status-col">
                    <span 
                      className="status-badge"
                      style={{ 
                        backgroundColor: stockStatus.color + '20',
                        color: stockStatus.color,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      {stockStatus.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      onClick={() => onEdit && onEdit(product.id)}
                      className="btn-icon btn-edit"
                      title="Editar producto"
                      aria-label={`Editar ${product.name}`}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(product.id)}
                      className="btn-icon btn-delete"
                      title="Eliminar producto"
                      aria-label={`Eliminar ${product.name}`}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <p>
          <strong>Total de productos:</strong> {products.length}
        </p>
      </div>
    </div>
  );
};

export default ProductTable;