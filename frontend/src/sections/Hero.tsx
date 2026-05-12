import { useEffect, useState } from "react";
import { Terminal } from "../components/Terminal";
import { useMergedProfile, useCTA } from "../datas/usePortfolio";

export function Hero(): JSX.Element {
  const profile = useMergedProfile();
  const cta = useCTA();
  const [text, setText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const fullText = profile.tagline;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [profile.tagline]);

  const scrollToNext = (): void => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden" aria-label="Hero section">
      {/* Ambient gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[var(--accent-subtle)] via-transparent to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
        {/* Role label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-subtle)] border border-[var(--border)] mb-8 animate-fade-in" role="status">
          <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-sm text-[var(--accent)] font-medium">{profile.title}</span>
        </div>

        {/* Heading - using Archivo (bold) */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-[var(--text-primary)] mb-6 tracking-tight animate-slide-up">
          Hola, soy <span className="text-gradient">{profile.name}</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 min-h-[2rem] animate-slide-up stagger-1">
          {text}
          <span className={`inline-block w-[2px] h-5 bg-[var(--accent)] ml-1 align-middle ${isTypingComplete ? 'animate-blink' : ''}`} aria-hidden="true" />
        </p>

        {/* Bio */}
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-12 leading-relaxed animate-slide-up stagger-2">
          {profile.bio[0]}
        </p>

        {/* Terminal */}
        <div className="mb-12 animate-slide-up stagger-3">
          <Terminal />
        </div>

        {/* CTAs - green accent from design system */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up stagger-4">
          <a
            href={cta.primary.href}
            className="cursor-pointer px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] font-medium rounded-lg transition-all duration-200 hover:bg-opacity-90 hover:shadow-lg hover:shadow-[var(--accent-dim)]"
          >
            {cta.primary.text}
          </a>
          <a
            href={cta.secondary.href}
            className="cursor-pointer px-6 py-3 border border-[var(--border)] text-[var(--text-primary)] font-medium rounded-lg transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {cta.secondary.text}
          </a>
        </div>

        {/* Tech stack indicators */}
        <div className="flex items-center justify-center gap-4 text-sm text-[var(--text-muted)] animate-fade-in stagger-4" role="list" aria-label="Technologies">
          {profile.stats?.topLanguages?.slice(0, 4).map((tech, i) => (
            <span key={tech} className="flex items-center gap-2" role="listitem">
              <span className="text-[var(--accent)]">{tech}</span>
              {i < 3 && <span className="text-[var(--border)]">/</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="cursor-pointer absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors animate-fade-in"
        aria-label="Scroll to next section"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
}