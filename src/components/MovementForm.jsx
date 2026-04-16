import React, { useMemo, useState } from 'react';
import { validateMovement } from '../utils/validators';

export const MovementForm = ({ products = [], onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    productId: '',
    type: 'salida',
    quantity: '',
    reason: '',
    reference: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const selectedProduct = useMemo(
    () => products.find(product => product.id === formData.productId) || null,
    [products, formData.productId]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const resetForm = () => {
    setFormData({
      productId: '',
      type: 'salida',
      quantity: '',
      reason: '',
      reference: ''
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');

    const validation = validateMovement(formData, products);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const result = onSubmit({
      ...formData,
      quantity: parseInt(formData.quantity, 10)
    });

    if (result.success) {
      setMessage('✓ Movimiento registrado correctamente');
      resetForm();
    } else {
      setMessage(`✗ ${result.error || 'No se pudo registrar el movimiento'}`);
    }
  };

  return (
    <div className="product-form-container movement-form-container">
      <h2>Registrar Movimiento de Stock</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="movement-product">Producto *</label>
            <select
              id="movement-product"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.productId ? 'input-error' : ''}
            >
              <option value="">Selecciona un producto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.code} - {product.name} (Stock: {product.quantity})
                </option>
              ))}
            </select>
            {errors.productId && <span className="error-message">{errors.productId}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="movement-type">Tipo *</label>
            <select
              id="movement-type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.type ? 'input-error' : ''}
            >
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>
            {errors.type && <span className="error-message">{errors.type}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="movement-quantity">Cantidad *</label>
            <input
              id="movement-quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.quantity ? 'input-error' : ''}
              placeholder="Ej: 12"
            />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="movement-reference">Referencia</label>
            <input
              id="movement-reference"
              name="reference"
              type="text"
              value={formData.reference}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Factura, guía, pedido, etc."
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="movement-reason">Motivo *</label>
          <textarea
            id="movement-reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            disabled={isLoading}
            rows={2}
            className={errors.reason ? 'input-error' : ''}
            placeholder="Ej: Venta mostrador / Reposición proveedor"
          />
          {errors.reason && <span className="error-message">{errors.reason}</span>}
        </div>

        {selectedProduct && (
          <div className="movement-preview">
            <p>
              Stock actual: <strong>{selectedProduct.quantity}</strong>
            </p>
            {formData.quantity && (
              <p>
                Stock estimado: <strong>
                  {formData.type === 'entrada'
                    ? selectedProduct.quantity + (parseInt(formData.quantity, 10) || 0)
                    : selectedProduct.quantity - (parseInt(formData.quantity, 10) || 0)}
                </strong>
              </p>
            )}
          </div>
        )}

        {message && (
          <div className={`form-message ${message.startsWith('✓') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={isLoading || !products.length}>
            {isLoading ? 'Guardando...' : 'Registrar Movimiento'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovementForm;
