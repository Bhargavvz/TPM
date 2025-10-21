import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Filter, Star } from 'lucide-react';
import { Product, ProductImage, Category } from '../types/database';
import { products as mockProducts, productImages as mockProductImages, categories as mockCategories, productReviews as mockProductReviews } from '../data/mockData';

export function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<(Product & { images: ProductImage[] })[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    fetchCategories();
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const fetchCategories = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    setCategories(mockCategories);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filteredProducts = [...mockProducts];

      if (selectedCategory) {
        const category = categories.find(c => c.slug === selectedCategory);
        if (category) {
          filteredProducts = filteredProducts.filter(p => p.category_id === category.id);
        }
      }

      // Sort products
      filteredProducts.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'created_at') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        return 0;
      });

      const productsWithImages = filteredProducts.map(product => {
        const images = mockProductImages.filter(img => img.product_id === product.id);
        return { ...product, images };
      });

      setProducts(productsWithImages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop Authentic Telangana Snacks
          </h1>
          <p className="text-xl text-gray-600">
            Handcrafted with love, delivered with care
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                <button
                  className="lg:hidden text-orange-600"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === ''
                          ? 'bg-orange-100 text-orange-800 font-semibold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      All Products
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.slug
                            ? 'bg-orange-100 text-orange-800 font-semibold'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price: Low to High</option>
                    <option value="created_at">Newest First</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 bg-white rounded-xl animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">
                  No products found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                  const primaryImage = product.images.find((img) => img.is_primary) || product.images[0];
                  
                  // Calculate average rating for this product
                  const productReviewsList = mockProductReviews.filter(r => r.product_id === product.id);
                  const avgRating = productReviewsList.length > 0
                    ? productReviewsList.reduce((sum, r) => sum + r.rating, 0) / productReviewsList.length
                    : 0;

                  return (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                    >
                      <div className="aspect-square overflow-hidden bg-gray-100 relative">
                        <img
                          src={primaryImage?.image_url || 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400'}
                          alt={primaryImage?.alt_text || product.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        {product.is_festival_special && (
                          <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Festival Special
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        {product.region && (
                          <div className="flex items-center gap-1 text-sm text-orange-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            {product.region}
                          </div>
                        )}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {product.name}
                        </h3>
                        
                        {/* Rating Display */}
                        {productReviewsList.length > 0 && (
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= Math.round(avgRating)
                                      ? 'fill-orange-500 text-orange-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {avgRating.toFixed(1)} ({productReviewsList.length})
                            </span>
                          </div>
                        )}
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-orange-600">
                            ₹{product.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500">{product.weight}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
