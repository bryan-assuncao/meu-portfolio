import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStack from "@/components/TechStack";
import ContactFooter from "@/components/ContactFooter";

const Index = () => (
  <main className="bg-background min-h-screen overflow-x-hidden">
    <HeroSection />
    <AboutSection />
    <TechStack />
    <ContactFooter />
  </main>
);

export default Index;
