# Portfolio de Programación - Documentación para Claude

## Información del Proyecto

Este es un portfolio personal de programación desarrollado con las siguientes tecnologías:

### Stack Tecnológico
- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos/Auth**: Firebase (Firestore + Authentication)
- **Deployment**: Vercel
- **Control de Versiones**: Git

## Estructura del Proyecto

```
portfolio/
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel de administración
│   ├── api/               # API Routes
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes React reutilizables
├── lib/                   # Utilidades y configuraciones
│   └── firebase/          # Configuración de Firebase
├── types/                 # Definiciones de tipos TypeScript
├── utils/                 # Funciones auxiliares
├── public/               # Archivos estáticos
└── CLAUDE.md             # Este archivo
```

## Configuración de Firebase

### Archivos de Configuración
- `/lib/firebase/config.ts` - Configuración del cliente Firebase
- `/lib/firebase/admin.ts` - Configuración del Firebase Admin SDK
- `/.env.local` - Variables de entorno (NO SUBIR A GIT)

### Variables de Entorno Requeridas

Crear archivo `.env.local` con:

```env
# Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin SDK (Service Account)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_PRIVATE_KEY=
FIREBASE_ADMIN_CLIENT_EMAIL=
```

### Estructura de Datos en Firestore

#### Colección: `projects`
```typescript
{
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  order: number
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### Colección: `skills`
```typescript
{
  id: string
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'other'
  level: number // 1-5
  icon?: string
  order: number
}
```

## Características Principales

### 1. Responsive Design
- Mobile-first approach
- Breakpoints de Tailwind: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navegación adaptable

### 2. Autenticación de Administrador
- Firebase Authentication
- Panel de administración protegido en `/admin`
- Solo el usuario autenticado puede agregar/editar contenido

### 3. Gestión de Contenido
- CRUD de proyectos desde el panel de admin
- CRUD de habilidades
- Subida de imágenes a Firebase Storage

### 4. Optimización para Vercel
- Configurado con Next.js App Router
- Edge Functions para APIs
- ISR (Incremental Static Regeneration) para contenido dinámico
- Optimización automática de imágenes

### 5. Informacion para el portafolio
- pdf el cv C:\Users\diego\portfolio\CV - Desarrollador_compressed.pdf
- foto del desarrollador C:\Users\diego\portfolio\developer-diego.jpg
- plantilla de diseño que deseo tener, esta es del perfil del desarrollador, muestra algunas opciones y proyecto, el header que muestra about, work, blog contact. etc deseo tener. aqui esta el menu y about C:\Users\diego\portfolio\Captura de pantalla_8-11-2025_235137_demo.magic-portfolio.com.jpeg, about C:\Users\diego\portfolio\Captura de pantalla_8-11-2025_192230_demo.magic-portfolio.com.jpeg

### 6. cambios
- ayudame en public puse una imagen que dice fondo un png C:\Users\diego\portfolio\public\fondo.png quiero ponerla de fondo en C:\Users\diego\portfolio\components\Hero.tsx
## Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo
npm run dev -- --turbopack  # Desarrollo con Turbopack

# Build y producción
npm run build           # Construye para producción
npm start              # Inicia servidor de producción

# Linting
npm run lint           # Ejecuta ESLint
npm run lint -- --fix  # Fix automático de errores de linting
```

## Configuración de Vercel

### Variables de Entorno en Vercel
Configurar las mismas variables de `.env.local` en:
Dashboard de Vercel → Settings → Environment Variables

### Configuración Recomendada
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 20.x

## Buenas Prácticas

### TypeScript
- Usar tipos explícitos
- Evitar `any` siempre que sea posible
- Definir interfaces para props de componentes

### Componentes
- Componentes del cliente: usar `'use client'` cuando sea necesario
- Server Components por defecto para mejor performance
- Separar lógica de presentación

### Estilos
- Usar clases de Tailwind CSS
- Mantener consistencia en spacing (4, 8, 12, 16, etc.)
- Usar variables de color del tema

### Firebase
- Validar datos antes de escribir en Firestore
- Usar índices compuestos cuando sea necesario
- Implementar reglas de seguridad en Firebase Console

### Git
- Commits descriptivos en español
- No subir archivos `.env*` (ya están en `.gitignore`)
- Branches: `main` para producción, `dev` para desarrollo

## Seguridad

### Reglas de Firestore (configurar en Firebase Console)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Solo admins autenticados pueden escribir
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }

    match /skills/{skillId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### Reglas de Storage

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## Próximos Pasos

1. Configurar Firebase con las credenciales JSON
2. Implementar página de inicio (home/hero section)
3. Implementar sección de proyectos
4. Implementar sección de habilidades
5. Implementar formulario de contacto
6. Implementar panel de administración
7. Configurar autenticación
8. Desplegar en Vercel
9. Configurar dominio personalizado (opcional)

## Notas Adicionales

- El proyecto usa el nuevo App Router de Next.js (no Pages Router)
- Turbopack está habilitado para desarrollo más rápido
- ESLint está configurado con las reglas de Next.js
- Git está inicializado y listo para uso
- Todas las dependencias están instaladas y actualizadas
