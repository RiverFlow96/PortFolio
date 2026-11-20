import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import portfolioData from "../data/portfolio.json";

type Project = (typeof portfolioData.projects)[number];

function ProjectImage({ project }: { project: Project }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}${project.image}`}
      alt={`Captura de ${project.title}`}
      className="h-full w-full object-cover object-top"
      loading="lazy"
      decoding="async"
    />
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const linkClass = "inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]";

  return (
    <div className="flex flex-wrap gap-x-3">
      <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Demo de ${project.title} (nueva pestaña)`} className={linkClass}>
        <ExternalLink size={16} aria-hidden="true" /> Demo
      </a>
      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Código de ${project.title} (nueva pestaña)`} className={linkClass}>
        <Github size={16} aria-hidden="true" /> Código
      </a>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className="m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] p-0 text-[var(--text-primary)] backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <div className="relative">
        <button
          ref={closeRef}
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Cerrar caso de estudio"
          className="absolute right-4 top-4 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[var(--border)] bg-[var(--bg-tertiary)] hover:border-[var(--accent)]"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="aspect-video overflow-hidden">
          <ProjectImage project={project} />
        </div>

        <div className="space-y-5 p-6 sm:p-8">
          <header>
            <h3 id="project-dialog-title" className="text-2xl font-bold sm:text-3xl">{project.title}</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Tiempo de desarrollo {project.timeToBuild}</p>
          </header>

          <div className="space-y-4 text-sm leading-relaxed text-[var(--text-secondary)]">
            <div>
              <h4 className="mb-1 font-semibold text-[var(--text-primary)]">Problema</h4>
              <p>{project.problem}</p>
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-[var(--text-primary)]">Mi aportación</h4>
              <p>{project.solution}</p>
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-[var(--text-primary)]">Funcionalidades</h4>
              <ul className="list-disc space-y-1 pl-5">
                {project.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </div>
          </div>

          <ProjectLinks project={project} />
        </div>
      </div>
    </dialog>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] transition-colors hover:border-[var(--border-hover)]">
      <div className="aspect-video overflow-hidden rounded-t-2xl">
        <ProjectImage project={project} />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{project.title}</h3>
        <p className="text-sm leading-relaxed text-[var(--text-muted)]">{project.description}</p>
        <ul aria-label="Tecnologías" className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-2.5 py-1 text-xs text-[var(--text-secondary)]">{tech}</li>
          ))}
        </ul>

        <div className="mt-auto border-t border-[var(--border)] pt-2">
          <ProjectLinks project={project} />
          <button
            type="button"
            aria-haspopup="dialog"
            aria-label={`Ver caso de estudio de ${project.title}`}
            onClick={(event) => {
              event.currentTarget.focus();
              onOpen();
            }}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm font-semibold text-[var(--text-primary)] underline decoration-[var(--accent)] underline-offset-4 hover:decoration-2"
          >
            Ver caso de estudio <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function Projects(): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding-lg scroll-offset relative" aria-labelledby="projects-heading">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] bg-[radial-gradient(circle_at_center,_var(--accent-subtle)_0%,_transparent_70%)]" />
      </div>

      <div className="container-main relative z-10">
        <h2 id="projects-heading" className="mb-10 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
          Proyectos
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioData.projects.map((project) => (
            <ProjectCard key={project.title} project={project} onOpen={() => setSelectedProject(project)} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={`https://github.com/${portfolioData.config.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
          >
            Ver más en GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
