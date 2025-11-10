"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { useAuth } from '@/lib/auth/AuthContext';
import { useProjects } from '@/lib/hooks/useProjects';
import { useSkills } from '@/lib/hooks/useSkills';
import type { Project, Skill } from '@/types';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { deleteProject } = useProjects();
  const { deleteSkill } = useSkills();
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'skills'>('projects');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, skillsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills')
      ]);

      const projectsData = await projectsRes.json();
      const skillsData = await skillsRes.json();

      // Asegurarse de que sean arrays
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setSkills(Array.isArray(skillsData) ? skillsData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setProjects([]);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este proyecto?')) return;

    setDeletingId(id);
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (error: any) {
      console.error('Error deleting project:', error);
      alert(error.message || 'Error al eliminar proyecto');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta habilidad?')) return;

    setDeletingId(id);
    try {
      await deleteSkill(id);
      setSkills(skills.filter(s => s.id !== id));
    } catch (error: any) {
      console.error('Error deleting skill:', error);
      alert(error.message || 'Error al eliminar habilidad');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Panel de Administración
              </h1>
              <p className="text-sm text-zinc-400 mt-1">Bienvenido, {user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'projects'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Proyectos ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === 'skills'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Habilidades ({skills.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-zinc-400">Cargando datos...</p>
          </div>
        ) : (
          <>
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Mis Proyectos</h2>
                  <button
                    onClick={() => router.push('/admin/projects/new')}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    + Nuevo Proyecto
                  </button>
                </div>

                {projects.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-12 text-center">
                    <p className="text-zinc-400 mb-4">No hay proyectos todavía</p>
                    <button
                      onClick={() => router.push('/admin/projects/new')}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                    >
                      Crear primer proyecto
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all"
                      >
                        <div className="flex gap-4">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-sm text-zinc-400 mb-3">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((tech, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {project.featured && (
                                  <span className="px-3 py-1 text-xs bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full">
                                    Destacado
                                  </span>
                                )}
                                <button
                                  onClick={() => router.push(`/admin/projects/${project.id}`)}
                                  disabled={deletingId === project.id}
                                  className="px-3 py-1 text-sm bg-white/5 border border-white/10 text-white rounded hover:bg-white/10 transition-all disabled:opacity-50"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(project.id)}
                                  disabled={deletingId === project.id}
                                  className="px-3 py-1 text-sm bg-red-500/10 border border-red-500/20 text-red-400 rounded hover:bg-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {deletingId === project.id ? 'Eliminando...' : 'Eliminar'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Mis Habilidades</h2>
                  <button
                    onClick={() => router.push('/admin/skills/new')}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    + Nueva Habilidad
                  </button>
                </div>

                {skills.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-12 text-center">
                    <p className="text-zinc-400 mb-4">No hay habilidades todavía</p>
                    <button
                      onClick={() => router.push('/admin/skills/new')}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                    >
                      Crear primera habilidad
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-white font-medium">{skill.name}</h3>
                            <span className="text-xs text-zinc-400 capitalize">{skill.category}</span>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => router.push(`/admin/skills/${skill.id}`)}
                              disabled={deletingId === skill.id}
                              className="p-1 text-xs bg-white/5 border border-white/10 text-white rounded hover:bg-white/10 transition-all disabled:opacity-50"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteSkill(skill.id)}
                              disabled={deletingId === skill.id}
                              className="p-1 text-xs bg-red-500/10 border border-red-500/20 text-red-400 rounded hover:bg-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {deletingId === skill.id ? '⏳' : '🗑️'}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
                              style={{ width: `${(skill.level / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-zinc-400">{skill.level}/5</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
