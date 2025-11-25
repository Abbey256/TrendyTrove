-- Fix messages table RLS policy for contact form
DROP POLICY IF EXISTS "Allow public to insert messages" ON messages;

-- Allow anyone to insert messages (contact form submissions)
CREATE POLICY "Allow public to insert messages"
ON messages FOR INSERT
TO anon, public
WITH CHECK (true);