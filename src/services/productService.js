/**
 * productService.js
 * Lógica de negocio para gestión de productos y movimientos
 * Ahora utiliza API backend con base de datos SQLite
 */

import * as api from './apiService';

const LOW_STOCK_THRESHOLD = 10;
const TARGET_STOCK_THRESHOLD = 20;

const safeParseInt = (value, fallback = 0) => {
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const safeParseFloat = (value, fallback = 0) => {
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

// ============ PRODUCTOS ============

export const createProduct = async (productData) => {
  const newProduct = {
    code: productData.code.trim(),
    name: productData.name.trim(),
    quantity: safeParseInt(productData.quantity),
    price: safeParseFloat(productData.price)
  };
  
  return await api.createProduct(newProduct);
};

export const getAllProducts = async () => {
  return await api.getProducts();
};

export const getProductById = async (id) => {
  return await api.getProductById(id);
};

export const updateProduct = async (id, updateData) => {
  const data = {
    code: updateData.code?.trim() || undefined,
    name: updateData.name?.trim() || undefined,
    quantity: updateData.quantity !== undefined ? safeParseInt(updateData.quantity) : undefined,
    price: updateData.price !== undefined ? safeParseFloat(updateData.price) : undefined
  };
  
  // Filtrar undefined para mantener valores existentes
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  );
  
  return await api.updateProduct(id, cleanData);
};

export const deleteProduct = async (id) => {
  return await api.deleteProduct(id);
};

export const searchProducts = async (query, products) => {
  if (!query || query.trim() === '') {
    return products || await getAllProducts();
  }
  
  const searchTerm = query.toLowerCase();
  const allProducts = products || await getAllProducts();
  
  return allProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.code.toLowerCase().includes(searchTerm)
  );
};

export const getLowStockProducts = (products) => {
  return products.filter(p => p.quantity < LOW_STOCK_THRESHOLD);
};

export const getTotalInventoryValue = (products) => {
  return products.reduce((total, p) => total + (p.quantity * p.price), 0);
};

export const getInventoryStats = (products, movements) => {
  const today = new Date().toISOString().slice(0, 10);
  const movementToday = movements.filter(m => m.created_at?.slice(0, 10) === today);
  const criticalCount = products.filter(p => p.quantity === 0).length;
  
  return {
    totalProducts: products.length,
    lowStockCount: products.filter(p => p.quantity < LOW_STOCK_THRESHOLD).length,
    outOfStockCount: criticalCount,
    totalValue: getTotalInventoryValue(products),
    totalItems: products.reduce((sum, p) => sum + p.quantity, 0),
    movementCountToday: movementToday.length,
    criticalCount
  };
};

// ============ MOVIMIENTOS ============

export const createMovement = async (movementData) => {
  const data = {
    productId: movementData.productId,
    type: movementData.type === 'entrada' ? 'entrada' : 'salida',
    quantity: safeParseInt(movementData.quantity),
    reason: movementData.reason?.trim() || 'Sin detalle',
    reference: movementData.reference?.trim() || ''
  };
  
  return await api.createMovement(data);
};

export const getAllMovements = async () => {
  const movements = await api.getMovements();
  return movements.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getMovementsByProduct = (productId, movements) => {
  return movements.filter(movement => movement.product_id === productId);
};

export const getTopOutgoingProducts = (movements, limit = 5) => {
  const outgoing = movements.filter(movement => movement.type === 'salida');
  const byProduct = outgoing.reduce((acc, movement) => {
    if (!acc[movement.product_id]) {
      acc[movement.product_id] = {
        productId: movement.product_id,
        productCode: movement.productCode,
        productName: movement.productName,
        quantity: 0,
        count: 0
      };
    }

    acc[movement.product_id].quantity += movement.quantity;
    acc[movement.product_id].count += 1;
    return acc;
  }, {});

  return Object.values(byProduct)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);
};

export const getInactiveProducts = (products, movements, days = 15) => {
  const now = new Date();
  const threshold = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return products
    .filter(product => {
      const productMovements = movements
        .filter(movement => movement.product_id === product.id)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      if (!productMovements.length) {
        return true;
      }

      return new Date(productMovements[0].created_at) < threshold;
    })
    .map(product => ({
      ...product,
      reorderSuggestion: Math.max(TARGET_STOCK_THRESHOLD - product.quantity, 0)
    }));
};

export const getCriticalProducts = (products) => {
  return products
    .filter(product => product.quantity < LOW_STOCK_THRESHOLD)
    .map(product => ({
      ...product,
      severity: product.quantity === 0 ? 'critico' : 'bajo',
      reorderSuggestion: Math.max(TARGET_STOCK_THRESHOLD - product.quantity, 0)
    }))
    .sort((a, b) => a.quantity - b.quantity);
};

export const getMovementReportSummary = (products, movements) => {
  const sortedMovements = movements.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const entries = sortedMovements.filter(movement => movement.type === 'entrada');
  const exits = sortedMovements.filter(movement => movement.type === 'salida');

  return {
    totalMovements: sortedMovements.length,
    totalEntries: entries.length,
    totalExits: exits.length,
    unitsIn: entries.reduce((sum, movement) => sum + movement.quantity, 0),
    unitsOut: exits.reduce((sum, movement) => sum + movement.quantity, 0),
    topOutgoingProducts: getTopOutgoingProducts(sortedMovements, 5),
    inactiveProducts: getInactiveProducts(products, sortedMovements, 15),
    criticalProducts: getCriticalProducts(products),
    inventoryValue: products.reduce((sum, product) => sum + product.quantity * product.price, 0)
  };
};