import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Download, Smartphone, QrCode } from 'lucide-react';
import { Order } from '../types/database';

export function OrderConfirmation() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
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

  const handleDownloadPDF = () => {
    if (!order) return;
    
    // Create PDF content
    const pdfContent = `
ORDER CONFIRMATION
Sri Telangana Pindivantalu
www.sritelanganapindivantalu.com

Order Number: ${order.order_number}
Date: ${new Date(order.created_at).toLocaleDateString('en-IN')}
Total: ₹${order.total.toFixed(2)}

CUSTOMER DETAILS
Name: ${order.customer_name}
Email: ${order.customer_email}
Phone: ${order.customer_phone}

BILLING ADDRESS
${order.shipping_address.fullName}
${order.shipping_address.addressLine1}
${order.shipping_address.addressLine2 || ''}
${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.pincode}
Phone: ${order.shipping_address.phone}

SHIPPING ADDRESS
${order.shipping_address.fullName}
${order.shipping_address.addressLine1}
${order.shipping_address.addressLine2 || ''}
${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.pincode}

ORDER DETAILS
${order.items?.map((item: any) => `${item.product_name} × ${item.quantity} - ₹${item.total_price.toFixed(2)}`).join('\n')}

Subtotal: ₹${order.subtotal.toFixed(2)}
Shipping: ${order.shipping_cost === 0 ? 'Free shipping' : `₹${order.shipping_cost.toFixed(2)}`}
Total: ₹${order.total.toFixed(2)}

PAYMENT METHOD
Pay by Advance through UPI

PAYMENT INSTRUCTIONS
1. Pay ₹${order.total.toFixed(2)} to UPI ID: +91 9440233985
2. Take screenshot of payment confirmation
3. Send payment screenshot + this PDF to WhatsApp: +91 9440233985
4. Include Order Number: ${order.order_number} in your message

Thank you for your order!
    `;

    // Create and download text file as PDF alternative
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Order-${order.order_number}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openWhatsApp = () => {
    if (!order) return;
    const message = `Order Payment - Order Number: ${order.order_number}\nTotal Amount: ₹${order.total.toFixed(2)}\n\nI have attached the payment screenshot and order PDF.`;
    window.open(`https://wa.me/919440233985?text=${encodeURIComponent(message)}`, '_blank');
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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Thank you. Your order has been received.
                </h1>
              </div>
            </div>

            {/* Order Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order number:</p>
                <p className="text-xl font-bold text-gray-900">{order.order_number.split('-')[1]}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Date:</p>
                <p className="text-xl font-bold text-gray-900">
                  {new Date(order.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total:</p>
                <p className="text-xl font-bold text-orange-600">₹{order.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment method:</p>
                <p className="text-lg font-semibold text-gray-900">UPI</p>
              </div>
            </div>

            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPDF}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 mb-4"
            >
              <Download className="w-5 h-5" />
              Download Order Details (PDF)
            </button>
          </div>

          {/* Payment Instructions */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <QrCode className="w-7 h-7 text-orange-600" />
              Payment Instructions
            </h2>
            
            <div className="bg-white rounded-lg p-6 mb-6">
              <p className="text-lg font-semibold text-gray-900 mb-4">
                Complete your payment using UPI:
              </p>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  {/* Sample QR Code Placeholder */}
                  <div className="w-48 h-48 bg-gray-100 border-4 border-orange-500 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="w-24 h-24 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">Scan to Pay</p>
                      <p className="text-xs text-gray-500">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className="text-center mt-3 text-sm font-semibold text-gray-700">
                    UPI ID: 9440233985@paytm
                  </p>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Mobile Payment Apps:</h3>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <a
                      href={`upi://pay?pa=9440233985@paytm&pn=Sri Telangana Pindivantalu&am=${order.total}&cu=INR&tn=Order ${order.order_number}`}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-lg font-semibold text-center transition-all flex flex-col items-center gap-1"
                    >
                      <Smartphone className="w-5 h-5" />
                      <span className="text-xs">PhonePe</span>
                    </a>
                    <a
                      href={`gpay://upi/pay?pa=9440233985@paytm&pn=Sri Telangana Pindivantalu&am=${order.total}&cu=INR&tn=Order ${order.order_number}`}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-semibold text-center transition-all flex flex-col items-center gap-1"
                    >
                      <Smartphone className="w-5 h-5" />
                      <span className="text-xs">GPay</span>
                    </a>
                    <a
                      href={`paytmmp://pay?pa=9440233985@paytm&pn=Sri Telangana Pindivantalu&am=${order.total}&cu=INR&tn=Order ${order.order_number}`}
                      className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white py-3 px-4 rounded-lg font-semibold text-center transition-all flex flex-col items-center gap-1"
                    >
                      <Smartphone className="w-5 h-5" />
                      <span className="text-xs">Paytm</span>
                    </a>
                  </div>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                    <p className="font-bold text-gray-900 mb-2">Next Steps:</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      <li>Make payment of ₹{order.total.toFixed(2)}</li>
                      <li>Take screenshot of payment confirmation</li>
                      <li>Download your order PDF (button above)</li>
                      <li>Send both to WhatsApp</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={openWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send Payment Screenshot & PDF to WhatsApp
            </button>
          </div>

          {/* Order Details */}
          {/* Order Details Table */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order details</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 text-gray-700 font-semibold">Product</th>
                    <th className="text-right py-3 text-gray-700 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items && order.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4 text-gray-900">
                        {item.product_name} × {item.quantity}
                      </td>
                      <td className="py-4 text-right font-semibold text-gray-900">
                        ₹{item.total_price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-700 font-medium">Subtotal:</td>
                    <td className="py-3 text-right font-semibold text-gray-900">
                      ₹{order.subtotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-700 font-medium">Shipping:</td>
                    <td className="py-3 text-right font-semibold text-gray-900">
                      {order.shipping_cost === 0 ? 'Free shipping' : `₹${order.shipping_cost.toFixed(2)}`}
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-4 text-lg font-bold text-gray-900">Total:</td>
                    <td className="py-4 text-right text-lg font-bold text-orange-600">
                      ₹{order.total.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-700 font-medium">Payment method:</td>
                    <td className="py-3 text-right font-semibold text-gray-900">
                      Pay by Advance through UPI
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Billing and Shipping Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Billing Address */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing address</h2>
              <div className="space-y-1 text-gray-700">
                <p className="font-semibold text-gray-900">{order.shipping_address.fullName}</p>
                <p>{order.shipping_address.addressLine1}</p>
                {order.shipping_address.addressLine2 && (
                  <p>{order.shipping_address.addressLine2}</p>
                )}
                <p>{order.shipping_address.city} {order.shipping_address.pincode}</p>
                <p>{order.shipping_address.state}</p>
                <p className="pt-2">{order.shipping_address.phone}</p>
                <p className="text-orange-600">{order.customer_email}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping address</h2>
              <div className="space-y-1 text-gray-700">
                <p className="font-semibold text-gray-900">{order.shipping_address.fullName}</p>
                <p>{order.shipping_address.addressLine1}</p>
                {order.shipping_address.addressLine2 && (
                  <p>{order.shipping_address.addressLine2}</p>
                )}
                <p>{order.shipping_address.city} {order.shipping_address.pincode}</p>
                <p>{order.shipping_address.state}</p>
                <p className="pt-2">{order.shipping_address.phone}</p>
              </div>
            </div>
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
                <p className="mt-2">
                  {order.shipping_address.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
