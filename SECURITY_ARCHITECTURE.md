# TrendyTrove Security Architecture

## Authentication & Authorization Model

TrendyTrove uses **Supabase Row Level Security (RLS)** policies for authentication and authorization. This is the recommended approach for Supabase applications and provides database-level security.

### How It Works

1. **Client-Side Authentication:**
   - Admin logs in via Supabase Auth (email/password)
   - Supabase returns a JWT (JSON Web Token) stored in the browser
   - Frontend includes this JWT in `Authorization: Bearer <token>` header for authenticated requests

2. **Server-Side Request Handling:**
   - API routes extract the `Authorization` header from the HTTP request
   - Server passes this header to the Storage layer
   - Storage layer creates a Supabase client with the JWT token included
   - Supabase verifies the JWT using the project's JWT secret (server-side verification)
   - RLS policies check `auth.uid()` to determine if the request is authenticated
   - Database operations are allowed/denied based on RLS policies

3. **Database-Level Security (RLS Policies):**
   ```sql
   -- Products: Public can read, authenticated users can write
   CREATE POLICY "Allow public read products"
     ON products FOR SELECT
     USING (true);

   CREATE POLICY "Allow authenticated insert products"
     ON products FOR INSERT
     WITH CHECK (auth.uid() IS NOT NULL);

   -- Messages: Public can create, authenticated users can read
   CREATE POLICY "Allow public insert messages"
     ON messages FOR INSERT
     WITH CHECK (true);

   CREATE POLICY "Allow authenticated read messages"
     ON messages FOR SELECT
     USING (auth.uid() IS NOT NULL);
   ```

### Security Benefits

1. **Defense in Depth:**
   - Even if someone bypasses the frontend, RLS policies protect the database
   - No need to implement auth middleware on the API server
   - Security enforced at the database level (cannot be bypassed)

2. **JWT Verification:**
   - Supabase automatically verifies JWT signatures using the project's secret key
   - Expired tokens are rejected
   - Tampered tokens are rejected

3. **Fine-Grained Access Control:**
   - RLS policies can check user ID, roles, and other attributes
   - Different policies for SELECT, INSERT, UPDATE, DELETE
   - Can implement row-level permissions (e.g., users can only edit their own data)

### Why Not Service-Role Key?

The Supabase **service-role key** should **NEVER** be used in this scenario because:

1. It bypasses ALL RLS policies (admin access)
2. Should never be exposed to version control or frontend code
3. Only used for server-side admin operations that need to bypass RLS
4. Not needed for standard authentication flows

### Request Flow Example

**Authenticated Admin Creating a Product:**

1. Frontend: `POST /api/products` with `Authorization: Bearer <jwt>`
2. Server: Extracts JWT from header
3. Storage: Creates Supabase client with JWT: 
   ```javascript
   createClient(url, anonKey, {
     global: { headers: { Authorization: 'Bearer <jwt>' } }
   })
   ```
4. Supabase: Verifies JWT signature and extracts user ID
5. Database: RLS policy checks `auth.uid() IS NOT NULL` → ALLOWS insert
6. Response: Returns created product

**Unauthenticated User Attempting to Create a Product:**

1. Frontend: `POST /api/products` (no Authorization header)
2. Server: No JWT to pass
3. Storage: Creates unauthenticated Supabase client
4. Supabase: Request treated as anonymous user
5. Database: RLS policy checks `auth.uid() IS NOT NULL` → DENIES insert
6. Response: Returns "new row violates row-level security policy" error
7. Server: Catches error, returns 401 Unauthorized

### Testing Security

After running `supabase_setup.sql`, you can verify security works:

1. **Test Public Read (Should Work):**
   ```bash
   curl http://localhost:5000/api/products
   ```
   Result: Returns list of products

2. **Test Unauthenticated Write (Should Fail):**
   ```bash
   curl -X POST http://localhost:5000/api/products \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","price":100,"imageUrl":"http://example.com/img.jpg","category":"Test"}'
   ```
   Result: 401 Unauthorized

3. **Test Authenticated Write (Should Work):**
   - Login as admin in the web UI
   - Create a product via the admin dashboard
   - Result: Product created successfully

### Common Misconceptions

**Misconception:** "You need the service-role key for server-side JWT verification."

**Reality:** Supabase automatically verifies JWTs when you pass them via the Authorization header to a client created with the **anon key**. The anon key + JWT header is the correct approach for authenticated requests.

**Misconception:** "RLS policies don't work without the service-role key."

**Reality:** RLS policies work BEST with the anon key. The service-role key **bypasses** RLS - it's for admin operations only.

### References

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)
- [Row Level Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
