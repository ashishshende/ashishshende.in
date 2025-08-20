import { Header } from "@/components/portfolio/header";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Footer } from "@/components/portfolio/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section id="home">
        <HeroSection />
      </section>
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}