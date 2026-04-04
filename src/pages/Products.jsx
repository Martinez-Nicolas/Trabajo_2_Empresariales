/**
 * Products.jsx
 * Página principal - Listado y gestión de productos
 */

import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import { useProducts } from '../hooks/useProducts';

export const Products = () => {
  const {
    products,
    filteredProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    addProduct,
    deleteProductItem,
    stats,
    refreshProducts
  } = useProducts();

  const [showForm, setShowForm] = useState(true);

  const handleAddProduct = (productData) => {
    const result = addProduct(productData);
    if (result.success) {
      refreshProducts();
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      const result = deleteProductItem(productId);
      if (result.success) {
        refreshProducts();
      } else {
        alert('Error: ' + result.error);
      }
    }
  };

  return (
    <div className="products-page">
      <Header stats={stats} />
      
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Buscar por nombre o código..."
      />

      {error && (
        <div className="error-banner">
          <p>⚠️ {error}</p>
        </div>
      )}

      {showForm && (
        <ProductForm 
          onSubmit={handleAddProduct}
          existingProducts={products}
          isLoading={loading}
        />
      )}

      <div className="products-section">
        <div className="section-header">
          <h2>Inventario de Productos</h2>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '▼ Ocultar Formulario' : '+ Mostrar Formulario'}
          </button>
        </div>

        <ProductTable 
          products={filteredProducts}
          onDelete={handleDeleteProduct}
          isLoading={loading}
          emptyMessage={
            searchQuery 
              ? `No se encontraron productos que coincidan con "${searchQuery}"`
              : "No hay productos registrados. ¡Agrega uno para comenzar!"
          }
        />
      </div>
    </div>
  );
};

export default Products;