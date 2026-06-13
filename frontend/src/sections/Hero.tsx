import { useEffect, useState, useRef } from "react";
import { useMergedProfile, useCTA } from "../data/usePortfolio";

export function Hero(): JSX.Element {
  const profile = useMergedProfile();
  const cta = useCTA();
  const [text, setText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLoaded(true);
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
    }, 50);
    return () => clearInterval(interval);
  }, [profile.tagline]);

  const scrollToNext = (): void => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--accent-dim)_0%,_transparent_70%)] opacity-60" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--accent-dim)_0%,_transparent_70%)] opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,_var(--accent-subtle)_0%,_transparent_50%)] animate-float" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--accent-dim)] border border-[var(--border-hover)] transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              role="status"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-sm text-[var(--accent)] font-medium tracking-tight">
                {profile.title}
              </span>
            </div>

            <div
              className={`space-y-4 transition-all duration-700 delay-150 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-widest">
                Hola, soy
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.1]">
                <span className="block">{profile.name}</span>
                <span className="text-gradient block mt-2">
                  {profile.displayName}
                </span>
              </h1>
            </div>

            <div
              className={`transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <p className="text-xl sm:text-2xl text-[var(--text-secondary)] font-light min-h-[2.5rem]">
                {text}
                <span
                  className={`inline-block w-[2px] h-6 bg-[var(--accent)] ml-1 align-middle ${isTypingComplete ? "animate-blink" : ""}`}
                  aria-hidden="true"
                />
              </p>
            </div>

            <p
              className={`text-base text-[var(--text-muted)] leading-relaxed max-w-lg transition-all duration-700 delay-450 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {profile.bio[0]}
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-550 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <a
                href={cta.primary.href}
                className="group cursor-pointer inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[var(--accent)] text-[var(--text-primary)] font-semibold rounded-full transition-all duration-500 hover:bg-[var(--accent-hover)] hover:shadow-xl hover:shadow-[var(--accent-dim)] active:scale-[0.98]"
              >
                {cta.primary.text}
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href={cta.secondary.href}
                className="group cursor-pointer inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-[var(--border)] text-[var(--text-primary)] font-semibold rounded-full transition-all duration-500 hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] active:scale-[0.98]"
              >
                {cta.secondary.text}
                <svg
                  className="w-4 h-4 opacity-60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17l10-10m0 0v6m0-6h-6"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div
            className={`hidden lg:flex justify-end transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--accent)] blur-[100px] opacity-20 rounded-full" />
              <div className="relative w-[320px] h-[320px] rounded-3xl overflow-hidden border border-[var(--border)]">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&q=80"
                  alt="Code workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
              </div>
              <div
                className="absolute -bottom-6 -right-6 glass rounded-2xl px-5 py-3 animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <p className="text-xs text-[var(--text-muted)]">Stack actual</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  React + Django
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="cursor-pointer absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[var(--text-muted)] hover:text-[var(--accent)] transition-all duration-500 animate-fade-in delay-1000"
        aria-label="Scroll to next section"
      ></button>
    </section>
  );
}
