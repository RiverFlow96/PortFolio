import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, Clock } from "lucide-react";
import { useProjects } from "../datas/usePortfolio";
import { LazyImage } from "../components/LazyImage";

interface Project {
  title: string;
  image: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeToBuild: string;
  results: { performance: string; loadTime: string; uptime: string };
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} role="button" aria-label="Cerrar modal" />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-white z-10"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <LazyImage src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
            <span className="px-2 py-1 rounded bg-[var(--bg-tertiary)]">{project.difficulty}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{project.timeToBuild}</span>
          </div>

          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-[var(--text-secondary)] text-sm">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-2 py-1 bg-[var(--bg-tertiary)] text-xs rounded">{t}</span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-sm hover:border-[var(--accent)] transition-all duration-200">
              <Github className="w-4 h-4" />Código
            </a>
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="cursor-pointer flex-1 flex items-center justify-center gap-2 py-2.5 bg-[var(--accent)] text-[var(--bg-primary)] rounded-lg text-sm font-medium hover:opacity-90">
              <ExternalLink className="w-4 h-4" />Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <button
      className="cursor-pointer group w-full text-left bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--border-hover)] transition-all duration-200"
      onClick={onClick}
    >
      <div className="relative h-36 overflow-hidden">
        <LazyImage src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
          <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
        </div>
        
        <p className="text-sm text-[var(--text-muted)] line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="px-2 py-0.5 bg-[var(--bg-tertiary)] text-xs text-[var(--text-muted)] rounded">{t}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

export function Projects(): JSX.Element {
  const projects = useProjects() as Project[];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative" aria-labelledby="projects-heading">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-sm">
          <span className="text-[var(--accent)]">#</span>
          <span className="text-[var(--text-muted)] font-mono">projects</span>
        </div>

        <h2 id="projects-heading" className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-10">
          Proyectos
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div key={project.title} className={isVisible ? 'animate-fade-in' : 'opacity-0'} style={{ animationDelay: `${index * 0.08}s` }}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="https://github.com/RiverFlow96" target="_blank" rel="noopener noreferrer" className="cursor-pointer inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-sm">
            Ver más en GitHub <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}