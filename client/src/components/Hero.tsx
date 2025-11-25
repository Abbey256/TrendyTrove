import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import slide1 from "@assets/stock_images/elegant_luxury_fashi_9d9cca60.jpg";
import slide2 from "@assets/stock_images/elegant_luxury_fashi_b6a5a6cc.jpg";
import slide3 from "@assets/stock_images/elegant_luxury_fashi_09c4a6c6.jpg";
import slide4 from "@assets/stock_images/elegant_luxury_fashi_1cb99c08.jpg";
import slide5 from "@assets/stock_images/elegant_luxury_fashi_e05061b6.jpg";

const slides = [
  {
    image: slide1,
    title: "TRENDYTROVE",
    subtitle: "World of Elegance",
    description: "Discover the finest unisex fashion pieces, blending modern trends with timeless elegance"
  },
  {
    image: slide2,
    title: "SOPHISTICATED STYLE",
    subtitle: "Define Your Look",
    description: "Curated collections that embody luxury, comfort, and contemporary fashion"
  },
  {
    image: slide3,
    title: "TIMELESS FASHION",
    subtitle: "Every Occasion",
    description: "From casual elegance to statement pieces, find your perfect match"
  },
  {
    image: slide4,
    title: "UNISEX COLLECTION",
    subtitle: "Fashion Without Boundaries",
    description: "Versatile pieces designed for everyone who values style and quality"
  },
  {
    image: slide5,
    title: "PREMIUM QUALITY",
    subtitle: "Exceptional Craftsmanship",
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <img 
            src="/TrendytroveLogo.jpg"
            alt="TrendyTrove Logo"
            className="w-32 h-32 mx-auto mb-6 object-contain"
            data-testid="img-logo"
          />
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-wide transition-all duration-700">
            {slides[currentSlide].title}
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-white/90 italic font-light tracking-wider transition-all duration-700">
            {slides[currentSlide].subtitle}
          </p>
        </div>
        
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 transition-all">
          {slides[currentSlide].description}
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

        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              data-testid={`button-slide-${index}`}
            />
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
        onClick={prevSlide}
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
        onClick={nextSlide}
        data-testid="button-next-slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
