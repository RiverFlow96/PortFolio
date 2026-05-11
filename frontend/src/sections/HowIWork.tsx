import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Code2, Rocket, LucideIcon } from 'lucide-react';

interface ProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  borderColor: string;
  bgColor: string;
  number: string;
}

const processSteps: ProcessStep[] = [
  {
    title: 'Ideación',
    description: 'Entiende el problema, defino requisitos y diseño una arquitectura escalable.',
    icon: Lightbulb,
    color: 'from-cyan-500 to-cyan-600',
    borderColor: 'border-cyan-500/30',
    bgColor: 'bg-cyan-500/10',
    number: '01'
  },
  {
    title: 'Desarrollo',
    description: 'Escribo código limpio, modular y testeable siguiendo mejores prácticas.',
    icon: Code2,
    color: 'from-pink-500 to-pink-600',
    borderColor: 'border-pink-500/30',
    bgColor: 'bg-pink-500/10',
    number: '02'
  },
  {
    title: 'Deployment',
    description: 'Optimizo, testo en producción y aseguro monitoreo continuo y calidad.',
    icon: Rocket,
    color: 'from-emerald-500 to-emerald-600',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
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
      className={`
        group relative transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Card */}
      <div className={`
        relative bg-[#0f0f14]/80 backdrop-blur-sm border ${step.borderColor} rounded-2xl p-8
        hover:border-current transition-all duration-300
        ${index === 1 ? 'md:scale-105 md:z-10' : ''}
      `}>
        {/* Number badge */}
        <div className={`
          absolute -top-4 -right-4 w-16 h-16 rounded-full
          bg-gradient-to-br ${step.color}
          flex items-center justify-center text-white font-bold text-xl
          opacity-20 group-hover:opacity-40 transition-opacity
        `}>
          {step.number}
        </div>

        {/* Icon */}
        <div className={`
          w-14 h-14 rounded-xl ${step.bgColor} border ${step.borderColor}
          flex items-center justify-center mb-4
          group-hover:scale-110 transition-transform
        `}>
          <Icon className="w-7 h-7 text-white" style={{
            background: `linear-gradient(135deg, var(--color-stop1), var(--color-stop2))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }} />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed mb-6">{step.description}</p>

        {/* Process details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-gray-500">Análisis profundo</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            <span className="text-gray-500">Solución completa</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-gray-500">Máxima calidad</span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className={`
          absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}
          transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left
          rounded-b-2xl
        `} />
      </div>

      {/* Arrow connector */}
      {index < processSteps.length - 1 && (
        <div className="hidden md:flex justify-center mt-8">
          <div className="relative">
            <svg
              className="w-12 h-12 text-cyan-500/30 rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>
      )}
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
      phase: 'Ideación',
      techs: ['Figma', 'Architecture Design', 'Requirements Analysis', 'Database Schema']
    },
    {
      phase: 'Desarrollo',
      techs: ['React/Vue', 'Django/FastAPI', 'PostgreSQL', 'API Design', 'Testing']
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
      className="min-h-screen py-24 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.08)_0%,_transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`
          text-center mb-16 transition-all duration-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <div className="font-mono text-cyan-500 mb-4 text-sm">
            <span className="text-emerald-400">#</span> methodology
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cómo <span className="text-gradient-cyan">trabajo</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Mi proceso es iterativo, enfocado en entrega de calidad desde la ideación hasta la producción.
            Cada fase asegura escalabilidad, performance y mantenibilidad.
          </p>
        </div>

        {/* Process steps */}
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

        {/* Tech stack for each phase */}
        <div className={`
          grid md:grid-cols-3 gap-6 transition-all duration-700 delay-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          {phases.map((phase) => (
            <div
              key={phase.phase}
              className="bg-[#0f0f14]/80 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6 text-center"
            >
              <p className="text-sm font-mono text-cyan-400 mb-3 uppercase tracking-wide">
                {phase.phase}
              </p>
              <div className="space-y-2">
                {phase.techs.map((tech) => (
                  <div
                    key={tech}
                    className="text-xs text-gray-400 px-3 py-2 bg-cyan-500/5 rounded-lg border border-cyan-500/10"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Principles */}
        <div className={`
          mt-20 p-8 bg-gradient-to-r from-cyan-500/5 to-pink-500/5 border border-cyan-500/10 rounded-2xl
          transition-all duration-700 delay-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <h3 className="text-xl font-bold text-white mb-4">Principios Fundamentales</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="font-mono text-cyan-400 text-sm mb-2">PERFORMANCE FIRST</p>
              <p className="text-gray-400 text-sm">Optimizo desde el inicio, mido constantemente y busco mejorar continuamente.</p>
            </div>
            <div>
              <p className="font-mono text-pink-400 text-sm mb-2">CLEAN CODE</p>
              <p className="text-gray-400 text-sm">Código legible, modular y mantenible. Documentación clara y tests completos.</p>
            </div>
            <div>
              <p className="font-mono text-emerald-400 text-sm mb-2">USER FOCUSED</p>
              <p className="text-gray-400 text-sm">Siempre pienso en UX, accesibilidad y experiencia del usuario final.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
