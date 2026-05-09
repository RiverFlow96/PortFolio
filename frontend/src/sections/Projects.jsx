import { ExternalLink, Github } from "lucide-react";
import { projects } from "../datas/projects";

export function Projects() {
  return (
    <section id="projects" className="min-h-screen py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="font-mono text-purple-500 mb-8 text-sm">
          <span className="text-purple-400">#</span> projects
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Proyectos <span className="text-purple-500">recientes</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group bg-[#0f0f14] border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 bg-[#1a1a24] text-purple-300 rounded text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  target="_blank"
                  href={project.github}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="font-mono text-sm">Code</span>
                </a>
                <a
                  target="_blank"
                  href={project.demo}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-mono text-sm">Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-mono transition-colors"
          >
            Ver más en GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
