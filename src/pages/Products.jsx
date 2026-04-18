/**
 * Products.jsx
 * Página principal - Listado y gestión de productos
 */

import { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import MovementForm from '../components/MovementForm';
import MovementTable from '../components/MovementTable';
import AlertsPanel from '../components/AlertsPanel';
import ReportsPanel from '../components/ReportsPanel';
import { useProducts } from '../hooks/useProducts';

export const Products = () => {
  const {
    products,
    movements,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    addProduct,
    addMovement,
    updateProductItem,
    deleteProductItem,
    stats,
    reportSummary,
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

  const handleAddProduct = async (productData) => {
    const result = editingProductId
      ? await updateProductItem(editingProductId, productData)
      : await addProduct(productData);

    if (result.success) {
      if (editingProductId) {
        setEditingProductId(null);
      }
      await refreshProducts();
    }

    return result;
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

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      const result = await deleteProductItem(productId);
      if (result.success) {
        await refreshProducts();
      } else {
        alert('Error: ' + result.error);
      }
    }
  };

  const handleAddMovement = async (movementData) => {
    const result = await addMovement(movementData);
    if (result.success) {
      await refreshProducts();
    }
    return result;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#182825] via-[#016FB9] to-[#6D8EA0]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#22AED1]/30 blur-3xl"></div>
        <div className="absolute top-24 -right-20 h-96 w-96 rounded-full bg-[#016FB9]/45 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#6D8EA0]/38 blur-3xl"></div>
        <div className="absolute bottom-24 right-1/3 h-64 w-64 rounded-full bg-[#22AED1]/26 blur-3xl"></div>
      </div>
      <Header stats={stats} />
      
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmitSearch={handleSubmitSearch}
        placeholder="Buscar por nombre, código, cantidad o precio..."
      />

      {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-4">
          <div className="bg-white/85 border-l-4 border-[#016FB9] text-[#182825] p-4 rounded-lg">
            <p className="font-semibold">⚠️ {error}</p>
          </div>
        </div>
      )}

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Sección de Formulario */}
        {showForm && (
          <section className="animate-in fade-in duration-300">
            <ProductForm 
              onSubmit={handleAddProduct}
              existingProducts={products}
              isLoading={loading}
              initialData={productBeingEdited}
              isEditing={Boolean(productBeingEdited)}
              onCancelEdit={handleCancelEdit}
            />
          </section>
        )}

        {/* Sección de Productos */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">Inventario de Productos</h2>
              <p className="text-white/85 text-sm mt-1">Gestiona todos tus productos en un solo lugar</p>
            </div>
            <button 
              className="w-full sm:w-auto px-6 py-2 bg-[#22AED1] text-[#182825] font-semibold rounded-lg hover:bg-[#6D8EA0] hover:text-white transition-all"
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
        </section>

        {/* Sección de Movimientos */}
        <section className="space-y-4">
          <MovementForm
            products={products}
            onSubmit={handleAddMovement}
            isLoading={loading}
          />
        </section>

        {/* Sección de Alertas */}
        <section>
          <AlertsPanel criticalProducts={reportSummary.criticalProducts} />
        </section>

        {/* Sección de Reportes */}
        <section>
          <ReportsPanel reportSummary={reportSummary} />
        </section>

        {/* Sección de Tabla de Movimientos */}
        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Historial de Movimientos</h2>
            <p className="text-white/85 text-sm">Registro completo de entradas y salidas</p>
          </div>
          <MovementTable movements={movements} />
        </section>
      </main>
    </div>
  );
};

export default Products;