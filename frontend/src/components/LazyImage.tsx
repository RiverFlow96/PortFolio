import { useState, useRef, useEffect, ImgHTMLAttributes } from "react";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholder?: string;
}

export function LazyImage({ 
  src, 
  alt, 
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%230f0f14' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%23333' text-anchor='middle' dy='.3em'%3ELoading...%3C/text%3E%3C/svg%3E",
  className,
  ...props 
}: LazyImageProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : placeholder}
      alt={alt}
      className={`${className} ${isLoaded ? '' : 'opacity-50'}`}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}