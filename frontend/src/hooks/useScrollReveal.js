import { useEffect, useRef, useState } from "react";

/**
 * Hook para revelar elementos cuando entran en el viewport
 * @param {number} threshold - Porcentaje del elemento visible para trigger (0-1)
 * @param {string} animation - Tipo de animación: 'fade', 'slide-up', 'slide-left', 'scale'
 * @returns {object} { ref, isVisible }
 */
export function useScrollReveal(threshold = 0.1, animation = "fade") {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const animationClass = {
    fade: isVisible ? "opacity-100" : "opacity-0",
    "slide-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
    "slide-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
    scale: isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
  }[animation];

  return { ref, isVisible, animationClass };
}

/**
 * Hook para revelar múltiples elementos con stagger effect
 * @param {number} items - Número de items a animar
 * @param {number} delay - Delay entre cada item en ms
 * @returns {array} Array de refs, isVisible estados y animationClasses
 */
export function useScrollRevealStagger(items = 3, delay = 100) {
  const refs = useRef(Array(items).fill(null));
  const [visibleIndices, setVisibleIndices] = useState(new Set());

  useEffect(() => {
    const observers = refs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleIndices((prev) => new Set(prev).add(index));
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [items]);

  return refs.current.map((ref, index) => ({
    ref,
    isVisible: visibleIndices.has(index),
    animationClass: visibleIndices.has(index)
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10",
    style: visibleIndices.has(index) ? { transitionDelay: `${index * delay}ms` } : {},
  }));
}
