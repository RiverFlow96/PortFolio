import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Code2, Rocket, LucideIcon } from 'lucide-react';

interface ProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
  number: string;
}

const processSteps: ProcessStep[] = [
  {
    title: 'Ideacion',
    description: 'Entiendo el problema, defino requisitos y diseno una arquitectura escalable.',
    icon: Lightbulb,
    number: '01'
  },
  {
    title: 'Desarrollo',
    description: 'Escribo codigo limpio, modular y testeable siguiendo mejores practicas.',
    icon: Code2,
    number: '02'
  },
  {
    title: 'Deployment',
    description: 'Optimizo, testo en produccion y aseguro monitoreo continuo y calidad.',
    icon: Rocket,
    number: '03'
  }
];

interface ProcessCardProps {
  step: ProcessStep;
  index: number;
  isVisible: boolean;
}

function ProcessCard({ step, index, isVisible }: ProcessCardProps): JSX.Element {
  const Icon = step.icon;

  return (
    <div
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl p-8 hover:border-[var(--border-hover)] transition-all duration-500 h-full">
        <div className="absolute -top-5 -left-5 w-14 h-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[var(--accent-dim)]">
          {step.number}
        </div>

        <div className="w-14 h-14 rounded-2xl bg-[var(--accent-dim)] border border-[var(--border-hover)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-7 h-7 text-[var(--accent)]" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-3">{step.title}</h3>

        <p className="text-[var(--text-secondary)] leading-relaxed">{step.description}</p>

        <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
      </div>
    </div>
  );
}

interface PhaseInfo {
  phase: string;
  techs: string[];
}

export function HowIWork(): JSX.Element {
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

  const phases: PhaseInfo[] = [
    {
      phase: 'Ideacion',
      techs: ['Figma', 'Architecture Design', 'Requirements Analysis', 'Database Schema']
    },
    {
      phase: 'Desarrollo',
      techs: ['React/TypeScript', 'Django', 'PostgreSQL', 'API Design', 'Testing']
    },
    {
      phase: 'Deployment',
      techs: ['Docker', 'CI/CD Pipelines', 'Performance Optimization', 'Monitoring', 'Security']
    }
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-padding-lg scroll-offset relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,_var(--accent-subtle)_0%,_transparent_70%)]" />
      </div>

      <div className="container-main relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-[var(--accent)] font-mono text-lg">#</span>
            <span className="text-[var(--text-muted)] font-mono text-sm tracking-wider">methodology</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
            Como <span className="text-gradient">trabajo</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
            Mi proceso es iterativo, enfocado en entrega de calidad desde la ideacion hasta la produccion.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {processSteps.map((step, idx) => (
            <ProcessCard
              key={step.title}
              step={step}
              index={idx}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className={`grid md:grid-cols-3 gap-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {phases.map((phase) => (
            <div
              key={phase.phase}
              className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6"
            >
              <p className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-4">{phase.phase}</p>
              <div className="space-y-2">
                {phase.techs.map((tech) => (
                  <div
                    key={tech}
                    className="text-sm text-[var(--text-secondary)] px-3 py-2 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border)]"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-3xl transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 text-center">Principios Fundamentales</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="font-semibold text-[var(--accent)] text-sm uppercase tracking-wider mb-3">Performance First</p>
              <p className="text-sm text-[var(--text-secondary)]">Optimizo desde el inicio, mido constantemente y busco mejorar continuamente.</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-[var(--accent)] text-sm uppercase tracking-wider mb-3">Clean Code</p>
              <p className="text-sm text-[var(--text-secondary)]">Codigo legible, modular y mantenible. Documentacion clara y tests completos.</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-[var(--accent)] text-sm uppercase tracking-wider mb-3">User Focused</p>
              <p className="text-sm text-[var(--text-secondary)]">Siempre pienso en UX, accesibilidad y experiencia del usuario final.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
