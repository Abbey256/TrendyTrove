import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="/TrendytroveLogo.jpg" 
            alt="TrendyTrove Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className="font-serif text-2xl font-semibold text-gray-900">
            TrendyTrove
          </span>
        </div>
        
        <nav className="flex items-center space-x-8">
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
      </div>
    </header>
  );
}