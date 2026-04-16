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
      <div className="w-full rounded-xl border border-white/60 bg-white/75 p-8 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
          <span className="text-gray-600 font-medium">Cargando productos...</span>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full rounded-xl border border-white/60 bg-white/75 p-12 text-center shadow-xl backdrop-blur-md">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-gray-500 text-lg font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Tabla responsiva */}
      <div className="overflow-hidden rounded-xl border border-white/60 bg-white/75 shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Código</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Nombre</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Cantidad</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Precio Unit.</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Stock Total</th>
                <th className="px-4 py-3 text-center text-sm font-bold text-gray-700">Estado</th>
                <th className="px-4 py-3 text-center text-sm font-bold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, idx) => {
                const stockStatus = getStockStatus(product.quantity);
                const totalValue = product.quantity * product.price;
                const normalizedQuery = searchQuery.toLowerCase().trim();
                const matchesQuery = normalizedQuery && (
                  product.name.toLowerCase().includes(normalizedQuery) ||
                  product.code.toLowerCase().includes(normalizedQuery) ||
                  String(product.quantity).includes(normalizedQuery) ||
                  String(product.price).includes(normalizedQuery)
                );

                const isHighlighted = highlightedProductId === product.id;
                const bgColor = idx % 2 === 0 ? 'bg-gray-50' : 'bg-white';
                const hoverBg = isHighlighted 
                  ? 'bg-yellow-100 ring-2 ring-yellow-400' 
                  : matchesQuery 
                  ? 'bg-blue-100' 
                  : '';

                return (
                  <tr 
                    key={product.id} 
                    id={`product-row-${product.id}`}
                    className={`${bgColor} ${hoverBg} hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono font-semibold text-gray-800">
                        {product.code}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-800">{product.name}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-700">
                      {formatQuantity(product.quantity)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-blue-600">
                        {formatCurrency(totalValue)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                        style={{ 
                          backgroundColor: stockStatus.color + '20',
                          color: stockStatus.color
                        }}
                      >
                        {stockStatus.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEdit && onEdit(product.id)}
                          className="p-2 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                          title="Editar producto"
                          aria-label={`Editar ${product.name}`}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => onDelete && onDelete(product.id)}
                          className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                          title="Eliminar producto"
                          aria-label={`Eliminar ${product.name}`}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pie de tabla */}
      <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
        <p className="text-sm font-semibold text-gray-700">
          📊 Total de productos: <span className="text-blue-600 text-lg">{products.length}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductTable;