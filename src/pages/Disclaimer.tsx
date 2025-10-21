import { AlertTriangle, Shield, ExternalLink, Copyright } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <Shield className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Disclaimer
            </h1>
            <p className="text-gray-600">
              Important information about using our website
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 space-y-8">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">General Information</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The information presented on <strong>www.sritelanganapindivantalu.com</strong> is intended for general informational purposes about traditional Telangana food, products, and related services.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Guarantees</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While every effort is made to ensure the accuracy and reliability of content, we cannot guarantee its completeness, timeliness, or suitability for any purpose.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The website content does not constitute official advice nor assures legal, financial, or medical accuracy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ExternalLink className="w-7 h-7" />
                External Links
              </h2>
              <p className="text-gray-700 leading-relaxed">
                External links, if present, are outside our control and responsibility. We do not endorse or take responsibility for the content, accuracy, or practices of external websites.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use at Your Own Discretion</h2>
              <p className="text-gray-700 leading-relaxed">
                Users are advised to use the information at their own discretion. We recommend verifying any information that is critical to your decisions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Copyright className="w-7 h-7" />
                Copyright Protection
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The content is subject to copyright; unauthorized usage and reproduction are strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">"As Is" Provision</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The site is provided <strong>"as is"</strong>, with no warranties, express or implied.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Access may at times be limited due to technical or external factors. We do not guarantee uninterrupted or error-free access to the website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the website or reliance on its content.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-700 mb-3">
                If you have questions about this disclaimer, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>📞 Phone: <a href="tel:+919440233985" className="text-orange-600 hover:text-orange-700 font-medium">+91 9440233985</a></p>
                <p>📧 Email: <a href="mailto:info@sritelanganapindivantalu.com" className="text-orange-600 hover:text-orange-700 font-medium">info@sritelanganapindivantalu.com</a></p>
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
