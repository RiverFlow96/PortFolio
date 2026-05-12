import { RiverFlowLogo } from '../components/RiverFlowLogo';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa6';

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="container-main py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-6">
            <a href="#" className="group flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
              <RiverFlowLogo size="md" animated={true} />
              <div>
                <p className="text-base font-semibold text-[var(--text-primary)]">RiverFlow</p>
                <p className="text-xs text-[var(--accent)]">Developer-Designer</p>
              </div>
            </a>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-sm">
              Construyendo experiencias web rapidas, escalables y visualmente atractivas. Siempre en busca del proximo desafio.
            </p>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Navegar
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Sobre mi', href: '#about' },
                { label: 'Proyectos', href: '#projects' },
                { label: 'Stack', href: '#stack' },
                { label: 'Contacto', href: '#contact' }
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="cursor-pointer text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300 inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Social
            </h3>
            <div className="flex gap-3">
              {[
                { href: 'https://github.com/RiverFlow96', label: 'GitHub', icon: FaGithub },
                { href: 'https://linkedin.com/in/riverflow', label: 'LinkedIn', icon: FaLinkedin },
                { href: 'mailto:contact@riverflow.dev', label: 'Email', icon: FaEnvelope }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer w-11 h-11 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all duration-500 active:scale-[0.95]"
                  aria-label={item.label}
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            {currentYear} RiverFlow. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Hecho con <span className="text-[var(--accent)]">&hearts;</span> y mucho cafe
          </p>
        </div>
      </div>
    </footer>
  );
}
