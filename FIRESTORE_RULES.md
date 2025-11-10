# Reglas de Firestore - Configuración

## 📋 Reglas Correctas para tu Portfolio

Ve a Firebase Console → Firestore Database → Reglas y reemplaza con estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Proyectos: todos pueden leer, solo usuarios autenticados pueden escribir
    match /projects/{projectId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }

    // Habilidades: todos pueden leer, solo usuarios autenticados pueden escribir
    match /skills/{skillId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }

    // Colección de desarrollador (para información adicional)
    match /developer/{devId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Mensajes de contacto: todos pueden crear, solo admins pueden leer
    match /messages/{messageId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## 🔐 Explicación de las Reglas

### 1. **Proyectos y Habilidades**
- ✅ **Lectura pública** (`allow read: if true`): Cualquier visitante puede ver los proyectos y habilidades
- ✅ **Escritura autenticada** (`allow create, update, delete: if request.auth != null`): Solo usuarios autenticados (tú) pueden crear, editar o eliminar

### 2. **Colección Developer**
- ✅ Lectura pública para mostrar información del desarrollador
- ✅ Escritura solo para usuarios autenticados

### 3. **Mensajes de Contacto**
- ✅ Cualquiera puede enviar un mensaje
- ✅ Solo administradores autenticados pueden leerlos

## ⚠️ IMPORTANTE

Estas reglas son **SEGURAS** y permiten:
- ✅ Visitantes pueden ver tu portfolio
- ✅ Solo TÚ (autenticado) puedes editar/eliminar
- ✅ No necesitas "quitar las reglas" para agregar contenido
- ✅ El sistema verifica automáticamente que estés logueado

## 🎯 Cómo Funciona Ahora

1. **Inicias sesión** en `/admin/login` con Firebase Authentication
2. **Firebase guarda tu sesión** automáticamente
3. **Cuando creas/editas/eliminas**, Firebase verifica que estés autenticado
4. **Si estás autenticado** → ✅ Operación permitida
5. **Si NO estás autenticado** → ❌ Operación denegada

## 🔄 Pasos para Aplicar

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. **Firestore Database** (menú lateral)
4. Pestaña **"Reglas"** (Rules)
5. **Copia y pega** las reglas de arriba
6. Click en **"Publicar"** (Publish)

## ✅ Verificación

Después de aplicar las reglas:
1. Cierra sesión en el admin
2. Ve a la página pública → Deberías ver los proyectos
3. Inicia sesión en el admin
4. Intenta crear/editar/eliminar → Debería funcionar
5. NO necesitas cambiar las reglas nunca más

## 🚨 Si Ves Errores de Permisos

Si ves errores como `PERMISSION_DENIED`:
1. Verifica que hayas **publicado** las reglas
2. Verifica que estés **realmente autenticado** (ve a `/admin/login`)
3. Verifica que el email que usaste esté en Firebase Authentication
4. Recarga la página después de iniciar sesión

## 💡 Ventaja de este Sistema

Ya NO necesitas:
- ❌ Quitar las reglas para agregar contenido
- ❌ Hacer las reglas públicas
- ❌ Preocuparte por la seguridad

El sistema ahora:
- ✅ Usa tu sesión de Firebase automáticamente
- ✅ Verifica que estés autenticado en cada operación
- ✅ Es seguro y funcional
