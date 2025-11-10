/**
 * Script para poblar Firebase con datos de ejemplo
 *
 * Ejecutar con: node scripts/seedFirebase.js
 *
 * NOTA: Asegúrate de tener configuradas las variables de entorno en .env.local
 */

require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

// Datos de ejemplo de proyectos
const projects = [
  {
    title: "Building Once UI: a Customizable Design System",
    description: "Desarrollé un flexible y altamente customizable design system usando Next.js UI for React and Next.js para agilizar la colaboración entre diseño y desarrollo. Este proyecto incluye componentes reutilizables, documentación completa y temas personalizables.",
    longDescription: "Este proyecto nació de la necesidad de crear un sistema de diseño consistente y escalable. Implementé más de 50 componentes reutilizables con documentación completa, soporte para temas oscuros y claros, y un playground interactivo para probar los componentes en tiempo real. El sistema está construido pensando en la accesibilidad (WCAG 2.1) y el rendimiento.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Storybook"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/DiegoAizen/design-system",
    liveUrl: "https://design-system-demo.vercel.app",
    featured: true,
    order: 1,
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "E-Commerce Platform con Next.js y Stripe",
    description: "Plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos integrada con Stripe, panel de administración y gestión de inventario en tiempo real.",
    longDescription: "Una solución e-commerce completa que incluye catálogo de productos con filtros avanzados, sistema de autenticación, carrito de compras persistente, integración con Stripe para pagos seguros, panel de administración para gestión de productos y pedidos, y notificaciones por email. Implementé optimizaciones de rendimiento como ISR y lazy loading de imágenes.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Firebase", "Tailwind CSS", "React Query"],
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/DiegoAizen/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true,
    order: 2,
    gallery: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
    ]
  },
  {
    title: "Task Management App - Gestión de Proyectos",
    description: "Aplicación web colaborativa para gestión de tareas y proyectos con tableros Kanban, asignación de tareas, notificaciones en tiempo real y colaboración en equipo.",
    longDescription: "Herramienta de gestión de proyectos inspirada en Trello y Asana. Permite crear múltiples proyectos, organizar tareas en tableros Kanban con drag & drop, asignar tareas a miembros del equipo, establecer fechas límite, adjuntar archivos, comentar en tareas y recibir notificaciones en tiempo real. Implementé websockets para colaboración en vivo.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Material-UI"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/DiegoAizen/task-manager",
    liveUrl: "https://task-manager-demo.vercel.app",
    featured: true,
    order: 3,
    gallery: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop"
    ]
  }
];

// Datos de ejemplo de habilidades
const skills = [
  { name: "React", category: "frontend", level: 5, order: 1 },
  { name: "Next.js", category: "frontend", level: 4, order: 2 },
  { name: "TypeScript", category: "frontend", level: 4, order: 3 },
  { name: "JavaScript", category: "frontend", level: 5, order: 4 },
  { name: "HTML/CSS", category: "frontend", level: 5, order: 5 },
  { name: "Tailwind CSS", category: "frontend", level: 5, order: 6 },
  { name: "Node.js", category: "backend", level: 4, order: 7 },
  { name: "Firebase", category: "backend", level: 4, order: 8 },
  { name: "MongoDB", category: "backend", level: 4, order: 9 },
  { name: "Express", category: "backend", level: 4, order: 10 },
  { name: "Git", category: "tools", level: 5, order: 11 },
  { name: "Docker", category: "tools", level: 3, order: 12 }
];

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedProjects() {
  console.log('📦 Poblando proyectos...');

  for (const project of projects) {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...project,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`✅ Proyecto creado: ${project.title} (ID: ${docRef.id})`);
    } catch (error) {
      console.error(`❌ Error al crear proyecto ${project.title}:`, error);
    }
  }
}

async function seedSkills() {
  console.log('\n🎯 Poblando habilidades...');

  for (const skill of skills) {
    try {
      const docRef = await addDoc(collection(db, 'skills'), skill);
      console.log(`✅ Habilidad creada: ${skill.name} (ID: ${docRef.id})`);
    } catch (error) {
      console.error(`❌ Error al crear habilidad ${skill.name}:`, error);
    }
  }
}

async function main() {
  console.log('🚀 Iniciando población de Firebase...\n');

  try {
    await seedProjects();
    await seedSkills();

    console.log('\n✨ ¡Población completada exitosamente!');
    console.log('\n📝 Resumen:');
    console.log(`   - ${projects.length} proyectos agregados`);
    console.log(`   - ${skills.length} habilidades agregadas`);
    console.log('\n💡 Ahora puedes:');
    console.log('   1. Iniciar sesión en /admin/login con tu email de Firebase');
    console.log('   2. Ver los proyectos en tu portfolio');
    console.log('   3. Gestionar el contenido desde /admin/dashboard');

  } catch (error) {
    console.error('\n❌ Error durante la población:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Ejecutar el script
main();
