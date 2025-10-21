import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ as FAQType } from '../types/database';
import { faqs as mockFaqs } from '../data/mockData';

export function FAQ() {
  const [faqs, setFaqs] = useState<FAQType[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchFAQs();
  }, [selectedCategory]);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      let filteredFaqs = [...mockFaqs, ...defaultFAQs];

      if (selectedCategory !== 'all') {
        filteredFaqs = filteredFaqs.filter(f => f.category === selectedCategory);
      }

      filteredFaqs.sort((a, b) => a.display_order - b.display_order);
      setFaqs(filteredFaqs);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = [
    { value: 'all', label: 'All Questions' },
    { value: 'general', label: 'General' },
    { value: 'products', label: 'Products' },
    { value: 'shipping', label: 'Shipping' },
    { value: 'returns', label: 'Returns' }
  ];

  const defaultFAQs: FAQType[] = [
    {
      id: '1',
      question: 'What products do you offer?',
      answer: 'We offer a wide range of authentic Telangana snacks, sweets, and veg pickles including Murukulu, Sakinalu, Chegodilu, Garelu, and many more traditional favorites.',
      category: 'products',
      display_order: 1,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      question: 'How long do the snacks stay fresh?',
      answer: 'Our snacks typically stay fresh for 2-3 weeks from the date of manufacture when stored in an airtight container in a cool, dry place. Specific shelf life is mentioned on each product page.',
      category: 'products',
      display_order: 2,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      question: 'Do you ship across India?',
      answer: 'Yes, we ship to all major cities across India. Delivery typically takes 3-5 business days depending on your location.',
      category: 'shipping',
      display_order: 3,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      question: 'What are the shipping charges?',
      answer: 'We charge a flat shipping fee of ₹50 for orders across India. Free shipping is available on orders above ₹1000.',
      category: 'shipping',
      display_order: 4,
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      question: 'Can I return or exchange products?',
      answer: 'Due to the nature of food products, we do not accept returns or exchanges unless the product is damaged or defective upon arrival. Please contact us within 24 hours of delivery for such cases.',
      category: 'returns',
      display_order: 5,
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      question: 'How do I create a custom gift box?',
      answer: 'Visit our Gift Boxes page and select 3-5 of your favorite snacks. You can also add a personalized message. We will beautifully package your selection with gift wrapping included.',
      category: 'general',
      display_order: 6,
      created_at: new Date().toISOString()
    },
    {
      id: '7',
      question: 'Are your products vegetarian?',
      answer: 'Yes, all our products are 100% vegetarian and made using traditional recipes with authentic ingredients.',
      category: 'products',
      display_order: 7,
      created_at: new Date().toISOString()
    },
    {
      id: '8',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets like PayTM and PhonePe.',
      category: 'general',
      display_order: 8,
      created_at: new Date().toISOString()
    }
  ];

  const displayFAQs = faqs.length > 0 ? faqs : defaultFAQs;
  const filteredFAQs = selectedCategory === 'all'
    ? displayFAQs
    : displayFAQs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
            <HelpCircle className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our products and services
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === category.value
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-20 bg-white rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                No FAQs available in this category yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-orange-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {openIndex === index && (
                    <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-700 mb-6">
            Cannot find the answer you are looking for? Our friendly customer support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
