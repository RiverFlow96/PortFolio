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

  const navItems: NavItem[] = [
    { label: "Sobre mí", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Proyectos", href: "#projects" },
    { label: "Contacto", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-cyan-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <RiverFlowLogo size="md" animated={true} />
          <span className="text-xl font-bold text-white font-mono hidden sm:inline">
            <span className="text-cyan-500">&lt;</span>
            River
            <span className="text-gradient-pink">Flow</span>
            <span className="text-cyan-500">/&gt;</span>
          </span>
        </a>

        <div className="hidden md:flex gap-8">
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
          className="md:hidden text-white transition-all active:animate-spin"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-md border-t border-cyan-500/20">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-6 py-3 text-gray-400 hover:text-cyan-400 font-mono text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
