import { useEffect, useRef, useState } from 'react';
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
  { name: 'Tailwind', icon: SiTailwindcss, color: '#14b8a6', category: 'frontend', size: 'medium' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', category: 'frontend', size: 'medium' },
  { name: 'Git', icon: SiGit, color: '#f1502f', category: 'tools', size: 'medium' },
  { name: 'Docker', icon: SiDocker, color: '#2496ed', category: 'tools', size: 'medium' },
];

const sizeClasses: Record<Technology['size'], string> = {
  small: 'w-10 h-10',
  medium: 'w-12 h-12',
  large: 'w-14 h-14'
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
      const interval = setInterval(() => setRotation(prev => prev + 0.3), 16);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const outerRadius = 150;
  const centerX = 200;
  const centerY = 200;

  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (2 * Math.PI * index) / total - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * radius - 28,
      y: centerY + Math.sin(angle) * radius - 28,
    };
  };

  const techs = technologies.filter(t => t.size !== 'small');

  return (
    <div 
      className="relative w-[420px] h-[420px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Minimal rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[280px] h-[280px] rounded-full border border-[var(--border)]" />
        <div className="absolute w-[180px] h-[180px] rounded-full border border-[var(--border)] opacity-50" />
      </div>

      {/* Rotating icons */}
      <div 
        className="absolute inset-0 transition-transform ease-linear"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {techs.map((tech, i) => {
          const pos = getPosition(i, techs.length, outerRadius);
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              className={`absolute ${sizeClasses[tech.size]} rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[var(--accent)]`}
              style={{ left: pos.x, top: pos.y }}
            >
              <Icon size={iconSizes[tech.size]} style={{ color: tech.color }} />
            </div>
          );
        })}
      </div>

      {/* Center - minimal */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-20 h-20 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center">
          <SiReact size={32} className="text-[var(--accent)]" />
        </div>
      </div>

      {/* Label */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm text-[var(--text-muted)]">
        Tech Stack
      </div>
    </div>
  );
}

export function TechStack(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const categories = [
    { id: 'frontend', label: 'Frontend', tech: technologies.filter(t => t.category === 'frontend') },
    { id: 'backend', label: 'Backend', tech: technologies.filter(t => t.category === 'backend') },
    { id: 'tools', label: 'Tools', tech: technologies.filter(t => t.category === 'tools') },
  ];

  return (
    <section id="stack" ref={sectionRef} className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-sm">
          <span className="text-[var(--accent)]">#</span>
          <span className="text-[var(--text-muted)] font-mono">tech-stack</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-12">
          Tecnologías que uso
        </h2>

        {/* Wheel */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <TechWheel />
        </div>

        {/* Categories - simple grid */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="border border-[var(--border)] rounded-xl p-4 hover:border-[var(--border-hover)] transition-colors">
              <div className="text-sm text-[var(--accent)] font-medium mb-4">{category.label}</div>
              <div className="flex flex-wrap gap-3">
                {category.tech.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div 
                      key={tech.name}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]"
                    >
                      <Icon size={16} style={{ color: tech.color }} />
                      <span className="text-sm text-[var(--text-secondary)]">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-[var(--text-muted)]">
          <span className="text-[var(--accent)]">→</span> {technologies.length} tecnologías en el stack
        </div>
      </div>
    </section>
  );
}