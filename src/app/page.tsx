import Hero from "@/components/Hero";
import About from "@/components/About";
import Exp from "@/components/Exp";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Exp />
      <Projects />
      <Contact/>
      
    </main>
  );
}