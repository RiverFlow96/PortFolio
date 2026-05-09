import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { projects } from "../datas/projects";

function ProjectCard({ project, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={`
        group relative bg-[#0f0f14] border border-purple-500/20 rounded-2xl 
        overflow-hidden transition-all duration-500
        hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
      `} />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`
            w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center
            transition-all duration-300 group-hover:bg-purple-600/40 group-hover:scale-110
          `}>
            <ArrowUpRight className="w-5 h-5 text-purple-400" />
          </div>
          
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/40 transition-colors"
            >
              <Github className="w-4 h-4 text-purple-400" />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/40 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-purple-400" />
            </a>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-4 leading-relaxed text-sm">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, i) => (
            <span
              key={t}
              className="
                px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full 
                text-xs font-mono border border-purple-500/10
                hover:bg-purple-500/20 hover:border-purple-500/30
                transition-all duration-300 cursor-default
              "
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {t}
            </span>
          ))}
        </div>
        
        <div className={`
          absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-purple-400
          transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.08)_0%,_transparent_50%)]" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className={`
          font-mono text-purple-500 mb-8 text-sm transition-all duration-700
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
        `}>
          <span className="text-purple-400">#</span> projects
        </div>

        <h2 className={`
          text-3xl md:text-4xl font-bold text-white mb-12
          transition-all duration-700 delay-100
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          Proyectos <span className="text-purple-500">recientes</span>
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
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-mono transition-colors group"
          >
            Ver más en GitHub
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}