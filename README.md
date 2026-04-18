# 📦 Control Simple de Inventario - Entrega Final (100%)

Aplicación empresarial mínima y funcional para gestión de inventario, con frontend moderno y backend conectado a base de datos SQLite.

**Estado**: ✅ Proyecto completado al 100%
**Versión**: 1.0.0
**Autores**: Nicolas Martinez y Martin Sanhueza

---

## 🎯 Resultado Final

La aplicación resuelve el problema planteado con flujo completo de entrada y salida de datos:

- Registro de productos
- Registro de entradas y salidas de stock
- Cálculo de stock en tiempo real
- Alertas de inventario crítico
- Reporte ejecutivo y trazabilidad de movimientos
- Persistencia en base de datos SQLite mediante backend API

## 📚 Documentos de Entrega

Para evitar confusiones, estos son los archivos principales de la entrega final:

- [README.md](./README.md): resumen general del proyecto final
- [ARQUITECTURA.md](./ARQUITECTURA.md): explicación técnica de la solución final
- [INICIO_RÁPIDO.md](./INICIO_RAPIDO.md): pasos de ejecución de la versión final

Los archivos [SPRINT1.md](./historial/SPRINT1.md), [CAMBIOS_REALIZADOS.md](./historial/CAMBIOS_REALIZADOS.md) e [INICIO_RAPIDO_SPRINT2.md](./historial/INICIO_RAPIDO_SPRINT2.md) quedan como historial técnico del proceso de implementación.

---

## 🧱 Stack Final

### Frontend
- React 18 + Vite
- TypeScript configurado para migración progresiva
- Tailwind CSS configurado y activo
- CSS modular existente para continuidad visual

### Backend
- Node.js + Express
- SQLite como base de datos relacional local
- API REST para productos y movimientos

---

## 🚀 Instalación y Ejecución

### 1) Instalar dependencias del frontend

```bash
cd "/ruta/Trabajo_2_Empresariales"
npm install
```

### 2) Instalar dependencias del backend

```bash
cd backend
npm install
cd ..
```

### 3) Levantar backend (Terminal A)

```bash
cd backend
npm run dev
```

Debe quedar disponible en: http://localhost:4000

### 4) Levantar frontend (Terminal B)

```bash
cd "/ruta/Trabajo_2_Empresariales"
npm run dev -- --host
```

Debe quedar disponible en: http://localhost:5173

### 5) Verificación rápida backend

```bash
curl -s http://localhost:4000/api/health
```

Respuesta esperada:

```json
{"status":"ok","products":0,"movements":0}
```

---

## ✅ Funcionalidades Implementadas (100%)

### Gestión de productos
- Crear producto con validaciones
- Listar productos
- Editar producto
- Eliminar producto

### Gestión de movimientos
- Registrar entrada y salida
- Validar stock insuficiente en salidas
- Guardar motivo y referencia
- Historial con antes/después del movimiento

### Valor de negocio
- Panel de alertas (crítico / stock bajo)
- Sugerencia de reposición
- KPI de movimientos y valor inventario
- Top productos con mayor salida
- Detección de productos sin movimiento

### Persistencia real
- Datos de productos y movimientos almacenados en SQLite
- API REST operativa para lectura y escritura

---

## 🔌 Endpoints API

- GET /api/health
- GET /api/products
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
- GET /api/movements
- POST /api/movements

---

## 📁 Estructura Principal

```text
Trabajo_2_Empresariales/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── inventario.db
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── utils/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🧪 Prueba de Demostración (3 minutos)

1. Crear producto
2. Registrar salida
3. Ver stock actualizado
4. Mostrar alerta de inventario
5. Mostrar reporte ejecutivo
6. Confirmar movimiento en historial

---

## ⚠️ Solución de Problemas

### Puerto ocupado (frontend/backend)

```bash
lsof -ti :5173 | xargs -r kill -9
lsof -ti :4000 | xargs -r kill -9
```

### Backend no responde

```bash
cd backend
npm run dev
curl -s http://localhost:4000/api/health
```

### Ver datos directos en DB

Abre backend/inventario.db en VS Code SQLite Viewer y refresca tablas products y movements.
