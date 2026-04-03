/**
 * productService.js
 * Lógica de negocio para gestión de productos
 */

import { getProducts, setProducts } from './storageService';

export const createProduct = (productData) => {
  const products = getProducts();
  const id = Date.now().toString();
  
  const newProduct = {
    id,
    ...productData,
    quantity: parseInt(productData.quantity) || 0,
    price: parseFloat(productData.price) || 0,
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
  return products.filter(p => p.quantity < 10);
};

export const getTotalInventoryValue = () => {
  const products = getProducts();
  return products.reduce((total, p) => total + (p.quantity * p.price), 0);
};

export const getInventoryStats = () => {
  const products = getProducts();
  
  return {
    totalProducts: products.length,
    lowStockCount: products.filter(p => p.quantity < 10).length,
    outOfStockCount: products.filter(p => p.quantity === 0).length,
    totalValue: getTotalInventoryValue(),
    totalItems: products.reduce((sum, p) => sum + p.quantity, 0)
  };
};