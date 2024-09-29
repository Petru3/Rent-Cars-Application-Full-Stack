import React from 'react';
import { Link } from 'react-router-dom';

function Success() {
  return (
    <div className="flex flex-col justify-center items-center bg-indigo-50 p-6 min-h-screen">
      <h1 className="mb-4 font-extrabold text-5xl text-center text-green-600 md:text-6xl">
        Congratulations!
      </h1>
      <p className="mb-6 text-center text-gray-700 text-lg md:text-xl">
        Your booking has been completed successfully! 🎉
      </p>
      <Link 
        to="/booking"
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded font-semibold text-lg text-white md:text-xl transition duration-200"
      >
        View Your Bookings
      </Link>
    </div>
  );
}

export default Success;
