import { Router } from "./router/router";
import { SEO } from "./components/SEO";

function App(): JSX.Element {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "RiverFlow",
    "url": "https://riverflow.dev",
    "jobTitle": "Fullstack Developer",
    "description": "Developer-Designer passionate about building fast, scalable web experiences",
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
        title="RiverFlow | Developer-Designer Fullstack"
        description="Building Fast, Scalable Web Experiences. Passionate about React, Django, and creating elegant solutions."
        schema={schema}
      />
      <Router />
    </>
  );
}

export default App;