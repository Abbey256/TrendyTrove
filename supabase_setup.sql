-- TrendyTrove Database Setup for Supabase
-- Run these SQL commands in your Supabase SQL Editor

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for products table
-- Allow public read access to products
CREATE POLICY "Allow public read access to products"
ON products FOR SELECT
TO public
USING (true);

-- Allow authenticated users (admin) to insert products
CREATE POLICY "Allow authenticated users to insert products"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users (admin) to update products
CREATE POLICY "Allow authenticated users to update products"
ON products FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users (admin) to delete products
CREATE POLICY "Allow authenticated users to delete products"
ON products FOR DELETE
TO authenticated
USING (true);

-- Create policies for messages table
-- Allow public to insert messages (contact form)
CREATE POLICY "Allow public to insert messages"
ON messages FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users (admin) to read messages
CREATE POLICY "Allow authenticated users to read messages"
ON messages FOR SELECT
TO authenticated
USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Insert sample products (optional - for testing)
INSERT INTO products (name, description, price, image_url, category) VALUES
  ('Classic Unisex Blazer', 'Timeless sophistication meets modern design. Perfect for any occasion, this blazer combines comfort with elegance.', 65000, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80', 'Outerwear'),
  ('Minimalist Tote Bag', 'Elegant and practical. Crafted from premium materials for the discerning fashion enthusiast.', 28000, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', 'Accessories'),
  ('Premium Cotton T-Shirt', 'Luxury comfort for everyday wear. Soft, breathable, and stylish in neutral tones.', 18000, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', 'Clothing');

/*
ADMIN USER SETUP INSTRUCTIONS:

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Users
3. Click "Add user" > "Create new user"
4. Enter:
   - Email: sanusiaishat85@gmail.com
   - Password: [Choose a strong password]
   - Email Confirm: Yes (auto-confirm)
5. Click "Create user"

OR use the Supabase CLI/API to create the user programmatically.

The admin user will be able to:
- Login to the admin panel at /admin
- Manage products (add, edit, delete)
- View customer messages
*/
