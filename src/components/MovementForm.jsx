import { useMemo, useState } from 'react';
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
    () => products.find(product => Number(product.id) === Number(formData.productId)) || null,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    const payload = {
      ...formData,
      productId: Number(formData.productId),
      quantity: parseInt(formData.quantity, 10)
    };

    const validation = validateMovement(payload, products);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const result = await onSubmit(payload);

    if (result.success) {
      setMessage('✓ Movimiento registrado correctamente');
      resetForm();
    } else {
      setMessage(`✗ ${result.error || 'No se pudo registrar el movimiento'}`);
    }
  };

  if (!products.length) {
    return (
      <div className="w-full rounded-xl border border-white/60 bg-white/78 p-8 text-center shadow-xl backdrop-blur-md">
        <div className="text-4xl mb-3">📦</div>
        <p className="text-[#182825] font-medium">Debes crear al menos un producto para registrar movimientos</p>
      </div>
    );
  }

  const estimatedStock = selectedProduct && formData.quantity
    ? formData.type === 'entrada'
      ? selectedProduct.quantity + (parseInt(formData.quantity, 10) || 0)
      : selectedProduct.quantity - (parseInt(formData.quantity, 10) || 0)
    : null;

  return (
    <div className="w-full rounded-xl border border-white/60 bg-white/78 p-6 shadow-xl backdrop-blur-md hover:shadow-2xl transition-shadow">
      <h2 className="text-2xl font-bold text-[#182825] mb-6 flex items-center gap-2">
        <span className="text-2xl">📤</span>
        Registrar Movimiento de Stock
      </h2>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Fila 1: Producto y Tipo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="movement-product" className="text-sm font-semibold text-[#182825] mb-2">
              Producto <span className="text-[#016FB9]">*</span>
            </label>
            <select
              id="movement-product"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                errors.productId 
                  ? 'border-[#182825] bg-[#6D8EA0]/12 text-[#182825]' 
                  : 'border-[#6D8EA0]/65 focus:border-[#016FB9]'
              }`}
            >
              <option value="">Selecciona un producto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.code} - {product.name} (Stock: {product.quantity})
                </option>
              ))}
            </select>
            {errors.productId && <span className="text-[#182825] text-sm mt-1 font-medium">{errors.productId}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="movement-type" className="text-sm font-semibold text-[#182825] mb-2">
              Tipo de Movimiento <span className="text-[#016FB9]">*</span>
            </label>
            <select
              id="movement-type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                errors.type 
                  ? 'border-[#182825] bg-[#6D8EA0]/12 text-[#182825]' 
                  : 'border-[#6D8EA0]/65 focus:border-[#016FB9]'
              }`}
            >
              <option value="entrada">📥 Entrada (Compra)</option>
              <option value="salida">📦 Salida (Venta)</option>
            </select>
            {errors.type && <span className="text-[#182825] text-sm mt-1 font-medium">{errors.type}</span>}
          </div>
        </div>

        {/* Fila 2: Cantidad y Referencia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="movement-quantity" className="text-sm font-semibold text-[#182825] mb-2">
              Cantidad <span className="text-[#016FB9]">*</span>
            </label>
            <input
              id="movement-quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                errors.quantity 
                  ? 'border-[#182825] bg-[#6D8EA0]/12 text-[#182825]' 
                  : 'border-[#6D8EA0]/65 focus:border-[#016FB9]'
              }`}
              placeholder="Ej: 12"
            />
            {errors.quantity && <span className="text-[#182825] text-sm mt-1 font-medium">{errors.quantity}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="movement-reference" className="text-sm font-semibold text-[#182825] mb-2">
              Referencia
            </label>
            <input
              id="movement-reference"
              name="reference"
              type="text"
              value={formData.reference}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-lg border-2 border-[#6D8EA0]/65 focus:outline-none focus:border-[#016FB9] transition-all"
              placeholder="Factura, guía, pedido, etc."
            />
          </div>
        </div>

        {/* Motivo */}
        <div className="flex flex-col">
          <label htmlFor="movement-reason" className="text-sm font-semibold text-[#182825] mb-2">
            Motivo <span className="text-[#016FB9]">*</span>
          </label>
          <textarea
            id="movement-reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            disabled={isLoading}
            rows={2}
            className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all resize-none ${
              errors.reason 
                ? 'border-[#182825] bg-[#6D8EA0]/12 text-[#182825]' 
                : 'border-[#6D8EA0]/65 focus:border-[#016FB9]'
            }`}
            placeholder="Ej: Venta mostrador / Reposición proveedor"
          />
          {errors.reason && <span className="text-[#182825] text-sm mt-1 font-medium">{errors.reason}</span>}
        </div>

        {/* Vista previa del stock */}
        {selectedProduct && (
          <div className="bg-linear-to-r from-[#016FB9]/10 to-[#22AED1]/10 border border-[#6D8EA0]/45 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#182825] font-medium">Stock actual:</span>
              <span className="text-lg font-bold text-[#016FB9]">{selectedProduct.quantity} unidades</span>
            </div>
            {formData.quantity && estimatedStock !== null && (
              <div className="flex justify-between items-center">
                <span className="text-[#182825] font-medium">Stock después del movimiento:</span>
                <span className={`text-lg font-bold ${
                  estimatedStock < 0 ? 'text-[#182825]' : 'text-[#22AED1]'
                }`}>
                  {estimatedStock} unidades {estimatedStock < 0 && '⚠️'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Mensaje de éxito/error */}
        {message && (
          <div className={`p-4 rounded-lg text-sm font-semibold ${
            message.startsWith('✓') 
              ? 'bg-[#22AED1]/15 text-[#016FB9] border border-[#22AED1]/40' 
              : 'bg-[#6D8EA0]/20 text-[#182825] border border-[#182825]/40'
          }`}>
            {message}
          </div>
        )}

        {/* Botón de envío */}
        <button 
          type="submit" 
          disabled={isLoading || !products.length}
          className="w-full px-6 py-3 bg-linear-to-r from-[#016FB9] to-[#22AED1] text-white font-semibold rounded-lg hover:from-[#015d9b] hover:to-[#1b9fc0] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          {isLoading ? '⏳ Registrando...' : '📤 Registrar Movimiento'}
        </button>
      </form>
    </div>
  );
};

export default MovementForm;
