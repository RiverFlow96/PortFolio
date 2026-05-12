import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, X, Star, GitFork } from "lucide-react";
import { useProjects, useGitHubData } from "../datas/usePortfolio";
import type { GitHubRepo } from "../datas/usePortfolio";

function ProjectModal({ repo, onClose }: { repo: GitHubRepo; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    Python: '#3776ab',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Vue: '#41b048',
    React: '#61dafb',
  };

  const repoLanguage = repo.language || 'Code';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-[var(--bg-primary)]/90 backdrop-blur-sm" onClick={onClose} role="button" aria-label="Cerrar modal" />
      
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-3xl">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all duration-300 active:scale-[0.95]"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="relative h-52 sm:h-64 overflow-hidden rounded-t-3xl">
          <div className="w-full h-full bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] flex items-center justify-center">
            <Github className="w-20 h-20 text-[var(--text-muted)] opacity-30" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-[var(--bg-secondary)]/50 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">{repo.name}</h3>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap gap-3 text-sm">
            <span 
              className="px-3 py-1.5 rounded-full border bg-[var(--bg-tertiary)] border-[var(--border)] text-[var(--text-secondary)]"
              style={{ borderColor: languageColors[repoLanguage] ? `${languageColors[repoLanguage]}40` : undefined }}
            >
              {repoLanguage}
            </span>
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border)] text-[var(--text-secondary)]">
                <Star className="w-3.5 h-3.5" />{repo.stargazers_count}
              </span>
            )}
            {repo.forks_count > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border)] text-[var(--text-secondary)]">
                <GitFork className="w-3.5 h-3.5" />{repo.forks_count}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm text-[var(--text-secondary)]">
              {repo.description || 'Sin descripcion disponible'}
            </p>
          </div>

          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {repo.topics.slice(0, 8).map((topic) => (
                <span key={topic} className="px-3 py-1.5 text-xs rounded-lg bg-[var(--accent-subtle)] border border-[var(--border-hover)] text-[var(--accent)]">{topic}</span>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group cursor-pointer flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-subtle)] transition-all duration-300">
              <Github className="w-4 h-4" />Codigo
            </a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="group cursor-pointer flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--accent-hover)] transition-all duration-300 active:scale-[0.98]">
                <ExternalLink className="w-4 h-4" />Demo en vivo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ repo, index, isVisible, onClick }: { repo: GitHubRepo; index: number; isVisible: boolean; onClick: () => void }) {
  return (
    <button
      className={`group cursor-pointer w-full text-left rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-500 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      onClick={onClick}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative h-40 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] flex items-center justify-center">
          <Github className="w-16 h-16 text-[var(--text-muted)] opacity-20 group-hover:opacity-40 transition-opacity" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-[var(--bg-secondary)]/30 to-transparent" />
        <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[var(--bg-primary)]/80 backdrop-blur-sm border border-[var(--border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight className="w-4 h-4 text-[var(--accent)]" />
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">{repo.name}</h3>
        </div>
        
        <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
          {repo.description || 'Sin descripcion'}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {repo.language && (
            <span className="px-2.5 py-1 text-xs rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border)]">{repo.language}</span>
          )}
          {repo.topics && repo.topics.slice(0, 2).map((topic) => (
            <span key={topic} className="px-2.5 py-1 text-xs rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border)]">{topic}</span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-3 border-t border-[var(--border)]">
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              {repo.stargazers_count} stars
            </div>
          )}
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              {repo.forks_count} forks
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

export function Projects(): JSX.Element {
  const projects = useProjects();
  const { userLoading } = useGitHubData();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (userLoading) {
    return (
      <section id="projects" ref={sectionRef} className="section-padding-lg relative">
        <div className="container-main relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[var(--accent)] font-mono text-lg">#</span>
            <span className="text-[var(--text-muted)] font-mono text-sm tracking-wider">projects</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-16 tracking-tight">Proyectos</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" ref={sectionRef} className="section-padding-lg relative" aria-labelledby="projects-heading">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--accent-subtle)_0%,_transparent_70%)]" />
      </div>

      <div className="container-main relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[var(--accent)] font-mono text-lg">#</span>
          <span className="text-[var(--text-muted)] font-mono text-sm tracking-wider">projects</span>
        </div>

        <h2 id="projects-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-16 tracking-tight">
          Proyectos
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((repo, index) => (
            <ProjectCard 
              key={repo.name}
              repo={repo} 
              index={index}
              isVisible={isVisible}
              onClick={() => setSelectedRepo(repo)}
            />
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <a 
            href="https://github.com/RiverFlow96" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group cursor-pointer inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all duration-300"
          >
            Ver mas en GitHub 
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>

      {selectedRepo && <ProjectModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />}
    </section>
  );
}
