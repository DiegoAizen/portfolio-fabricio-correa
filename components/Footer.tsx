import { personalInfo } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-zinc-400 text-sm">
            © {currentYear} {personalInfo.name}. Todos los derechos reservados.
          </div>

          <div className="text-zinc-500 text-sm">
            Desarrollado con{" "}
            <span className="text-red-500">♥</span>{" "}
            usando Next.js & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
