import { useEffect, useState } from "react";

export function Hero() {
  const [text, setText] = useState("");
  const fullText = "Fullstack Developer";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.15)_0%,_transparent_70%)]" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="font-mono text-purple-500 mb-4 text-sm">
          <span className="text-purple-400">$</span> Who am I
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Hola, soy{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            RiverFlow
          </span>
        </h1>

        <p className="text-2xl md:text-3xl font-mono text-gray-400 mb-8">
          {text}
          <span className="animate-pulse text-purple-500">|</span>
        </p> 

        <p className="text-gray-500 max-w-xl mx-auto mb-10">
          Construyo experiencias web modernas con tecnologías escalables.
          Especializado en React, Django y soluciones fullstack.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-mono rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Ver Proyectos
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 font-mono rounded-lg transition-all duration-300"
          >
            Contactar
          </a>
        </div>

        <div className="mt-16 flex justify-center gap-6 text-gray-600 font-mono text-sm">
          <span>React</span>
          <span className="text-purple-500">//</span>
          <span>Django</span>
          <span className="text-purple-500">//</span>
          <span>TypeScript</span>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
