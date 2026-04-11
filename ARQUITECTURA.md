# ARQUITECTURA LIMPIA - Control de Inventario

## 📐 Principios de Arquitectura

Este proyecto sigue los principios de **Arquitectura Limpia** separando las responsabilidades en capas:

1. **Presentation Layer** (Componentes React)
2. **Business Logic Layer** (Services + Hooks)
3. **Data Layer** (localStorage)

> Estado actual (60%): aplicación frontend funcional sin backend.
> Plan del 40% restante: backend opcional para persistencia centralizada y migración técnica a TypeScript + Tailwind.

---

## 📁 Estructura del Proyecto

Trabajo_2_Empresariales/
├── src/
│   ├── components/           # Componentes reutilizables (Presentación)
│   │   ├── Header.jsx        # Encabezado con estadísticas
│   │   ├── SearchBar.jsx     # Barra de búsqueda
│   │   ├── ProductForm.jsx   # Formulario de productos
│   │   └── ProductTable.jsx  # Tabla de productos
│   │
│   ├── pages/                # Páginas principales
│   │   └── Products.jsx      # Página de productos
│   │
│   ├── services/             # Lógica de negocio (Business Logic)
│   │   ├── storageService.js # Abstracción de localStorage
│   │   └── productService.js # Lógica de operaciones con productos
│   │
│   ├── hooks/                # Custom Hooks (Composición de lógica)
│   │   └── useProducts.js    # Hook para gestionar estado de productos
│   │
│   ├── styles/               # Estilos globales
│   │   ├── variables.css     # Sistema de diseño (colores, espacios)
│   │   ├── globals.css       # Estilos base
│   │   └── components.css    # Estilos de componentes
│   │
│   ├── utils/                # Utilidades (Funciones puras)
│   │   ├── validators.js     # Validaciones de formularios
│   │   └── formatters.js     # Formateo de datos para presentación
│   │
│   ├── App.jsx               # Componente raíz
│   └── main.jsx              # Punto de entrada
│
├── package.json              # Dependencias
├── vite.config.js            # Configuración de Vite
└── README.md                 # Documentación

---

## 🏗️ Capas de Arquitectura

### 1. **Data Layer** (`services/storageService.js`)

**Responsabilidad**: Abstracción de localStorage
```javascript
// Interfaz pública
- getProducts()        → Obtiene productos
- setProducts(data)    → Guarda productos
- getMovements()       → Obtiene movimientos
- setMovements(data)   → Guarda movimientos
- clearAllData()       → Limpia todo
```

**Ventajas**:
- Si cambias localStorage a API REST, solo cambias este archivo
- El resto de la app no se afecta
- Encapsulación de detalles de almacenamiento

---

### 2. **Business Logic Layer** (`services/productService.js`)

**Responsabilidad**: Lógica de aplicación independiente de la vista
```javascript
// CRUD Operations
- createProduct(data)     → Crea producto con ID
- getAllProducts()        → Obtiene todos
- getProductById(id)      → Obtiene por ID
- updateProduct(id, data) → Actualiza
- deleteProduct(id)       → Elimina

// Queries/Analytics
- searchProducts(query)    → Búsqueda
- getLowStockProducts()   → Productos con stock bajo
- getTotalInventoryValue() → Valor total
- getInventoryStats()     → Estadísticas generales
```

**Ventajas**:
- Lógica pura, sin dependencias de React
- Fácil de testear (unit tests)
- Reutilizable en diferentes interfaces (web, mobile, CLI)

---

### 3. **Composition Layer** (`hooks/useProducts.js`)

**Responsabilidad**: Conectar Business Logic con React
```javascript
// Hook personalizado que:
- Maneja estado (useState)
- Carga datos iniciales (useEffect)
- Encapsula operaciones CRUD
- Calcula datos derivados (stats, filtros)
```

**Ventajas**:
- Lógica estatal reutilizable entre componentes
- Separación clara entre estado y presentación
- Fácil de testear

---

### 4. **Presentation Layer** (`components/` y `pages/`)

**Responsabilidad**: Mostrar UI y capturar interacciones

**Componentes**:
- `Header.jsx` - Muestra estadísticas
- `SearchBar.jsx` - Barra de búsqueda
- `ProductForm.jsx` - Formulario con validaciones
- `ProductTable.jsx` - Tabla de datos

**Características**:
- Props-driven (datos como parámetros)
- No contienen lógica de negocio
- Fácil de modificar estilos sin afectar lógica
- Accesibles (ARIA labels, etc.)

---

## 🔄 Flujo de Datos

User Interaction
↓
Component (ProductForm.jsx)
↓
Hook (useProducts.js)
↓
Service (productService.js)
↓
Storage (storageService.js)
↓
localStorage
↓
(respuesta en reverso)
↓
React re-render

---

## 📦 Dependencias

### Producción
- `react@^18.2.0` - Librería de UI
- `react-dom@^18.2.0` - Renderizado en DOM

### Desarrollo
- `vite@^5.0.8` - Build tool (rápido y moderno)
- `@vitejs/plugin-react@^4.2.1` - Plugin de React para Vite

**¿Por qué Vite?**
- Desarrollo ultra-rápido (HMR en <100ms)
- Build eficiente
- Sin webpack complexity
- Excelente para proyectos medianos

---

## 🚀 Sprint 1 (60%) - Funcionalidades Incluidas

✅ **Agregar Productos**
- Formulario con validaciones
- Código único
- Nombre, cantidad, precio

✅ **Listar Productos**
- Tabla responsive
- Información de stock
- Cálculo de valores

✅ **Búsqueda**
- Por nombre o código
- En tiempo real
- Visualización de resultados

✅ **Eliminar Productos**
- Con confirmación
- Elimina datos de localStorage

✅ **Estadísticas Básicas**
- Total de productos
- Stock bajo
- Total de items

---

## ⏳ Sprint 2-5 (40%) - Funcionalidades Pendientes

⏳ **Registrar Movimientos**
- Entradas/salidas de stock
- Historial de cambios

⏳ **Editar Productos**
- Modificar datos
- Actualizar cantidades

⏳ **Reportes Avanzados**
- Por rango de fechas
- Exportar a CSV/PDF

⏳ **Alertas**
- Stock bajo
- Vencimiento (si aplica)

⏳ **Backend Opcional (Mejora de Entrega Final)**
- API REST básica con Node.js + Express
- Persistencia con SQLite
- Integración gradual manteniendo compatibilidad con localStorage

⏳ **Migración Técnica (Mejora de Entrega Final)**
- Migración progresiva de JavaScript a TypeScript
- Migración de estilos actuales a Tailwind CSS
- Mantener compatibilidad funcional durante la transición

---

## 📝 Decisiones de Diseño

| Decisión | Razón |
|----------|-------|
| **Services + Hooks** | Separar lógica de estado (composición) |
| **CSS Variables** | Sistema de diseño consistente y mantenible |
| **Validación en Services** | Reutilizable en cualquier interface |
| **localStorage** | Sprint 1: sin backend, offline first |
| **Vite** | Build rápido, desarrollo ágil |
| **Sin UI Framework** | Control total, bundle pequeño, aprendizaje |

---

## 🔧 Extensibilidad - Cómo Agregar Backend

> Nota: esta sección describe la ruta de evolución para el 40% restante, no una funcionalidad ya implementada en el 60%.

### Para cambiar almacenamiento a API REST:

**1. Modificar solo `storageService.js`**:
```javascript
// Antes: localStorage
export const getProducts = () => localStorage.getItem('...');

// Después: API
export const getProducts = async () => {
  const response = await fetch('/api/products');
  return response.json();
};
```

**2. Actualizar `useProducts.js` si necesario**:
```javascript
useEffect(() => {
  getProducts().then(setProducts); // Ahora es async
}, []);
```

**3. El resto de la app sigue igual** ✨
