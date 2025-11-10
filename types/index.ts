import { Timestamp } from 'firebase/firestore';

// Tipo para Proyectos
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl: string;
  gallery?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

// Tipo para crear un nuevo proyecto (sin id ni timestamps)
export type NewProject = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

// Tipo para actualizar un proyecto
export type UpdateProject = Partial<Omit<Project, 'id' | 'createdAt'>>;

// Tipo para Habilidades/Skills
export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: number; // 1-5
  icon?: string;
  order: number;
}

// Tipo para crear una nueva habilidad
export type NewSkill = Omit<Skill, 'id'>;

// Tipo para actualizar una habilidad
export type UpdateSkill = Partial<Omit<Skill, 'id'>>;

// Tipo para el usuario admin
export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

// Tipo para información de contacto
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Timestamp | Date;
  read: boolean;
}

// Tipo para crear un mensaje de contacto
export type NewContactMessage = Omit<ContactMessage, 'id' | 'createdAt' | 'read'>;
