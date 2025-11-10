"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSkills } from "@/lib/hooks/useSkills";
import type { Skill } from "@/types";

interface SkillFormProps {
  skill?: Skill;
  mode: "create" | "edit";
}

interface SkillFormData {
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  level: number;
  icon: string;
  order: number;
}

export default function SkillForm({ skill, mode }: SkillFormProps) {
  const router = useRouter();
  const { createSkill, updateSkill } = useSkills();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<SkillFormData>({
    name: skill?.name || "",
    category: skill?.category || "frontend",
    level: skill?.level || 3,
    icon: skill?.icon || "",
    order: skill?.order || 0,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        category: formData.category as "frontend" | "backend" | "tools" | "other",
        level: Number(formData.level),
        icon: formData.icon || undefined,
        order: Number(formData.order),
      };

      if (mode === "create") {
        await createSkill(payload);
      } else if (skill?.id) {
        await updateSkill(skill.id, payload);
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Error al guardar habilidad");
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
        {/* Nombre */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Nombre de la Habilidad *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="React, Node.js, TypeScript..."
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Categoría *
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as "frontend" | "backend" | "tools" | "other" })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="tools">Herramientas</option>
            <option value="other">Otras</option>
          </select>
        </div>

        {/* Nivel */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Nivel de Dominio * (1-5)
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              required
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Básico</span>
              <span className="text-blue-400 font-bold text-lg">{formData.level}</span>
              <span>Experto</span>
            </div>
            {/* Barra de progreso visual */}
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${(formData.level / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Icono */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            URL del Icono (opcional)
          </label>
          <input
            type="url"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://..."
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
      </div>

      {/* Preview */}
      <div className="border-t border-white/10 pt-6">
        <h3 className="text-sm font-medium text-zinc-300 mb-4">Vista Previa</h3>
        <div className="p-6 rounded-xl bg-black/50 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">
              {formData.name || "Nombre de la habilidad"}
            </h3>
            <span className="text-sm font-medium text-zinc-400">
              Nivel {formData.level}/5
            </span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${(formData.level / 5) * 100}%` }}
            />
          </div>
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
          {loading ? "Guardando..." : mode === "create" ? "Crear Habilidad" : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
}
