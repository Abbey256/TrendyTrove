# TheLightBrand – Unwrapping elegance. Revealing you.

## Design Approach
**Reference-Based Luxury E-commerce**: Drawing inspiration from luxury fashion and jewellery websites like Cartier, Tiffany & Co., and minimalist brands. Focus on sophisticated elegance with breathing room for products to shine.

## Brand Identity
- **Brand Name**: TheLightBrand
- **Slogan**: "Unwrapping elegance. Revealing you."
- **Tagline**: "Be Light. Wear Light. Give Light."
- **Secondary Message**: "Crowned with grace and beauty."
- **Categories**: Jewellery • Gifts • Accessories

## Core Design Principles
1. **Luxurious Minimalism**: Clean layouts with generous whitespace, allowing products to be the hero
2. **Elegant Sophistication**: Refined typography and subtle animations that convey premium quality
3. **Effortless Navigation**: Intuitive browsing experience with clear product discovery paths

## Typography
- **Primary Font**: Playfair Display or Cormorant Garamond (serif) for headings - conveys elegance
- **Secondary Font**: Inter or Outfit (sans-serif) for body text and UI elements
- **Hierarchy**: 
  - Hero titles: text-5xl to text-7xl, font-light
  - Section headings: text-3xl to text-4xl, font-light
  - Product names: text-xl, font-medium
  - Body text: text-base, font-normal
  - Taglines: text-lg, italic, font-light

## Layout & Spacing
**Spacing System**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-20 (desktop), py-12 (mobile)
- Card spacing: p-6 or p-8
- Grid gaps: gap-6 to gap-8
- Container: max-w-7xl with px-6

## Component Library

### Hero Section
- Full-viewport height (min-h-screen) with elegant fashion/jewellery imagery
- Centered TheLightBrand logo with rotating brand messages
- Overlay with subtle gradient for text legibility
- CTA button with blurred backdrop-blur-sm background
- Auto-rotating slideshow with smooth transitions (5 second intervals)
- No navigation arrows for cleaner mobile experience
- Dot indicators for slide selection

### Product Cards
- Clean white cards with subtle shadow on hover (hover:shadow-xl)
- Square aspect ratio images (aspect-square)
- Product info centered below image
- Price in slightly larger, medium weight font
- "View Details" appearing on hover with smooth opacity transition

### Product Carousel
- Featured products in horizontal scroll or auto-playing carousel
- 3-4 products visible on desktop, 1-2 on mobile
- Elegant navigation dots below
- Smooth transition-all duration-500

### Product Detail Modal
- Multi-image gallery with thumbnail navigation
- Previous/next buttons for image navigation
- Image counter indicator
- Full product information on the right side
- WhatsApp order integration

### Admin Panel
- Clean dashboard layout with sidebar navigation
- Form inputs with soft borders (border-gray-200)
- Upload area with dashed border and elegant icon
- Multiple image upload support with preview
- Success/error states with subtle color feedback

### Footer
- Three-column layout (desktop): Brand info | Quick Links | Contact
- Social icons with soft hover effects
- Elegant divider line above footer
- Contact info with icons
- Brand slogan and tagline displayed

## Animations (Impressive but Refined)
- **Product Cards**: Gentle scale on hover (scale-105), opacity shifts
- **Carousel**: Smooth fade transitions between slides
- **Page Load**: Subtle stagger effect for product grid items (delay each by 100ms)
- **Image Hover**: Slight zoom effect on product images (transform scale-110)
- **Buttons**: Smooth color and shadow transitions
- **Admin Actions**: Success checkmarks with bounce animation

## Images
### Hero Image
Large, full-width hero image showcasing elegant jewellery or fashion photography - products against minimalist background. Image should convey luxury and timeless style.

### Product Images
High-quality product photography on clean white or soft neutral backgrounds. Images should be consistent in lighting and style across the catalog.

### Featured Section
Lifestyle images showing products in elegant contexts - minimal styling, focus on the jewellery/accessory.

## Color Usage (Applied Later)
Structure for whites, golds, and soft neutrals:
- Backgrounds: Various white and off-white tones
- Accents: Gold/champagne tones for borders, icons, hover states
- Text: Charcoal and warm grays
- Success states: Soft sage or muted green
- CTA elements: Gold or deep charcoal with high contrast

## Interaction Patterns
- WhatsApp button: Prominent, with WhatsApp green accent, fixed position on product pages
- Add to cart (future): Gold border button, fills on hover
- Image galleries: Click to expand, elegant lightbox with close animation
- Forms: Inline validation with smooth error messages below fields

## Mobile Considerations
- Single column product grid on mobile
- Hamburger menu with slide-in navigation
- Sticky header with condensed logo
- Touch-friendly button sizes (min 44px height)
- Carousel swipe gestures enabled
- No navigation arrows on hero slideshow for cleaner mobile view
- Responsive text sizing (smaller on mobile, larger on desktop)

This design creates a premium, accessible shopping experience that positions TheLightBrand as a sophisticated jewellery and accessories destination.
