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
    <div className="product-form-container">
      <h2>{isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
      
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="code">Código del Producto *</label>
            <input
              id="code"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="ej: PROD-001"
              disabled={isLoading}
              className={errors.code ? 'input-error' : ''}
            />
            {errors.code && <span className="error-message">{errors.code}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name">Nombre del Producto *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ej: Laptop HP"
              disabled={isLoading}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quantity">Cantidad Inicial *</label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="ej: 50"
              min="0"
              disabled={isLoading}
              className={errors.quantity ? 'input-error' : ''}
            />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Precio Unitario (CLP) *</label>
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
              className={errors.price ? 'input-error' : ''}
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>
        </div>

        {submitMessage && (
          <div className={`form-message ${submitMessage.startsWith('✓') ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        )}

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : isEditing ? '✓ Guardar Cambios' : '+ Agregar Producto'}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
              disabled={isLoading}
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;