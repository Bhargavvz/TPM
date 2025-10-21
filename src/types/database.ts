export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  description: string;
  story: string;
  region: string;
  price: number;
  weight: string;
  ingredients: string;
  shelf_life: string;
  storage_instructions: string;
  serving_suggestions: string;
  is_featured: boolean;
  is_festival_special: boolean;
  festival_name: string;
  is_available: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface ProductWithImages extends Product {
  images: ProductImage[];
  category?: Category;
}

export interface CartItem {
  product: Product;
  quantity: number;
  image?: ProductImage;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: ShippingAddress;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total: number;
  status: string;
  payment_status: string;
  payment_method: string;
  tracking_number: string;
  notes: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  featured_image: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  review: string;
  product_id: string | null;
  image_url: string;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface ProductReview {
  id: string;
  product_id: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  rating: number;
  title: string;
  review: string;
  images?: string[];
  is_verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  created_at: string;
}
