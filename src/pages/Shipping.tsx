import { Truck, Clock, Package, AlertCircle } from 'lucide-react';

export function Shipping() {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <Truck className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shipping & Delivery Policy
            </h1>
            <p className="text-gray-600">
              Fast and reliable delivery of authentic Telangana products
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 space-y-8">
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Shipping and delivery for Telangana foods/products will follow these principles:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-8 h-8 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Processing Time</h3>
                </div>
                <p className="text-gray-700">
                  Orders are dispatched within <strong>12–48 hours</strong>, excluding holidays
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-8 h-8 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Safe Packaging</h3>
                </div>
                <p className="text-gray-700">
                  Products are packaged to ensure quality and freshness
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Local Delivery</h2>
              <p className="text-gray-700 leading-relaxed">
                Orders within <strong>Hyderabad and Telangana</strong> are dispatched via reputed courier or local delivery partners within 12–48 hours, excluding holidays.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Charges</h2>
              <p className="text-gray-700 leading-relaxed">
                Standard delivery charges apply and are disclosed at checkout. Users should specify any allergies or special requirements at the time of order.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Shipping</h2>
              <p className="text-gray-700 leading-relaxed">
                For items shipped <strong>outside Telangana or to overseas locations</strong> (especially USA, UK, and Australia), additional requirements (local contacts, ID, address confirmation) may apply with fool-proofed packaging.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Timeline</h2>
              <p className="text-gray-700 leading-relaxed">
                Delivery timings depend on factors like weather, transit delays, and recipient availability. Standard delivery typically takes 3-5 business days within India.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Damaged or Incorrect Deliveries</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Damaged or incorrect deliveries should be reported <strong>within 12 hours</strong> with photo evidence for assistance.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                The company is not liable for courier-related delays or recipient-related issues.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              For shipping inquiries, contact us at <a href="tel:+919440233985" className="text-orange-600 hover:text-orange-700 font-medium">+91 9440233985</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
