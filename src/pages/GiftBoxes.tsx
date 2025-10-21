import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products as mockProducts } from '../data/mockData';

export function GiftBoxes() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [message, setMessage] = useState('');

  const availableProducts = [
    { id: 1, name: 'Chagodi', price: 500, image: 'https://us2guntur.com/images//10064img/Chagodi_B_191115.jpg' },
    { id: 2, name: 'Chuduva', price: 500, image: 'https://pushmycart.com/cdn/shop/products/5dce32705968462a48b5523b_1200x1200.jpg?v=1742301446' },
    { id: 3, name: 'Garjalu', price: 650, image: 'https://i0.wp.com/ahahomefoods.com/wp-content/uploads/2023/02/Garijelu-Coconut-and-Sugar.jpg?fit=600%2C600&ssl=1' },
    { id: 4, name: 'Gavvalu Bellam', price: 400, image: 'https://dpfoods.in/wp-content/uploads/2025/03/bellam-gavvalu.png' },
    { id: 5, name: 'Kara Billalu-Pappu', price: 250, image: 'https://www.telanganapindivantalu.in/wp-content/uploads/2019/12/Karabilallu-pappu.jpg' },
    { id: 6, name: 'Karabillalu-Palli', price: 250, image: 'https://www.telanganapindivantalu.in/wp-content/uploads/2019/12/Karabilalu-palli.jpg' },
    { id: 7, name: 'Karam Sakinalu', price: 270, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZxEI0pwvZlKJ23R00By1EciB2a4fJbZjLPw&s' },
    { id: 8, name: 'Khara Boondi', price: 250, image: 'https://m.media-amazon.com/images/I/616OYKFACdL._UF1000,1000_QL80_.jpg' },
    { id: 9, name: 'Laddu', price: 325, image: 'https://vismaifood.com/storage/app/uploads/public/40c/1e6/695/thumb__700_0_0_0_auto.jpg' },
    { id: 10, name: 'Murukulu/Madugulu', price: 500, image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/10/murukku-recipe.webp' },
    { id: 11, name: 'Mysorepak', price: 650, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyO9zvxoG32lXpJ7GyDp5ka4swt_NZcvHMbw&s' },
    { id: 12, name: 'Pachi Mirchi Chakkalu', price: 270, image: 'https://www.telanganapindivantalu.in/wp-content/uploads/2021/01/pachi-mirchi-chakkalu.jpeg' }
  ];

  const toggleProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else if (selectedProducts.length < 5) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, id) => {
      const product = availableProducts.find(p => p.id === id);
      return total + (product?.price || 0);
    }, 0);
  };

  const handleAddToCart = () => {
    if (selectedProducts.length < 3) {
      alert('Please select at least 3 products to create your gift box');
      return;
    }

    // Add each selected product to cart
    selectedProducts.forEach(productId => {
      const product = availableProducts.find(p => p.id === productId);
      if (product) {
        // Find the actual product from mock data by name
        const actualProduct = mockProducts.find(p => p.name === product.name);
        if (actualProduct) {
          addToCart(actualProduct, 1);
        }
      }
    });

    // Save gift box message to localStorage if provided
    if (message.trim()) {
      const giftBoxData = {
        products: selectedProducts.map(id => {
          const product = availableProducts.find(p => p.id === id);
          return product?.name;
        }),
        message: message,
        createdAt: new Date().toISOString()
      };
      
      const existingGiftBoxes = JSON.parse(localStorage.getItem('gift_boxes') || '[]');
      existingGiftBoxes.push(giftBoxData);
      localStorage.setItem('gift_boxes', JSON.stringify(existingGiftBoxes));
    }

    alert(`Gift box added to cart! ${selectedProducts.length} items have been added.`);
    
    // Reset selections
    setSelectedProducts([]);
    setMessage('');
    
    // Navigate to cart
    navigate('/cart');
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
            <Gift className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create Your Custom Gift Box
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share the authentic flavors of Telangana with your loved ones. Build a personalized gift box by selecting 3-5 of your favorite snacks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Select Your Snacks
                </h2>
                <span className="text-sm text-gray-600">
                  {selectedProducts.length} of 5 selected
                </span>
              </div>
            
              <p className="text-gray-600 mb-4">
                Choose 3-5 products from our authentic Telangana collection to create your perfect gift box.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableProducts.map((product) => {
                  const isSelected = selectedProducts.includes(product.id);
                  const canSelect = selectedProducts.length < 5 || isSelected;

                  return (
                    <button
                      key={product.id}
                      onClick={() => canSelect && toggleProduct(product.id)}
                      disabled={!canSelect}
                      className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-orange-600 bg-orange-50'
                          : canSelect
                          ? 'border-gray-200 hover:border-orange-300 bg-white'
                          : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-orange-600 font-bold">
                            ₹{product.price}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Add a Personal Message
              </h2>
              <p className="text-gray-600 mb-4">
                Make your gift extra special with a personalized message
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={4}
                maxLength={200}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                {message.length}/200 characters
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Gift Box
              </h2>

              {selectedProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Gift className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Select 3-5 products to create your gift box</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {selectedProducts.map((productId) => {
                      const product = availableProducts.find(p => p.id === productId);
                      if (!product) return null;

                      return (
                        <div
                          key={productId}
                          className="flex items-center justify-between py-2"
                        >
                          <span className="text-gray-900">{product.name}</span>
                          <span className="font-semibold text-orange-600">
                            ₹{product.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total</span>
                      <span className="text-orange-600">₹{calculateTotal()}</span>
                    </div>
                  </div>

                  {selectedProducts.length < 3 && (
                    <p className="text-amber-600 text-sm mb-4 p-3 bg-amber-50 rounded-lg">
                      Please select at least 3 products to create your gift box
                    </p>
                  )}

                  <button
                    onClick={handleAddToCart}
                    disabled={selectedProducts.length < 3}
                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 mb-3"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>

                  <p className="text-sm text-gray-600 text-center">
                    Gift wrapping included
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perfect for Every Occasion
            </h2>
            <p className="text-gray-700 mb-8">
              Whether it is Diwali, Sankranti, or a special celebration, our gift boxes bring the authentic taste of Telangana to your loved ones.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Made with Love</h3>
                <p className="text-gray-600 text-sm">Handcrafted snacks prepared with care</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Beautiful Packaging</h3>
                <p className="text-gray-600 text-sm">Premium gift boxes that impress</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">Delivered fresh to your doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
