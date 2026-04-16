import React from 'react';
import { formatDateTime } from '../utils/formatters';

export const MovementTable = ({ movements = [] }) => {
  const limitedMovements = movements.slice(0, 20);

  if (!movements.length) {
    return (
      <div className="w-full rounded-xl border border-white/60 bg-white/75 p-12 text-center shadow-xl backdrop-blur-md">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-gray-500 text-lg font-medium">No hay movimientos registrados aún</p>
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
              <tr className="bg-linear-to-r from-orange-50 to-amber-50 border-b-2 border-orange-100">
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Producto</th>
                <th className="px-4 py-3 text-center text-sm font-bold text-gray-700">Tipo</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Cantidad</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Antes</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">Después</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Motivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {limitedMovements.map((movement, idx) => {
                const bgColor = idx % 2 === 0 ? 'bg-gray-50' : 'bg-white';
                const isEntrada = movement.type === 'entrada';
                const typeColor = isEntrada ? 'text-green-600' : 'text-orange-600';
                const typeEmoji = isEntrada ? '📥' : '📦';
                const typeLabel = isEntrada ? 'Entrada' : 'Salida';
                
                // Manejar ambos formatos de fecha (createdAt y created_at)
                const dateField = movement.created_at || movement.createdAt;

                return (
                  <tr key={movement.id} className={`${bgColor} hover:bg-gray-100 transition-colors duration-200`}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {formatDateTime(dateField)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono font-semibold text-gray-800 w-fit mb-1">
                          {movement.productCode}
                        </code>
                        <span className="text-sm font-medium text-gray-800">{movement.productName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        isEntrada 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {typeEmoji} {typeLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-gray-800">{movement.quantity}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {movement.previous_quantity || movement.previousQuantity || 0}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-blue-600">
                        {movement.new_quantity || movement.newQuantity || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-700">{movement.reason}</span>
                        {(movement.reference || movement.reference) && (
                          <span className="text-xs text-gray-500">
                            Ref: {movement.reference}
                          </span>
                        )}
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
      <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
        <p className="text-sm font-semibold text-gray-700">
          📊 Mostrando: <span className="text-orange-600 text-lg">{limitedMovements.length}</span> de <span className="text-blue-600 text-lg">{movements.length}</span> movimientos
        </p>
      </div>
    </div>
  );
};

export default MovementTable;
