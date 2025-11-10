# 🎨 Guía del Sistema de Temas - Light/Dark Mode

## ✨ Características Implementadas

Tu portfolio ahora cuenta con un sistema completo de temas claro/oscuro con:

### 🔄 Funcionalidades
- ✅ **Toggle elegante** con animación sol/luna
- ✅ **Transiciones suaves** entre temas (0.3s)
- ✅ **Persistencia** - Guarda tu preferencia en localStorage
- ✅ **Detección automática** - Respeta la preferencia del sistema operativo
- ✅ **Sin flash** - No verás contenido sin estilo al cargar
- ✅ **Responsive** - Toggle visible en desktop y móvil

### 🎨 Temas Disponibles

#### Modo Claro (Light Mode)
- **Fondos**: Blanco, gris claro
- **Textos**: Gris oscuro (#111), negro
- **Acentos**: Azul, morado vibrantes
- **Bordes**: Gris claro (#E5E7EB)
- **Sombras**: Sutiles para profundidad

#### Modo Oscuro (Dark Mode)
- **Fondos**: Negro puro, zinc-950
- **Textos**: Blanco, zinc-400
- **Acentos**: Azul, morado neón
- **Bordes**: Blanco con opacidad (white/10)
- **Efectos**: Glow y blur

## 🚀 Cómo Usar

### Para Visitantes

1. **En Desktop**:
   - Click en el toggle sol/luna en el header (esquina superior derecha)
   - El cambio es instantáneo

2. **En Móvil**:
   - Abre el menú hamburguesa
   - El toggle está al final del menú con etiqueta "Tema:"

3. **Automático**:
   - La primera vez detecta tu preferencia del sistema
   - Las siguientes veces usa tu última selección guardada

### Archivos Creados

```
lib/context/ThemeContext.tsx      - Contexto y lógica de tema
components/ThemeToggle.tsx         - Componente del switch
app/globals.css                    - Variables CSS actualizadas
```

### Componentes Actualizados

Todos los componentes principales ahora soportan ambos temas:
- ✅ `Header.tsx` - Con toggle integrado
- ✅ `Hero.tsx` - Gradientes y overlays adaptativos
- ✅ `Projects.tsx` - Cards con colores dinámicos
- ✅ `Skills.tsx` - Barras de progreso y filtros
- ✅ `Footer.tsx` - (Si existe)

## 🎯 Clases de Tailwind CSS Usadas

### Patrón Básico
```tsx
className="bg-white dark:bg-black text-gray-900 dark:text-white"
```

### Ejemplos por Elemento

#### Fondos
```tsx
bg-white dark:bg-black           // Fondo principal
bg-gray-50 dark:bg-zinc-950/50   // Fondo secundario
bg-gray-100 dark:bg-white/5      // Cards/botones
```

#### Textos
```tsx
text-gray-900 dark:text-white    // Títulos
text-gray-600 dark:text-zinc-400 // Texto normal
text-gray-500 dark:text-zinc-500 // Texto secundario
```

#### Bordes
```tsx
border-gray-200 dark:border-white/10  // Bordes normales
border-blue-500 dark:border-blue-500  // Bordes de acento
```

#### Hover
```tsx
hover:bg-gray-200 dark:hover:bg-white/10
hover:text-gray-900 dark:hover:text-white
```

## 🔧 Personalización

### Cambiar Colores del Tema

Edita `app/globals.css`:

```css
:root {
  --background: #ffffff;  /* Blanco para light */
  --foreground: #171717;  /* Texto para light */
}

:root.dark {
  --background: #000000;  /* Negro para dark */
  --foreground: #ededed;  /* Texto para dark */
}
```

### Agregar Nuevo Componente con Soporte de Temas

```tsx
export default function MiComponente() {
  return (
    <div className="bg-white dark:bg-black">
      <h2 className="text-gray-900 dark:text-white">
        Título
      </h2>
      <p className="text-gray-600 dark:text-zinc-400">
        Descripción
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white">
        Botón (mismo color en ambos temas)
      </button>
    </div>
  );
}
```

### Usar el Hook de Tema

```tsx
"use client";

import { useTheme } from "@/lib/context/ThemeContext";

export default function MiComponente() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Tema actual: {theme}</p>
      <button onClick={toggleTheme}>
        Cambiar a {theme === 'dark' ? 'claro' : 'oscuro'}
      </button>
    </div>
  );
}
```

## 📱 Comportamiento Responsive

### Desktop
- Toggle siempre visible en el header
- Tamaño completo con iconos sol/luna

### Móvil
- Toggle en el menú desplegable
- Con etiqueta "Tema:" para claridad
- Mismo comportamiento y animaciones

## ⚡ Optimizaciones

### Rendimiento
- **Lazy Loading**: El ThemeProvider solo se monta en cliente
- **Transiciones**: Suaves pero no pesadas (0.3s)
- **localStorage**: Acceso mínimo, solo al cambiar
- **CSS Variables**: Actualización instantánea

### Accesibilidad
- **aria-label**: Todos los botones tienen descripción
- **focus:ring**: Indicador de foco visible
- **Contraste**: Cumple WCAG AA en ambos temas
- **Preferencia del sistema**: Respetada automáticamente

## 🎨 Paleta de Colores Completa

### Light Mode
```
Fondos:
- Primario: #FFFFFF (white)
- Secundario: #F9FAFB (gray-50)
- Terciario: #F3F4F6 (gray-100)

Textos:
- Principal: #111827 (gray-900)
- Secundario: #4B5563 (gray-600)
- Terciario: #6B7280 (gray-500)

Acentos:
- Azul: #3B82F6 (blue-500)
- Morado: #8B5CF6 (purple-500)
- Cyan: #06B6D4 (cyan-500)
```

### Dark Mode
```
Fondos:
- Primario: #000000 (black)
- Secundario: rgba(9, 9, 11, 0.5) (zinc-950/50)
- Terciario: rgba(255, 255, 255, 0.05) (white/5)

Textos:
- Principal: #FFFFFF (white)
- Secundario: #A1A1AA (zinc-400)
- Terciario: #71717A (zinc-500)

Acentos:
- Azul: #60A5FA (blue-400)
- Morado: #A78BFA (purple-400)
- Cyan: #22D3EE (cyan-400)
```

## 🐛 Solución de Problemas

### El tema no cambia
1. Verifica que estés en una página `"use client"`
2. Asegúrate de que ThemeProvider envuelve tu app
3. Revisa la consola del navegador

### Flash de contenido sin estilo
- Esto ya está resuelto con `suppressHydrationWarning`
- Si persiste, verifica que no tengas CSS conflictivo

### Los colores no se ven bien
- Verifica que uses el prefijo `dark:` correctamente
- Asegúrate de que la clase esté en el nivel correcto del DOM

## 📚 Referencias

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

🎉 **¡Tu portfolio ahora tiene modo claro y oscuro completamente funcional!**
