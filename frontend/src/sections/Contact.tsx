import { useEffect, useRef } from "react";
import { socials } from "../datas/social_medias";

export function Contact(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('visible');
            }, i * 200);
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

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="font-mono text-cyan-500 mb-8 text-sm reveal">
          <span className="text-emerald-400">#</span> contact
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 reveal">
          ¿Habl<span className="text-gradient-cyan">amos</span>?
        </h2>

        <p className="text-gray-400 mb-12 max-w-xl reveal">
          Estoy siempre abierto a nuevas oportunidades, colaboraciones y proyectos 
          desafiantes. Ya sea que tengas una idea innovadora, necesites consultoría 
          técnica o simplemente quieras saludar, ¡me encantaría escucharte!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Social links */}
          <div className="space-y-6 reveal">
            <h3 className="text-xl font-semibold text-white">Conectemos</h3>
            <div className="flex flex-col gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#0f0f14] border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  <span className="text-gray-300 font-mono">
                    {social.label}
                  </span>
                  <span className="ml-auto text-gray-600 group-hover:text-cyan-500/60 transition-colors">→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right column - Form */}
          <div className="bg-[#0f0f14] border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-700 reveal">
            <h3 className="text-xl font-semibold text-white mb-6">
              Envía un mensaje
            </h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 bg-[#1a1a24] border border-cyan-500/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/60 focus:bg-[#1f1f2e] transition-colors duration-200"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full px-4 py-3 bg-[#1a1a24] border border-cyan-500/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/60 focus:bg-[#1f1f2e] transition-colors duration-200"
                />
              </div>
              <div>
                <textarea
                  placeholder="Tu mensaje..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1a1a24] border border-cyan-500/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/60 focus:bg-[#1f1f2e] transition-colors duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-mono rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Enviar Mensaje
              </button>
            </form>
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