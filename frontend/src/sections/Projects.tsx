import { useEffect, useRef, useState, useMemo } from "react";
import { ExternalLink, Github, ArrowUpRight, Clock, Search, SortAsc } from "lucide-react";
import { useProjects } from "../datas/usePortfolio";
import { LazyImage } from "../components/LazyImage";

interface Project {
  title: string;
  image: string;
  problem: string;
  solution: string;
  results: { performance: string; loadTime: string; uptime: string };
  description: string;
  tech: string[];
  github: string;
  demo: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeToBuild: string;
  features: string[];
}

const difficultyColors = {
  Easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/20",
  Hard: "bg-red-500/20 text-red-400 border-red-500/20"
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="relative h-48 md:h-64 overflow-hidden rounded-t-2xl">
          <LazyImage
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-mono border ${difficultyColors[project.difficulty]}`}>
              {project.difficulty}
            </span>
            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] font-mono">
              <Clock className="w-4 h-4" />
              {project.timeToBuild}
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">{project.title}</h3>
            <p className="text-[var(--text-secondary)]">{project.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-center">
              <div className="text-lg font-semibold text-emerald-400">{project.results.performance}</div>
              <div className="text-xs text-[var(--text-muted)]">Performance</div>
            </div>
            <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-center">
              <div className="text-lg font-semibold text-[var(--accent)]">{project.results.loadTime}</div>
              <div className="text-xs text-[var(--text-muted)]">Load Time</div>
            </div>
            <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] text-center">
              <div className="text-lg font-semibold text-amber-400">{project.results.uptime}</div>
              <div className="text-xs text-[var(--text-muted)]">Uptime</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 bg-[var(--accent-subtle)] text-[var(--accent)] rounded-full text-xs font-mono">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              <Github className="w-5 h-5" />
              Código
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--accent)] text-[var(--bg-primary)] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-5 h-5" />
              Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, isVisible, onClick }: { project: Project; index: number; isVisible: boolean; onClick: () => void }) {
  return (
    <div
      className={`
        group relative bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl 
        overflow-hidden cursor-pointer transition-all duration-300 hover-lift
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
    >
      <div className="relative h-40 overflow-hidden">
        <LazyImage
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-md text-xs font-mono border ${difficultyColors[project.difficulty]}`}>
            {project.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
        </div>
        
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{project.problem}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-emerald-400">{project.results.performance}</span>
            <span className="text-[var(--accent)]">{project.results.loadTime}</span>
            <span className="text-amber-400">{project.results.uptime}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="px-2 py-1 bg-[var(--bg-tertiary)] text-[var(--text-muted)] rounded text-xs font-mono">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-1 text-[var(--text-muted)] text-xs">+{project.tech.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}

type SortOption = 'relevance' | 'difficulty-asc' | 'difficulty-desc' | 'name';

export function Projects(): JSX.Element {
  const projects = useProjects() as Project[];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.tech.forEach(t => techs.add(t)));
    return Array.from(techs).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tech.some(t => t.toLowerCase().includes(term))
      );
    }

    if (selectedTech) {
      filtered = filtered.filter(p => p.tech.includes(selectedTech));
    }

    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'difficulty-asc':
        const order = { Easy: 1, Medium: 2, Hard: 3 };
        filtered.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
        break;
      case 'difficulty-desc':
        const orderDesc = { Easy: 3, Medium: 2, Hard: 1 };
        filtered.sort((a, b) => orderDesc[a.difficulty] - orderDesc[b.difficulty]);
        break;
    }

    return filtered;
  }, [projects, searchTerm, selectedTech, sortBy]);

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-sm">
          <span className="text-[var(--accent)]">#</span>
          <span className="text-[var(--text-muted)] font-mono">projects</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-8">
          Proyectos <span className="text-gradient">destacados</span>
        </h2>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTech(null)}
                className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-all ${
                  selectedTech === null 
                    ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]' 
                    : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--border-hover)]'
                }`}
              >
                Todos
              </button>
              {allTechs.map(tech => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-all ${
                    selectedTech === tech 
                      ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]' 
                      : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-[var(--text-muted)]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-muted)] text-sm font-mono px-3 py-1.5 focus:outline-none focus:border-[var(--accent)]"
              >
                <option value="relevance">Relevancia</option>
                <option value="name">Nombre</option>
                <option value="difficulty-asc">Fácil → Difícil</option>
                <option value="difficulty-desc">Difícil → Fácil</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)]">
            {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index}
              isVisible={isVisible}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--text-muted)]">No se encontraron proyectos</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedTech(null); }}
              className="mt-4 text-[var(--accent)] hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="https://github.com/RiverFlow96"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"
          >
            Ver más en GitHub
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}