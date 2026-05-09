import { Code2, Database, Monitor, Terminal } from 'lucide-react';

const technologies = [
  { category: 'Frontend', icon: Monitor, items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'Vue'] },
  { category: 'Backend', icon: Code2, items: ['Django', 'Node.js', 'FastAPI', 'Express', 'Python', 'REST API'] },
  { category: 'Database', icon: Database, items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite'] },
  { category: 'Tools', icon: Terminal, items: ['Git', 'Docker', 'Linux', 'AWS', 'Vercel', 'Figma'] },
];

export function TechStack() {
  return (
    <section id="stack" className="min-h-screen py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="font-mono text-purple-500 mb-8 text-sm">
          <span className="text-purple-400">#</span> tech-stack
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Tecnologías que <span className="text-purple-500">uso</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.category}
              className="group bg-[#0f0f14] border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-600/20 rounded-lg text-purple-400 group-hover:text-purple-300 transition-colors">
                  <tech.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{tech.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {tech.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm font-mono border border-purple-500/20 hover:bg-purple-500/20 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 font-mono text-sm">
            <span className="text-purple-500">&gt;</span> Siempre aprendiendo nuevas tecnologías...
          </p>
        </div>
      </div>
    </section>
  );
}