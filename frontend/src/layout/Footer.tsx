import { useState } from 'react';
import { Code2 } from 'lucide-react';
import { RiverFlowLogo } from '../components/RiverFlowLogo';

export function Footer(): JSX.Element {
  const [easterEgg, setEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = (): void => {
    setClickCount(clickCount + 1);
    if (clickCount === 2) {
      setEasterEgg(true);
      setTimeout(() => { setClickCount(0); setEasterEgg(false); }, 3000);
    }
  };

  return (
    <footer className="relative bg-[var(--bg-primary)] border-t border-[var(--border)]">
      {easterEgg && (
        <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="fixed text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatUp 1s ease-out forwards`,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <button
              onClick={handleLogoClick}
              className="cursor-pointer group flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <RiverFlowLogo size="md" animated={true} />
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">RiverFlow</p>
                <p className="text-xs text-[var(--accent)]">Developer-Designer</p>
              </div>
            </button>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Building fast, scalable, and beautiful web experiences.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-medium text-[var(--accent)] mb-4 uppercase tracking-wider">
              Navegar
            </h3>
            <ul className="space-y-2">
              {[{ label: 'Inicio', href: '#hero' },{ label: 'Proyectos', href: '#projects' },{ label: 'Stack', href: '#stack' },{ label: 'Contacto', href: '#contact' }].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="cursor-pointer text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <h3 className="text-sm font-medium text-[var(--accent)] mb-4 uppercase tracking-wider">
              Stack
            </h3>
            <ul className="space-y-2">
              {['React/TypeScript', 'Django/Python', 'PostgreSQL', 'Tailwind'].map((tech) => (
                <li key={tech}><span className="text-sm text-[var(--text-muted)]">{tech}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium text-[var(--accent)] mb-4 uppercase tracking-wider">
              Contacto
            </h3>
            <div className="flex gap-3">
              {[
                { href: 'https://github.com/RiverFlow96', label: 'GitHub' },
                { href: 'https://linkedin.com/in/riverflow', label: 'LinkedIn' },
                { href: 'mailto:contact@riverflow.dev', label: 'Email' }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
                  aria-label={item.label}
                >
                  {item.label === 'GitHub' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>}
                  {item.label === 'LinkedIn' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                  {item.label === 'Email' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-8 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Code2 className="w-4 h-4 text-[var(--accent)]" />
            <span>Built with React • 2026</span>
          </div>

          <p className="text-xs text-[var(--text-muted)] text-center">
            Cada línea de código cuenta una historia.
            <br /><span className="text-[var(--accent)]">Let's build something amazing.</span>
          </p>

          <div className="text-sm text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">&lt;</span> Made by RiverFlow <span className="text-[var(--accent)]">/&gt;</span>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />
    </footer>
  );
}