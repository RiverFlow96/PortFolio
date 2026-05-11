import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, TrendingUp } from "lucide-react";
import { projects } from "../datas/projects";

function ProjectCard({ project, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={`
        group relative bg-[#0f0f14]/80 backdrop-blur-sm border border-cyan-500/20 rounded-2xl 
        overflow-hidden transition-all duration-500
        hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
      `} />
      
      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className={`
            w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 flex items-center justify-center
            transition-all duration-300 group-hover:scale-110
          `}>
            <ArrowUpRight className="w-5 h-5 text-cyan-400" />
          </div>
          
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-cyan-500/20 hover:bg-cyan-500/40 rounded-lg transition-colors text-cyan-400"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-pink-500/20 hover:bg-pink-500/40 rounded-lg transition-colors text-pink-400"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
          {project.title}
        </h3>
        
        {/* PROBLEMA → SOLUCIÓN */}
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-wide mb-1">Problema</p>
            <p className="text-gray-300 leading-relaxed">
              {project.problem}
            </p>
          </div>
          
          <div>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-wide mb-1">Solución</p>
            <p className="text-gray-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>
        
        {/* Results Metrics */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-cyan-500/10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-400 font-mono text-sm font-bold mb-1">
              <TrendingUp className="w-4 h-4" />
              {project.results.performance}
            </div>
            <p className="text-gray-500 text-xs">Performance</p>
          </div>
          <div className="text-center">
            <div className="text-cyan-400 font-mono text-sm font-bold mb-1">
              {project.results.loadTime}
            </div>
            <p className="text-gray-500 text-xs">Load Time</p>
          </div>
          <div className="text-center">
            <div className="text-pink-400 font-mono text-sm font-bold mb-1">
              {project.results.uptime}
            </div>
            <p className="text-gray-500 text-xs">Uptime</p>
          </div>
        </div>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-3">
          {project.tech.map((t, i) => (
            <span
              key={t}
              className="
                px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full 
                text-xs font-mono border border-cyan-500/20
                hover:bg-cyan-500/20 hover:border-cyan-500/40
                transition-all duration-300 cursor-default
              "
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {t}
            </span>
          ))}
        </div>
        
        {/* Bottom gradient line */}
        <div className={`
          absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 to-pink-500
          transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left
        `} />
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef(null);
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
