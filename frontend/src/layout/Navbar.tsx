import { useState, useEffect } from "react";
import { RiverFlowLogo } from "../components/RiverFlowLogo";

interface NavItem {
  label: string;
  href: string;
}

export function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navItems: NavItem[] = [
    { label: "Sobre mí", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Proyectos", href: "#projects" },
    { label: "Contacto", href: "#contact" },
  ];

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 rounded-xl transition-all duration-300 ${
        scrolled
          ? "glass border border-[var(--border)]"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
          <RiverFlowLogo size="sm" animated={true} />
          <span className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] hidden sm:inline">
            <span className="text-[var(--accent)]">&lt;</span>
            River
            <span className="text-gradient">Flow</span>
            <span className="text-[var(--accent)]">/&gt;</span>
          </span>
        </a>

        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="cursor-pointer text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          className="cursor-pointer md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--accent)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] glass z-40">
          <div className="flex flex-col py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="cursor-pointer block px-6 py-4 text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-colors border-b border-[var(--border)]"
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="cursor-pointer block w-full py-4 text-center bg-[var(--accent)] text-[var(--bg-primary)] font-medium rounded-lg transition-opacity hover:opacity-90"
            >
              ¡Hablemos!
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}