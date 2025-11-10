"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/lib/hooks/useProjects";
import type { Project } from "@/types";

interface ProjectFormProps {
  project?: Project;
  mode: "create" | "edit";
}

export default function ProjectForm({ project, mode }: ProjectFormProps) {
  const router = useRouter();
  const { createProject, updateProject } = useProjects();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    longDescription: project?.longDescription || "",
    technologies: project?.technologies.join(", ") || "",
    imageUrl: project?.imageUrl || "",
    gallery: project?.gallery?.join("\n") || "",
    githubUrl: project?.githubUrl || "",
    liveUrl: project?.liveUrl || "",
    featured: project?.featured || false,
    order: project?.order || 0,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Procesar los datos
      const technologiesArray = formData.technologies
        .split(",")
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);

      const galleryArray = formData.gallery
        .split("\n")
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const payload = {
        title: formData.title,
        description: formData.description,
        longDescription: formData.longDescription || undefined,
        technologies: technologiesArray,
        imageUrl: formData.imageUrl,
        gallery: galleryArray.length > 0 ? galleryArray : undefined,
        githubUrl: formData.githubUrl || undefined,
        liveUrl: formData.liveUrl || undefined,
        featured: formData.featured,
        order: Number(formData.order),
      };

      if (mode === "create") {
        await createProject(payload);
      } else if (project?.id) {
        await updateProject(project.id, payload);
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Error al guardar proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Título */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Título del Proyecto *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nombre del proyecto"
          />
        </div>

        {/* Descripción corta */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Descripción Corta *
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Breve descripción que aparecerá en la lista de proyectos"
          />
        </div>

        {/* Descripción larga */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Descripción Detallada
          </label>
          <textarea
            rows={5}
            value={formData.longDescription}
            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Descripción completa que aparecerá en la página de detalle del proyecto"
          />
        </div>

        {/* Tecnologías */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Tecnologías * (separadas por comas)
          </label>
          <input
            type="text"
            required
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="React, Next.js, TypeScript, Tailwind CSS"
          />
        </div>

        {/* Imagen principal */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            URL de Imagen Principal *
          </label>
          <input
            type="url"
            required
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://images.unsplash.com/..."
          />
          {formData.imageUrl && (
            <div className="mt-2">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full max-w-md h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Galería de imágenes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Galería de Imágenes (una URL por línea)
          </label>
          <textarea
            rows={4}
            value={formData.gallery}
            onChange={(e) => setFormData({ ...formData, gallery: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://images.unsplash.com/image1&#10;https://images.unsplash.com/image2&#10;https://images.unsplash.com/image3"
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://github.com/usuario/proyecto"
          />
        </div>

        {/* Live URL */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            URL Demo en Vivo
          </label>
          <input
            type="url"
            value={formData.liveUrl}
            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://proyecto-demo.vercel.app"
          />
        </div>

        {/* Orden */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Orden de visualización *
          </label>
          <input
            type="number"
            required
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1"
          />
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 bg-white/5 border border-white/10 rounded text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm font-medium text-zinc-300">
              Proyecto Destacado
            </span>
          </label>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 pt-6 border-t border-white/10">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Guardando..." : mode === "create" ? "Crear Proyecto" : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
}
