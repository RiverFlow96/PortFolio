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
      {/* Background subtle glow */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        <path
          id="flowPath"
          d="M 8 16 Q 16 8 24 16 Q 16 24 8 16"
          fill="none"
        />
      </defs>

      {/* Outer orbit - Cyan */}
      {animated && (
        <circle
          className="orbit"
          cx="16"
          cy="16"
          r="10"
          stroke="#06B6D4"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />
      )}

      {/* Middle orbit - Magenta (reverse) */}
      {animated && (
        <circle
          className="orbit reverse"
          cx="16"
          cy="16"
          r="6"
          stroke="#EC4899"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />
      )}

      {/* Flow path (river) */}
      <path
        d="M 8 16 Q 16 8 24 16 Q 16 24 8 16"
        stroke="url(#flowGradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Animated flow particles */}
      {animated && (
        <>
          <circle
            className="flow-particle"
            cx="8"
            cy="16"
            r="1"
            fill="#06B6D4"
            filter="url(#glow)"
            style={{ animationDelay: '0s' }}
          />
          <circle
            className="flow-particle"
            cx="8"
            cy="16"
            r="1"
            fill="#EC4899"
            filter="url(#glow)"
            style={{ animationDelay: '1s' }}
          />
          <circle
            className="flow-particle"
            cx="8"
            cy="16"
            r="1"
            fill="#10B981"
            filter="url(#glow)"
            style={{ animationDelay: '2s' }}
          />
        </>
      )}

      {/* Core/center - pulsing */}
      <circle
        className={animated ? 'core-pulse' : ''}
        cx="16"
        cy="16"
        r="2"
        fill="#06B6D4"
        opacity="1"
        filter="url(#glow)"
      />

      {/* Static version particles if not animated */}
      {!animated && (
        <>
          <circle cx="12" cy="10" r="0.8" fill="#06B6D4" opacity="0.7" />
          <circle cx="16" cy="8" r="0.8" fill="#EC4899" opacity="0.7" />
          <circle cx="20" cy="10" r="0.8" fill="#10B981" opacity="0.7" />
        </>
      )}
    </svg>
  );
}
