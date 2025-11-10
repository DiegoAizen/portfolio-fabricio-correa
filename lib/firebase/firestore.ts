import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  Query,
  DocumentData,
} from 'firebase/firestore';
import { db } from './config';
import type { Project, NewProject, UpdateProject, Skill, NewSkill, UpdateSkill } from '@/types';

// ============================
// PROJECTS FUNCTIONS
// ============================

/**
 * Obtiene todos los proyectos ordenados
 */
export async function getAllProjects(): Promise<Project[]> {
  const projectsRef = collection(db, 'projects');
  const snapshot = await getDocs(projectsRef);

  const projects = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];

  // Ordenar manualmente en JavaScript
  return projects.sort((a, b) => a.order - b.order);
}

/**
 * Obtiene solo los proyectos destacados
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projectsRef = collection(db, 'projects');
  const q = query(
    projectsRef,
    where('featured', '==', true)
  );
  const snapshot = await getDocs(q);

  // Ordenar manualmente en JavaScript
  const projects = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];

  return projects.sort((a, b) => a.order - b.order);
}

/**
 * Obtiene un proyecto por ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const docRef = doc(db, 'projects', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Project;
  }

  return null;
}

/**
 * Crea un nuevo proyecto
 */
export async function createProject(project: NewProject): Promise<string> {
  const projectsRef = collection(db, 'projects');
  const now = Timestamp.now();

  const docRef = await addDoc(projectsRef, {
    ...project,
    createdAt: now,
    updatedAt: now,
  });

  return docRef.id;
}

/**
 * Actualiza un proyecto existente
 */
export async function updateProject(id: string, updates: UpdateProject): Promise<void> {
  const docRef = doc(db, 'projects', id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

/**
 * Elimina un proyecto
 */
export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, 'projects', id);
  await deleteDoc(docRef);
}

// ============================
// SKILLS FUNCTIONS
// ============================

/**
 * Obtiene todas las habilidades ordenadas
 */
export async function getAllSkills(): Promise<Skill[]> {
  const skillsRef = collection(db, 'skills');
  const snapshot = await getDocs(skillsRef);

  const skills = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Skill[];

  // Ordenar manualmente en JavaScript
  return skills.sort((a, b) => a.order - b.order);
}

/**
 * Obtiene habilidades por categoría
 */
export async function getSkillsByCategory(category: string): Promise<Skill[]> {
  const skillsRef = collection(db, 'skills');
  const q = query(
    skillsRef,
    where('category', '==', category)
  );
  const snapshot = await getDocs(q);

  const skills = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Skill[];

  // Ordenar manualmente en JavaScript
  return skills.sort((a, b) => a.order - b.order);
}

/**
 * Crea una nueva habilidad
 */
export async function createSkill(skill: NewSkill): Promise<string> {
  const skillsRef = collection(db, 'skills');
  const docRef = await addDoc(skillsRef, skill);

  return docRef.id;
}

/**
 * Actualiza una habilidad existente
 */
export async function updateSkill(id: string, updates: UpdateSkill): Promise<void> {
  const docRef = doc(db, 'skills', id);
  await updateDoc(docRef, updates);
}

/**
 * Elimina una habilidad
 */
export async function deleteSkill(id: string): Promise<void> {
  const docRef = doc(db, 'skills', id);
  await deleteDoc(docRef);
}
