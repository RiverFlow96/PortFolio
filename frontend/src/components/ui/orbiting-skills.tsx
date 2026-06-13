"use client"
import React, { useEffect, useState, memo } from 'react';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiDjango,
  SiPostgresql,
  SiGit,
  SiDocker,
} from 'react-icons/si';

type IconType = 'html' | 'css' | 'javascript' | 'react' | 'node' | 'tailwind' | 'django' | 'postgresql' | 'git' | 'docker';

type GlowColor = 'cyan' | 'purple' | 'emerald';

interface SkillIconProps {
  type: IconType;
  size: number;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

const iconComponents: Record<IconType, { component: React.ComponentType<{ size?: number; style?: React.CSSProperties }>; color: string }> = {
  html: { component: SiHtml5, color: '#E34F26' },
  css: { component: SiCss, color: '#1572B6' },
  javascript: { component: SiJavascript, color: '#F7DF1E' },
  react: { component: SiReact, color: '#61DAFB' },
  node: { component: SiNodedotjs, color: '#339933' },
  tailwind: { component: SiTailwindcss, color: '#06B6D4' },
  django: { component: SiDjango, color: '#092E20' },
  postgresql: { component: SiPostgresql, color: '#336791' },
  git: { component: SiGit, color: '#F1502F' },
  docker: { component: SiDocker, color: '#2496ED' },
};

const SkillIcon = memo(({ type, size }: SkillIconProps) => {
  const entry = iconComponents[type];
  if (!entry) return null;
  const IconComponent = entry.component;
  const iconSize = Math.round(size * 0.55);
  return <IconComponent size={iconSize} style={{ color: entry.color }} />;
});
SkillIcon.displayName = 'SkillIcon';

const skillsConfig: SkillConfig[] = [
  { 
    id: 'html',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'html', 
    phaseShift: 0, 
    glowColor: 'cyan',
    label: 'HTML5'
  },
  { 
    id: 'css',
    orbitRadius: 100, 
    size: 45, 
    speed: 1, 
    iconType: 'css', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'CSS3'
  },
  { 
    id: 'javascript',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'javascript', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'JavaScript'
  },
  { 
    id: 'django',
    orbitRadius: 145, 
    size: 42, 
    speed: 0.8, 
    iconType: 'django', 
    phaseShift: 0, 
    glowColor: 'emerald',
    label: 'Django'
  },
  { 
    id: 'postgresql',
    orbitRadius: 145, 
    size: 42, 
    speed: 0.8, 
    iconType: 'postgresql', 
    phaseShift: Math.PI / 2, 
    glowColor: 'emerald',
    label: 'PostgreSQL'
  },
  { 
    id: 'git',
    orbitRadius: 145, 
    size: 40, 
    speed: 0.8, 
    iconType: 'git', 
    phaseShift: Math.PI, 
    glowColor: 'emerald',
    label: 'Git'
  },
  { 
    id: 'docker',
    orbitRadius: 145, 
    size: 42, 
    speed: 0.8, 
    iconType: 'docker', 
    phaseShift: (3 * Math.PI) / 2, 
    glowColor: 'emerald',
    label: 'Docker'
  },
  { 
    id: 'react',
    orbitRadius: 180, 
    size: 50, 
    speed: -0.6, 
    iconType: 'react', 
    phaseShift: 0, 
    glowColor: 'purple',
    label: 'React'
  },
  { 
    id: 'node',
    orbitRadius: 180, 
    size: 45, 
    speed: -0.6, 
    iconType: 'node', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'Node.js'
  },
  { 
    id: 'tailwind',
    orbitRadius: 180, 
    size: 40, 
    speed: -0.6, 
    iconType: 'tailwind', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'Tailwind CSS'
  },
];

const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-[var(--bg-secondary)]/90 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered && iconComponents[iconType]
            ? `0 0 30px ${iconComponents[iconType].color}40, 0 0 60px ${iconComponents[iconType].color}20`
            : undefined,
          border: `1px solid var(--border)`
        }}
      >
        <SkillIcon type={iconType} size={size} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--bg-tertiary)]/95 backdrop-blur-sm rounded text-xs text-[var(--text-primary)] whitespace-nowrap pointer-events-none border border-[var(--border)]">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.4)',
      secondary: 'rgba(6, 182, 212, 0.2)',
      border: 'rgba(6, 182, 212, 0.3)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.2)',
      border: 'rgba(147, 51, 234, 0.3)'
    },
    emerald: {
      primary: 'rgba(16, 185, 129, 0.4)',
      secondary: 'rgba(16, 185, 129, 0.2)',
      border: 'rgba(16, 185, 129, 0.3)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 145, glowColor: 'emerald', delay: 0.75 },
    { radius: 180, glowColor: 'purple', delay: 1.5 }
  ];

  return (
    <main className="w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #374151 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #4B5563 0%, transparent 50%)`,
          }}
        />
      </div>

      <div 
        className="relative w-[min(calc(100vw-32px),450px)] h-[min(calc(100vw-32px),450px)] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        <div className="w-20 h-20 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-full flex items-center justify-center z-10 relative shadow-2xl border border-[var(--border)]">
          <div className="absolute inset-0 rounded-full bg-[#06B6D4]/30 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-[#9333EA]/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </main>
  );
}
