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
    loading,
    error,
    searchQuery,
    setSearchQuery,
    addProduct,
    updateProductItem,
    deleteProductItem,
    stats,
    refreshProducts
  } = useProducts();

  const [showForm, setShowForm] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);
  const [highlightedProductId, setHighlightedProductId] = useState(null);

  const filteredProducts = products.filter((product) => {
    if (!searchQuery || searchQuery.trim() === '') return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      product.name.toLowerCase().includes(query) ||
      product.code.toLowerCase().includes(query) ||
      String(product.quantity).includes(query) ||
      String(product.price).includes(query)
    );
  });

  const productBeingEdited = products.find(p => p.id === editingProductId) || null;

  const handleAddProduct = (productData) => {
    const result = editingProductId
      ? updateProductItem(editingProductId, productData)
      : addProduct(productData);

    if (result.success) {
      if (editingProductId) {
        setEditingProductId(null);
      }
      refreshProducts();
    }
  };

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
  };

  const handleSubmitSearch = () => {
    if (!filteredProducts.length) {
      setHighlightedProductId(null);
      return;
    }

    const firstMatch = filteredProducts[0];
    setHighlightedProductId(firstMatch.id);

    const rowElement = document.getElementById(`product-row-${firstMatch.id}`);
    if (rowElement) {
      rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    window.setTimeout(() => {
      setHighlightedProductId(null);
    }, 2500);
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
        onSubmitSearch={handleSubmitSearch}
        placeholder="Buscar por nombre, código, cantidad o precio..."
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
          initialData={productBeingEdited}
          isEditing={Boolean(productBeingEdited)}
          onCancelEdit={handleCancelEdit}
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
          searchQuery={searchQuery}
          highlightedProductId={highlightedProductId}
          onEdit={handleEditProduct}
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