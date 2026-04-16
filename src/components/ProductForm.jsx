/**
 * ProductForm.jsx
 * Formulario para crear nuevos productos
 */

import React, { useEffect, useState } from 'react';
import { validateProduct } from '../utils/validators';

export const ProductForm = ({
  onSubmit,
  existingProducts = [],
  isLoading = false,
  initialData = null,
  isEditing = false,
  onCancelEdit
}) => {
  const [formData, setFormData] = useState({
    code: initialData?.code || '',
    name: initialData?.name || '',
    quantity: initialData?.quantity?.toString() || '',
    price: initialData?.price?.toString() || ''
  });

  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        name: initialData.name || '',
        quantity: initialData.quantity?.toString() || '',
        price: initialData.price?.toString() || ''
      });
    } else {
      setFormData({
        code: '',
        name: '',
        quantity: '',
        price: ''
      });
    }
    setErrors({});
    setSubmitMessage('');
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage('');
    
    const productsForValidation = isEditing
      ? existingProducts.filter(p => p.id !== initialData?.id)
      : existingProducts;

    const validation = validateProduct(formData, productsForValidation);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    try {
      onSubmit({
        code: formData.code.trim(),
        name: formData.name.trim(),
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price)
      });

      if (!isEditing) {
        setFormData({
          code: '',
          name: '',
          quantity: '',
          price: ''
        });
      }

      setSubmitMessage(isEditing ? '✓ Producto actualizado exitosamente' : '✓ Producto agregado exitosamente');
      setTimeout(() => setSubmitMessage(''), 3000);
    } catch (error) {
      setSubmitMessage('✗ Error al guardar producto: ' + error.message);
    }
  };

  return (
    <div className="w-full rounded-xl border border-white/60 bg-white/75 p-6 shadow-xl backdrop-blur-md hover:shadow-2xl transition-shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-2xl">{isEditing ? '✏️' : '➕'}</span>
        {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
      </h2>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Fila 1: Código y Nombre */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="code" className="text-sm font-semibold text-gray-700 mb-2">
              Código del Producto <span className="text-red-500">*</span>
            </label>
            <input
              id="code"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="ej: PROD-001"
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                errors.code 
                  ? 'border-red-500 bg-red-50 text-red-900' 
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errors.code && <span className="text-red-600 text-sm mt-1 font-medium">{errors.code}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2">
              Nombre del Producto <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ej: Laptop HP"
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                errors.name 
                  ? 'border-red-500 bg-red-50 text-red-900' 
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errors.name && <span className="text-red-600 text-sm mt-1 font-medium">{errors.name}</span>}
          </div>
        </div>

        {/* Fila 2: Cantidad y Precio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="quantity" className="text-sm font-semibold text-gray-700 mb-2">
              Cantidad Inicial <span className="text-red-500">*</span>
            </label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="ej: 50"
              min="0"
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                errors.quantity 
                  ? 'border-red-500 bg-red-50 text-red-900' 
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errors.quantity && <span className="text-red-600 text-sm mt-1 font-medium">{errors.quantity}</span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-semibold text-gray-700 mb-2">
              Precio Unitario (CLP) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="ej: 9999"
              min="0"
              step="1"
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition-all ${
                errors.price 
                  ? 'border-red-500 bg-red-50 text-red-900' 
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errors.price && <span className="text-red-600 text-sm mt-1 font-medium">{errors.price}</span>}
          </div>
        </div>

        {/* Mensaje de éxito/error */}
        {submitMessage && (
          <div className={`p-4 rounded-lg text-sm font-semibold ${
            submitMessage.startsWith('✓') 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {submitMessage}
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button 
            type="submit" 
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
          >
            {isLoading ? '⏳ Guardando...' : isEditing ? '✓ Guardar Cambios' : '+ Agregar Producto'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ✕ Cancelar edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;