import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for now
      const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
      
      if (subscriptions.includes(email)) {
        setMessage('This email is already subscribed.');
      } else {
        subscriptions.push(email);
        localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));
        setMessage('Thank you for subscribing!');
        setEmail('');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-amber-50 to-orange-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-orange-800 mb-4">
              Sri Telangana Pindivantalu
            </h3>
            <p className="text-gray-700 mb-4">
              Authentic flavors of Telangana, crafted with tradition and love.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-800 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-orange-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Blog & Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/gift-boxes"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Gift Boxes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-orange-800 mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-orange-800 mb-4">
              Stay Connected
            </h4>
            <p className="text-gray-700 mb-4 text-sm">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-4 py-2 rounded-l-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </div>
              {message && (
                <p
                  className={`text-sm ${
                    message.includes('Thank you')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-orange-300 pt-8 text-center text-gray-600 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Sri Telangana Pindivantalu. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
