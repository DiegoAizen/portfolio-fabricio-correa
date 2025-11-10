"use client";

import { personalInfo } from "@/lib/data";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/fondo.png)' }}
    >
      {/* Overlay dinámico según el tema */}
      <div className="absolute inset-0 bg-white/60 dark:bg-white/10"></div>
      <div className="max-w-7xl w-full relative z-10">
        <div className="text-center space-y-8">
          {/* Small badges with animation */}
          <div
            className={`flex items-center justify-center gap-4 text-sm transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <span className="px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 hover:border-purple-400 dark:hover:border-purple-400/60 hover:bg-purple-100 dark:hover:bg-purple-500/10 transition-colors">
              Sobre mi
            </span>
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100/90 to-purple-100/90 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-400 dark:border-blue-400/30 text-blue-800 dark:text-blue-300 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-500/30 dark:hover:to-purple-500/30 transition-all font-medium">
              Proyectos destacados
            </span>
          </div>

          {/* Main heading with gradient and animation */}
          <div className="space-y-4">
            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <span className="inline-block bg-gradient-to-r from-white via-cyan-500 to-blue-300 bg-clip-text text-transparent animate-gradient">
                Construyendo puentes
              </span>
            </h1>
            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <span className="inline-block bg-gradient-to-r from-purple-200 via-fuchsia-500 to-pink-100 bg-clip-text text-transparent animate-gradient">
                entre diseño
              </span>
            </h1>
            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <span className="inline-block bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent animate-gradient">
                y código
              </span>
            </h1>
          </div>

          {/* Description */}
          <div
            className={`max-w-3xl mx-auto space-y-6 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-lg md:text-xl text-gray-700 dark:text-zinc-400 leading-relaxed">
              Soy <span className="text-gray-900 dark:text-white font-medium">{personalInfo.name}</span>, un{" "}
              <span className="text-gray-900 dark:text-white font-medium">{personalInfo.title.toLowerCase()}</span> en{" "}
              <span className="text-gray-900 dark:text-white font-medium">{personalInfo.location}</span>, donde creo experiencias de usuario intuitivas.
              Después de horas, construyo mis propios proyectos.
            </p>

            {/* CTA Button */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <a
                href="#about"
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-500/10 dark:to-blue-500/10 border border-purple-400 dark:border-purple-400/30 hover:border-purple-500 dark:hover:border-purple-400/60 hover:from-purple-200 hover:to-blue-200 dark:hover:from-purple-500/20 dark:hover:to-blue-500/20 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-purple-700 dark:text-purple-200 group-hover:text-purple-900 dark:group-hover:text-white transition-colors">
                  Sobre mi - {personalInfo.name}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        :global(.animate-gradient) {
          animation: gradient 8s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
}
