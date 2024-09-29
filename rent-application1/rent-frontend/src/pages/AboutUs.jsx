import React from 'react';

function AboutUs() {
  return (
    <div className="bg-white min-h-screen font-serif text-gray-800">
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-slate-950 to-blue-950 shadow-md py-24 text-white">
        <h1 className="mt-12 mb-4 font-bold text-5xl text-center">About Us</h1>
        <p className="px-6 md:px-32 max-w-3xl text-center text-xl">
          We are dedicated to providing the best car rental experience. Learn more about our mission and vision.
        </p>
      </div>

      {/* Mission and Vision Section */}
      <div className="space-y-12 mx-auto px-4 md:px-8 py-16 max-w-5xl">
        <div className="bg-gray-50 shadow-lg p-6 md:p-8 rounded-lg">
          <h2 className="mb-4 font-bold text-3xl text-gray-900">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to make car rentals easy, affordable, and accessible to everyone. We strive to provide excellent customer service and a wide selection of vehicles to suit all needs and preferences.
          </p>
        </div>
        
        <div className="bg-gray-50 shadow-lg p-6 md:p-8 rounded-lg">
          <h2 className="mb-4 font-bold text-3xl text-gray-900">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We envision a world where renting a car is as simple as booking a hotel room. Our goal is to be the leading car rental company, recognized for our commitment to customer satisfaction and quality service.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mx-auto px-4 md:px-8 py-16 max-w-5xl">
        <div className="bg-gray-50 shadow-lg p-6 md:p-8 rounded-lg">
          <h2 className="mb-4 font-bold text-3xl text-gray-900">Contact Us</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Have questions or need more information? Feel free to reach out to us through our <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">contact page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
