# 🎤 GUÍA DE PRESENTACIÓN AL PROFESOR

**Sprint 1 - 60% Completado**  
**Fecha de entrega**: Domingo 12  
**Duración presentación**: ~5-10 minutos

---

## 📌 ESTRUCTURA DE LA PRESENTACIÓN

### 1. **INTRODUCCIÓN** (1 minuto)

**Decir**:
> "Hemos desarrollado una aplicación de Control de Inventario siguiendo arquitectura limpia. Sprint 1 incluye el 60% de las funcionalidades: crear, listar, buscar y eliminar productos con almacenamiento local."

**Mostrar**:
- Abre la carpeta del proyecto
- Muestra que está en tu máquina
- Ejecuta: `npm install && npm run dev`

---

### 2. **DEMOSTRACIÓN FUNCIONAL** (3-4 minutos)

#### 2.1 Interfaz Principal

Muestra en pantalla:

Header con estadísticas
Formulario para agregar
Tabla de productos
Barra de búsqueda

#### 2.2 Test 1: Agregar Producto

Acción: Intenta código duplicado

Aparece error en rojo
Botón está deshabilitado

Acción: Intenta cantidad negativa

Aparece error específico

Conclusión: "Las validaciones funcionan correctamente"

#### 2.5 Test 4: Eliminar

Acción: Click en 🗑️
Resultado: Confirmación
Acción: Confirma eliminación
Resultado: Producto desaparece
Acción: Recarga página (F5)
Resultado: Datos persisten en localStorage

#### 2.6 Test 5: Responsive

Acción: Abre DevTools (F12)
Resultado: Muestra versión mobile
Conclusión: "Funciona en mobile también"

---

### 3. **EXPLICACIÓN TÉCNICA** (3-4 minutos)

#### 3.1 Arquitectura

Mostrar ARQUITECTURA.md en editor:
"Seguimos arquitectura limpia con 4 capas:

Data Layer (storageService.js)

Abstracción de localStorage
Si cambias a API REST, solo cambias esto


Business Logic (productService.js)

Lógica pura sin dependencias
CRUD completo
Funciones de búsqueda y estadísticas


Composition (useProducts.js)

Custom hook de React
Conecta lógica con componentes


Presentation (components/)

Componentes sin lógica
Props-driven
Fácil de modificar estilos
"

#### 3.2 Estructura de Carpetas

Abre en terminal:
ls -la src/
Explica:

components/     → Componentes reutilizables
pages/         → Páginas principales
services/      → Lógica de negocio
hooks/         → Custom hooks
utils/         → Validadores, formateadores
styles/        → Sistema de diseño CSS

#### 3.3 Flujo de Datos

Dibuja en pizarra o muestra diagrama:
Usuario → Componente → Hook → Service → localStorage
↓
React re-renderiza automáticamente

---

### 4. **DOCUMENTACIÓN** (1-2 minutos)

**Mostrar archivos**:

1. **README.md**
   - Instrucciones para Windows, Linux, Arch, Mac
   - Cómo ejecutar
   - Solución de problemas

2. **ARQUITECTURA.md**
   - Explicación detallada de capas
   - Decisiones de diseño
   - Cómo extender para Sprints 2-5

3. **SPRINT1.md**
   - Qué se hizo (60%)
   - Qué falta (40%)
   - Funcionalidades por Sprint

4. **INICIO_RAPIDO.md**
   - 5 minutos para empezar
   - Checklist

**Decir**:
> "Toda la documentación está en el proyecto. El profesor puede revisar cómo está estructurado, por qué cada decisión, y cómo extender el código."

---

### 5. **CODE REVIEW** (Opcional, si preguntan)

#### 5.1 Validadores (utils/validators.js)
```javascript
Mostrar función validateProduct:

export const validateProduct = (productData, existingProducts = []) => {
  const errors = {};
  
  // Valida cada campo
  // Retorna errors object
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

Explicar:
- Función pura (sin efectos secundarios)
- Testeable fácilmente
- Reutilizable en cualquier interface
```

#### 5.2 Custom Hook (hooks/useProducts.js)
```javascript
Mostrar estructura:

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Carga inicial
  }, []);
  
  const addProduct = useCallback(() => {
    // Lógica CRUD
  }, []);
  
  return {
    products,
    filteredProducts,
    addProduct,
    deleteProductItem,
    stats,
    // ... más métodos
  };
};

Explicar:
- Encapsula estado y lógica
- Reutilizable en múltiples componentes
- Separación clara entre presentación y lógica
```

#### 5.3 Componente Simple (components/SearchBar.jsx)
```javascript
Mostrar componente:

export const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && <button onClick={() => onChange('')}>✕</button>}
    </div>
  );
};

Explicar:
- Props-driven (no tiene lógica)
- Presentación pura
- Fácil de testear
- Reutilizable
```

---

## 🎯 Respuestas a Preguntas Frecuentes

**P: ¿Por qué solo 60% en Sprint 1?**  
R: "Para permitir expansión controlada. Sprint 2-5 agregarán: movimientos, edición, reportes y alertas."

**P: ¿Por qué sin backend?**  
R: "localStorage permite MVP funcional sin servidor. Es offline-first y fácil cambiar a API REST sin afectar componentes."

**P: ¿Por qué sin TypeScript?**  
R: "Sprint 1 enfocado en funcionalidad. TypeScript en Sprint 2. Código está documentado con JSDoc."

**P: ¿Cómo extiendes para Sprint 2?**  
R: (Mostrar ARQUITECTURA.md - Sección "Extensibilidad")
- Agregar componente MovementForm
- Usar productService para lógica
- Hook useMovements para estado
- Componente MovementTable para mostrar

**P: ¿Qué pasa si localStorage se llena?**  
R: "Soporta ~5-10 MB. Para datos más grandes, migramos a IndexedDB o API REST."

**P: ¿Cómo aseguras que código funcione?**  
R: (Mostrar tests manuales que hiciste)
- Agregar/buscar/eliminar/validar
- Recargar página (localStorage persiste)
- DevTools para ver datos

---

## 🎬 Demostración en Vivo - Script
```bash
# 1. Abre terminal en carpeta del proyecto
cd Trabajo_2_Empresariales

# 2. Instala dependencias (si no están instaladas)
npm install

# 3. Ejecuta desarrollo
npm run dev

# 4. Se abre automáticamente en navegador
# Si no abre: http://localhost:5173

# 5. Espera 5 segundos (Vite compila)
# 6. ¡Listo para demostrar!
```

---

## 📊 Estructura de Respuesta

Cuando el profesor pregunta "¿Cómo funciona?":

COMPONENTE (ProductForm.jsx)
↓
HOOK (useProducts.js)
↓
SERVICE (productService.js)
↓
STORAGE (storageService.js)
↓
localStorage (navegador)

---

## ⏰ Timeline de Presentación

| Tiempo | Actividad |
|--------|-----------|
| 0:00 - 1:00 | Intro + Demostración de ejecución |
| 1:00 - 4:00 | Tests funcionales |
| 4:00 - 7:00 | Explicación técnica |
| 7:00 - 9:00 | Documentación y preguntas |
| 9:00+ | Responder dudas |

---

## ✅ Checklist Pre-Presentación

- [ ] Código en carpeta compartida/GitHub
- [ ] Node.js instalado en laptop de demostración
- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` listo para ejecutar
- [ ] Navegador abierto en pestaña correcta
- [ ] DevTools familiares (F12)
- [ ] ARQUITECTURA.md revisado
- [ ] Preguntas potenciales preparadas
- [ ] Internet funcionando
- [ ] Proyector/pantalla conectado

---

## 💡 Tips para Presentación

1. **Hablá claro**: Explica como si el profesor no sabe React
2. **Mostrá código**: No solo teoría, muestra el código funcional
3. **Pregunta**: "¿Alguna pregunta antes de continuar?"
4. **Documentación**: El código está documentado, prof puede revisarlo
5. **Confident**: Ustedes hicieron esto, conocen cada línea
6. **Tiempo**: No excedas 10 minutos, deja tiempo para preguntas

---

## 🚀 Entrega Final (Domingo 19)

Cuando sea momento de entregar 100%:

1. **Aplicación funcional** → Carpeta `Trabajo_2_Empresariales`
2. **Video de demostración** (5 minutos max) → MP4/YouTube
3. **Documentación PDF** → Explicación detallada
4. **Código en Git** → Con commits limpios

---

## 📝 Notas Finales

**Recuerda decir**:
> "Este es Sprint 1 del 60%. Tenemos los siguientes 40% planeados para Sprints 2-5 que agregarán movimientos, edición, reportes y alertas. La arquitectura está diseñada para escalar fácilmente."

---

**¡Mucho éxito en la presentación! 🎉**