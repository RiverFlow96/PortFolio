import { useEffect } from 'react';

interface RiverFlowLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export function RiverFlowLogo({ size = 'md', animated = true }: RiverFlowLogoProps): JSX.Element {
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };

  const dimension = sizeMap[size];

  useEffect((): (() => void) | undefined => {
    if (!animated) return;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes flowParticles {
        0% {
          opacity: 0;
          offset-distance: 0%;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          offset-distance: 100%;
        }
      }

      .flow-particle {
        animation: flowParticles 3s ease-in-out infinite;
        offset-path: path('M 8 16 Q 16 8 24 16 Q 16 24 8 16');
      }

      @keyframes pulseCore {
        0%, 100% {
          r: 2;
          opacity: 1;
        }
        50% {
          r: 3;
          opacity: 0.6;
        }
      }

      .core-pulse {
        animation: pulseCore 2s ease-in-out infinite;
      }

      @keyframes orbitRotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .orbit {
        transform-origin: center;
        animation: orbitRotate 8s linear infinite;
      }

      .orbit.reverse {
        animation: orbitRotate 8s linear infinite reverse;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [animated]);

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e63946" />
          <stop offset="50%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#e63946" />
        </linearGradient>

        <path
          id="flowPath"
          d="M 8 16 Q 16 8 24 16 Q 16 24 8 16"
          fill="none"
        />
      </defs>

      {animated && (
        <circle
          className="orbit"
          cx="16"
          cy="16"
          r="10"
          stroke="#e63946"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />
      )}

      {animated && (
        <circle
          className="orbit reverse"
          cx="16"
          cy="16"
          r="6"
          stroke="#ff6b6b"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />
      )}

      <path
        d="M 8 16 Q 16 8 24 16 Q 16 24 8 16"
        stroke="url(#flowGradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />

      {animated && (
        <>
          <circle
            className="flow-particle"
            cx="8"
            cy="16"
            r="1"
            fill="#e63946"
            filter="url(#glow)"
            style={{ animationDelay: '0s' }}
          />
          <circle
            className="flow-particle"
            cx="8"
            cy="16"
            r="1"
            fill="#ff6b6b"
            filter="url(#glow)"
            style={{ animationDelay: '1s' }}
          />
          <circle
            className="flow-particle"
            cx="8"
            cy="16"
            r="1"
            fill="#e63946"
            filter="url(#glow)"
            style={{ animationDelay: '2s' }}
          />
        </>
      )}

      <circle
        className={animated ? 'core-pulse' : ''}
        cx="16"
        cy="16"
        r="2"
        fill="#e63946"
        opacity="1"
        filter="url(#glow)"
      />

      {!animated && (
        <>
          <circle cx="12" cy="10" r="0.8" fill="#e63946" opacity="0.7" />
          <circle cx="16" cy="8" r="0.8" fill="#ff6b6b" opacity="0.7" />
          <circle cx="20" cy="10" r="0.8" fill="#e63946" opacity="0.7" />
        </>
      )}
    </svg>
  );
}
