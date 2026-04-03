/**
 * useProducts.js
 * Custom hook para gestión de productos
 */

import { useState, useCallback, useEffect } from 'react';
import * as productService from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const loadedProducts = productService.getAllProducts();
      setProducts(loadedProducts);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar productos: ' + err.message);
      setLoading(false);
    }
  }, []);

  const addProduct = useCallback((productData) => {
    try {
      const newProduct = productService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return { success: true, product: newProduct };
    } catch (err) {
      setError('Error al agregar producto: ' + err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const updateProductItem = useCallback((id, updateData) => {
    try {
      const updated = productService.updateProduct(id, updateData);
      if (updated) {
        setProducts(prev => 
          prev.map(p => p.id === id ? updated : p)
        );
        return { success: true, product: updated };
      }
      return { success: false, error: 'Producto no encontrado' };
    } catch (err) {
      setError('Error al actualizar producto: ' + err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const deleteProductItem = useCallback((id) => {
    try {
      const deleted = productService.deleteProduct(id);
      if (deleted) {
        setProducts(prev => prev.filter(p => p.id !== id));
        return { success: true };
      }
      return { success: false, error: 'Producto no encontrado' };
    } catch (err) {
      setError('Error al eliminar producto: ' + err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const searchProductsHandler = useCallback((query) => {
    setSearchQuery(query);
    if (!query || query.trim() === '') {
      return products;
    }
    return productService.searchProducts(query);
  }, [products]);

  const filteredProducts = searchQuery ? 
    productService.searchProducts(searchQuery) : 
    products;

  const stats = productService.getInventoryStats();
  const lowStockProducts = productService.getLowStockProducts();

  return {
    products,
    filteredProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    addProduct,
    updateProductItem,
    deleteProductItem,
    searchProductsHandler,
    stats,
    lowStockProducts,
    refreshProducts: () => {
      const updated = productService.getAllProducts();
      setProducts(updated);
    }
  };
};