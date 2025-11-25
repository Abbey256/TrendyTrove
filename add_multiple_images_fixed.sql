-- Add support for multiple images per product
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS images TEXT[];

-- Update existing products to use the new images array
UPDATE products 
SET images = ARRAY[image_url] 
WHERE images IS NULL;