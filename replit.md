# The Light Bearer – World of Elegance

A luxury e-commerce website for unisex fashion, built with modern web technologies and elegant design.

## Overview

**The Light Bearer** is a professional, elegant e-commerce platform for a unisex fashion brand. The application provides a beautiful storefront for customers to browse products and place orders via WhatsApp, plus a secure admin panel for product management.

## Project Architecture

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for luxury styling (gold/champagne palette)
- **Shadcn UI** components for consistent design
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Embla Carousel** for featured products
- **Framer Motion** animations

### Backend
- **Express.js** server
- **Supabase** for database and authentication
- **PostgreSQL** via Supabase

### Design System
- **Typography**: Playfair Display (serif, headings), Inter (sans-serif, body)
- **Color Palette**: Warm neutrals, gold accents (38° 70% 50%), soft backgrounds
- **Animations**: Smooth transitions, elegant hover effects, carousel auto-play

## Features

### Customer Features
1. **Hero Section**: Full-screen banner with The Light Bearer branding and "World of Elegance" tagline
2. **Featured Carousel**: Auto-playing product showcase with navigation
3. **Product Catalog**: Responsive grid with elegant hover effects
4. **Product Details**: Modal with full product information and multi-image gallery
5. **WhatsApp Checkout**: Pre-filled WhatsApp message with product details, customer name, quantity
6. **Contact Form**: Send messages directly to admin panel
7. **Responsive Design**: Mobile-friendly across all devices

### Admin Features
1. **Supabase Authentication**: Secure login for admin (sanusiaishat85@gmail.com)
2. **Product Management**: 
   - Add products (name, description, price, category, multiple images)
   - Edit existing products
   - Delete products
3. **Message Inbox**: View customer messages from contact form
4. **Real-time Updates**: Instant reflection of changes across the site

## Database Schema

### Products Table
```sql
- id (uuid, primary key)
- name (text)
- description (text)
- price (decimal)
- imageUrl (text)
- images (text array)
- category (text)
- isFeatured (boolean)
- createdAt (timestamp)
```

### Messages Table
```sql
- id (uuid, primary key)
- customerName (text)
- email (text)
- message (text)
- createdAt (timestamp)
```

## Environment Variables

Required Supabase credentials (set in Replit Secrets):
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon/public key

## Contact Information

**Admin**: Temiloluwa Sanusi
- **Email**: sanusiaishat85@gmail.com
- **WhatsApp**: 09014964843
- **Instagram**: @worldof_temiloluwa

## Running the Project

The application runs on a single port with both frontend and backend:
```bash
npm run dev
```

This starts:
- Express server (backend) on port 5000
- Vite dev server (frontend) integrated with Express

## Admin Access

Visit `/admin` to access the admin panel. Login with the Supabase admin account credentials.

## Future Enhancements

Planned features for future phases:
- Paystack/Stripe payment integration
- Product inventory management
- Search and filtering by category
- Customer order history
- Product reviews and ratings

## Store Description

"The Light Bearer – World of Elegance brings the finest unisex fashion pieces, blending modern trends with timeless elegance. Our collection features high-quality apparel and accessories for all occasions. Every item is curated to provide comfort, style, and sophistication. Shop with ease, and let elegance define your look."
