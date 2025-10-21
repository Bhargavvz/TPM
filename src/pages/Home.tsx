import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift, MapPin, Star } from 'lucide-react';
import { Product, ProductImage, Category, Testimonial } from '../types/database';
import { products as mockProducts, productImages as mockProductImages, categories as mockCategories, testimonials as mockTestimonials } from '../data/mockData';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<(Product & { images: ProductImage[], category?: Category })[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const featuredProds = mockProducts.filter(p => p.is_featured).slice(0, 6);
      const productsWithImages = featuredProds.map(product => {
        const images = mockProductImages.filter(img => img.product_id === product.id);
        const category = mockCategories.find(c => c.id === product.category_id);
        return {
          ...product,
          images,
          category
        };
      });

      setFeaturedProducts(productsWithImages);
      setCategories(mockCategories);
      setTestimonials(mockTestimonials.filter(t => t.is_featured).slice(0, 6));
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://content.jdmagicbox.com/v2/comp/hyderabad/f2/040pxx40.xx40.140222195823.b8f2/catalogue/swagruha-food-and-pindi-vantalu-kachiguda-hyderabad-sweet-shops-7kwno38u1c.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Authentic Flavors of Telangana
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Straight from the Heart
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all border border-white/30"
            >
              Our Story
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Discover the rich heritage of Telangana cuisine
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/shop?category=${category.slug}`}
                  className="group relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${category.image_url})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-200 mb-4">{category.description}</p>
                    <span className="inline-flex items-center gap-2 text-orange-400 font-semibold group-hover:gap-4 transition-all">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked favorites loved by our customers
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => {
                const primaryImage = product.images.find((img) => img.is_primary) || product.images[0];

                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={primaryImage?.image_url || 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400'}
                        alt={primaryImage?.alt_text || product.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
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

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Gift className="w-16 h-16 text-orange-600 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Create Your Custom Gift Box
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Share the taste of Telangana with your loved ones. Build a personalized gift box with your favorite snacks and add a special message.
            </p>
            <Link
              to="/gift-boxes"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            >
              Build Your Gift Box <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600">
                Real experiences from real food lovers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-md"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? 'text-orange-500 fill-orange-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                  <p className="font-semibold text-gray-900">
                    - {testimonial.customer_name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-b from-orange-900 to-orange-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience Telangana Heritage
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Every snack tells a story. Every bite celebrates tradition. Discover the authentic flavors that have been passed down through generations.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white text-orange-900 hover:bg-orange-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              Learn Our Story <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
