import { Instagram, Mail, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <h3 className="font-serif text-2xl font-medium">The Light Bearer</h3>
              <a 
                href="/admin" 
                className="w-2 h-2 rounded-full bg-primary hover:bg-primary/80 transition-colors" 
                title="Admin Access"
                aria-label="Admin Access"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              World of Elegance brings the finest unisex fashion pieces, blending modern trends with timeless elegance.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Every item curated to provide comfort, style, and sophistication.
            </p>
          </div>

          <div className="text-center">
            <h4 className="font-medium mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <a
                href="#products"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-products"
              >
                Products
              </a>
              <a
                href="#about"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-about"
              >
                About Us
              </a>
            </nav>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-medium mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <a
                href="tel:09014964843"
                className="flex items-center justify-center md:justify-end gap-2 text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-phone"
              >
                <Phone className="w-4 h-4" />
                09014964843
              </a>
              <a
                href="mailto:sanusiaishat85@gmail.com"
                className="flex items-center justify-center md:justify-end gap-2 text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-email"
              >
                <Mail className="w-4 h-4" />
                sanusiaishat85@gmail.com
              </a>
              <div className="flex items-center justify-center md:justify-end gap-4 mt-4">
                <a
                  href="https://wa.me/2349014964843"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#25D366] transition-colors"
                  aria-label="WhatsApp"
                  data-testid="link-whatsapp"
                >
                  <SiWhatsapp className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/worldof_temiloluwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                  data-testid="link-instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} The Light Bearer – World of Elegance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
