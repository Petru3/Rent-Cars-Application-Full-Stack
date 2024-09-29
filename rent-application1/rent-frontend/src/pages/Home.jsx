import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you import Link from 'react-router-dom'

function Home() {
  
  // Scroll handler function
  const handleScroll = () => {
    window.scrollBy({ top: 600, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white w-full min-h-screen font-serif text-gray-800 overflow-hidden">
      <div className="flex justify-center items-center w-full h-screen text-center">
        <div>
          <h1 className='z-10 mb-6 font-bold text-4xl text-gray-900 sm:text-6xl tracking-wide animate-fade-in'>
            Welcome to AutoRent Express
          </h1>
          <h3 className='mb-6 font-semibold text-2xl text-gray-700 sm:text-3xl animate-fade-in'>
            Rent the Perfect Car for Your Journey
          </h3>
          <p className='mb-12 px-5 sm:px-10 text-gray-600 text-lg sm:text-xl leading-relaxed animate-fade-in'>
            AutoRent Express – Închiriază mașina potrivită pentru orice călătorie, rapid și simplu. 
            De la mașini compacte la SUV-uri de lux, avem tot ce-ți trebuie pentru a te bucura de drum.
          </p>
          
          {/* Scroll button */}
          <div onClick={handleScroll} className="cursor-pointer">
              <p className='mt-32 font-medium text-lg text-slate-950 sm:text-xl'>Scroll Now!</p>
          </div>
        </div>
      </div>
      
      {/* Section to scroll to */}
      <h1 className='my-8 font-semibold font-serif text-4xl text-gray-900 sm:text-5xl' id="services">Services:</h1>

      {/* Grid for 2 columns with super styling */}
      <div className="relative gap-6 md:gap-10 grid grid-cols-1 md:grid-cols-2 mx-auto mt-8 p-6 sm:p-8 w-full max-w-screen-lg">

        {/* Card 1 */}
        <div className="flex flex-col justify-center items-center bg-white shadow-2xl hover:shadow-lg p-6 sm:p-8 rounded-3xl transform duration-500 group hover:scale-105 transition-all">
          <img src='https://images.unsplash.com/photo-1487947366323-374a622aeccf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
            alt="Car" className="group-hover:scale-110 shadow-md mb-6 w-full h-full transition-all duration-500"/>
          <p className="group-hover:text-blue-600 font-semibold text-center text-gray-800 text-lg sm:text-xl transition-colors duration-300">
            Choose from a wide range of cars, from compact vehicles to luxury SUVs.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col justify-center items-center bg-white shadow-2xl hover:shadow-lg p-6 sm:p-8 rounded-3xl transform duration-500 group hover:scale-105 transition-all">
          <img src='https://images.unsplash.com/photo-1657614086961-f91ac1a95131?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
            alt="Car" className="group-hover:scale-110 shadow-md mb-6 w-full h-full transition-all duration-500"/>
          <p className="group-hover:text-blue-600 font-semibold text-center text-gray-800 text-lg sm:text-xl transition-colors duration-300">
            Fast and easy online booking process with no hassles.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col justify-center items-center bg-white shadow-2xl hover:shadow-lg p-6 sm:p-8 rounded-3xl transform duration-500 group hover:scale-105 transition-all">
          <img src='https://images.unsplash.com/photo-1415594445260-63e18261587e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
            alt="Car" className="group-hover:scale-110 shadow-md mb-6 w-full h-full transition-all duration-500"/>
          <ul className="group-hover:text-blue-600 font-semibold text-center text-gray-800 text-lg sm:text-xl transition-colors duration-300 list-disc list-inside">
            <li>Browse our selection of cars.</li>
            <li>Select your dates and book online.</li>
            <li>Pick up your car at the designated location.</li>
          </ul>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col justify-center items-center bg-white shadow-2xl hover:shadow-lg p-6 sm:p-8 rounded-3xl transform duration-500 group hover:scale-105 transition-all">
          <img src='https://plus.unsplash.com/premium_photo-1661293849183-56b763a87b9c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
            alt="Car" className="group-hover:scale-110 shadow-md mb-6 w-full h-full transition-all duration-500"/>
          <ul className="group-hover:text-blue-600 font-semibold text-center text-gray-800 text-lg sm:text-xl transition-colors duration-300 list-disc list-inside">
            <li>24/7 customer support for a smooth rental experience.</li>
            <li>Well-maintained cars and trusted service.</li>
            <li>Easy cancellation and modification of bookings.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Home;
