import { useEffect, useRef, useState } from "react";
import { useMergedProfile, usePhilosophy, useGitHubData } from "../datas/usePortfolio";
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaStar, FaCode, FaUsers, FaFolder } from "react-icons/fa6";

function AnimatedCounter({ value, suffix = "", isVisible, delay = 0 }: { value: number; suffix: string; isVisible: boolean; delay?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const timeout = setTimeout(() => {
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
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, value, delay]);

  return <span className="font-bold">{count}{suffix}</span>;
}

export function About(): JSX.Element {
  const profile = useMergedProfile();
  const { stats } = useGitHubData();
  const philosophy = usePhilosophy();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const statsData = [
    { 
      label: "Repositorios", 
      value: stats?.totalRepos || profile.stats?.repos || 0, 
      suffix: "",
      icon: FaFolder,
      color: '#e63946'
    },
    { 
      label: "Stars", 
      value: stats?.totalStars || profile.stats?.stars || 0, 
      suffix: "",
      icon: FaStar,
      color: '#fbbf24'
    },
    { 
      label: "Followers", 
      value: profile.stats?.followers || 0, 
      suffix: "",
      icon: FaUsers,
      color: '#60a5fa'
    },
    { 
      label: "Lenguajes", 
      value: stats?.topLanguages ? Object.keys(stats.topLanguages).length : 0, 
      suffix: "",
      icon: FaCode,
      color: '#34d399'
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding-lg relative" aria-labelledby="about-heading">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--accent-subtle)_0%,_transparent_70%)]" />
      </div>

      <div className="container-main relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[var(--accent)] font-mono text-lg">#</span>
          <span className="text-[var(--text-muted)] font-mono text-sm tracking-wider">about</span>
        </div>

        <h2 id="about-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-16 tracking-tight">
          Sobre <span className="text-gradient">mi</span>
        </h2>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24">
          <div className={`space-y-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-[var(--accent)] blur-[80px] opacity-10 rounded-full group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-[var(--border)]">
                <img 
                  src={profile.avatar || `https://github.com/${profile.name}.png`}
                  alt={`Foto de ${profile.displayName || profile.name}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />
              </div>
              <div className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3">
                <p className="text-xs text-[var(--text-muted)]">Estado actual</p>
                <p className="text-sm font-semibold text-[var(--accent)]">{profile.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {profile.social?.map((social: { label: string; href: string; icon: string }) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer w-12 h-12 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all duration-500 active:scale-[0.95]"
                  aria-label={`Visitar ${social.label}`}
                >
                  {social.icon === 'github' && <FaGithub className="w-5 h-5" />}
                  {social.icon === 'linkedin' && <FaLinkedin className="w-5 h-5" />}
                  {social.icon === 'mail' && <FaEnvelope className="w-5 h-5" />}
                  {social.icon === 'twitter' && <FaTwitter className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>

          <div className={`space-y-10 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
              {profile.bio.map((paragraph, i) => (
                <p key={i} className="text-base sm:text-lg">{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {statsData.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`group p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-500 cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: `${i * 100 + 400}ms` }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-4 h-4" style={{ color: item.color }} />
                      <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">{item.label}</span>
                    </div>
                    <div className="text-3xl sm:text-4xl text-[var(--text-primary)]">
                      <AnimatedCounter value={item.value} suffix={item.suffix} isVisible={isVisible} delay={i * 150 + 500} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)]">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--border)]">
                <div className="w-3 h-3 rounded-full bg-[var(--accent)] opacity-60" />
                <div className="w-3 h-3 rounded-full bg-[var(--accent)] opacity-40" />
                <div className="w-3 h-3 rounded-full bg-[var(--accent)] opacity-20" />
                <span className="text-[var(--text-muted)] text-xs ml-2 font-mono">philosophy.ts</span>
              </div>
              <div className="space-y-3">
                {philosophy.map((item: { icon: string; text: string }, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-[var(--text-secondary)] group">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
