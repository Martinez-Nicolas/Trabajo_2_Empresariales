# 🚀 INICIO RÁPIDO - Control de Inventario

**Sprint**: 1 (60% completado)  
**Tiempo estimado**: 5 minutos para empezar  
**Estado**: ✅ LISTO PARA USAR

> Esta versión (60%) funciona 100% en frontend con localStorage.
> El backend queda planificado para el 40% restante como mejora.

---

## ✅ CHECKLIST ANTES DE COMENZAR

- [ ] Node.js >= 16 instalado
- [ ] npm instalado
- [ ] Carpeta `Trabajo_2_Empresariales` creada con todos los archivos
- [ ] Terminal abierta en la carpeta del proyecto

---

## ⚡ 3 PASOS PARA EJECUTAR

### Paso 1: Instalar dependencias (1-2 minutos)
```bash
npm install
```
Espera a que termine. Verás `added X packages`.

### Paso 2: Ejecutar en desarrollo
```bash
npm run dev
```
Verás algo como:

VITE v5.0.8  ready in 123 ms
➜  Local:   http://localhost:5173/
➜  press h + enter to show help

### Paso 3: Abre el navegador
Se abre automáticamente en `http://localhost:5173`

**¡LISTO!** ✅ Ya puedes usar la app

---

## 🧪 TEST RÁPIDO (2 minutos)

### Test 1: Agregar Producto

Escribe Código: PROD-001
Escribe Nombre: Laptop Test
Escribe Cantidad: 10
Escribe Precio: 1500.50
Click "+ Agregar Producto"
✅ Debe aparecer en tabla
✅ Estadísticas actualizan

### Test 2: Buscar

Escribe "Laptop" en búsqueda
✅ Filtra en tiempo real
Click en X
✅ Vuelven todos los productos

### Test 3: Eliminar

Click en 🗑️
Confirma
✅ Se elimina
F5 (Recargar)
✅ Sigue eliminado (localStorage)

### Test 4: Validaciones

Intenta código duplicado → ✅ Error
Intenta nombre con 1 letra → ✅ Error
Intenta precio negativo → ✅ Error
Todo correcto → ✅ Se agrega

---

## 📁 ESTRUCTURA QUE DEBES TENER

Trabajo_2_Empresariales/
├── package.json          ✅
├── vite.config.js        ✅
├── .gitignore            ✅
├── public/
│   └── index.html        ✅
├── src/
│   ├── components/       (4 archivos)
│   ├── pages/           (1 archivo)
│   ├── services/        (2 archivos)
│   ├── hooks/           (1 archivo)
│   ├── utils/           (2 archivos)
│   ├── styles/          (3 archivos)
│   ├── App.jsx          ✅
│   ├── main.jsx         ✅
│   └── index.css        ✅
├── README.md            ✅
├── ARQUITECTURA.md      ✅
├── SPRINT1.md           ✅
├── INICIO_RAPIDO.md     ✅
└── PRESENTACION.md      ✅

Total: **35 archivos**

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Dónde se guardan los datos?**  
R: En localStorage del navegador. DevTools (F12) → Application → Local Storage

**P: ¿Necesito backend?**  
R: NO. Sprint 1 usa localStorage. Backend opcional en Sprints 2-5.

**P: ¿Por qué no funciona?**  
R: Ver sección "Solución de Problemas" en README.md

**P: ¿Puedo editar productos?**  
R: NO en Sprint 1. Está para Sprint 3.

**P: ¿Funciona en mobile?**  
R: SÍ, es responsive. Pero datos locales (no sincroniza).

**P: ¿Cómo agrego más funcionalidades?**  
R: Ver ARQUITECTURA.md → Sección "Extensibilidad"

---

## 🛠️ SI TIENES PROBLEMAS

### Error: "npm: command not found"
```bash
# Instala Node.js desde nodejs.org
# Reinicia terminal
node --version  # Verifica que funcione
```

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto 5173 ocupado
```bash
npm run dev -- --port 5174
```

### Cambios no se ven

Ctrl+Shift+Delete (limpiar caché)
Recarga página
Si sigue, cierra npm run dev y vuelve a ejecutar

---

## 📝 PRÓXIMOS PASOS

**HOY**:
1. npm install
2. npm run dev
3. Prueba todo

**DOMINGO 12** (Entrega avance):
1. Presenta al profesor
2. Lee PRESENTACION.md para el script
3. Responde preguntas sobre arquitectura

**DOMINGO 19** (Entrega final):
1. Completa Sprints 2-5
2. Entrega 100%

---

## 📚 DOCUMENTOS IMPORTANTES

- **README.md** ← Instalación detallada por SO
- **ARQUITECTURA.md** ← Cómo está estructurado
- **SPRINT1.md** ← Qué se hizo y qué falta

---

## ✅ CHECKLIST FINAL

- ☑ npm install sin errores
- ☑ npm run dev funcionando
- ☑ Se abre http://localhost:5173
- ☑ Puedo agregar productos
- ☑ Puedo buscar
- ☑ Puedo eliminar
- ☑ Los datos persisten (F5)

---

**¡LISTO PARA EMPEZAR!** 🚀

Tiempo total: ~5 minutos
Estado: ✅ FUNCIONAL