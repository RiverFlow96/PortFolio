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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-cyan-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <RiverFlowLogo size="sm" animated={true} />
          <span className="text-lg sm:text-xl font-bold text-white font-mono hidden sm:inline">
            <span className="text-cyan-500">&lt;</span>
            River
            <span className="text-gradient-pink">Flow</span>
            <span className="text-cyan-500">/&gt;</span>
          </span>
        </a>

        <div className="hidden md:flex gap-6 lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-400 hover:text-cyan-400 transition-colors font-mono text-sm hover:underline hover:decoration-cyan-400"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-white transition-all active:scale-95"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] bg-[#0a0a0f]/98 backdrop-blur-lg z-40">
          <div className="flex flex-col py-4">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="block px-6 py-5 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5 font-mono text-base transition-colors border-b border-cyan-500/10"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="block w-full py-4 text-center bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-mono font-medium rounded-lg active:scale-[0.98] transition-transform"
            >
              ¡Hablemos!
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}