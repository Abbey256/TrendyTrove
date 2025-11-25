import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import slide1 from "@assets/luxury_fashion_hero_banner_1764104437892.png";
import slide2 from "@assets/WhatsApp Image 2025-11-25 at 15.04.20_6501dfc1_1764104437892.jpg";
import slide3 from "@assets/WhatsApp Image 2025-11-25 at 15.04.20_b1c723b6_1764104437893.jpg";
import slide4 from "@assets/WhatsApp Image 2025-11-25 at 15.04.20_f4ce3fee_1764104437894.jpg";
import slide5 from "@assets/WhatsApp Image 2025-11-25 at 15.04.21_6deffe6a_1764104437894.jpg";

const slides = [
  {
    image: slide1,
    title: "TheLightBrand",
    subtitle: "Unwrapping elegance. Revealing you.",
    description: "Jewellery • Gifts • Accessories"
  },
  {
    image: slide2,
    title: "Be Light. Wear Light. Give Light.",
    subtitle: "Unwrapping elegance. Revealing you.",
    description: "Discover the finest unisex pieces, blending modern trends with timeless elegance"
  },
  {
    image: slide3,
    title: "Crowned with grace and beauty.",
    subtitle: "Jewellery • Gifts • Accessories",
    description: "Curated collections that embody luxury, comfort, and contemporary fashion"
  },
  {
    image: slide4,
    title: "TheLightBrand",
    subtitle: "Be Light. Wear Light. Give Light.",
    description: "Versatile pieces designed for everyone who values style and quality"
  },
  {
    image: slide5,
    title: "Unwrapping elegance. Revealing you.",
    subtitle: "Crowned with grace and beauty.",
    description: "Every item selected for its superior quality and lasting elegance"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          </div>
        </div>
      ))}
      
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <img 
            src="/TheLightBrandLogo.png"
            alt="TheLightBrand Logo"
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 object-contain"
            data-testid="img-logo"
          />
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-3 sm:mb-4 tracking-wide transition-all duration-700">
            {slides[currentSlide].title}
          </h1>
          <p className="font-serif text-lg sm:text-2xl md:text-3xl text-white/90 italic font-light tracking-wider transition-all duration-700">
            {slides[currentSlide].subtitle}
          </p>
        </div>
        
        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 transition-all px-2">
          {slides[currentSlide].description}
        </p>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Button 
            size="lg" 
            className="bg-primary/90 backdrop-blur-sm hover:bg-primary border-primary-border text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 group"
            data-testid="button-explore"
            onClick={() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Collection
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-6 sm:w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              data-testid={`button-slide-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
