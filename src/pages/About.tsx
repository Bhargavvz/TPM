import { Heart, Award, Users, MapPin } from 'lucide-react';

export function About() {
  return (
    <div className="pt-24 pb-16">
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/4577822/pexels-photo-4577822.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Preserving the authentic flavors of Telangana, one snack at a time
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto mb-16">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Sri Telangana Pindivantalu was born from a deep love for the rich culinary heritage of Telangana. Our journey began with a simple mission: to share the authentic, handcrafted flavors that have been passed down through generations with food lovers across India and beyond.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Every snack we create tells a story. From the crispy murukulu enjoyed during festivals to the savory sakinalu that grace celebration tables, each product is a celebration of Telangana's vibrant culture and time-honored traditions.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              We work closely with local artisans and families who have perfected these recipes over decades. By using traditional methods and the finest ingredients, we ensure that every bite delivers an authentic taste of Telangana's culinary soul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 shadow-md">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To preserve and celebrate Telangana's rich culinary heritage by bringing authentic, handcrafted snacks to food lovers everywhere, while supporting local artisans and traditional methods.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8 shadow-md">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h3>
              <p className="text-gray-700 leading-relaxed">
                We are committed to quality, authenticity, and sustainability. Every product is made with care, using traditional recipes and the finest ingredients, ensuring you receive nothing but the best.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-orange-900 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Authentic Heritage</h3>
              <p className="text-orange-100 leading-relaxed">
                Every recipe is rooted in Telangana's rich culinary traditions, prepared using methods passed down through generations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Made with Love</h3>
              <p className="text-orange-100 leading-relaxed">
                Each batch is handcrafted with care and attention to detail, ensuring the highest quality and authentic taste.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Supporting Local</h3>
              <p className="text-orange-100 leading-relaxed">
                We work directly with local artisans and families, supporting traditional crafts and keeping cultural heritage alive.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
            Our Process
          </h2>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto md:mx-0">
                  1
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Sourcing Premium Ingredients
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We carefully select the finest local ingredients, ensuring quality and authenticity in every batch. From premium rice flour to aromatic spices, every ingredient is chosen with care.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 md:order-2">
                <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto md:mx-0">
                  2
                </div>
              </div>
              <div className="md:w-2/3 md:order-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Traditional Preparation
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our artisans use time-honored techniques passed down through generations. Each snack is handcrafted with patience and skill, preserving the authentic methods that make these treats special.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto md:mx-0">
                  3
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Quality Assurance
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Every batch undergoes rigorous quality checks to ensure it meets our high standards. We taste-test every product to guarantee authentic flavor and perfect texture.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 md:order-2">
                <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto md:mx-0">
                  4
                </div>
              </div>
              <div className="md:w-2/3 md:order-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Careful Packaging & Delivery
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We package each order with care to preserve freshness and ensure your snacks arrive in perfect condition. Fast and reliable delivery brings Telangana's flavors straight to your door.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
