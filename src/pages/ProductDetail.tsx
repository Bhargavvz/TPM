import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Package, Clock, ShoppingCart, Star, Heart, Edit } from 'lucide-react';
import { Product, ProductImage, ProductReview } from '../types/database';
import { useCart } from '../context/CartContext';
import { products as mockProducts, productImages as mockProductImages, productReviews as mockProductReviews } from '../data/mockData';
import { ReviewForm } from '../components/ReviewForm';
import { ReviewsList, ReviewsSummary } from '../components/ReviewsList';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchProduct();
      fetchReviews();
    }
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const productData = mockProducts.find(p => p.slug === slug);

      if (productData) {
        setProduct(productData);
        const imagesData = mockProductImages.filter(img => img.product_id === productData.id);
        
        if (imagesData && imagesData.length > 0) {
          setImages(imagesData);
          setSelectedImage(imagesData.find(img => img.is_primary) || imagesData[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Get reviews from localStorage and mock data
      const storedReviews = JSON.parse(localStorage.getItem('product_reviews') || '[]');
      const productData = mockProducts.find(p => p.slug === slug);
      
      if (productData) {
        const productReviews = [
          ...mockProductReviews.filter(r => r.product_id === productData.id),
          ...storedReviews.filter((r: ProductReview) => r.product_id === productData.id)
        ];
        
        setReviews(productReviews);
        setTotalReviews(productReviews.length);
        
        if (productReviews.length > 0) {
          const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
          setAverageRating(avg);
        }
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedImage || undefined);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleSubmitReview = (reviewData: {
    rating: number;
    title: string;
    review: string;
    customerName: string;
    customerEmail: string;
  }) => {
    if (!product) return;

    const newReview: ProductReview = {
      id: `rev-${Date.now()}`,
      product_id: product.id,
      order_id: 'manual-review',
      customer_name: reviewData.customerName,
      customer_email: reviewData.customerEmail,
      rating: reviewData.rating,
      title: reviewData.title,
      review: reviewData.review,
      is_verified_purchase: false,
      helpful_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const storedReviews = JSON.parse(localStorage.getItem('product_reviews') || '[]');
    storedReviews.push(newReview);
    localStorage.setItem('product_reviews', JSON.stringify(storedReviews));

    fetchReviews();
  };

  const handleHelpful = (reviewId: string) => {
    const helpfulReviews = JSON.parse(localStorage.getItem('helpful_reviews') || '[]');
    
    if (helpfulReviews.includes(reviewId)) {
      alert('You have already marked this review as helpful');
      return;
    }

    helpfulReviews.push(reviewId);
    localStorage.setItem('helpful_reviews', JSON.stringify(helpfulReviews));

    setReviews(prevReviews =>
      prevReviews.map(r =>
        r.id === reviewId ? { ...r, helpful_count: r.helpful_count + 1 } : r
      )
    );
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-xl mb-8" />
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link to="/shop" className="text-orange-600 hover:text-orange-700">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <nav className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-orange-600">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-4">
              <img
                src={selectedImage?.image_url || 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt={selectedImage?.alt_text || product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage?.id === image.id
                        ? 'border-orange-600'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={image.alt_text}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            {product.is_festival_special && product.festival_name && (
              <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {product.festival_name} Special
              </div>
            )}

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {totalReviews > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(averageRating)
                          ? 'fill-orange-500 text-orange-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-700 font-medium">
                  {averageRating.toFixed(1)} ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}

            {product.region && (
              <div className="flex items-center gap-2 text-orange-600 mb-4">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">From {product.region}, Telangana</span>
              </div>
            )}

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-orange-600">
                ₹{product.price.toFixed(2)}
              </span>
              <span className="text-gray-600">{product.weight}</span>
            </div>

            <p className="text-gray-700 text-lg mb-6">{product.description}</p>

            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
              <div className="flex items-center justify-between mb-6">
                <label className="font-semibold text-gray-900">Quantity:</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center font-semibold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 mb-3"
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>

              <button className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Add to Wishlist
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Package className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Storage Instructions</h3>
                  <p className="text-gray-600">{product.storage_instructions || 'Store in an airtight container in a cool, dry place.'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Shelf Life</h3>
                  <p className="text-gray-600">{product.shelf_life || '2-3 weeks from date of manufacture'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {product.story && (
          <div className="bg-white rounded-xl p-8 shadow-md mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {product.story}
            </p>
          </div>
        )}

        {product.ingredients && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 shadow-md mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ingredients</h2>
            <p className="text-gray-700 text-lg">{product.ingredients}</p>
          </div>
        )}

        {product.serving_suggestions && (
          <div className="bg-white rounded-xl p-8 shadow-md mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Serving Suggestions</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {product.serving_suggestions}
            </p>
          </div>
        )}

        {/* Reviews Section */}
        <div className="bg-white rounded-xl p-8 shadow-md">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
            <button
              onClick={() => setShowReviewForm(true)}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <Edit className="w-5 h-5" />
              Write a Review
            </button>
          </div>

          {totalReviews > 0 && (
            <ReviewsSummary
              reviews={reviews}
              averageRating={averageRating}
              totalReviews={totalReviews}
            />
          )}

          <ReviewsList reviews={reviews} onHelpful={handleHelpful} />
        </div>

        {/* Review Form Modal */}
        {showReviewForm && product && (
          <ReviewForm
            productId={product.id}
            productName={product.name}
            onClose={() => setShowReviewForm(false)}
            onSubmit={handleSubmitReview}
          />
        )}
      </div>
    </div>
  );
}
