/**
 * apiService.js
 * Servicio de API para comunicación con el backend
 * Reemplaza al storageService para persistencia en base de datos
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Utilidades para manejo de errores
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || `Error ${response.status}: ${response.statusText}`);
  }
  
  return data;
};

// ============ PRODUCTOS ============

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

export const updateProduct = async (id, updateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

// ============ MOVIMIENTOS ============

export const getMovements = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/movements`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener movimientos:', error);
    throw error;
  }
};

export const createMovement = async (movementData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movementData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al crear movimiento:', error);
    throw error;
  }
};

// ============ SALUD ============

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al verificar salud del backend:', error);
    throw error;
  }
};
