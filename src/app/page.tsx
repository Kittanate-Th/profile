import About from "@/components/About";
import Exp from "@/components/Exp";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Certificates from "@/components/Certificates";
import AnimatedSection from "@/components/AnimatedSection";
import Kittanate from "@/components/Hero";
import ConstellationBackground from "@/components/ConstellationBackground";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto min-h-screen flex flex-col gap-24 py-16">
      <ConstellationBackground />
      <Kittanate />
      <AnimatedSection delay={0}>
        <About />
      </AnimatedSection>
      <AnimatedSection delay={50}>
        <Exp />
      </AnimatedSection>
      <AnimatedSection delay={50}>
        <Projects />
      </AnimatedSection>
      <AnimatedSection delay={50}>
        <Certificates />
      </AnimatedSection>
      <AnimatedSection delay={50}>
        <Contact />
      </AnimatedSection>
    </main>
  );
}