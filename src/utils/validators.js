/**
 * validators.js
 * Funciones de validación reutilizables
 */

export const validateProductCode = (code, existingProducts = [], excludeId = null) => {
  if (!code || code.trim() === '') {
    return { isValid: false, message: 'El código es requerido' };
  }

  const codeExists = existingProducts.some(p => 
    p.code.toUpperCase() === code.toUpperCase() && p.id !== excludeId
  );

  if (codeExists) {
    return { isValid: false, message: 'Este código ya existe' };
  }

  return { isValid: true, message: '' };
};

export const validateProductName = (name) => {
  if (!name || name.trim() === '') {
    return { isValid: false, message: 'El nombre es requerido' };
  }

  if (name.length < 3) {
    return { isValid: false, message: 'El nombre debe tener al menos 3 caracteres' };
  }

  if (name.length > 100) {
    return { isValid: false, message: 'El nombre no puede exceder 100 caracteres' };
  }

  return { isValid: true, message: '' };
};

export const validateQuantity = (quantity) => {
  const num = parseInt(quantity);

  if (isNaN(num)) {
    return { isValid: false, message: 'La cantidad debe ser un número' };
  }

  if (num < 0) {
    return { isValid: false, message: 'La cantidad no puede ser negativa' };
  }

  return { isValid: true, message: '' };
};

export const validatePrice = (price) => {
  const num = parseFloat(price);

  if (isNaN(num)) {
    return { isValid: false, message: 'El precio debe ser un número' };
  }

  if (num < 0) {
    return { isValid: false, message: 'El precio no puede ser negativo' };
  }

  if (num > 999999.99) {
    return { isValid: false, message: 'El precio es muy alto' };
  }

  return { isValid: true, message: '' };
};

export const validateProduct = (productData, existingProducts = [], excludeId = null) => {
  const errors = {};

  const nameValidation = validateProductName(productData.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message;
  }

  const codeValidation = validateProductCode(productData.code, existingProducts, excludeId);
  if (!codeValidation.isValid) {
    errors.code = codeValidation.message;
  }

  const quantityValidation = validateQuantity(productData.quantity);
  if (!quantityValidation.isValid) {
    errors.quantity = quantityValidation.message;
  }

  const priceValidation = validatePrice(productData.price);
  if (!priceValidation.isValid) {
    errors.price = priceValidation.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateMovement = (movementData, products = []) => {
  const errors = {};

  if (!movementData.productId) {
    errors.productId = 'Debes seleccionar un producto';
  }

  if (!movementData.type || !['entrada', 'salida'].includes(movementData.type)) {
    errors.type = 'Tipo de movimiento inválido';
  }

  const quantity = parseInt(movementData.quantity, 10);
  if (Number.isNaN(quantity) || quantity <= 0) {
    errors.quantity = 'La cantidad debe ser mayor que cero';
  }

  if (!movementData.reason || movementData.reason.trim().length < 3) {
    errors.reason = 'Debes indicar un motivo (mínimo 3 caracteres)';
  }

  if (movementData.type === 'salida' && movementData.productId && !Number.isNaN(quantity)) {
    const product = products.find(item => item.id === movementData.productId);
    if (!product) {
      errors.productId = 'El producto seleccionado no existe';
    } else if (quantity > product.quantity) {
      errors.quantity = `Stock insuficiente. Disponible: ${product.quantity}`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};