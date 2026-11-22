import { Helmet, HelmetProvider } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  schema?: Record<string, unknown>;
}

export function SEO({
  title = "RiverFlow | Desarrollo web full stack",
  description = "Portafolio de desarrollo web con React, TypeScript y Django.",
  image,
  url = "https://portfolio-p6iv.onrender.com/",
  type = "website",
  author = "RiverFlow",
  schema
}: SEOProps): JSX.Element {
  const socialImage = image ?? new URL(`${import.meta.env.BASE_URL}Ecommerce-Screenshot.png`, url).href;
  const jsonLd = schema ? JSON.stringify(schema) : null;

  return (
    <Helmet>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="RiverFlow Portfolio" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:creator" content="@riverflow" />

      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* JSON-LD Schema */}
      {jsonLd && (
        <script type="application/ld+json">{jsonLd}</script>
      )}
    </Helmet>
  );
}

export function SEOProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return <HelmetProvider>{children}</HelmetProvider>;
}
