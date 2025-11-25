-- Completely fix messages RLS policy
-- First, disable RLS temporarily to clear any issues
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public to insert messages" ON messages;
DROP POLICY IF EXISTS "Allow authenticated users to read messages" ON messages;

-- Re-enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create new policies that work with anonymous users
CREATE POLICY "Enable insert for anonymous users" ON messages
FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Enable insert for public users" ON messages  
FOR INSERT TO public
WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users" ON messages
FOR SELECT TO authenticated
USING (true);