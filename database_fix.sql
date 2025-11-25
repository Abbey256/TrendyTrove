-- Fix missing columns in existing tables
-- Run this if you're getting "column does not exist" errors

-- Add missing columns to products table if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'created_at') THEN
        ALTER TABLE products ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL;
    END IF;
END $$;

-- Add missing columns to messages table if they don't exist  
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'messages' AND column_name = 'created_at') THEN
        ALTER TABLE messages ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL;
    END IF;
END $$;

-- Ensure proper column names exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'messages' AND column_name = 'customer_name') THEN
        ALTER TABLE messages ADD COLUMN customer_name TEXT NOT NULL DEFAULT '';
    END IF;
END $$;

-- Update existing data if needed
UPDATE products SET created_at = NOW() WHERE created_at IS NULL;
UPDATE messages SET created_at = NOW() WHERE created_at IS NULL;