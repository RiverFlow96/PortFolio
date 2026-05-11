import { useEffect, useRef, useState } from "react";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  color: 'cyan' | 'pink' | 'emerald';
}

function AnimatedCounter({ value, suffix = "", color, isVisible }: { value: number; suffix?: string; color: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  
  const colorClass = color === 'cyan' ? 'text-cyan-400' : color === 'pink' ? 'text-pink-400' : 'text-emerald-400';

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return <span className={colorClass}>{count}{suffix}</span>;
}

export function About(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('visible');
            }, i * 150);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    { label: "Proyectos", value: 4, suffix: "+", color: "cyan" },
    { label: "Tecnologías", value: 15, suffix: "+", color: "pink" },
    { label: "Años exp.", value: 3, suffix: "+", color: "emerald" },
    { label: "Commits", value: 500, suffix: "+", color: "cyan" },
    { label: "Líneas código", value: 50, suffix: "K+", color: "pink" },
    { label: "Coffee ☕", value: Infinity, suffix: "", color: "emerald" },
  ];

  const colorMap = {
    cyan: "border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10",
    pink: "border-pink-500/30 hover:border-pink-500/60 hover:shadow-lg hover:shadow-pink-500/10",
    emerald: "border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/10",
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

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12">
          {/* Left column - Avatar + Text */}
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start reveal">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-cyan-500 via-pink-500 to-emerald-500 p-1">
                  <div className="w-full h-full rounded-full bg-[#0f0f14] flex items-center justify-center">
                    <svg className="w-20 h-20 md:w-24 md:h-24 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-[#0a0a0f] flex items-center justify-center">
                  <span className="text-xs">👨‍💻</span>
                </div>
              </div>
            </div>

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
          </div>

          {/* Right column - Animated Stats */}
          <div className="grid grid-cols-2 gap-4 reveal">
            {stats.map((item) => (
              <div
                key={item.label}
                className={`bg-[#0f0f14] border rounded-lg p-4 transition-all duration-300 ${colorMap[item.color]}`}
              >
                <div className={`font-mono text-xs mb-2 ${item.color === 'cyan' ? 'text-cyan-400' : item.color === 'pink' ? 'text-pink-400' : 'text-emerald-400'}`}>
                  {item.label}
                </div>
                <div className="text-3xl font-bold text-white">
                  {item.label === "Coffee ☕" ? (
                    <span className="text-emerald-400">∞</span>
                  ) : (
                    <AnimatedCounter 
                      value={item.value} 
                      suffix={item.suffix} 
                      color={item.color} 
                      isVisible={isVisible} 
                    />
                  )}
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
              <span className="text-cyan-500">→</span>{" "}
              <span className="text-gray-300">Performance First</span>
            </div>
            <div>
              <span className="text-pink-500">→</span>{" "}
              <span className="text-gray-300">Clean, Maintainable Code</span>
            </div>
            <div>
              <span className="text-emerald-500">→</span>{" "}
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