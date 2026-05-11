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
 * Uso: const items = useScrollRevealStagger(2, 150);
 *      <div ref={items[0].ref} className={items[0].animationClass} style={items[0].style}>
 * @param {number} count - Número de items a animar
 * @param {number} delayMs - Delay entre cada item en ms
 * @returns {array} Array de { ref, isVisible, animationClass, style }
 */
export function useScrollRevealStagger(count = 3, delayMs = 100) {
  const [visibleSet, setVisibleSet] = useState(new Set());
  const refsMap = useRef(new Map());

  // Crear refs dinámicamente si no existen
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      if (!refsMap.current.has(i)) {
        refsMap.current.set(i, { current: null });
      }
    }
  }, [count]);

  // Setup observers para todos los refs
  useEffect(() => {
    const observers = [];

    for (let i = 0; i < count; i++) {
      const refObj = refsMap.current.get(i);
      if (!refObj) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSet((prev) => {
              const next = new Set(prev);
              next.add(i);
              return next;
            });
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.15 }
      );

      if (refObj.current) {
        observer.observe(refObj.current);
      }

      observers.push(observer);
    }

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [count]);

  // Retornar array de objetos con todos los props necesarios
  const result = [];
  for (let i = 0; i < count; i++) {
    const isVisible = visibleSet.has(i);
    const refObj = refsMap.current.get(i);

    result.push({
      ref: refObj || { current: null },
      isVisible,
      animationClass: isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-10",
      style: isVisible ? { transitionDelay: `${i * delayMs}ms` } : {},
    });
  }

  return result;
}
