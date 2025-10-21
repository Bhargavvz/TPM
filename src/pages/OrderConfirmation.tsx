import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Mail, Phone, Star } from 'lucide-react';
import { Order } from '../types/database';

export function OrderConfirmation() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      fetchOrder();
    }
  }, [orderNumber]);

  const fetchOrder = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find((o: Order) => o.order_number === orderNumber);
      
      if (foundOrder) setOrder(foundOrder);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order not found</h1>
          <Link to="/shop" className="text-orange-600 hover:text-orange-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Thank you for your order, {order.customer_name}!
            </p>

            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-orange-600">{order.order_number}</p>
            </div>

            <p className="text-gray-700">
              A confirmation email has been sent to <strong>{order.customer_email}</strong>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-orange-600" />
              Order Details
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">₹{order.shipping_cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 text-xl font-bold">
                <span>Total</span>
                <span className="text-orange-600">₹{order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
              <div className="text-gray-700">
                <p>{order.shipping_address.fullName}</p>
                <p>{order.shipping_address.addressLine1}</p>
                {order.shipping_address.addressLine2 && (
                  <p>{order.shipping_address.addressLine2}</p>
                )}
                <p>
                  {order.shipping_address.city}, {order.shipping_address.state}{' '}
                  {order.shipping_address.pincode}
                </p>
                <p className="mt-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {order.shipping_address.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Next?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  1
                </div>
                <p>We'll process your order and prepare it for shipment.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  2
                </div>
                <p>You'll receive an email with tracking information once your order ships.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  3
                </div>
                <p>Your delicious Telangana snacks will arrive at your doorstep!</p>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about your order, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Review Products Section */}
          {order && order.items && order.items.length > 0 && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg p-8 mt-8">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-8 h-8 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Share Your Experience</h2>
              </div>
              <p className="text-gray-700 mb-6">
                We'd love to hear your feedback! Click on any product below to write a review.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.items.map((item: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => navigate(`/product/${item.product_id}#reviews`)}
                    className="bg-white hover:bg-orange-50 border-2 border-orange-200 hover:border-orange-400 rounded-lg p-4 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {item.product_name}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-orange-600">
                        <Star className="w-5 h-5" />
                        <span className="text-sm font-medium">Review</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
