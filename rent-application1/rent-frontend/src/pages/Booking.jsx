import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { finishBooking, cancelBooking } from '../services/bookingService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '../components/Modal';

function Booking({ booking, onCancel }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFinish = async () => {
    if (!selectedDate || isNaN(selectedDate)) {
      setErrorMessage('Please select a valid date.');
      return;
    }

    try {
      const dateRent = selectedDate;
      await finishBooking(booking.id, { dateRent });
      navigate('/success');
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to finish booking. Please try again later.');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(true);
  };

  const confirmCancel = async () => {
    try {
      await cancelBooking(booking.id);
      onCancel(booking.id); 
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error canceling booking:', error);
      setErrorMessage('Failed to cancel booking. Please try again later.');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col border-gray-200 bg-white shadow-lg hover:shadow-xl p-4 border rounded-lg transform transition-transform duration-300">
      <h2 className="font-semibold text-gray-800 text-xl">{booking.make} ({booking.year})</h2>
      <p className="text-gray-600">Licence Plate: <span className="font-medium">{booking.licencePlate}</span></p>
      <p className="text-gray-600">Rental Price: <span className="font-medium">${booking.rentalPrice}</span></p>
      
      {/* Display booking status */}
      <p className={`text-gray-600 ${booking.status === 'rented' ? 'text-red-500' : 'text-green-500'}`}>
        Status: <span className="font-medium">{booking.status}</span>
      </p>
      
      <p className="text-gray-600">Date of Rent: <span className="font-medium">{selectedDate.toLocaleDateString()}</span></p>

      {/* Show calendar and button only if status is not "rented" */}
      {booking.status !== 'RENTED' && (
        <>
          <div className="mt-4">
            <label className="block mb-2 text-gray-700">Select Rental Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy/MM/dd"
              className="p-2 border rounded w-full"
              minDate={new Date()} // Ensure user cannot select a past date
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex justify-start gap-4 mt-4">
            <button onClick={handleFinish} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-full md:w-auto font-medium text-white transition duration-200">
              Finish
            </button>
          </div>
        </>
      )}

      <div className="flex justify-start gap-4 mt-4">
        <button onClick={handleCancel} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded w-full md:w-auto font-medium text-white transition duration-200">
          Cancel Booking
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmCancel} />
    </div>
  );
}

export default Booking;
