import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBanner from "@assets/generated_images/luxury_fashion_hero_banner.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <img 
            src="/attached_assets/WhatsApp Image 2025-11-25 at 12.02.38_6d1d8c4e_1764068609909.jpg"
            alt="TrendyTrove Logo"
            className="w-32 h-32 mx-auto mb-6 object-contain"
            data-testid="img-logo"
          />
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light text-white mb-4 tracking-wide">
            TRENDYTROVE
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-white/90 italic font-light tracking-wider">
            World of Elegance
          </p>
        </div>
        
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          Discover the finest unisex fashion pieces, blending modern trends with timeless elegance
        </p>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Button 
            size="lg" 
            className="bg-primary/90 backdrop-blur-sm hover:bg-primary border-primary-border text-lg px-8 py-6 group"
            data-testid="button-explore"
            onClick={() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Collection
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
