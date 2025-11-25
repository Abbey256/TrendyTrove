import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/schema";

export function FeaturedCarousel() {
  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = allProducts?.filter(product => product.isFeatured) || [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(autoplay);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            Featured Collection
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Curated pieces that define elegance and sophistication
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_33.33%] min-w-0"
                  style={{
                    opacity: selectedIndex === index ? 1 : 0.5,
                    transition: "opacity 0.5s ease-in-out"
                  }}
                >
                  <Card className="overflow-hidden group hover-elevate transition-all duration-500 border-card-border" data-testid={`card-featured-${product.id}`}>
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        data-testid={`img-featured-${product.id}`}
                      />
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="font-serif text-xl font-medium mb-2" data-testid={`text-featured-name-${product.id}`}>
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {product.description}
                      </p>
                      <p className="text-primary text-lg font-medium" data-testid={`text-featured-price-${product.id}`}>
                        ₦{parseFloat(product.price).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={scrollPrev}
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={scrollNext}
            data-testid="button-carousel-next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="flex justify-center gap-2 mt-8">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index ? "w-8 bg-primary" : "w-2 bg-border"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                data-testid={`button-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
