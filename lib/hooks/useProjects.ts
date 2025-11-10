"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  createProject as createProjectFS,
  updateProject as updateProjectFS,
  deleteProject as deleteProjectFS
} from '@/lib/firebase/firestore';
import type { NewProject, UpdateProject } from '@/types';

export function useProjects() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = async (project: NewProject) => {
    if (!user) {
      throw new Error('Debes estar autenticado para crear proyectos');
    }

    setLoading(true);
    setError(null);

    try {
      const id = await createProjectFS(project);
      return id;
    } catch (err: any) {
      const errorMsg = err.message || 'Error al crear proyecto';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: string, updates: UpdateProject) => {
    if (!user) {
      throw new Error('Debes estar autenticado para actualizar proyectos');
    }

    setLoading(true);
    setError(null);

    try {
      await updateProjectFS(id, updates);
    } catch (err: any) {
      const errorMsg = err.message || 'Error al actualizar proyecto';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!user) {
      throw new Error('Debes estar autenticado para eliminar proyectos');
    }

    setLoading(true);
    setError(null);

    try {
      await deleteProjectFS(id);
    } catch (err: any) {
      const errorMsg = err.message || 'Error al eliminar proyecto';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProject,
    updateProject,
    deleteProject,
    loading,
    error,
  };
}
