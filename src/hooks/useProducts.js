/**
 * useProducts.js
 * Custom hook para gestión de productos
 * Ahora funciona con API backend
 */

import { useState, useCallback, useEffect } from 'react';
import * as productService from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Cargar datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [loadedProducts, loadedMovements] = await Promise.all([
          productService.getAllProducts(),
          productService.getAllMovements()
        ]);
        setProducts(loadedProducts || []);
        setMovements(loadedMovements || []);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar datos: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addProduct = useCallback(async (productData) => {
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return { success: true, product: newProduct };
    } catch (err) {
      const errorMsg = 'Error al agregar producto: ' + err.message;
      setError(errorMsg);
      return { success: false, error: err.message };
    }
  }, []);

  const updateProductItem = useCallback(async (id, updateData) => {
    try {
      const updated = await productService.updateProduct(id, updateData);
      if (updated) {
        setProducts(prev => 
          prev.map(p => p.id === id ? updated : p)
        );
        return { success: true, product: updated };
      }
      return { success: false, error: 'Producto no encontrado' };
    } catch (err) {
      const errorMsg = 'Error al actualizar producto: ' + err.message;
      setError(errorMsg);
      return { success: false, error: err.message };
    }
  }, []);

  const deleteProductItem = useCallback(async (id) => {
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (err) {
      const errorMsg = 'Error al eliminar producto: ' + err.message;
      setError(errorMsg);
      return { success: false, error: err.message };
    }
  }, []);

  const addMovement = useCallback(async (movementData) => {
    try {
      const result = await productService.createMovement(movementData);
      const [updatedProducts, updatedMovements] = await Promise.all([
        productService.getAllProducts(),
        productService.getAllMovements()
      ]);
      setProducts(updatedProducts || []);
      setMovements(updatedMovements || []);
      return { success: true, movement: result };
    } catch (err) {
      const errorMsg = 'Error al registrar movimiento: ' + err.message;
      setError(errorMsg);
      return { success: false, error: err.message };
    }
  }, []);

  const searchProductsHandler = useCallback((query) => {
    setSearchQuery(query);
    if (!query || query.trim() === '') {
      return products;
    }
    return productService.searchProducts(query, products);
  }, [products]);

  const filteredProducts = searchQuery ? 
    productService.searchProducts(searchQuery, products) : 
    products;

  const stats = productService.getInventoryStats(products, movements);
  const lowStockProducts = productService.getLowStockProducts(products);
  const reportSummary = productService.getMovementReportSummary(products, movements);

  const refreshProducts = useCallback(async () => {
    try {
      const [updatedProducts, updatedMovements] = await Promise.all([
        productService.getAllProducts(),
        productService.getAllMovements()
      ]);
      setProducts(updatedProducts || []);
      setMovements(updatedMovements || []);
    } catch (err) {
      console.error('Error al refrescar datos:', err);
      setError('Error al refrescar datos: ' + err.message);
    }
  }, []);

  return {
    products,
    movements,
    filteredProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    addProduct,
    updateProductItem,
    deleteProductItem,
    addMovement,
    searchProductsHandler,
    stats,
    lowStockProducts,
    reportSummary,
    refreshProducts
  };
};