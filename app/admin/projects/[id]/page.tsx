"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/firebase/firestore";
import type { Project } from "@/types";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const id = params.id as string;
      const data = await getProjectById(id);

      if (data) {
        setProject(data);
      } else {
        alert("Proyecto no encontrado");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      alert("Error al cargar el proyecto");
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
            <p className="text-zinc-400">Cargando proyecto...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!project) {
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
              Editar Proyecto
            </h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
            <ProjectForm mode="edit" project={project} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
