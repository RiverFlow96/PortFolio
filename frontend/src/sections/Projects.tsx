import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, TrendingUp, Clock, Zap, X } from "lucide-react";
import { useProjects } from "../datas/usePortfolio";

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
  Easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-400 border-red-500/30"
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f0f14] border border-cyan-500/30 rounded-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="relative h-48 md:h-64 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-mono border ${difficultyColors[project.difficulty]}`}>
              {project.difficulty}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400 font-mono">
              <Clock className="w-4 h-4" />
              {project.timeToBuild}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400">{project.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#1a1a24] rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-mono text-sm font-bold mb-1">
                <TrendingUp className="w-4 h-4" />
                {project.results.performance}
              </div>
              <p className="text-gray-500 text-xs">Performance</p>
            </div>
            <div className="bg-[#1a1a24] rounded-lg p-4 text-center">
              <div className="text-cyan-400 font-mono text-sm font-bold mb-1">
                {project.results.loadTime}
              </div>
              <p className="text-gray-500 text-xs">Load Time</p>
            </div>
            <div className="bg-[#1a1a24] rounded-lg p-4 text-center">
              <div className="text-pink-400 font-mono text-sm font-bold mb-1">
                {project.results.uptime}
              </div>
              <p className="text-gray-500 text-xs">Uptime</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-mono text-cyan-400 mb-3">📋 Features</h4>
            <ul className="grid grid-cols-2 gap-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                  <Zap className="w-4 h-4 text-cyan-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors"
            >
              <Github className="w-5 h-5" />
              Código
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-lg transition-colors"
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

function ProjectCard({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div
        className={`
          group relative bg-[#0f0f14]/80 backdrop-blur-sm border border-cyan-500/20 rounded-2xl 
          overflow-hidden transition-all duration-500 cursor-pointer
          hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
        style={{ transitionDelay: `${index * 0.1}s` }}
        onClick={() => setSelectedProject(project)}
      >
        <div className={`
          absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        `} />
        
        {/* Image Preview */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] to-transparent" />
          
          {/* Difficulty & Time badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-2 py-1 rounded-md text-xs font-mono border ${difficultyColors[project.difficulty]}`}>
              {project.difficulty}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono bg-black/50 text-gray-300">
              <Clock className="w-3 h-3" />
              {project.timeToBuild}
            </span>
          </div>
        </div>
        
        <div className="relative p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-pink-500/20 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </div>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-cyan-500/20 hover:bg-cyan-500/40 rounded-lg transition-colors text-cyan-400"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-pink-500/20 hover:bg-pink-500/40 rounded-lg transition-colors text-pink-400"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
            {project.title}
          </h3>
        
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-gray-500 font-mono text-xs uppercase tracking-wide mb-1">Problema</p>
              <p className="text-gray-300 leading-relaxed line-clamp-2">
                {project.problem}
              </p>
            </div>
          </div>
        
          {/* Results Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-cyan-500/10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-400 font-mono text-sm font-bold">
                <TrendingUp className="w-3 h-3" />
                {project.results.performance}
              </div>
              <p className="text-gray-500 text-xs">Perf</p>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 font-mono text-sm font-bold">
                {project.results.loadTime}
              </div>
              <p className="text-gray-500 text-xs">Load</p>
            </div>
            <div className="text-center">
              <div className="text-pink-400 font-mono text-sm font-bold">
                {project.results.uptime}
              </div>
              <p className="text-gray-500 text-xs">Uptime</p>
            </div>
          </div>
        
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-xs font-mono border border-cyan-500/20"
              >
                {t}
              </span>
            ))}
          </div>
        
          <div className={`
            absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 to-pink-500
            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left
          `} />
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}

export function Projects(): JSX.Element {
  const projects = useProjects() as Project[];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.08)_0%,_transparent_50%)]" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className={`
          font-mono text-cyan-500 mb-8 text-sm transition-all duration-700
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
        `}>
          <span className="text-emerald-400">#</span> projects
        </div>

        <h2 className={`
          text-3xl md:text-4xl font-bold text-white mb-12
          transition-all duration-700 delay-100
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          Proyectos <span className="text-gradient-cyan">destacados</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className={`
          mt-12 text-center transition-all duration-700 delay-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <a
            href="https://github.com/RiverFlow96"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono transition-colors group"
          >
            Ver más en GitHub
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}