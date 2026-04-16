/**
 * ProductTable.jsx
 * Tabla para mostrar productos con acciones
 */

import { formatCurrency, formatQuantity, getStockStatus } from '../utils/formatters';

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
      <div className="w-full rounded-xl border border-white/60 bg-white/78 p-8 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#016FB9] border-t-transparent"></div>
          <span className="text-[#182825] font-medium">Cargando productos...</span>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full rounded-xl border border-white/60 bg-white/78 p-12 text-center shadow-xl backdrop-blur-md">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-[#6D8EA0] text-lg font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Tabla responsiva */}
      <div className="overflow-hidden rounded-xl border border-white/60 bg-white/78 shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-linear-to-r from-[#016FB9]/10 to-[#22AED1]/10 border-b-2 border-[#6D8EA0]/35">
                <th className="px-4 py-3 text-left text-sm font-bold text-[#182825]">Código</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[#182825]">Nombre</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-[#182825]">Cantidad</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-[#182825]">Precio Unit.</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-[#182825]">Stock Total</th>
                <th className="px-4 py-3 text-center text-sm font-bold text-[#182825]">Estado</th>
                <th className="px-4 py-3 text-center text-sm font-bold text-[#182825]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#6D8EA0]/25">
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
                const bgColor = idx % 2 === 0 ? 'bg-[#6D8EA0]/10' : 'bg-white';
                const hoverBg = isHighlighted 
                  ? 'bg-[#22AED1]/18 ring-2 ring-[#22AED1]' 
                  : matchesQuery 
                  ? 'bg-[#016FB9]/12' 
                  : '';

                return (
                  <tr 
                    key={product.id} 
                    id={`product-row-${product.id}`}
                    className={`${bgColor} ${hoverBg} hover:bg-[#6D8EA0]/18 transition-colors duration-200`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <code className="bg-[#6D8EA0]/20 px-2 py-1 rounded text-sm font-mono font-semibold text-[#182825]">
                        {product.code}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-[#182825]">{product.name}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-[#182825]">
                      {formatQuantity(product.quantity)}
                    </td>
                    <td className="px-4 py-3 text-right text-[#182825]">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-[#016FB9]">
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
                          className="p-2 rounded-lg hover:bg-[#016FB9]/14 transition-colors duration-200"
                          title="Editar producto"
                          aria-label={`Editar ${product.name}`}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => onDelete && onDelete(product.id)}
                          className="p-2 rounded-lg hover:bg-[#6D8EA0]/28 transition-colors duration-200"
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
      <div className="bg-linear-to-r from-[#016FB9]/10 to-[#22AED1]/10 rounded-xl p-4 border border-[#6D8EA0]/35">
        <p className="text-sm font-semibold text-[#182825]">
          📊 Total de productos: <span className="text-[#016FB9] text-lg">{products.length}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductTable;