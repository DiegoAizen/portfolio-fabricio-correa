"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import SkillForm from "@/components/admin/SkillForm";
import { getAllSkills } from "@/lib/firebase/firestore";
import type { Skill } from "@/types";

export default function EditSkillPage() {
  const params = useParams();
  const router = useRouter();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkill();
  }, [params.id]);

  const fetchSkill = async () => {
    try {
      const id = params.id as string;
      const skills = await getAllSkills();
      const foundSkill = skills.find((s: Skill) => s.id === id);

      if (foundSkill) {
        setSkill(foundSkill);
      } else {
        alert("Habilidad no encontrada");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error fetching skill:", error);
      alert("Error al cargar la habilidad");
      router.push("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-zinc-400">Cargando habilidad...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!skill) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
        {/* Header */}
        <header className="bg-white/5 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al Dashboard
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Editar Habilidad
            </h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
            <SkillForm mode="edit" skill={skill} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
