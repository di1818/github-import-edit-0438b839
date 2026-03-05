import HeroSection from "@/components/HeroSection";
import PainsSection from "@/components/PainsSection";
import ForWhomSection from "@/components/ForWhomSection";
import ProgramSection from "@/components/ProgramSection";
import ResultsSection from "@/components/ResultsSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import ApplicationSection from "@/components/ApplicationSection";
import FooterSection from "@/components/FooterSection";
import CookieConsent from "@/components/CookieConsent";
import Particles from "@/components/Particles";

const Index = () => (
  <main className="min-h-screen bg-background relative">
    {/* Global particles background */}
    <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
      <Particles
        particleColors={["#e8734a", "#d4603a", "#f5a882", "#ffffff"]}
        particleCount={150}
        particleSpread={10}
        speed={0.08}
        particleBaseSize={80}
        moveParticlesOnHover={false}
        alphaParticles
        disableRotation={false}
        sizeRandomness={1}
        cameraDistance={20}
        pixelRatio={1}
      />
    </div>
    <div className="relative z-10">
      <HeroSection />
      <PainsSection />
      <ForWhomSection />
      <ProgramSection />
      <ResultsSection />
      <AboutSection />
      <PricingSection />
      <ApplicationSection />
      <FooterSection />
    </div>
    <CookieConsent />
  </main>
);

export default Index;
