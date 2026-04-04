# 📦 Control Simple de Inventario - Sprint 1 (60%)

Aplicación web moderna para gestión de inventario con React 18 + Vite (sin backend).

**Estado**: ✅ Sprint 1 completado - 60% del proyecto
**Versión**: 0.1.0
**Última actualización**: 2024

---

## 🎯 Características Sprint 1

✅ **Agregar productos** con validaciones  
✅ **Listar productos** en tabla responsiva  
✅ **Buscar** por nombre o código  
✅ **Eliminar productos** con confirmación  
✅ **Estadísticas básicas** (total, stock bajo, etc.)  
✅ **Almacenamiento local** con localStorage  
✅ **Interfaz moderna** y responsive  

---

## 📋 Requisitos Previos

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 (incluido con Node.js)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

---

## 🚀 Instalación y Ejecución

### Windows

1. **Instalar Node.js**
   - Descarga desde [nodejs.org](https://nodejs.org)
   - Descarga versión **LTS**
   - Ejecuta instalador `.msi`
   - Marca "Add to PATH"
   - Reinicia computadora

2. **Clonar o descargar proyecto**
```bash
   cd tu-carpeta-de-proyectos
   # Extrae la carpeta Trabajo_2_Empresariales aquí
   cd Trabajo_2_Empresariales
```

3. **Instalar dependencias**
```bash
   npm install
```

4. **Ejecutar en desarrollo**
```bash
   npm run dev
```
   Se abre automáticamente en `http://localhost:5173`

5. **Compilar para producción**
```bash
   npm run build
```

---

### Linux (Ubuntu/Debian)
```bash
# Instalar Node.js
sudo apt update
sudo apt install nodejs npm

# Verificar instalación
node --version
npm --version

# Clonar proyecto (si tienes Git)
git clone <url-del-proyecto>
cd Trabajo_2_Empresariales

# Instalar y ejecutar
npm install
npm run dev
```

---

### Arch / Endeavor (RECOMENDADO PARA USTEDES)
```bash
# Instalar Node.js con pacman
sudo pacman -S nodejs npm

# Verificar instalación
node --version
npm --version

# Clonar proyecto
git clone <url-del-proyecto>
cd Trabajo_2_Empresariales

# Instalar y ejecutar
npm install
npm run dev
```

**Alternativa con nvm (Node Version Manager)**:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
npm install
npm run dev
```

---

### macOS
```bash
# Instalar con Homebrew
brew install node

# Verificar instalación
node --version
npm --version

# Clonar proyecto
git clone <url-del-proyecto>
cd Trabajo_2_Empresariales

# Instalar y ejecutar
npm install
npm run dev
```

---

## 📖 Uso de la Aplicación

### Agregar un Producto

1. Completa el formulario con:
   - **Código**: Identificador único (ej: PROD-001)
   - **Nombre**: Nombre del producto
   - **Cantidad**: Stock inicial
   - **Precio**: Precio unitario

2. Haz clic en "+ Agregar Producto"
3. El producto aparecerá en la tabla

### Buscar Productos

1. Usa la barra de búsqueda en la parte superior
2. Escribe el nombre o código del producto
3. Los resultados se filtran en tiempo real

### Eliminar Producto

1. Busca el producto en la tabla
2. Haz clic en el botón 🗑️ (papelera)
3. Confirma la eliminación

### Ver Estadísticas

En el encabezado (Header) ves:
- **Productos**: Total de productos registrados
- **Stock Bajo**: Productos con menos de 10 unidades
- **Total Items**: Suma de todas las cantidades

---

## 🗂️ Estructura del Proyecto

Trabajo_2_Empresariales/
├── src/
│   ├── components/       # Componentes React reutilizables
│   ├── pages/           # Páginas principales
│   ├── services/        # Lógica de negocio
│   ├── hooks/           # Custom hooks
│   ├── styles/          # Estilos CSS
│   ├── utils/           # Utilidades (validadores, formateadores)
│   ├── App.jsx          # Componente raíz
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos adicionales
│
├── public/              # Archivos estáticos
├── package.json         # Dependencias
├── vite.config.js       # Configuración de Vite
└── README.md            # Este archivo

---

## 🔧 Scripts Disponibles
```bash
# Ejecutar en desarrollo (hot reload)
npm run dev

# Compilar para producción
npm run build

# Ver preview de la build producción
npm run preview

# Verificar código (si eslint está configurado)
npm run lint
```

---

## 💾 Almacenamiento de Datos

Los datos se guardan en **localStorage** del navegador:

- **Datos guardados**: Productos y movimientos (futuros)
- **Ubicación**: `localStorage` → `inventario_products`
- **Accesibilidad**: Solo en el mismo navegador/dispositivo
- **Límite**: ~5-10 MB por dominio

### Para ver los datos en el navegador:

1. Abre el navegador
2. Presiona `F12` (DevTools)
3. Ve a **Application** → **Local Storage**
4. Busca `inventario_products`

---

## ⚠️ Solución de Problemas

### Problema: "npm: command not found"

**Solución**:
```bash
# Verifica que Node.js esté instalado
node --version

# Si no está, instala Node.js según tu sistema operativo
# (ver secciones de instalación arriba)

# Reinicia la terminal después de instalar
```

### Problema: Puerto 5173 ya está en uso

**Solución**:
```bash
# Usa un puerto diferente
npm run dev -- --port 5174

# O mata el proceso usando el puerto
# En Linux/Mac:
lsof -ti :5173 | xargs kill -9

# En Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Problema: "Cannot find module 'react'"

**Solución**:
```bash
# Limpia e reinstala dependencias
rm -rf node_modules package-lock.json
npm install
```

### Problema: Cambios no se ven en el navegador

**Solución**:
1. Cierra `npm run dev`
2. Limpia caché: `Ctrl+Shift+Delete` (o `Cmd+Shift+Delete` en Mac)
3. Ejecuta `npm run dev` nuevamente

---

## 🎓 Para el Profesor

### Sprint 1 - 60% Completado

**Funcionalidades implementadas**:
- ✅ CRUD de productos (Create, Read, Delete)
- ✅ Búsqueda y filtros
- ✅ Validaciones robustas
- ✅ Interfaz responsiva
- ✅ Estadísticas básicas

**Arquitectura**:
- Separación clara de responsabilidades
- Código modular y testeable
- Servicios independientes de React
- Fácil de expandir

**Próximos pasos (Sprint 2-5)**:
- Registrar movimientos (entradas/salidas)
- Editar productos
- Reportes avanzados
- Alertas y notificaciones
- Exportación de datos

---

## 📄 Licencia

Este proyecto es para propósitos educativos.

---

**Versión**: 0.1.0 (Sprint 1)  
**Autor**: Grupo de Desarrollo  
**Fecha**: 2024