# ARQUITECTURA LIMPIA - Control de Inventario (100%)

## 📐 Principios de Arquitectura

La solución final usa una arquitectura por capas para mantener claridad, testabilidad y evolución controlada:

1. Presentation Layer (React components)
2. Composition Layer (custom hooks)
3. Business Logic Layer (services)
4. Data Access Layer (API + SQLite)

---

## 📁 Estructura del Proyecto

```text
Trabajo_2_Empresariales/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── inventario.db
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ProductForm.jsx
│   │   ├── ProductTable.jsx
│   │   ├── MovementForm.jsx
│   │   ├── MovementTable.jsx
│   │   ├── AlertsPanel.jsx
│   │   └── ReportsPanel.jsx
│   ├── hooks/
│   │   └── useProducts.js
│   ├── services/
│   │   ├── storageService.js
│   │   └── productService.js
│   ├── utils/
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── styles/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🏗️ Capas de Arquitectura

### 1) Presentation Layer

Responsable de renderizar interfaces y capturar interacción del usuario.

Componentes clave:
- ProductForm y ProductTable
- MovementForm y MovementTable
- AlertsPanel y ReportsPanel
- Header con KPI de inventario

### 2) Composition Layer

El hook useProducts coordina estado, acciones y datos derivados:
- productos
- movimientos
- estadísticas
- resumen de reportes

### 3) Business Logic Layer

ProductService concentra reglas de negocio:
- CRUD de productos
- registro de movimientos
- validación de stock
- alertas críticas
- reportes ejecutivos

### 4) Data Access Layer

Backend Express expone API REST y persiste en SQLite:
- tabla products
- tabla movements
- integridad de stock en servidor

---

## 🔄 Flujo de Datos Final

Usuario
↓
Componente React
↓
Hook useProducts
↓
ProductService
↓
API REST (backend/server.js)
↓
SQLite (backend/inventario.db)
↓
Respuesta JSON
↓
Actualización de estado + re-render

---

## 🗃️ Modelo de Datos

### products
- id
- code
- name
- quantity
- price
- created_at
- updated_at

### movements
- id
- product_id
- type (entrada/salida)
- quantity
- reason
- reference
- previous_quantity
- new_quantity
- created_at

---

## 🔌 Endpoints de API

- GET /api/health
- GET /api/products
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
- GET /api/movements
- POST /api/movements

---

## 🧩 Decisiones de Diseño

| Decisión | Motivo |
|---|---|
| Separar frontend y backend | Escalar sin romper UI |
| SQLite | Persistencia local simple y demostrable |
| Services + hooks | Reglas centralizadas y reutilizables |
| TypeScript gradual | Migración segura sin detener entrega |
| Tailwind activo + CSS existente | Evolución visual incremental |

---

## ✅ Estado Final

- Aplicación funcional completa
- Entrada y salida de datos operativas
- Persistencia real en base de datos
- Reportes y alertas con valor para toma de decisiones
- Arquitectura modular lista para extensión
