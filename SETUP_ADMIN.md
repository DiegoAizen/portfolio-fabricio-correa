# Configuración del Panel de Administración

Este documento explica cómo configurar y usar el panel de administración de tu portfolio.

## 🚀 Configuración Inicial

### 1. Variables de Entorno

Asegúrate de tener todas las variables de Firebase configuradas en tu archivo `.env.local`:

```env
# Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

### 2. Crear Usuario Admin en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Authentication** > **Users**
4. Haz clic en **Add User**
5. Ingresa tu email y contraseña
6. Guarda las credenciales (las necesitarás para iniciar sesión)

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Poblar Firebase con Datos de Ejemplo

Ejecuta el script de seed para agregar proyectos y habilidades de ejemplo a tu base de datos:

```bash
npm run seed
```

Este script agregará:
- 3 proyectos de ejemplo con imágenes de Unsplash
- 12 habilidades de ejemplo

## 📱 Uso del Panel de Administración

### Iniciar Sesión

1. Inicia tu servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Navega a: `http://localhost:3000/admin/login`

3. Ingresa las credenciales que creaste en Firebase Authentication

### Dashboard

Una vez autenticado, serás redirigido al dashboard (`/admin/dashboard`) donde podrás:

#### Gestión de Proyectos
- ✅ Ver todos tus proyectos
- ✅ Crear nuevos proyectos
- ✅ Editar proyectos existentes
- ✅ Eliminar proyectos
- ✅ Marcar proyectos como destacados

#### Gestión de Habilidades
- ✅ Ver todas tus habilidades
- ✅ Agregar nuevas habilidades
- ✅ Editar habilidades existentes
- ✅ Eliminar habilidades
- ✅ Organizar por categorías (frontend, backend, tools, other)
- ✅ Establecer nivel de dominio (1-5)

## 🎨 Estructura de Datos

### Proyectos
```typescript
{
  title: string               // Título del proyecto
  description: string         // Descripción corta
  longDescription?: string    // Descripción detallada (opcional)
  technologies: string[]      // Array de tecnologías usadas
  imageUrl: string           // URL de la imagen principal
  gallery?: string[]         // Array de URLs de imágenes adicionales
  githubUrl?: string         // URL del repositorio (opcional)
  liveUrl?: string          // URL del demo en vivo (opcional)
  featured: boolean          // Si aparece destacado en el home
  order: number             // Orden de visualización
}
```

### Habilidades
```typescript
{
  name: string              // Nombre de la habilidad
  category: string          // Categoría: 'frontend' | 'backend' | 'tools' | 'other'
  level: number            // Nivel de dominio de 1 a 5
  icon?: string           // URL del icono (opcional)
  order: number          // Orden de visualización
}
```

## 🔐 Seguridad

### Reglas de Firestore Recomendadas

Configura estas reglas en Firebase Console para proteger tu base de datos:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Solo admins autenticados pueden escribir
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /skills/{skillId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📸 Usar Imágenes

### Opciones para Imágenes

1. **Unsplash (Recomendado para desarrollo)**
   - URL de ejemplo: `https://images.unsplash.com/photo-[ID]?w=800&h=600&fit=crop`
   - Gratis y sin necesidad de registro
   - Ideal para prototipos y ejemplos

2. **Firebase Storage (Recomendado para producción)**
   - Sube imágenes directamente a tu proyecto
   - Mejor rendimiento y control
   - Configuración adicional necesaria

3. **URLs Externas**
   - Cualquier URL pública de imagen
   - Asegúrate de tener los derechos de uso

## 🌐 API Routes

El proyecto incluye API routes completas para gestión de datos:

### Proyectos
- `GET /api/projects` - Obtener todos los proyectos
- `GET /api/projects?featured=true` - Obtener solo proyectos destacados
- `GET /api/projects/[id]` - Obtener un proyecto específico
- `POST /api/projects` - Crear nuevo proyecto
- `PUT /api/projects/[id]` - Actualizar proyecto
- `DELETE /api/projects/[id]` - Eliminar proyecto

### Habilidades
- `GET /api/skills` - Obtener todas las habilidades
- `GET /api/skills?category=frontend` - Obtener habilidades por categoría
- `POST /api/skills` - Crear nueva habilidad
- `PUT /api/skills/[id]` - Actualizar habilidad
- `DELETE /api/skills/[id]` - Eliminar habilidad

## 🎯 Páginas del Portfolio

### Públicas
- `/` - Página principal con Hero, About, Projects, Skills, Contact
- `/projects/[id]` - Página de detalle de proyecto individual

### Admin (Protegidas)
- `/admin/login` - Página de inicio de sesión
- `/admin/dashboard` - Panel principal de administración
- `/admin/projects/new` - Crear nuevo proyecto (próximamente)
- `/admin/projects/[id]` - Editar proyecto (próximamente)
- `/admin/skills/new` - Crear nueva habilidad (próximamente)
- `/admin/skills/[id]` - Editar habilidad (próximamente)

## 💡 Consejos

1. **Imágenes**: Usa URLs de Unsplash para desarrollo, pero considera migrar a Firebase Storage para producción
2. **SEO**: Los proyectos destacados (`featured: true`) aparecen en la página principal
3. **Orden**: Usa el campo `order` para controlar el orden de visualización
4. **Backup**: Firebase guarda historial automático, pero considera exportar tus datos regularmente

## 🐛 Solución de Problemas

### No puedo iniciar sesión
- Verifica que el email existe en Firebase Authentication
- Revisa que las variables de entorno estén correctas
- Limpia el cache del navegador

### El script de seed falla
- Asegúrate de que `.env.local` existe y tiene todas las variables
- Verifica que Firebase esté configurado correctamente
- Revisa los permisos de Firestore

### Las imágenes no cargan
- Verifica que las URLs sean válidas
- Comprueba que no haya problemas de CORS
- Intenta con una imagen de Unsplash para probar

## 📚 Recursos Adicionales

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Unsplash Source](https://source.unsplash.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

¿Necesitas ayuda? Revisa los logs de la consola o contacta al desarrollador.
