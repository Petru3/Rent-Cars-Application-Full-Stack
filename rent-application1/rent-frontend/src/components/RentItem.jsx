import React from 'react';
import { Link } from 'react-router-dom';

function RentItem({ rent }) {
  const isAvailable = rent.status === 'AVAILABLE';
  
  const rentContent = (
    <div className={`gap-4 grid grid-cols-1 md:grid-cols-2 w-full rent-info ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
      {/* Rent Information */}
      <div className="p-4 info">
        <h3 className="mb-2 font-semibold text-lg">{rent.make} ({rent.year})</h3>
        <p className="text-gray-600"><strong>License Plate:</strong> {rent.licencePlate}</p>
        <p className="text-gray-600"><strong>Status:</strong> {rent.status}</p>
        <p className="text-gray-600"><strong>Rental Price:</strong> ${rent.rentalPrice}</p>
        <p className="text-gray-600"><strong>Date of Rent:</strong> {rent.dateRent}</p>
      </div>

      {/* Rent Image */}
      <div className="flex justify-center items-center p-4 image">
        <img src={rent.imageRent} alt={rent.make} className="rounded-lg w-full h-48 object-cover" />
      </div>
    </div>
  );

  return (
    <li className="bg-white shadow-md mb-4 rounded-lg overflow-hidden">
      {isAvailable ? (
        <Link to={`/rents/${rent.id}`} className="block">
          {rentContent}
        </Link>
      ) : (
        <div className="block opacity-50">{rentContent}</div>
      )}
    </li>
  );
}

export default RentItem;
