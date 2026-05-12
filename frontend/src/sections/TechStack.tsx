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
  { name: 'Tailwind', icon: SiTailwindcss, color: '#22c55e', category: 'frontend', size: 'medium' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', category: 'frontend', size: 'medium' },
  { name: 'Git', icon: SiGit, color: '#f1502f', category: 'tools', size: 'medium' },
  { name: 'Docker', icon: SiDocker, color: '#2496ed', category: 'tools', size: 'medium' },
  { name: 'React', icon: SiReact, color: '#61dafb', category: 'frontend', size: 'large' },
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
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setRotation(prev => prev + 0.15);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

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
  const primaryTech = technologies.find(t => t.name === 'TypeScript') || technologies[0];

  return (
    <div 
      className="relative w-[420px] h-[420px] mx-auto"
      role="img"
      aria-label="Technologies wheel"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] h-[300px] rounded-full border border-[var(--border)]" />
        <div className="absolute w-[200px] h-[200px] rounded-full border border-[var(--border)] opacity-50" />
        <div className="absolute w-[100px] h-[100px] rounded-full border border-[var(--border)] opacity-25" />
      </div>

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
              className={`absolute ${sizeClasses[tech.size]} rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[var(--accent)] group cursor-pointer`}
              style={{ left: pos.x, top: pos.y }}
            >
              <Icon size={iconSizes[tech.size]} style={{ color: tech.color }} />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
                {tech.name}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-20 h-20 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-hover)] flex items-center justify-center shadow-lg shadow-[var(--accent-dim)]">
          {primaryTech && <primaryTech.icon size={32} style={{ color: primaryTech.color }} />}
        </div>
      </div>

      <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs text-[var(--text-muted)] font-medium tracking-wider uppercase">
        Tech Stack
      </div>
    </div>
  );
}

export function TechStack(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
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
    { key: 'frontend', label: 'Frontend', items: technologies.filter(t => t.category === 'frontend') },
    { key: 'backend', label: 'Backend', items: technologies.filter(t => t.category === 'backend') },
    { key: 'tools', label: 'DevOps & Tools', items: technologies.filter(t => t.category === 'tools') },
  ];

  return (
    <section id="stack" ref={sectionRef} className="section-padding-lg relative" aria-labelledby="stack-heading">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--accent-subtle)_0%,_transparent_70%)]" />
      </div>

      <div className="container-main relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[var(--accent)] font-mono text-lg">#</span>
          <span className="text-[var(--text-muted)] font-mono text-sm tracking-wider">tech-stack</span>
        </div>

        <h2 id="stack-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-16 tracking-tight">
          Tecnologias
        </h2>

        <div className={`mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <TechWheel />
        </div>

        <div className="space-y-4">
          {categories.map((category) => (
            <div 
              key={category.key}
              className={`group rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] p-5 hover:border-[var(--border-hover)] transition-all duration-500 cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-4">{category.label}</div>
              <div className="flex flex-wrap gap-3">
                {category.items.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div 
                      key={tech.name}
                      className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)] group-hover:border-[var(--border-hover)] transition-colors duration-300"
                    >
                      <Icon size={18} style={{ color: tech.color }} />
                      <span className="text-sm text-[var(--text-secondary)] font-medium">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
