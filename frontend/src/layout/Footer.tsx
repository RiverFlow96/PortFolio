import { useState } from 'react';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { RiverFlowLogo } from '../components/RiverFlowLogo';

export function Footer(): JSX.Element {
  const [easterEgg, setEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = (): void => {
    setClickCount(clickCount + 1);
    if (clickCount === 2) {
      setEasterEgg(true);
      setTimeout(() => {
        setClickCount(0);
        setEasterEgg(false);
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-cyan-500/10">
      {/* Easter egg animation */}
      {easterEgg && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="fixed text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `bounce 1s ease-in-out forwards`,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              ✨
            </div>
          ))}
          <style>{`
            @keyframes bounce {
              0% { transform: translateY(0) scale(1); opacity: 1; }
              100% { transform: translateY(-200px) scale(0); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <button
              onClick={handleLogoClick}
              className="group flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity cursor-pointer"
              title={clickCount === 1 ? 'Click once more! 🎉' : ''}
            >
              <RiverFlowLogo size="md" animated={true} />
              <div>
                <p className="text-sm font-bold text-white">RiverFlow</p>
                <p className="text-xs text-cyan-400">Developer-Designer</p>
              </div>
            </button>
            <p className="text-sm text-gray-500 leading-relaxed">
              Building fast, scalable, and beautiful web experiences one line of code at a time.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-mono text-sm font-bold text-cyan-400 mb-4 uppercase tracking-wide">
              Navegar
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', href: '#hero' },
                { label: 'Metodología', href: '#process' },
                { label: 'Proyectos', href: '#projects' },
                { label: 'Stack', href: '#stack' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h3 className="font-mono text-sm font-bold text-cyan-400 mb-4 uppercase tracking-wide">
              Stack
            </h3>
            <ul className="space-y-2">
              {['React/TypeScript', 'Django/Python', 'PostgreSQL', 'TailwindCSS'].map((tech) => (
                <li key={tech}>
                  <span className="text-sm text-gray-400">{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-sm font-bold text-emerald-400 mb-4 uppercase tracking-wide">
              Contacto
            </h3>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@riverflow.dev"
                className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cyan-500/10 pt-8 mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Handcrafted with React • 2026</span>
          </div>

          <p className="text-xs text-gray-600 text-center">
            Cada línea de código cuenta una historia.
            <br />
            <span className="text-cyan-500">Let's build something amazing together.</span>
          </p>

          <div className="text-sm text-gray-500 font-mono">
            <span className="text-cyan-400">&lt;</span>
            Made by RiverFlow
            <span className="text-cyan-400">/&gt;</span>
          </div>
        </div>
      </div>

      {/* Subtle gradient border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </footer>
  );
}
