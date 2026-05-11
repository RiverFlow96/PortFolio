import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Zap } from 'lucide-react';
import { 
  SiReact, SiTypescript, SiJavascript, 
  SiDjango, SiPython, SiPostgresql, 
  SiGit, SiDocker, SiTailwindcss
} from 'react-icons/si';

type IconComponent = React.ComponentType<any>;

interface Technology {
  name: string;
  icon: IconComponent;
  color: string;
  category: 'frontend' | 'backend' | 'tools';
  size: 'small' | 'medium' | 'large';
}

const technologies: Technology[] = [
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', category: 'frontend', size: 'large' },
  { name: 'Django', icon: SiDjango, color: '#092e20', category: 'backend', size: 'large' },
  { name: 'Python', icon: SiPython, color: '#3776ab', category: 'backend', size: 'medium' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791', category: 'backend', size: 'medium' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06b6d4', category: 'frontend', size: 'medium' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', category: 'frontend', size: 'medium' },
  { name: 'Git', icon: SiGit, color: '#f1502f', category: 'tools', size: 'medium' },
  { name: 'Docker', icon: SiDocker, color: '#2496ed', category: 'tools', size: 'medium' },
];

const sizeClasses: Record<Technology['size'], string> = {
  small: 'w-10 h-10 text-xs',
  medium: 'w-12 h-12 text-sm',
  large: 'w-14 h-14 text-base'
};

const iconSizes: Record<Technology['size'], number> = {
  small: 18,
  medium: 22,
  large: 28
};

function TechWheel(): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setRotation(prev => prev + 0.5);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const outerRadius = 160;
  const innerRadius = 100;
  const centerX = 200;
  const centerY = 200;

  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (2 * Math.PI * index) / total - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * radius - 28,
      y: centerY + Math.sin(angle) * radius - 28,
    };
  };

  const outerTechs = technologies.filter(t => t.size !== 'small');
  const innerTechs = technologies.filter(t => t.size === 'small');

  return (
    <div 
      className="relative w-[420px] h-[420px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] h-[300px] rounded-full border border-cyan-500/10 border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[220px] h-[220px] rounded-full border border-pink-500/10 border-dashed animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute w-[140px] h-[140px] rounded-full border border-emerald-500/10 border-dashed animate-[spin_30s_linear_infinite]" />
      </div>

      {/* Rotating container */}
      <div 
        className="absolute inset-0 transition-transform ease-linear"
        style={{ 
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* Outer ring - Large & Medium icons */}
        {outerTechs.map((tech, i) => {
          const pos = getPosition(i, outerTechs.length, outerRadius);
          const Icon = tech.icon;
          return (
            <div
              key={`outer-${tech.name}`}
              className={`absolute ${sizeClasses[tech.size]} rounded-2xl bg-[#0f0f14]/90 border border-cyan-500/30 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:border-cyan-500/70 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:bg-cyan-500/10`}
              style={{
                left: pos.x,
                top: pos.y,
              }}
            >
              <Icon size={iconSizes[tech.size!]} style={{ color: tech.color }} />
            </div>
          );
        })}

        {/* Inner ring - Small icons */}
        {innerTechs.map((tech, i) => {
          const pos = getPosition(i, innerTechs.length, innerRadius);
          const Icon = tech.icon;
          return (
            <div
              key={`inner-${tech.name}`}
              className={`absolute ${sizeClasses[tech.size]} rounded-xl bg-[#0f0f14]/90 border border-pink-500/30 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:border-pink-500/70 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:bg-pink-500/10`}
              style={{
                left: pos.x,
                top: pos.y,
              }}
            >
              <Icon size={iconSizes[tech.size!]} style={{ color: tech.color }} />
            </div>
          );
        })}
      </div>

      {/* Center - Animated core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-24 h-24">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
          
          {/* Core circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#1a1a24] to-[#0f0f14] border-2 border-cyan-500/50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-pink-500/20 to-emerald-500/20 animate-[spin_3s_linear_infinite] rounded-full" />
            <SiReact size={36} className="text-cyan-400 relative z-10" />
          </div>
          
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#06b6d4]" />
          </div>
          <div className="absolute inset-0 animate-[spin_6s_linear_infinite_reverse]">
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full shadow-[0_0_10px_#ec4899]" />
          </div>
        </div>
      </div>

      {/* Labels around the wheel */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-center">
        <span className="text-cyan-400 font-mono text-sm">Tech Stack</span>
      </div>

      {/* Instructions */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <Zap className="w-4 h-4 text-yellow-400" />
        <span className="text-gray-500 font-mono text-xs">Hover para rotar</span>
      </div>
    </div>
  );
}

interface TechItemProps {
  tech: Technology;
  index: number;
  isExpanded: boolean;
}

function TechItem({ tech, index, isExpanded }: TechItemProps): JSX.Element {
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
        transitionDelay: isExpanded ? `${index * 60}ms` : `${(10 - index) * 30}ms`,
      }}
    >
      <div className="group flex flex-col items-center transition-all duration-300">
        <div className={`
          w-16 h-16 rounded-2xl
          bg-[#0f0f14]/80 border border-cyan-500/20
          flex items-center justify-center
          group-hover:bg-cyan-600/20 group-hover:border-cyan-500/50
          group-hover:shadow-lg group-hover:shadow-cyan-500/20
          transition-all duration-300 cursor-default
        `}>
          <Icon size={28} style={{ color: tech.color }} />
        </div>
        <span className="mt-2 text-xs font-mono text-gray-400 group-hover:text-cyan-300 transition-colors duration-300">
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
    bgHover: 'hover:bg-cyan-600/20',
    tech: technologies.filter(t => t.category === 'frontend')
  },
  {
    id: 'backend',
    label: 'Backend',
    color: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-500/50',
    bgHover: 'hover:bg-green-600/20',
    tech: technologies.filter(t => t.category === 'backend')
  },
  {
    id: 'tools',
    label: 'Tools',
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500/50',
    bgHover: 'hover:bg-orange-600/20',
    tech: technologies.filter(t => t.category === 'tools')
  },
  ];

export function TechStack(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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

  const handleToggle = (categoryId: string): void => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <section id="stack" ref={sectionRef} className="min-h-screen py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.08)_0%,_transparent_70%)]" />
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className={`
          text-center mb-8 transition-all duration-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <div className="font-mono text-cyan-500 mb-4 text-sm">
            <span className="text-cyan-400">#</span> tech-stack
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tecnologías que <span className="text-cyan-500">uso</span>
          </h2>
        </div>

        {/* Tech Wheel */}
        <div className={`
          mb-8 transition-all duration-700 delay-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <TechWheel />
        </div>

        <p className="text-gray-400 text-sm text-center mb-8">
          Haz clic en cada categoría para explorar
        </p>

        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className={`
              transition-all duration-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}>
              <button
                onClick={() => handleToggle(category.id)}
                className={`
                  relative w-full px-6 py-4 rounded-2xl
                  border-2 transition-all duration-300
                  font-semibold text-white
                  group overflow-hidden
                  ${category.borderColor} ${category.bgHover}
                  ${expandedCategory === category.id 
                    ? `bg-gradient-to-r ${category.color} border-transparent shadow-lg` 
                    : 'bg-[#0f0f14]/60 backdrop-blur-sm'
                  }
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative flex items-center justify-between">
                  <span>{category.label}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedCategory === category.id ? 'rotate-180' : 'rotate-0'}`} />
                </div>
              </button>

              <div className={`mt-4 transition-all duration-500 overflow-hidden ${expandedCategory === category.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-3 gap-4 px-2 md:grid-cols-5">
                  {category.tech.map((tech, i) => (
                    <TechItem key={tech.name} tech={tech} index={i} isExpanded={expandedCategory === category.id} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-500 font-mono text-xs">
            <span className="text-cyan-500">&gt;</span> Total: {technologies.length} tecnologías en el stack
          </p>
        </div>
      </div>
    </section>
  );
}