import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { productImages as mockProductImages } from '../data/mockData';

export function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Save your favorite products to buy them later
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            You have {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            const primaryImage = mockProductImages.find(
              (img) => img.product_id === product.id && img.is_primary
            ) || mockProductImages.find((img) => img.product_id === product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <Link to={`/product/${product.slug}`} className="block">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={primaryImage?.image_url || 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={primaryImage?.alt_text || product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-orange-600">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">{product.weight}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition-all"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-lg"
          >
            Continue Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
