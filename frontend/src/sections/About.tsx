import { useEffect, useRef, useState } from "react";
import { useMergedProfile, usePhilosophy } from "../datas/usePortfolio";

function AnimatedCounter({ value, suffix = "", isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);

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

  return <span className="text-[var(--text-primary)]">{count}{suffix}</span>;
}

export function About(): JSX.Element {
  const profile = useMergedProfile();
  const philosophy = usePhilosophy();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = profile.stats ? [
    { label: "Repos", value: profile.stats.repos, suffix: "" },
    { label: "Stars", value: profile.stats.stars, suffix: "+" },
    { label: "Años", value: profile.stats.years, suffix: "+" },
    { label: "Followers", value: profile.stats.followers, suffix: "" },
    { label: "Forks", value: profile.stats.forks, suffix: "+" },
    { label: "Tech", value: profile.stats.topLanguages?.length || 0, suffix: "" },
  ] : [];

  return (
    <section id="about" ref={sectionRef} className="section-padding relative" aria-labelledby="about-heading">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-sm">
          <span className="text-[var(--accent)]">#</span>
          <span className="text-[var(--text-muted)] font-mono">about</span>
        </div>

        <h2 id="about-heading" className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-12">
          Sobre <span className="text-gradient">mí</span>
        </h2>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
          {/* Left - Avatar & Bio */}
          <div className="space-y-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[var(--border)]">
                <img 
                  src={profile.avatar || "https://github.com/identicons/" + profile.name + ".png"} 
                  alt={`Foto de ${profile.name}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2322c55e'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>

            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              {profile.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="flex gap-3">
              {profile.social?.map((social: { label: string; href: string; icon: string }) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer w-10 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
                  aria-label={`Visitar ${social.label}`}
                >
                  {social.icon === 'github' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  )}
                  {social.icon === 'linkedin' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  )}
                  {social.icon === 'mail' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stats.map((item, i) => (
              <div
                key={item.label}
                className={`cursor-pointer p-5 rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-200 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">{item.label}</div>
                <div className="text-2xl font-semibold">
                  <AnimatedCounter value={item.value} suffix={item.suffix} isVisible={isVisible} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-16 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[var(--border)]">
            <div className="w-3 h-3 rounded-full bg-[var(--accent)] opacity-60" />
            <div className="w-3 h-3 rounded-full bg-[var(--accent)] opacity-40" />
            <div className="w-3 h-3 rounded-full bg-[var(--accent)] opacity-20" />
            <span className="text-[var(--text-muted)] text-sm ml-2 font-mono">philosophy.ts</span>
          </div>
          <div className="space-y-2">
            {philosophy.map((item: { icon: string; text: string }, i: number) => (
              <div key={i} className="flex items-center gap-3 text-[var(--text-secondary)]">
                <span className="text-[var(--accent)]">→</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}