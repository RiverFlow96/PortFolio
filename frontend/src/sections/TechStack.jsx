import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Code, Code2 } from 'lucide-react';
import { 
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss, 
  SiDjango, SiPython, SiPostgresql, 
  SiGit, SiGithub, SiMake 
} from 'react-icons/si';

const technologies = [
  { name: 'React', icon: SiReact, color: '#61dafb' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  { name: 'HTML', icon: SiHtml5, color: '#e34c26' },
  { name: 'CSS', icon: SiCss, color: '#563d7c' },
  { name: 'Django', icon: SiDjango, color: '#092e20' },
  { name: 'Python', icon: SiPython, color: '#3776ab' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  { name: 'Git', icon: SiGit, color: '#f1502f' },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
  { name: 'VS Code', icon: Code, color: '#007acc' },
  { name: 'OpenCode', icon: Code2, color: '#8b5cf6' },
  { name: 'Make', icon: SiMake, color: '#14b8a6' },
];

function AnimatedAtom() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 400"
      style={{ opacity: 0.15 }}
    >
      {/* Núcleo central */}
      <circle cx="200" cy="200" r="20" fill="#8b5cf6" opacity="0.8" />
      
      {/* Órbitas */}
      <ellipse cx="200" cy="200" rx="120" ry="40" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.6" />
      <ellipse cx="200" cy="200" rx="120" ry="40" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.6" transform="rotate(60 200 200)" />
      <ellipse cx="200" cy="200" rx="120" ry="40" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.6" transform="rotate(120 200 200)" />
      
      {/* Electrones */}
      <circle cx="320" cy="200" r="6" fill="#61dafb" opacity="0.8">
        <animateTransform attributeName="transform" type="rotate" values="0 200 200;360 200 200" dur="8s" repeatCount="indefinite" />
      </circle>
      <circle cx="320" cy="200" r="6" fill="#61dafb" opacity="0.8">
        <animateTransform attributeName="transform" type="rotate" values="120 200 200;480 200 200" dur="8s" repeatCount="indefinite" />
      </circle>
      <circle cx="320" cy="200" r="6" fill="#61dafb" opacity="0.8">
        <animateTransform attributeName="transform" type="rotate" values="240 200 200;600 200 200" dur="8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function TechCarousel() {
  const containerRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes infiniteScroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(calc(-100% / 2));
        }
      }
      
      .carousel-track {
        animation: infiniteScroll 20s linear infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-6">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
      >
        <div className="carousel-track flex gap-6">
          {[...technologies, ...technologies].map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex-shrink-0 flex flex-col items-center group"
            >
              <div className="
                w-14 h-14 rounded-xl
                bg-[#0f0f14]/60 border border-purple-500/20
                flex items-center justify-center
                group-hover:bg-purple-600/20 group-hover:border-purple-500/50
                group-hover:shadow-lg group-hover:shadow-purple-500/20
                transition-all duration-300
              ">
                <tech.icon size={28} style={{ color: tech.color }} />
              </div>
              <span className="
                mt-2 text-xs font-mono text-gray-500
                group-hover:text-purple-300
                transition-colors duration-300
                whitespace-nowrap
              ">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradient masks sutiles para efecto de desvanecimiento suave */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0f] to-transparent opacity-40 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0f] to-transparent opacity-40 pointer-events-none" />
    </div>
  );
}

function TechItem({ tech, index, isExpanded }) {
  const Icon = tech.icon;
  
  return (
    <div
      className={`
        transition-all duration-500 ease-out transform
        ${isExpanded 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }
      `}
      style={{
        transitionDelay: isExpanded ? `${index * 80}ms` : `${(12 - index) * 40}ms`,
      }}
    >
      <div className="group flex flex-col items-center transition-all duration-300">
        <div className="
          w-16 h-16 rounded-2xl
          bg-[#0f0f14]/80 border border-purple-500/20
          flex items-center justify-center
          group-hover:bg-purple-600/20 group-hover:border-purple-500/50
          group-hover:shadow-lg group-hover:shadow-purple-500/20
          transition-all duration-300 cursor-default
        ">
          <Icon size={32} style={{ color: tech.color }} />
        </div>
        <span className="
          mt-2 text-xs font-mono text-gray-400
          group-hover:text-purple-300
          transition-colors duration-300
        ">
          {tech.name}
        </span>
      </div>
    </div>
  );
}

const categories = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: 'from-cyan-500 to-blue-500',
    borderColor: 'border-cyan-500/50',
    hoverColor: 'hover:border-cyan-500',
    bgHover: 'hover:bg-cyan-600/20',
    tech: technologies.filter(t => ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'].includes(t.name))
  },
  {
    id: 'backend',
    label: 'Backend',
    color: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-500/50',
    hoverColor: 'hover:border-green-500',
    bgHover: 'hover:bg-green-600/20',
    tech: technologies.filter(t => ['Django', 'Python', 'PostgreSQL'].includes(t.name))
  },
  {
    id: 'tools',
    label: 'Tools',
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500/50',
    hoverColor: 'hover:border-orange-500',
    bgHover: 'hover:bg-orange-600/20',
    tech: technologies.filter(t => ['Git', 'GitHub', 'VS Code', 'OpenCode', 'Make'].includes(t.name))
  },
];

function CategoryButton({ category, isExpanded, onToggle, isVisible }) {
  return (
    <div className={`
      transition-all duration-700
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
    `}>
      <button
        onClick={() => onToggle(category.id)}
        className={`
          relative w-full px-6 py-4 rounded-2xl
          border-2 transition-all duration-300
          font-semibold text-white
          group overflow-hidden
          ${category.borderColor} ${category.bgHover}
          ${isExpanded 
            ? `bg-gradient-to-r ${category.color} border-transparent shadow-lg` 
            : 'bg-[#0f0f14]/60 backdrop-blur-sm'
          }
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        
        <div className="relative flex items-center justify-between">
          <span>{category.label}</span>
          <ChevronDown className={`
            w-5 h-5 transition-transform duration-300
            ${isExpanded ? 'rotate-180' : 'rotate-0'}
          `} />
        </div>
      </button>

      <div className={`
        mt-4 transition-all duration-500 overflow-hidden
        ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="grid grid-cols-3 gap-4 px-2 md:grid-cols-5">
          {category.tech.map((tech, i) => (
            <TechItem 
              key={tech.name}
              tech={tech}
              index={i}
              isExpanded={isExpanded}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TechStack() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const handleToggle = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <section id="stack" ref={sectionRef} className="min-h-screen py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.08)_0%,_transparent_70%)]" />
      
      {/* Animated background */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 blur-3xl">
        <AnimatedAtom />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className={`
          text-center mb-16 transition-all duration-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <div className="font-mono text-purple-500 mb-4 text-sm">
            <span className="text-purple-400">#</span> tech-stack
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tecnologías que <span className="text-purple-500">uso</span>
          </h2>
          
          {/* Tech Carousel */}
          <div className={`
            transition-all duration-700 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <TechCarousel />
          </div>
          
          <p className="text-gray-400 text-sm mt-6">
            Haz clic en cada categoría para explorar
          </p>
        </div>

        <div className="space-y-4 mt-12">
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isExpanded={expandedCategory === category.id}
              onToggle={handleToggle}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className={`
          mt-16 text-center transition-all duration-700 delay-500
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}>
          <p className="text-gray-500 font-mono text-xs">
            <span className="text-purple-500">&gt;</span> Total: 13 tecnologías en el stack
          </p>
        </div>
      </div>
    </section>
  );
}