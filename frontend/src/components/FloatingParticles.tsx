import { useEffect } from 'react';

export function FloatingParticles(): JSX.Element {
  useEffect((): (() => void) => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0px) translateX(0px);
          opacity: 0.5;
        }
        25% {
          transform: translateY(-20px) translateX(10px);
          opacity: 0.8;
        }
        50% {
          transform: translateY(-40px) translateX(-10px);
          opacity: 1;
        }
        75% {
          transform: translateY(-20px) translateX(10px);
          opacity: 0.8;
        }
      }

      @keyframes flowLeft {
        0% {
          transform: translateX(-100px);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateX(100px);
          opacity: 0;
        }
      }

      @keyframes pulse-glow {
        0%, 100% {
          filter: drop-shadow(0 0 5px rgba(6, 182, 212, 0.3));
        }
        50% {
          filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.8));
        }
      }

      .particle-float {
        animation: float 4s ease-in-out infinite;
      }

      .particle-flow {
        animation: flowLeft 3s ease-in-out infinite;
      }

      .particle-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      {/* Floating particles for background decoration */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`float-${i}`}
          className="particle-float particle-glow"
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            backgroundColor: i % 2 === 0 ? '#06B6D4' : '#EC4899',
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Flow particles */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`flow-${i}`}
          className="particle-flow"
          style={{
            position: 'absolute',
            width: '1.5px',
            height: '1.5px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            left: '0%',
            top: `${25 + i * 20}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </>
  );
}
