import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/TrendytroveLogo.jpg" 
            alt="TrendyTrove Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
          <span className="font-serif text-lg sm:text-2xl font-semibold text-gray-900">
            TrendyTrove
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-gray-700 hover:text-gray-900 transition-colors">
            Home
          </a>
          <a href="#products" className="text-gray-700 hover:text-gray-900 transition-colors">
            Products
          </a>
          <a href="#contact" className="text-gray-700 hover:text-gray-900 transition-colors">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-2 space-y-2">
            <a 
              href="#home" 
              className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#products" 
              className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </a>
            <a 
              href="#contact" 
              className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}