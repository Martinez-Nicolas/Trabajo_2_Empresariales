/**
 * productService.js
 * Lógica de negocio para gestión de productos y movimientos
 */

import { getProducts, setProducts, getMovements, setMovements } from './storageService';

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

export const createProduct = (productData) => {
  const products = getProducts();
  const id = Date.now().toString();
  
  const newProduct = {
    id,
    ...productData,
    quantity: safeParseInt(productData.quantity),
    price: safeParseFloat(productData.price),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  products.push(newProduct);
  setProducts(products);
  
  return newProduct;
};

export const getAllProducts = () => {
  return getProducts();
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find(p => p.id === id) || null;
};

export const updateProduct = (id, updateData) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...updateData,
    id: products[index].id,
    createdAt: products[index].createdAt,
    updatedAt: new Date().toISOString()
  };
  
  setProducts(products);
  return products[index];
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const initialLength = products.length;
  const filtered = products.filter(p => p.id !== id);
  
  if (filtered.length === initialLength) {
    return false;
  }
  
  setProducts(filtered);
  return true;
};

export const searchProducts = (query) => {
  if (!query || query.trim() === '') {
    return getAllProducts();
  }
  
  const products = getProducts();
  const searchTerm = query.toLowerCase();
  
  return products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.code.toLowerCase().includes(searchTerm)
  );
};

export const getLowStockProducts = () => {
  const products = getProducts();
  return products.filter(p => p.quantity < LOW_STOCK_THRESHOLD);
};

export const getTotalInventoryValue = () => {
  const products = getProducts();
  return products.reduce((total, p) => total + (p.quantity * p.price), 0);
};

export const getInventoryStats = () => {
  const products = getProducts();
  const movements = getMovements();
  const today = new Date().toISOString().slice(0, 10);
  const movementToday = movements.filter(m => m.createdAt?.slice(0, 10) === today);
  const criticalCount = products.filter(p => p.quantity === 0).length;
  
  return {
    totalProducts: products.length,
    lowStockCount: products.filter(p => p.quantity < LOW_STOCK_THRESHOLD).length,
    outOfStockCount: criticalCount,
    totalValue: getTotalInventoryValue(),
    totalItems: products.reduce((sum, p) => sum + p.quantity, 0),
    movementCountToday: movementToday.length,
    criticalCount
  };
};

export const createMovement = (movementData) => {
  const products = getProducts();
  const movements = getMovements();

  const productIndex = products.findIndex(p => p.id === movementData.productId);
  if (productIndex === -1) {
    throw new Error('Producto no encontrado');
  }

  const quantity = safeParseInt(movementData.quantity);
  if (quantity <= 0) {
    throw new Error('La cantidad del movimiento debe ser mayor que cero');
  }

  const movementType = movementData.type === 'entrada' ? 'entrada' : 'salida';
  const currentProduct = products[productIndex];
  const delta = movementType === 'entrada' ? quantity : -quantity;
  const nextQuantity = currentProduct.quantity + delta;

  if (nextQuantity < 0) {
    throw new Error('No hay stock suficiente para realizar esta salida');
  }

  products[productIndex] = {
    ...currentProduct,
    quantity: nextQuantity,
    updatedAt: new Date().toISOString()
  };

  const newMovement = {
    id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    productId: currentProduct.id,
    productCode: currentProduct.code,
    productName: currentProduct.name,
    type: movementType,
    quantity,
    previousQuantity: currentProduct.quantity,
    newQuantity: nextQuantity,
    reason: movementData.reason?.trim() || 'Sin detalle',
    reference: movementData.reference?.trim() || '',
    createdAt: new Date().toISOString()
  };

  movements.push(newMovement);
  setProducts(products);
  setMovements(movements);

  return {
    movement: newMovement,
    product: products[productIndex]
  };
};

export const getAllMovements = () => {
  return getMovements().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getMovementsByProduct = (productId) => {
  return getAllMovements().filter(movement => movement.productId === productId);
};

export const getTopOutgoingProducts = (limit = 5) => {
  const outgoing = getAllMovements().filter(movement => movement.type === 'salida');
  const byProduct = outgoing.reduce((acc, movement) => {
    if (!acc[movement.productId]) {
      acc[movement.productId] = {
        productId: movement.productId,
        productCode: movement.productCode,
        productName: movement.productName,
        quantity: 0,
        count: 0
      };
    }

    acc[movement.productId].quantity += movement.quantity;
    acc[movement.productId].count += 1;
    return acc;
  }, {});

  return Object.values(byProduct)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);
};

export const getInactiveProducts = (days = 15) => {
  const products = getProducts();
  const movements = getMovements();
  const now = new Date();
  const threshold = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return products
    .filter(product => {
      const productMovements = movements
        .filter(movement => movement.productId === product.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      if (!productMovements.length) {
        return true;
      }

      return new Date(productMovements[0].createdAt) < threshold;
    })
    .map(product => ({
      ...product,
      reorderSuggestion: Math.max(TARGET_STOCK_THRESHOLD - product.quantity, 0)
    }));
};

export const getCriticalProducts = () => {
  const products = getProducts();

  return products
    .filter(product => product.quantity < LOW_STOCK_THRESHOLD)
    .map(product => ({
      ...product,
      severity: product.quantity === 0 ? 'critico' : 'bajo',
      reorderSuggestion: Math.max(TARGET_STOCK_THRESHOLD - product.quantity, 0)
    }))
    .sort((a, b) => a.quantity - b.quantity);
};

export const getMovementReportSummary = () => {
  const movements = getAllMovements();
  const products = getProducts();
  const entries = movements.filter(movement => movement.type === 'entrada');
  const exits = movements.filter(movement => movement.type === 'salida');

  return {
    totalMovements: movements.length,
    totalEntries: entries.length,
    totalExits: exits.length,
    unitsIn: entries.reduce((sum, movement) => sum + movement.quantity, 0),
    unitsOut: exits.reduce((sum, movement) => sum + movement.quantity, 0),
    topOutgoingProducts: getTopOutgoingProducts(5),
    inactiveProducts: getInactiveProducts(15),
    criticalProducts: getCriticalProducts(),
    inventoryValue: products.reduce((sum, product) => sum + product.quantity * product.price, 0)
  };
};