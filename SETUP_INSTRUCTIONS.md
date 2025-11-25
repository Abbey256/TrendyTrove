# TrendyTrove Setup Instructions

## IMPORTANT: Supabase Database Setup Required

**⚠️ The application will not work until you complete the database setup below!**

## Supabase Database Setup

### Step 1: Create Database Tables (REQUIRED)

1. Go to your Supabase Dashboard (https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Create a **New Query**
5. Copy and paste the **ENTIRE** contents of `supabase_setup.sql` file
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. Verify you see "Success. No rows returned" message

This will create:
- `products` table with proper schema (id, name, description, price, image_url, category, created_at)
- `messages` table for contact form (id, customer_name, email, message, created_at)
- Row Level Security (RLS) policies for secure access
- Performance indexes for faster queries
- 3 sample products for testing (optional)

### Step 2: Create Admin User

**Option A: Using Supabase Dashboard (Recommended)**

1. Go to **Authentication** > **Users**
2. Click **Add user** > **Create new user**
3. Enter the following details:
   - **Email**: `sanusiaishat85@gmail.com`
   - **Password**: Choose a strong password (save this!)
   - **Auto Confirm Email**: Yes ✓
4. Click **Create user**

**Option B: Using Supabase Auth API**

If you prefer to create the admin user programmatically:

```javascript
// Run this in your browser console while logged into Supabase
const { data, error } = await supabase.auth.admin.createUser({
  email: 'sanusiaishat85@gmail.com',
  password: 'YOUR_STRONG_PASSWORD_HERE',
  email_confirm: true,
  user_metadata: {
    full_name: 'Temiloluwa Sanusi',
    role: 'admin'
  }
})
```

### Step 3: Verify Setup

1. Visit your deployed application at `/admin`
2. Login with:
   - Email: `sanusiaishat85@gmail.com`
   - Password: [The password you created]
3. You should see the admin dashboard

## Application Features

### For Customers (Public)
- Browse elegant product catalog
- View product details
- Order via WhatsApp with pre-filled message
- Send messages via contact form

### For Admin
- Secure login at `/admin`
- Add new products with:
  - Name, description, price
  - Category (Clothing, Accessories, Footwear, Outerwear)
  - Image URL (use Unsplash, Imgur, or your own hosting)
- Edit existing products
- Delete products
- View customer messages from contact form

## Using the Admin Panel

### Adding Products

1. Login to admin panel
2. Click **Add Product**
3. Fill in all fields:
   - **Name**: Product name
   - **Description**: Detailed description
   - **Price**: Price in Naira (numbers only)
   - **Category**: Select from dropdown
   - **Image URL**: Direct link to product image
4. Click **Add Product**

**Image URL Tips:**
- Use high-quality product photos
- Recommended size: 800x800px or larger
- Free image sources: Unsplash, Pexels
- Or upload to Imgur and use the direct link

### WhatsApp Integration

When customers click "Chat & Order via WhatsApp":
1. They enter their name, quantity, and optional notes
2. Click the WhatsApp button
3. WhatsApp opens with a pre-filled message containing:
   - Product name and price
   - Quantity requested
   - Customer name
   - Any additional notes
4. Message is sent to: **09014964843**

## Contact Information

All footer links connect to:
- **Phone**: 09014964843
- **Email**: sanusiaishat85@gmail.com
- **Instagram**: @worldof_temiloluwa
- **WhatsApp**: wa.me/2349014964843

## Troubleshooting

### Can't login to admin panel?
- Verify admin user was created in Supabase
- Check that email is `sanusiaishat85@gmail.com`
- Ensure email is confirmed in Supabase Auth
- Try resetting password in Supabase Dashboard

### Products not showing?
- Check that products exist in Supabase database
- Verify Row Level Security policies are correct
- Check browser console for errors

### Images not loading?
- Ensure image URLs are direct links to images
- URLs should end in .jpg, .png, .webp, etc.
- Test the image URL in a new browser tab

## Support

For technical support or questions:
- Email: sanusiaishat85@gmail.com
- WhatsApp: 09014964843
