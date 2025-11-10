import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="work" className="py-24 px-6 bg-zinc-950/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
          Experiencia Laboral
        </h2>

        <div className="space-y-12">
          {experience.map((job) => (
            <div
              key={job.id}
              className="group relative border-l-2 border-white/10 pl-8 pb-8 hover:border-blue-500/50 transition-colors"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white/10 border-2 border-black group-hover:bg-blue-500 group-hover:border-blue-500 transition-colors" />

              {/* Period */}
              <div className="text-sm text-zinc-500 mb-2">{job.period}</div>

              {/* Title & Company */}
              <h3 className="text-xl font-bold text-white mb-1">{job.company}</h3>
              <h4 className="text-lg text-blue-400 mb-4">{job.title}</h4>

              {/* Description */}
              <ul className="space-y-2">
                {job.description.map((item, index) => (
                  <li key={index} className="text-zinc-400 leading-relaxed flex gap-3">
                    <span className="text-blue-500 mt-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
