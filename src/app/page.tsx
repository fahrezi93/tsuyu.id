import { CatalogTeaser } from "@/components/CatalogTeaser";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Footer } from "@/components/Footer";
import { ParallaxHero } from "@/components/ParallaxHero";
import { LocationSection } from "@/components/LocationSection";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-pastel-cream selection:bg-pastel-purple selection:text-white">
      <Header />
      <ParallaxHero />
      <CatalogTeaser />
      <LocationSection />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
