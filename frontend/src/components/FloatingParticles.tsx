import { useEffect } from 'react';

export function FloatingParticles(): JSX.Element {
  useEffect((): (() => void) => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0px) translateX(0px);
          opacity: 0.4;
        }
        25% {
          transform: translateY(-15px) translateX(8px);
          opacity: 0.7;
        }
        50% {
          transform: translateY(-30px) translateX(-8px);
          opacity: 0.9;
        }
        75% {
          transform: translateY(-15px) translateX(8px);
          opacity: 0.7;
        }
      }

      @keyframes flowLeft {
        0% {
          transform: translateX(-100px);
          opacity: 0;
        }
        10% {
          opacity: 0.8;
        }
        90% {
          opacity: 0.8;
        }
        100% {
          transform: translateX(100vw);
          opacity: 0;
        }
      }

      .particle-float {
        animation: float 5s ease-in-out infinite;
      }

      .particle-flow {
        animation: flowLeft 8s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div
          key={`float-${i}`}
          className="particle-float"
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            backgroundColor: '#e63946',
            left: `${15 + i * 18}%`,
            top: `${25 + (i % 4) * 20}%`,
            animationDelay: `${i * 0.4}s`,
            boxShadow: '0 0 10px rgba(230, 57, 70, 0.5)',
          }}
        />
      ))}

      {[...Array(3)].map((_, i) => (
        <div
          key={`flow-${i}`}
          className="particle-flow"
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            backgroundColor: '#ff6b6b',
            left: '-100px',
            top: `${20 + i * 30}%`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </>
  );
}
