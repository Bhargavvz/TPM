import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-gradient-to-b from-black/30 to-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className={`text-2xl font-bold transition-colors ${
              isScrolled ? 'text-orange-600' : 'text-white drop-shadow-lg'
            }`}
          >
            Sri Telangana Pindivantalu
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/shop"
              className={`transition-colors hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className={`transition-colors hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Our Story
            </Link>
            <Link
              to="/gift-boxes"
              className={`transition-colors hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Gift Boxes
            </Link>
            <Link
              to="/blog"
              className={`transition-colors hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className={`transition-colors hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className={`transition-colors hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/cart"
              className={`relative transition-colors hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              className={`md:hidden transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 bg-white rounded-lg shadow-lg p-4">
            <Link
              to="/shop"
              className="block text-gray-700 hover:text-orange-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-orange-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              to="/gift-boxes"
              className="block text-gray-700 hover:text-orange-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Gift Boxes
            </Link>
            <Link
              to="/blog"
              className="block text-gray-700 hover:text-orange-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-orange-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
