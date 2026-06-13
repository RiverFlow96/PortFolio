import { useEffect, useRef, useState } from "react";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiDjango,
  SiPython,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiTailwindcss,
} from "react-icons/si";
import OrbitingSkills from "../components/ui/orbiting-skills";

type IconComponent = React.ComponentType<any>;

interface Technology {
  name: string;
  icon: IconComponent;
  color: string;
  category: "frontend" | "backend" | "tools";
  size: "small" | "medium" | "large";
}

const technologies: Technology[] = [
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178c6",
    category: "frontend",
    size: "large",
  },
  {
    name: "Django",
    icon: SiDjango,
    color: "#092e20",
    category: "backend",
    size: "large",
  },
  {
    name: "Python",
    icon: SiPython,
    color: "#3776ab",
    category: "backend",
    size: "medium",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#336791",
    category: "backend",
    size: "medium",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "#22c55e",
    category: "frontend",
    size: "medium",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#f7df1e",
    category: "frontend",
    size: "medium",
  },
  {
    name: "Git",
    icon: SiGit,
    color: "#f1502f",
    category: "tools",
    size: "medium",
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "#2496ed",
    category: "tools",
    size: "medium",
  },
  {
    name: "React",
    icon: SiReact,
    color: "#61dafb",
    category: "frontend",
    size: "large",
  },
];

export function TechStack(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      key: "frontend",
      label: "Frontend",
      items: technologies.filter((t) => t.category === "frontend"),
    },
    {
      key: "backend",
      label: "Backend",
      items: technologies.filter((t) => t.category === "backend"),
    },
    {
      key: "tools",
      label: "DevOps & Tools",
      items: technologies.filter((t) => t.category === "tools"),
    },
  ];

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="section-padding-lg relative"
      aria-labelledby="stack-heading"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--accent-subtle)_0%,_transparent_70%)]" />
      </div>

      <div className="container-main relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[var(--accent)] font-mono text-lg">#</span>
          <span className="text-[var(--text-muted)] font-mono text-sm tracking-wider">
            tech-stack
          </span>
        </div>

        <h2
          id="stack-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-16 tracking-tight"
        >
          Tecnologias
        </h2>

        <div
          className={`mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <OrbitingSkills />
        </div>

        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.key}
              className={`group rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] p-5 hover:border-[var(--border-hover)] transition-all duration-500 cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-4">
                {category.label}
              </div>
              <div className="flex flex-wrap gap-3">
                {category.items.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)] group-hover:border-[var(--border-hover)] transition-colors duration-300"
                    >
                      <Icon size={18} style={{ color: tech.color }} />
                      <span className="text-sm text-[var(--text-secondary)] font-medium">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
