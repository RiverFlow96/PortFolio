import { useState, useEffect } from "react";
import { RiverFlowLogo } from "../components/RiverFlowLogo";

interface NavItem {
  label: string;
  href: string;
}

export function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["about", "stack", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <nav
        className={`fixed top-5 left-4 right-4 z-[100] transition-all duration-700 ${
          scrolled
            ? "glass-strong rounded-2xl"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-5xl mx-auto px-5 py-3.5 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-all duration-500 cursor-pointer group">
            <RiverFlowLogo size="sm" animated={true} />
            <span className="text-base sm:text-lg font-semibold text-[var(--text-primary)] tracking-tight">
              <span className="text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-colors">&lt;</span>
              River
              <span className="text-gradient">Flow</span>
              <span className="text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-colors">/&gt;</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-[var(--bg-tertiary)] border border-[var(--border-hover)] rounded-full animate-fade-in" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          <button
            className="cursor-pointer md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent)] active:scale-[0.95]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="relative w-5 h-5">
              <span className={`absolute left-0 w-full h-[1.5px] bg-current transition-all duration-300 ${mobileMenuOpen ? "top-1/2 rotate-45" : "top-0"}`} style={{ top: mobileMenuOpen ? "50%" : "0", transform: mobileMenuOpen ? "translateY(-50%)" : "" }} />
              <span className={`absolute top-1/2 left-0 w-full h-[1.5px] bg-current transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}`} style={{ transform: mobileMenuOpen ? "scale(0)" : "scale(1)" }} />
              <span className={`absolute left-0 w-full h-[1.5px] bg-current transition-all duration-300 ${mobileMenuOpen ? "top-1/2 -rotate-45" : "bottom-0"}`} style={{ top: mobileMenuOpen ? "50%" : "auto", bottom: mobileMenuOpen ? "auto" : "0", transform: mobileMenuOpen ? "translateY(-50%)" : "" }} />
            </div>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[90] glass-strong transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen py-24">
          <div className="space-y-2 w-full max-w-xs">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`block px-6 py-4 text-center text-lg font-medium rounded-xl border border-[var(--border)] cursor-pointer transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-[var(--accent-subtle)] ${
                  mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 80 + 100}ms` }}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className={`mt-12 transition-all duration-500 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "450ms" }}>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-[var(--text-primary)] font-semibold rounded-full transition-all duration-300 hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-[var(--accent-dim)] active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              ¡Hablemos!
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
