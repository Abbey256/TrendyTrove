# TrendyTrove Setup Guide

## Quick Start - Setting Up Your Database

Your TrendyTrove website is ready to use! You just need to set up the database in Supabase. Follow these simple steps:

### Step 1: Run the Database Setup Script

1. Go to your **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project: `idcecgmdwiypigplbhvh`
3. Click on **SQL Editor** in the left sidebar
4. Click **New query**
5. Copy the entire content from `SUPABASE_COMPLETE_SETUP.sql` file in this project
6. Paste it into the SQL Editor
7. Click **Run** (or press Ctrl+Enter)

**That's it!** The script will:
- Create the `products` and `messages` tables
- Set up security policies
- Create storage bucket for product images
- Set up all necessary permissions

### Step 2: Create Your Admin Account

1. In Supabase Dashboard, go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter:
   - **Email**: `sanusiaishat85@gmail.com`
   - **Password**: Choose a strong password (you'll use this to login)
   - **Email Confirm**: Toggle to **Yes** (auto-confirm)
4. Click **Create user**

### Step 3: Start Using Your Website

Your website is now ready! You can:

#### For Customers:
- Visit your website homepage
- Browse products
- Contact you via the contact form
- Order via WhatsApp

#### For Admin (You):
- Click the small **dot** next to "TrendyTrove" at the bottom of the page
- Login with your email and password
- **Add products** with image upload
- **Mark products as featured** to show them in the Featured Collection carousel
- View customer messages

---

## Features Overview

### Featured Products
- When adding or editing a product, check the **"Mark as Featured Product"** checkbox
- Featured products will appear in the beautiful carousel on your homepage
- You can have as many featured products as you want
- If no products are marked as featured, the carousel section won't show

### Image Upload
You can add product images in two ways:
1. **Upload directly** - Click "Upload Image" and select a file from your computer
2. **Use a URL** - Paste a direct link to an image (like from Unsplash or your own hosting)

### Admin Access
- The admin panel is accessible via a **small dot** beside "TrendyTrove" in the footer
- This keeps it subtle and professional

---

## Troubleshooting

### "Database not initialized" error
- Make sure you ran the SQL script in Step 1
- Refresh your browser after running the script

### Can't upload images
- Make sure the SQL script created the storage bucket
- Check that you're logged in as admin

### Products not showing
- Make sure you added at least one product
- Check that the product has an image URL or uploaded image

---

## Need Help?

If you encounter any issues, the error messages will guide you. Most common issues are solved by:
1. Making sure the SQL script was run successfully
2. Refreshing your browser
3. Making sure you're logged in as admin

Enjoy your beautiful TrendyTrove website! 🌟
