/**
 * Script para poblar Firebase con datos de ejemplo
 *
 * Ejecutar con: npx ts-node scripts/seedFirebase.ts
 *
 * NOTA: Asegúrate de tener configuradas las variables de entorno en .env.local
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { projects, skills } from '../lib/data';

// Configuración de Firebase desde las variables de entorno
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

  const projectsRef = collection(db, 'projects');

  for (const project of projects) {
    const { id, ...projectData } = project;

    try {
      const docRef = await addDoc(projectsRef, {
        ...projectData,
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

  const skillsRef = collection(db, 'skills');

  for (let i = 0; i < skills.length; i++) {
    const skill = skills[i];

    try {
      const docRef = await addDoc(skillsRef, {
        name: skill.name,
        category: skill.category,
        level: Math.ceil(skill.level / 20), // Convertir de 0-100 a 1-5
        order: i,
      });
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
    console.log('\n💡 Puedes ver los datos en Firebase Console o en tu dashboard de admin.');

  } catch (error) {
    console.error('\n❌ Error durante la población:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Ejecutar el script
main();
