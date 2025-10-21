import { RefreshCw, Clock, Camera, CreditCard } from 'lucide-react';

export function Returns() {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <RefreshCw className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Refund Policy
            </h1>
            <p className="text-gray-600">
              Your satisfaction is our priority
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 space-y-8">
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Refunds are available in accordance with the following guidelines:
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Important Notice</h3>
                  <p className="text-gray-700">
                    Due to the <strong>perishable nature</strong> of our food products, returns and refunds are accepted strictly <strong>within 24 hours</strong> of delivery under specific conditions.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligible for Refund</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Refunds or replacements will be provided only if the product received is:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Damaged or spoiled</li>
                <li>Incorrect item delivered</li>
                <li>Missing items compared to the order placed</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Report Within 24 Hours</h3>
                    <p className="text-gray-700">
                      Requests must be initiated within 24 hours of receiving the delivery
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Provide Photo Evidence
                    </h3>
                    <p className="text-gray-700">
                      Submit clear photos of the product and valid proof of purchase through our support channels
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Product Condition</h3>
                    <p className="text-gray-700">
                      Items must be unused, unopened, and in their original packaging when applicable
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Eligible for Refund</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The following are <strong>NOT</strong> eligible for return or refund:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Perishable and opened food products</li>
                <li>Requests made after 24 hours of delivery</li>
                <li>Products damaged due to customer mishandling</li>
                <li>Change of mind or preference</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Exceptions apply only in cases of proven delivery error or product damage attributable to our service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-7 h-7" />
                Refund Processing
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Approved refunds will be processed using the original payment method or as store credit, based on customer preference.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Shipping charges are non-refundable</strong> except for genuine product issues attributable to our service.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-3">
                For any concerns, contact our support within 24 hours of order receipt:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>📞 Phone: <a href="tel:+919440233985" className="text-orange-600 hover:text-orange-700 font-medium">+91 9440233985</a></p>
                <p>📧 Email: <a href="mailto:info@sritelanganapindivantalu.com" className="text-orange-600 hover:text-orange-700 font-medium">info@sritelanganapindivantalu.com</a></p>
                <p>💬 WhatsApp: <a href="https://wa.me/919440233985" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 font-medium">+91 9440233985</a></p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
