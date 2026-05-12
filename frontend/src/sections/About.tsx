import { useEffect, useRef, useState } from "react";
import { useMergedProfile, usePhilosophy } from "../datas/usePortfolio";

function AnimatedCounter({ value, suffix = "", color, isVisible }: { value: number; suffix: string; color: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  
  const colorMap: Record<string, string> = {
    cyan: "text-cyan-400",
    pink: "text-red-400", 
    emerald: "text-emerald-400"
  };

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 2000;
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

  return <span className={`font-mono ${colorMap[color]}`}>{count}{suffix}</span>;
}

export function About(): JSX.Element {
  const profile = useMergedProfile();
  const philosophy = usePhilosophy();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const colorMap = {
    cyan: "from-cyan-500/10 to-transparent hover:from-cyan-500/20 border-cyan-500/20 hover:border-cyan-500/40",
    pink: "from-red-500/10 to-transparent hover:from-red-500/20 border-red-500/20 hover:border-red-500/40",
    emerald: "from-emerald-500/10 to-transparent hover:from-emerald-500/20 border-emerald-500/20 hover:border-emerald-500/40",
  };

  const stats = profile.stats ? [
    { label: "Repos", value: profile.stats.repos, suffix: "", color: "cyan" as const },
    { label: "Stars", value: profile.stats.stars, suffix: "+", color: "pink" as const },
    { label: "Años", value: profile.stats.years, suffix: "+", color: "emerald" as const },
    { label: "Followers", value: profile.stats.followers, suffix: "", color: "cyan" as const },
    { label: "Forks", value: profile.stats.forks, suffix: "+", color: "pink" as const },
    { label: "Lenguajes", value: profile.stats.topLanguages?.length || 0, suffix: "", color: "emerald" as const },
  ] : [];

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-500/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
          <span className="text-emerald-400 font-mono text-sm">#</span>
          <span className="text-cyan-400 font-mono text-sm">about</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Sobre <span className="text-gradient-ether">mí</span>
        </h2>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
          {/* Left column - Avatar & Bio */}
          <div className="space-y-8">
            {/* Avatar with animated border */}
            <div className="relative inline-block">
              <div className="relative w-40 h-40 rounded-2xl p-[2px] bg-gradient-to-br from-cyan-500 via-red-500 to-emerald-500">
                <div className="w-full h-full rounded-2xl bg-[#0f0f14] overflow-hidden">
                  <img 
                    src={profile.avatar || "https://github.com/identicons/" + profile.name + ".png"} 
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2306B6D4'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-2 -right-2 flex items-center gap-2 px-3 py-1.5 bg-[#0f0f14] rounded-full border border-emerald-500/30">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-emerald-400 font-mono">Available</span>
              </div>
            </div>

            {/* Bio with better typography */}
            <div className="space-y-4 text-gray-400 leading-relaxed text-lg">
              {profile.bio.map((paragraph, i) => (
                <p key={i} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${i * 0.2}s` }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {profile.social?.map((social: { label: string; href: string; icon: string }) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#0f0f14] border border-cyan-500/20 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                >
                  {social.icon === 'github' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  )}
                  {social.icon === 'linkedin' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  )}
                  {social.icon === 'mail' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  )}
                  {social.icon === 'twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Right column - Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stats.map((item, i) => (
              <div
                key={item.label}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${colorMap[item.color]} border transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">{item.label}</div>
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter 
                    value={item.value} 
                    suffix={item.suffix} 
                    color={item.color} 
                    isVisible={isVisible} 
                  />
                </div>
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-current rounded-full opacity-30" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy section */}
        <div className="mt-16 p-6 rounded-2xl bg-[#0f0f14] border border-cyan-500/20 overflow-hidden relative">
          {/* Decorative header bar */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-cyan-500/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500/80 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500/80 rounded-full" />
              <div className="w-3 h-3 bg-emerald-500/80 rounded-full" />
            </div>
            <span className="text-gray-500 font-mono text-sm">philosophy.ts</span>
          </div>
          
          {/* Philosophy items */}
          <div className="space-y-3">
            {philosophy.map((item: { icon: string; text: string }, i: number) => (
              <div 
                key={i} 
                className={`flex items-center gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ transitionDelay: `${i * 0.15 + 0.5}s` }}
              >
                <span className={`text-lg`}>
                  {item.icon === 'cyan' && '⚡'}
                  {item.icon === 'pink' && '💜'}
                  {item.icon === 'emerald' && '🌱'}
                </span>
                <span className="text-gray-300 font-mono text-sm">{item.text}</span>
              </div>
            ))}
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}