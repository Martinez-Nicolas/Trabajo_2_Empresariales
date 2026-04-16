import { formatDateTime } from '../utils/formatters';

export const MovementTable = ({ movements = [] }) => {
  const limitedMovements = movements.slice(0, 20);

  if (!movements.length) {
    return (
      <div className="w-full rounded-xl border border-white/60 bg-white/78 p-12 text-center shadow-xl backdrop-blur-md">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-[#6D8EA0] text-lg font-medium">No hay movimientos registrados aún</p>
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
                <th className="px-4 py-3 text-left text-sm font-bold text-[#182825]">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[#182825]">Producto</th>
                <th className="px-4 py-3 text-center text-sm font-bold text-[#182825]">Tipo</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-[#182825]">Cantidad</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-[#182825]">Antes</th>
                <th className="px-4 py-3 text-right text-sm font-bold text-[#182825]">Después</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[#182825]">Motivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#6D8EA0]/25">
              {limitedMovements.map((movement, idx) => {
                const bgColor = idx % 2 === 0 ? 'bg-[#6D8EA0]/10' : 'bg-white';
                const isEntrada = movement.type === 'entrada';
                const typeEmoji = isEntrada ? '📥' : '📦';
                const typeLabel = isEntrada ? 'Entrada' : 'Salida';
                
                // Manejar ambos formatos de fecha (createdAt y created_at)
                const dateField = movement.created_at || movement.createdAt;

                return (
                  <tr key={movement.id} className={`${bgColor} hover:bg-[#6D8EA0]/18 transition-colors duration-200`}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-[#6D8EA0]">
                      {formatDateTime(dateField)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <code className="bg-[#6D8EA0]/20 px-2 py-1 rounded text-xs font-mono font-semibold text-[#182825] w-fit mb-1">
                          {movement.productCode}
                        </code>
                        <span className="text-sm font-medium text-[#182825]">{movement.productName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        isEntrada 
                          ? 'bg-[#22AED1]/20 text-[#016FB9]' 
                          : 'bg-[#6D8EA0]/20 text-[#182825]'
                      }`}>
                        {typeEmoji} {typeLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-[#182825]">{movement.quantity}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-[#182825]">
                      {movement.previous_quantity || movement.previousQuantity || 0}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-[#016FB9]">
                        {movement.new_quantity || movement.newQuantity || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-[#182825]">{movement.reason}</span>
                        {(movement.reference || movement.reference) && (
                          <span className="text-xs text-[#6D8EA0]">
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
      <div className="bg-linear-to-r from-[#016FB9]/10 to-[#22AED1]/10 rounded-xl p-4 border border-[#6D8EA0]/35">
        <p className="text-sm font-semibold text-[#182825]">
          📊 Mostrando: <span className="text-[#6D8EA0] text-lg">{limitedMovements.length}</span> de <span className="text-[#016FB9] text-lg">{movements.length}</span> movimientos
        </p>
      </div>
    </div>
  );
};

export default MovementTable;
