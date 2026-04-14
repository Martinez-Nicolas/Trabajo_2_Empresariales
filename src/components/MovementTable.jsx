import React from 'react';
import { formatDateTime } from '../utils/formatters';

export const MovementTable = ({ movements = [] }) => {
  const limitedMovements = movements.slice(0, 12);

  return (
    <div className="products-table-container">
      <div className="section-title-row">
        <h3>Ultimos Movimientos</h3>
        <span className="table-caption">Mostrando {limitedMovements.length} de {movements.length}</span>
      </div>

      {!movements.length ? (
        <div className="empty-message">No hay movimientos registrados.</div>
      ) : (
        <div className="table-responsive">
          <table className="products-table movement-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Tipo</th>
                <th className="numeric">Cant.</th>
                <th className="numeric">Antes</th>
                <th className="numeric">Despues</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {limitedMovements.map(movement => (
                <tr key={movement.id}>
                  <td>{formatDateTime(movement.createdAt)}</td>
                  <td>
                    <strong>{movement.productCode}</strong>
                    <div className="table-subtext">{movement.productName}</div>
                  </td>
                  <td>
                    <span className={`movement-badge ${movement.type === 'entrada' ? 'in' : 'out'}`}>
                      {movement.type === 'entrada' ? 'Entrada' : 'Salida'}
                    </span>
                  </td>
                  <td className="numeric">{movement.quantity}</td>
                  <td className="numeric">{movement.previousQuantity}</td>
                  <td className="numeric"><strong>{movement.newQuantity}</strong></td>
                  <td>
                    {movement.reason}
                    {movement.reference && <div className="table-subtext">Ref: {movement.reference}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MovementTable;
