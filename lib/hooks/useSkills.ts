"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  createSkill as createSkillFS,
  updateSkill as updateSkillFS,
  deleteSkill as deleteSkillFS
} from '@/lib/firebase/firestore';
import type { NewSkill, UpdateSkill } from '@/types';

export function useSkills() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSkill = async (skill: NewSkill) => {
    if (!user) {
      throw new Error('Debes estar autenticado para crear habilidades');
    }

    setLoading(true);
    setError(null);

    try {
      const id = await createSkillFS(skill);
      return id;
    } catch (err: any) {
      const errorMsg = err.message || 'Error al crear habilidad';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSkill = async (id: string, updates: UpdateSkill) => {
    if (!user) {
      throw new Error('Debes estar autenticado para actualizar habilidades');
    }

    setLoading(true);
    setError(null);

    try {
      await updateSkillFS(id, updates);
    } catch (err: any) {
      const errorMsg = err.message || 'Error al actualizar habilidad';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (id: string) => {
    if (!user) {
      throw new Error('Debes estar autenticado para eliminar habilidades');
    }

    setLoading(true);
    setError(null);

    try {
      await deleteSkillFS(id);
    } catch (err: any) {
      const errorMsg = err.message || 'Error al eliminar habilidad';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createSkill,
    updateSkill,
    deleteSkill,
    loading,
    error,
  };
}
