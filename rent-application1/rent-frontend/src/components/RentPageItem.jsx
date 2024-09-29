import React, { useState, useEffect } from 'react';
import { createBooking } from '../services/bookingService';
import {jwtDecode} from 'jwt-decode';

function RentPageItem({ rent }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Fetch token from local storage
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decode the token to extract user information
        const decodedToken = jwtDecode(token);

        // Check if the user is the owner (assuming the role or ownership is in decodedToken)
        setIsOwner(decodedToken.role === 'OWNER'); // Adjust according to your JWT structure
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const handleRentNow = async () => {
    try {
      await createBooking(rent.id);
      setModalMessage('Your booking was successful! 🎉');
      setShowModal(true);
    } catch (error) {
      // Extract the error message from the response
      const message = error.response?.data?.message || 'An error occurred while trying to book. Please try again.';
      
      // Check if the error indicates a duplicate booking
      if (message.includes('duplicate') || message.includes('already have a booking')) {
        setModalMessage('You already have a booking for this vehicle on this date. Please check your bookings.');
      } else {
        setModalMessage(message);
      }
      
      setShowModal(true);
    }
  };

  const isAvailable = rent.status === 'AVAILABLE';

  return (
    <div className="gap-8 grid grid-cols-1 md:grid-cols-2 pt-14">
      <div className="flex flex-col justify-center border-gray-100 bg-white shadow-lg p-6 border rounded-lg transform transition-transform hover:scale-105">
        <h1 className="mb-4 font-extrabold text-3xl text-indigo-600 text-left md:text-4xl">
          {rent.make} ({rent.year})
        </h1>
        <p className="mb-4 font-medium text-gray-600 text-left text-xl">
          Licence Plate: <span className="font-semibold">{rent.licencePlate}</span>
        </p>
        <p className="mb-6 text-base text-gray-700 leading-relaxed">
          {rent.description}
        </p>
        <div className="mb-4">
          <span
            className={`font-semibold text-lg ${isAvailable ? 'text-green-600' : 'text-red-600'}`}
          >
            {isAvailable ? 'Available' : 'Rented'}
          </span>
        </div>
        <div className="flex justify-between items-center border-gray-200 pt-4 border-t">
          <span className="font-semibold text-2xl text-green-600">
            ${rent.rentalPrice}
          </span>

          {/* Only show the button if the user is NOT the owner and the rent is available */}
          {!isOwner && isAvailable ? (
            <button
              onClick={handleRentNow}
              className="flex items-center bg-gradient-to-r from-blue-500 hover:from-blue-600 to-indigo-500 hover:to-indigo-600 shadow-md hover:shadow-lg px-6 py-3 rounded-full font-semibold text-lg text-white transform transition duration-300 ease-in-out hover:scale-110"
            >
              Add to Bookings
              <svg
                className="-mr-1 ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ) : (
            isOwner && <p className="text-gray-500">Owners cannot book vehicles!</p>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center bg-gradient-to-b from-gray-200 to-white shadow-lg p-6 rounded-lg">
        <img
          src={rent.imageRent}
          alt={rent.make}
          className="shadow-md rounded-lg w-full h-auto max-h-[400px] object-cover"
        />
      </div>

      {/* Modal for success or error message */}
      {showModal && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-11/12 max-w-md text-center">
            <h2 className="mb-4 font-bold text-3xl">
              {modalMessage.includes('successful') ? 'Congratulations!' : 'Error'}
            </h2>
            <p className="mb-6">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentPageItem;
