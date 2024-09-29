import React, { useEffect, useState } from 'react';
import { getAllBookings } from '../services/bookingService'; 
import Booking from '../pages/Booking'; // Ensure the path is correct
import LoadingSpinner from '../components/LoadingSpinner';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getAllBookings();
        console.log('Bookings fetched:', response); // Check the structure of the response here
        setBookings(Array.isArray(response) ? response : []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = (id) => {
    // Remove the canceled booking from state
    setBookings((prevBookings) => prevBookings.filter(booking => booking.id !== id));
  };

  return (
    <div className="bg-indigo-50 p-8 min-h-screen">
      <h2 className="mb-6 pt-20 font-bold font-serif text-3xl text-gray-800 text-left">Your Bookings:</h2>
      {loading ? (
        <LoadingSpinner />
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No bookings found.</p>
      ) : (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <Booking key={booking.id} booking={booking} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingList;
