import { FileText } from 'lucide-react';

export function Terms() {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <FileText className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-gray-600">
              Please read these terms carefully before using our services
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 space-y-8">
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                By accessing <strong>www.sritelanganapindivantalu.com</strong>, users accept the following terms:
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Usage</h2>
              <p className="text-gray-700 leading-relaxed">
                Content is available for personal use only; commercial use or reproduction is strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed">
                Users must not engage in activities that may harm, disrupt, or misuse the site and its resources.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                Intellectual property rights are enforced; images, text, logos, and related material may not be modified or redistributed.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                The website reserves the right to update terms, discontinue services, or change features without prior notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All transactions, queries, and communications are governed by the laws of Telangana and applicable Indian regulations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Any disputes will be subject to the jurisdiction of courts in Telangana, India.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 mb-2">Important Notice</h3>
              <p className="text-gray-700 text-sm">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
              </p>
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
