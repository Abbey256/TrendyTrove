import { Hero } from "@/components/Hero";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCarousel />
      <ProductCatalog />
      <ContactSection />
      <Footer />
    </div>
  );
}
