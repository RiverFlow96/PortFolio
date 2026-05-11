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
  title = "RiverFlow | Developer-Designer Fullstack",
  description = "Building Fast, Scalable Web Experiences. Passionate about React, Django, and creating elegant solutions.",
  image = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop",
  url = "https://riverflow.dev",
  type = "website",
  author = "RiverFlow",
  schema
}: SEOProps): JSX.Element {
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
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="RiverFlow Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@riverflow" />

      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />

      {/* JSON-LD Schema */}
      {jsonLd && (
        <script type="application/ld+json">{jsonLd}</script>
      )}
    </Helmet>
  );
}

export function Analytics(): JSX.Element {
  return (
    <Helmet>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
      <script>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
      `}</script>
    </Helmet>
  );
}

export function SEOProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return <HelmetProvider>{children}</HelmetProvider>;
}