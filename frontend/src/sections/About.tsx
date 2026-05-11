import { useEffect, useRef } from "react";

interface StatItem {
  label: string;
  value: string;
  color: 'cyan' | 'pink' | 'emerald';
}

export function About(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('visible');
            }, i * 150);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    { label: "Proyectos", value: "4+", color: "cyan" },
    { label: "Tecnologías", value: "15+", color: "pink" },
    { label: "Experiencia", value: "3+ años", color: "emerald" },
    { label: "Coffee", value: "∞", color: "cyan" },
  ];

  const colorMap = {
    cyan: "border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10",
    pink: "border-pink-500/30 hover:border-pink-500/60 hover:shadow-lg hover:shadow-pink-500/10",
    emerald: "border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/10",
  };

  const textColorMap = {
    cyan: "text-cyan-400",
    pink: "text-pink-400",
    emerald: "text-emerald-400",
  };

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="font-mono text-cyan-500 mb-8 text-sm reveal">
          <span className="text-emerald-400">#</span> about
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 reveal">
          Sobre <span className="text-gradient-cyan">mí</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column - Text */}
          <div className="space-y-6 text-gray-400 leading-relaxed reveal">
            <p>
              Soy desarrollador fullstack apasionado por crear soluciones web
              elegantes, rápidas y escalables. Me especializo en transformar 
              ideas complejas en aplicaciones que combinan rendimiento excepcional
              con experiencia de usuario intuitiva.
            </p>
            <p>
              Mi enfoque está en arquitectura moderna, clean code y best practices.
              Trabajo con React, Django y TypeScript para construir productos que
              generan impacto real. Siempre busco aprender, optimizar y mejorar.
            </p>
            <p>
              Cuando no estoy codificando, me encuentro explorando nuevas tecnologías,
              contribuyendo a proyectos open source o ayudando a otros desarrolladores
              a resolver problemas complejos.
            </p>
          </div>

          {/* Right column - Stats */}
          <div className="grid grid-cols-2 gap-4 reveal">
            {stats.map((item) => (
              <div
                key={item.label}
                className={`bg-[#0f0f14] border rounded-lg p-4 transition-all duration-300 ${colorMap[item.color]}`}
              >
                <div className={`font-mono text-xs mb-2 ${textColorMap[item.color]}`}>
                  {item.label}
                </div>
                <div className="text-2xl font-bold text-white">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-6 bg-[#0f0f14] border border-cyan-500/20 rounded-lg overflow-hidden reveal">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <span className="text-gray-500 font-mono text-sm ml-2">
              philosophy.md
            </span>
          </div>
          <div className="font-mono text-sm space-y-2">
            <div>
              <span className="text-cyan-500">→</span>
              {" "}
              <span className="text-gray-300">Performance First</span>
            </div>
            <div>
              <span className="text-pink-500">→</span>
              {" "}
              <span className="text-gray-300">Clean, Maintainable Code</span>
            </div>
            <div>
              <span className="text-emerald-500">→</span>
              {" "}
              <span className="text-gray-300">User-Focused Design</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}