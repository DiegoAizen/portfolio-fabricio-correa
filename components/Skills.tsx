"use client";

import { useState, useEffect } from "react";
import type { Skill } from "@/types";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "Todas" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "tools", name: "Herramientas" },
    { id: "other", name: "Otras" }
  ];

  const filteredSkills = selectedCategory === "all"
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  if (loading) {
    return (
      <section className="py-24 px-6 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-zinc-400">Cargando habilidades...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-white dark:bg-zinc-950/50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Habilidades Técnicas
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-lg">
            Tecnologías y herramientas con las que trabajo
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredSkills.length === 0 ? (
            <div className="col-span-2 text-center py-12 bg-gray-50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-white/10">
              <p className="text-gray-600 dark:text-zinc-400 mb-4">No hay habilidades en esta categoría</p>
              <p className="text-sm text-gray-500 dark:text-zinc-500">Las habilidades aparecerán aquí una vez que agregues contenido</p>
            </div>
          ) : (
            filteredSkills.map((skill) => {
              // Convertir nivel de 1-5 a porcentaje (0-100)
              const percentage = (skill.level / 5) * 100;

              return (
                <div
                  key={skill.id}
                  className="group p-6 rounded-xl bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-500/50 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-sm font-medium text-gray-600 dark:text-zinc-400">
                      Nivel {skill.level}/5
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
