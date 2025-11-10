"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Project } from "@/types";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects?featured=true');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-zinc-400">Cargando proyectos...</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="projects" className="py-24 px-6 bg-gray-50 dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-lg">
            Una selección de trabajos que muestran mi experiencia en desarrollo full-stack
          </p>
        </div>

        <div className="grid gap-8">
          {projects.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
              <p className="text-gray-600 dark:text-zinc-400 mb-4">No hay proyectos destacados todavía</p>
              <p className="text-sm text-gray-500 dark:text-zinc-500">Los proyectos aparecerán aquí una vez que agregues contenido desde el panel de administración</p>
            </div>
          ) : (
            projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-950/50 hover:border-blue-500 dark:hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image - alternating left/right */}
                <div className={`relative aspect-video md:aspect-auto overflow-hidden ${
                  index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300 z-10" />
                  {/* Real Image */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className={`p-8 md:p-12 flex flex-col justify-center ${
                  index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                }`}>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-700 dark:text-zinc-400 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-4">
                      <Link
                        href={`/projects/${project.id}`}
                        className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                      >
                        Ver proyecto
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </section>
  );
}
