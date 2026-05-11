import { useEffect, useState } from "react";
import { Terminal } from "../components/Terminal";
import { FloatingParticles } from "../components/FloatingParticles";
import { useMergedProfile, useCTA } from "../datas/usePortfolio";

export function Hero(): JSX.Element {
  const profile = useMergedProfile();
  const cta = useCTA();
  const [text, setText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let index = 0;
    const fullText = profile.tagline;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [profile.tagline]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToNext = (): void => {
    const stackSection = document.getElementById("stack");
    stackSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.10)_0%,_transparent_70%)]" />

      <div className="absolute inset-0 opacity-20">
        <FloatingParticles />
      </div>

      <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="font-mono text-cyan-500 mb-4 text-sm">
          <span className="text-emerald-400">#</span> {profile.title.toLowerCase()}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Hola, soy <span className="text-gradient-cyan">{profile.name}</span>
        </h1>

        <p className="text-2xl md:text-3xl font-mono text-gray-300 mb-12">
          {text}
          <span className="animate-pulse text-cyan-400">|</span>
        </p> 

        <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
          {profile.bio[0]}
        </p>

        <div className="mb-16">
          <Terminal />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
          <a
            href={cta.primary.href}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-mono rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            {cta.primary.text}
          </a>
          <a
            href={cta.secondary.href}
            className="px-8 py-3 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono rounded-lg transition-all duration-300"
          >
            {cta.secondary.text}
          </a>
        </div>

        <div className="flex justify-center gap-6 text-gray-600 font-mono text-sm">
          {profile.stats?.topLanguages?.slice(0, 3).map((tech: string, i: number) => (
            <span key={tech} className={i === 1 ? 'text-pink-500' : 'text-emerald-500'}>
              {tech}{i < 2 ? ' //' : ''}
            </span>
          ))}
        </div>
      </div>

      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        onClick={scrollToNext}
      >
        <span className="font-mono text-xs text-cyan-500/70">
          Scroll para ver más ↓
        </span>
        <svg
          className="w-6 h-6 text-cyan-400 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}