# 🚀 INICIO RÁPIDO - Entrega Final (100%)

**Tiempo estimado**: 5 minutos
**Estado**: ✅ LISTO PARA DEMOSTRAR

---

## ✅ Checklist previo

- [ ] Node.js instalado
- [ ] npm instalado
- [ ] Proyecto descargado
- [ ] Dos terminales disponibles

---

## ⚡ Ejecución en 4 pasos

### Paso 1: Instalar frontend

```bash
cd "/ruta/Trabajo_2_Empresariales"
npm install
```

### Paso 2: Instalar backend

```bash
cd backend
npm install
cd ..
```

### Paso 3: Iniciar backend (Terminal A)

```bash
cd backend
npm run dev
```

Debe mostrar: Backend inventario escuchando en http://localhost:4000

### Paso 4: Iniciar frontend (Terminal B)

```bash
cd "/ruta/Trabajo_2_Empresariales"
npm run dev -- --host
```

Abre: http://localhost:5173

---

## 🧪 Prueba rápida de funcionamiento

1. Crear un producto
2. Registrar una salida
3. Registrar una entrada
4. Verificar alertas
5. Verificar reporte ejecutivo
6. Verificar historial de movimientos

---

## 🗄️ Verificación de base de datos

### API health

```bash
curl -s http://localhost:4000/api/health
```

### Crear producto por API

```bash
curl -s -X POST http://localhost:4000/api/products -H "Content-Type: application/json" -d '{"code":"PROD-000001","name":"Producto Test","quantity":10,"price":15000}'
```

### Ver productos guardados

```bash
curl -s http://localhost:4000/api/products
```

---

## 🛠️ Problemas frecuentes

### Puerto ocupado

```bash
lsof -ti :5173 | xargs -r kill -9
lsof -ti :4000 | xargs -r kill -9
```

### Dependencias dañadas

```bash
rm -rf node_modules package-lock.json
npm install
```

### Backend no responde

```bash
cd backend
npm run dev
curl -s http://localhost:4000/api/health
```

---

## ✅ Checklist final

- ☑ Frontend activo en 5173
- ☑ Backend activo en 4000
- ☑ Endpoint health responde
- ☑ Productos se crean
- ☑ Movimientos se registran
- ☑ Datos persisten en SQLite

---

Proyecto listo para evaluación final.