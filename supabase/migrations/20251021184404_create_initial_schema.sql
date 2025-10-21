/*
  # Sri Telangana Pindivantalu E-Commerce Database Schema

  ## Overview
  Complete database schema for the heritage snacks e-commerce platform featuring products,
  orders, gift boxes, blog content, and customer engagement features.

  ## New Tables

  ### 1. categories
  - `id` (uuid, primary key)
  - `name` (text) - Category name (Snacks, Sweets, Veg Pickles)
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `image_url` (text) - Category hero image
  - `display_order` (integer) - Sort order for display
  - `created_at` (timestamptz)

  ### 2. products
  - `id` (uuid, primary key)
  - `name` (text) - Product name
  - `slug` (text, unique) - URL-friendly identifier
  - `category_id` (uuid, foreign key to categories)
  - `description` (text) - Short description
  - `story` (text) - Long-form story about the product and heritage
  - `region` (text) - Telangana region of origin
  - `price` (decimal) - Base price
  - `weight` (text) - Weight/size information
  - `ingredients` (text) - Comma-separated ingredient list
  - `shelf_life` (text) - Storage duration
  - `storage_instructions` (text) - How to store
  - `serving_suggestions` (text) - How to enjoy
  - `is_featured` (boolean) - Show on homepage
  - `is_festival_special` (boolean) - Festival product flag
  - `festival_name` (text) - Associated festival
  - `is_available` (boolean) - Stock status
  - `display_order` (integer) - Sort order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. product_images
  - `id` (uuid, primary key)
  - `product_id` (uuid, foreign key to products)
  - `image_url` (text) - Image storage URL
  - `alt_text` (text) - Accessibility text
  - `is_primary` (boolean) - Main product image
  - `display_order` (integer) - Sort order
  - `created_at` (timestamptz)

  ### 4. orders
  - `id` (uuid, primary key)
  - `order_number` (text, unique) - Human-readable order ID
  - `customer_name` (text)
  - `customer_email` (text)
  - `customer_phone` (text)
  - `shipping_address` (jsonb) - Full address object
  - `subtotal` (decimal) - Before shipping
  - `shipping_cost` (decimal)
  - `discount` (decimal)
  - `total` (decimal) - Final amount
  - `status` (text) - pending, confirmed, shipped, delivered, cancelled
  - `payment_status` (text) - pending, completed, failed
  - `payment_method` (text) - UPI, card, wallet
  - `tracking_number` (text) - Shipment tracking
  - `notes` (text) - Customer notes
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. order_items
  - `id` (uuid, primary key)
  - `order_id` (uuid, foreign key to orders)
  - `product_id` (uuid, foreign key to products)
  - `product_name` (text) - Snapshot of product name
  - `quantity` (integer)
  - `unit_price` (decimal)
  - `total_price` (decimal)
  - `created_at` (timestamptz)

  ### 6. gift_boxes
  - `id` (uuid, primary key)
  - `name` (text) - Custom gift box name
  - `message` (text) - Personalized message
  - `total_price` (decimal)
  - `is_template` (boolean) - Predefined gift box
  - `created_at` (timestamptz)

  ### 7. gift_box_items
  - `id` (uuid, primary key)
  - `gift_box_id` (uuid, foreign key to gift_boxes)
  - `product_id` (uuid, foreign key to products)
  - `quantity` (integer)
  - `created_at` (timestamptz)

  ### 8. testimonials
  - `id` (uuid, primary key)
  - `customer_name` (text)
  - `rating` (integer) - 1 to 5 stars
  - `review` (text)
  - `product_id` (uuid, foreign key to products, nullable)
  - `image_url` (text) - Optional customer photo
  - `is_featured` (boolean) - Show on homepage
  - `is_approved` (boolean) - Moderation flag
  - `created_at` (timestamptz)

  ### 9. blog_posts
  - `id` (uuid, primary key)
  - `title` (text)
  - `slug` (text, unique)
  - `content` (text) - Full article content
  - `excerpt` (text) - Short preview
  - `category` (text) - recipes, festivals, culture
  - `featured_image` (text)
  - `is_published` (boolean)
  - `published_at` (timestamptz)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 10. newsletter_subscriptions
  - `id` (uuid, primary key)
  - `email` (text, unique)
  - `is_active` (boolean)
  - `subscribed_at` (timestamptz)

  ### 11. faqs
  - `id` (uuid, primary key)
  - `question` (text)
  - `answer` (text)
  - `category` (text) - shipping, products, returns, general
  - `display_order` (integer)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for products, categories, blog posts, testimonials, and FAQs
  - Restricted write access for orders and customer data
  - Newsletter subscriptions allow public insert for signup forms

  ## Indexes
  - Product slug for fast lookups
  - Category filtering on products
  - Order number lookup
  - Blog post slug for routing
*/

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  description text DEFAULT '',
  story text DEFAULT '',
  region text DEFAULT '',
  price decimal(10,2) NOT NULL DEFAULT 0,
  weight text DEFAULT '',
  ingredients text DEFAULT '',
  shelf_life text DEFAULT '',
  storage_instructions text DEFAULT '',
  serving_suggestions text DEFAULT '',
  is_featured boolean DEFAULT false,
  is_festival_special boolean DEFAULT false,
  festival_name text DEFAULT '',
  is_available boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product Images Table
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text DEFAULT '',
  is_primary boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  shipping_address jsonb NOT NULL,
  subtotal decimal(10,2) NOT NULL DEFAULT 0,
  shipping_cost decimal(10,2) NOT NULL DEFAULT 0,
  discount decimal(10,2) DEFAULT 0,
  total decimal(10,2) NOT NULL DEFAULT 0,
  status text DEFAULT 'pending',
  payment_status text DEFAULT 'pending',
  payment_method text DEFAULT '',
  tracking_number text DEFAULT '',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Gift Boxes Table
CREATE TABLE IF NOT EXISTS gift_boxes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text DEFAULT '',
  message text DEFAULT '',
  total_price decimal(10,2) DEFAULT 0,
  is_template boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Gift Box Items Table
CREATE TABLE IF NOT EXISTS gift_box_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gift_box_id uuid REFERENCES gift_boxes(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  review text NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  image_url text DEFAULT '',
  is_featured boolean DEFAULT false,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text DEFAULT '',
  category text DEFAULT 'general',
  featured_image text DEFAULT '',
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Newsletter Subscriptions Table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  subscribed_at timestamptz DEFAULT now()
);

-- FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'general',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_box_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read access for catalog content
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (is_available = true);

CREATE POLICY "Anyone can view product images"
  ON product_images FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Anyone can view FAQs"
  ON faqs FOR SELECT
  USING (true);

-- Newsletter subscription: public insert
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions FOR INSERT
  WITH CHECK (true);

-- Orders: public insert for placing orders
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- Gift boxes: public insert and read for custom boxes
CREATE POLICY "Anyone can create gift boxes"
  ON gift_boxes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view gift box templates"
  ON gift_boxes FOR SELECT
  USING (is_template = true);

CREATE POLICY "Anyone can create gift box items"
  ON gift_box_items FOR INSERT
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);