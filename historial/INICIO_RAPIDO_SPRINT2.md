# 🚀 INICIO RÁPIDO - Historial de implementación Sprint 2

> Documento de apoyo histórico. Para la entrega final usa INICIO_RAPIDO.md.

## Requisitos
- **Node.js** 16+ instalado
- **npm** o **yarn** instalado

---

## ⚡ Pasos de Ejecución (2 terminales)

### Terminal 1: Backend (SQLite)

```bash
# Navegar a la carpeta del backend
cd backend

# Instalar dependencias (primera vez)
npm install

# Iniciar el servidor
npm start

# Output esperado:
# Backend inventario escuchando en http://localhost:4000
```

**✅ Backend listo en:** `http://localhost:4000/api`

---

### Terminal 2: Frontend (React + Tailwind)

```bash
# En la carpeta raíz del proyecto
npm install

# Iniciar servidor de desarrollo
npm run dev

# Output esperado:
# VITE v5.0.8 ready in XXX ms
# ➜  Local:   http://localhost:5173/
```

**✅ Frontend abierto en:** `http://localhost:5173`

---

## ✨ Funcionalidades Principales

### 📦 Gestión de Productos
- ✅ Crear productos con código, nombre, cantidad y precio
- ✅ Editar productos existentes
- ✅ Eliminar productos
- ✅ Búsqueda rápida por código o nombre

### 📤 Movimientos de Stock
- ✅ Registrar entradas (compras)
- ✅ Registrar salidas (ventas)
- ✅ Preview automático del stock resultante
- ✅ Historial completo de movimientos

### 📊 Reportes e Información
- ✅ Alertas de stock bajo/crítico
- ✅ Top productos más vendidos
- ✅ Productos sin movimiento reciente
- ✅ Valor total del inventario
- ✅ Estadísticas en tiempo real

### 🎨 Diseño Responsivo
- ✅ Totalmente responsive (móvil, tablet, desktop)
- ✅ Interfaz moderna con Tailwind CSS
- ✅ Emojis para mejor UX
- ✅ Transiciones suaves

---

## 📱 Pruebas Recomendadas

### 1. Primera Ejecución
```
Crear un producto: PROD-000001 | Laptop HP | 10 unidades | $800,000
```

### 2. Probar Movimientos
```
Entrada: 5 unidades de PROD-000001 (Reposición proveedor)
Salida: 3 unidades de PROD-000001 (Venta)
→ Stock actual debe ser: 12
```

### 3. Verificar Alertas
```
Crear producto con stock bajo (< 10 unidades)
→ Debe aparecer en sección de alertas
```

### 4. Responsividad
- Abrir en navegador responsivo (F12 → Responsive Design Mode)
- Probar tamaños: 320px, 768px, 1200px

---

## 🔗 URLs Importantes

| Componente | URL | Puerto |
|----------|-----|--------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:4000/api | 4000 |
| Health Check | http://localhost:4000/api/health | 4000 |
| Productos | http://localhost:4000/api/products | 4000 |
| Movimientos | http://localhost:4000/api/movements | 4000 |

---

## 🛠️ Comandos Útiles

### Frontend
```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run preview  # Preview build
npm run lint     # ESLint (si disponible)
```

### Backend
```bash
npm start        # Producción
npm run dev      # Desarrollo (mismo servidor del backend)
```

---

## 📁 Estructura de Datos Persistente

```
proyecto-root/
├── backend/
│  └── inventario.db (SQLite - se crea automáticamente)
├── src/
│  ├── services/
│  │  ├── apiService.js (NEW - Comunicación con backend)
│  │  └── productService.js (ACTUALIZADO - Usa API)
│  ├── hooks/
│  │  └── useProducts.js (ACTUALIZADO - Async/await)
│  └── components/
│     ├── Header.jsx (REDISEÑADO)
│     ├── ProductForm.jsx (REDISEÑADO)
│     ├── ProductTable.jsx (REDISEÑADO)
│     ├── MovementForm.jsx (REDISEÑADO)
│     ├── MovementTable.jsx (REDISEÑADO)
│     ├── AlertsPanel.jsx (REDISEÑADO)
│     └── ReportsPanel.jsx (REDISEÑADO)
```

---

## ⚠️ Posibles Problemas y Soluciones

### ❌ Error: "Cannot GET /api/products"
**Causa:** Backend no está ejecutándose  
**Solución:** Verifica que el backend esté en Terminal 1 con `npm start`

### ❌ Error: "ECONNREFUSED 127.0.0.1:4000"
**Causa:** Frontend no puede conectar con backend  
**Solución:** Inicia el backend ANTES del frontend

### ❌ Error: "SQLite database not found"
**Causa:** Primera ejecución o base de datos corrupta  
**Solución:** Deja que se cree automáticamente o elimina `backend/inventario.db`

### ❌ Puerto 5173 o 4000 en uso
**Causa:** Otro proceso usa el puerto  
**Solución:**
```bash
# Matar proceso en puerto 4000
lsof -ti:4000 | xargs kill -9

# Matar proceso en puerto 5173
lsof -ti:5173 | xargs kill -9
```

---

## ✅ Verificar que Todo Funciona

1. **Backend iniciado** (Terminal 1)
   ```
   ✅ "Backend inventario escuchando en http://localhost:4000"
   ```

2. **Frontend iniciado** (Terminal 2)
   ```
   ✅ "Local: http://localhost:5173/"
   ```

3. **Browser abierto**
   ```
   ✅ Ver "Control de Inventario" con estadísticas
   ```

4. **Crear producto**
   ```
   ✅ Producto aparece en tabla
   ✅ Base de datos tiene el registro
   ```

5. **Registrar movimiento**
   ```
   ✅ Stock se actualiza correctamente
   ✅ Aparece en historial
   ```

---

## 📚 Documentación Adicional

Para información detallada sobre los cambios realizados, consulta:
- 📄 [CAMBIOS_REALIZADOS.md](./CAMBIOS_REALIZADOS.md)
- 📄 [ARQUITECTURA.md](../ARQUITECTURA.md)
- 📄 [SPRINT1.md](./SPRINT1.md)

---

## 🎯 Sprint 2 - Checklist

- ✅ Backend con SQLite configurado
- ✅ API REST endpoints funcionales
- ✅ Frontend integrado con backend
- ✅ Diseño responsivo completado
- ✅ Tailwind CSS implementado
- ✅ Componentes rediseñados
- ✅ Almacenamiento persistente
- ✅ Documentación actualizada

---

**¡Listo para usar! 🎉**

Para preguntas o problemas, revisa los logs en la terminal donde ejecutaste los comandos.
