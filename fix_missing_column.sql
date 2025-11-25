-- Check current table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

-- Add the missing is_featured column if it doesn't exist
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE NOT NULL;

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'is_featured';