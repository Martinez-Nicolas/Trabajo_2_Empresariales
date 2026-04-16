/**
 * storageService.js
 * Capa de abstracción para localStorage
 * Maneja la persistencia de datos con JSON
 */

const STORAGE_KEYS = {
  PRODUCTS: 'inventario_products',
  MOVEMENTS: 'inventario_movements'
};

export const getProducts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al leer productos:', error);
    return [];
  }
};

export const setProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    return true;
  } catch (error) {
    console.error('Error al guardar productos:', error);
    return false;
  }
};

export const getMovements = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MOVEMENTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al leer movimientos:', error);
    return [];
  }
};

export const setMovements = (movements) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(movements));
    return true;
  } catch (error) {
    console.error('Error al guardar movimientos:', error);
    return false;
  }
};

export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.MOVEMENTS);
    return true;
  } catch (error) {
    console.error('Error al limpiar datos:', error);
    return false;
  }
};

export const getStorageStats = () => {
  try {
    const products = getProducts();
    const movements = getMovements();
    
    let totalSize = 0;
    try {
      totalSize = new Blob(Object.values(localStorage)).size;
    } catch {
      totalSize = 0;
    }
    
    return {
      productsCount: products.length,
      movementsCount: movements.length,
      storageSizeKB: (totalSize / 1024).toFixed(2)
    };
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return { productsCount: 0, movementsCount: 0, storageSizeKB: 0 };
  }
};