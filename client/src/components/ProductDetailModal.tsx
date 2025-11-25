import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Package, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductDetailModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailModal({ product, open, onOpenChange }: ProductDetailModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering:

*Product:* ${product.name}
*Price:* ₦${parseFloat(product.price).toLocaleString()}
*Quantity:* ${quantity}
*Customer Name:* ${customerName}
${notes ? `*Notes:* ${notes}` : ''}

Please confirm availability and provide next steps for purchase.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2349014964843?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        setCurrentImageIndex(0);
      }
      onOpenChange(isOpen);
    }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-light">
            Product Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-md overflow-hidden bg-muted">
              <img
                src={allImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="img-modal-product"
              />
              
              {allImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-white/50 hover:bg-white/90 h-8 w-8"
                    onClick={prevImage}
                    data-testid="button-prev-image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-white/50 hover:bg-white/90 h-8 w-8"
                    onClick={nextImage}
                    data-testid="button-next-image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>
            
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                <Package className="w-3 h-3 mr-1" />
                {product.category}
              </Badge>
              <h2 className="font-serif text-3xl font-medium mb-3" data-testid="text-modal-name">
                {product.name}
              </h2>
              <p className="text-primary text-2xl font-medium mb-4" data-testid="text-modal-price">
                ₦{parseFloat(product.price).toLocaleString()}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Order via WhatsApp
              </h3>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="customer-name">Your Name *</Label>
                  <Input
                    id="customer-name"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    data-testid="input-customer-name"
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    data-testid="input-quantity"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Size, color preference, delivery address, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    data-testid="textarea-notes"
                  />
                </div>

                <Button
                  className="w-full bg-[#25D366] hover:bg-[#1fb855] text-white border-none"
                  size="lg"
                  disabled={!customerName.trim()}
                  onClick={handleWhatsAppOrder}
                  data-testid="button-whatsapp-order"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat & Order via WhatsApp
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  You'll be redirected to WhatsApp with a pre-filled message
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
