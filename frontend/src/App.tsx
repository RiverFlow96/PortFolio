import { Router } from "./router/router";
import { SEO } from "./components/SEO";

function App(): JSX.Element {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "RiverFlow",
    "url": "https://riverflow.dev",
    "jobTitle": "Desarrollador web full stack",
    "description": "Desarrollo y diseño de aplicaciones web con React y Django",
    "sameAs": [
      "https://github.com/RiverFlow96",
      "https://linkedin.com/in/riverflow",
      "https://twitter.com/riverflow"
    ],
    "knowsAbout": ["React", "TypeScript", "Django", "PostgreSQL", "Python"]
  };

  return (
    <>
      <SEO 
        title="RiverFlow | Desarrollo web full stack"
        description="Portafolio de desarrollo web con React, TypeScript y Django."
        schema={schema}
      />
      <Router />
    </>
  );
}

export default App;