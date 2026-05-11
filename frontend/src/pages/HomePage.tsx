import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { HowIWork } from "../sections/HowIWork";
import { TechStack } from "../sections/TechStack";
import { Projects } from "../sections/Projects";
import { Contact } from "../sections/Contact";

export function HomePage() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white">
      <Navbar />
      <Hero />
      <About />
      <HowIWork />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
