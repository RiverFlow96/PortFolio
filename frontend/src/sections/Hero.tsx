import { useEffect, useState } from "react";
import { Terminal } from "../components/Terminal";
import { FloatingParticles } from "../components/FloatingParticles";
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
    }, 30);
    return () => clearInterval(interval);
  }, [profile.tagline]);

  const scrollToNext = (): void => {
    const stackSection = document.getElementById("stack");
    stackSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.08)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 opacity-30">
        <FloatingParticles />
      </div>

      {/* Ambient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Tagline badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-cyan-400 font-mono text-sm">{profile.title}</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <span className="text-white">Hola, soy </span>
          <span className="text-gradient-ether glow-text-cyan">{profile.name}</span>
        </h1>

        {/* Typewriter effect */}
        <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 mb-8 min-h-[3rem] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {text}
          <span className={`inline-block w-[3px] h-[1.2em] bg-cyan-400 ml-1 align-middle ${isTypingComplete ? 'animate-pulse' : ''}`} />
        </p>

        {/* Bio text */}
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          {profile.bio[0]}
        </p>

        {/* Terminal */}
        <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <Terminal />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <a
            href={cta.primary.href}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-red-800 text-white font-mono font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:scale-105"
          >
            <span className="relative z-10">{cta.primary.text}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href={cta.secondary.href}
            className="group px-8 py-4 border border-cyan-500/30 text-cyan-400 font-mono font-medium rounded-xl transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            {cta.secondary.text}
          </a>
        </div>

        {/* Tech stack indicators */}
        <div className="flex justify-center gap-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
          {profile.stats?.topLanguages?.slice(0, 4).map((tech: string, i: number) => (
            <div key={tech} className="flex items-center gap-2 group">
              <span className={`text-sm font-mono ${
                i === 0 ? 'text-cyan-400' : i === 1 ? 'text-amber-400' : i === 2 ? 'text-emerald-400' : 'text-purple-400'
              }`}>
                {tech}
              </span>
              {i < 3 && <span className="text-gray-600">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={scrollToNext}
      >
        <span className="font-mono text-xs text-gray-500 group-hover:text-cyan-400 transition-colors">
          Explorar
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-gray-700 group-hover:border-cyan-500/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}