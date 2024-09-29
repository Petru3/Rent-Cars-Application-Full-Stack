import React, { useEffect, useState } from 'react';
import { getAllRents, getAllRentsForOwners } from '../services/rentsService'; // Ensure correct path
import RentItem from '../components/RentItem'; // Ensure correct path
import { jwtDecode } from 'jwt-decode'; // Ensure correct import
import LoadingSpinner from '../components/LoadingSpinner';

function Rents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [rents, setRents] = useState([]);
  const [hasToken, setHasToken] = useState(false);
  const [role, setRole] = useState(null);
  const [filter, setFilter] = useState('All');
  const [priceOrder, setPriceOrder] = useState('None'); // New state for price order
  const [filteredRents, setFilteredRents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTokenData() {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log('Decoded token:', decodedToken);
          setRole(decodedToken.role);
          setHasToken(true);
        } catch (error) {
          console.error('Token invalid or error decoding:', error);
          setRole(null);
          setHasToken(false);
        }
      } else {
        setHasToken(false);
      }
    }
    fetchTokenData();
  }, []);

  useEffect(() => {
    const filtered = rents.filter(rent => {
      return (
        (filter === 'All' || rent.status === filter) &&
        rent.make.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Sort by rental price if priceOrder is set
    if (priceOrder !== 'None') {
      filtered.sort((a, b) => 
        priceOrder === 'asc' ? a.rentalPrice - b.rentalPrice : b.rentalPrice - a.rentalPrice
      );
    }
    
    setFilteredRents(filtered);
  }, [searchTerm, filter, rents, priceOrder]); // Include priceOrder in dependency array

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handlePriceOrderChange = (e) => {
    setPriceOrder(e.target.value);
  };

  useEffect(() => {
    async function fetchRents() {
      try {
        let response;

        setIsLoading(true);
        if (role === 'OWNER') {
          response = await getAllRentsForOwners();
        } else {
          response = await getAllRents();
        }
  
        setRents(response.data); // Ensure `response.data` is correct
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching rents:', error);
      }
    }
    fetchRents();
  }, [role]);

  return (
    <div className="mt-16 px-4 md:px-8 py-4 w-full">
      <header>
        <h1 className="mb-4 font-bold text-2xl text-left">Rents</h1>
      </header>
      <div className="flex md:flex-row flex-col md:justify-between mb-4 search-bar">
        <input
          type="text"
          placeholder="Search rents..."
          value={searchTerm}
          onChange={handleSearch}
          className="border-gray-300 mb-2 md:mb-0 p-2 border rounded-md w-full md:w-96"
        />
        <div className="flex space-x-4">
          <div className="mb-2">
            <label className="mr-2">Filter by status:</label>
            <select value={filter} onChange={handleFilterChange} className="border-gray-300 p-2 border rounded-md">
              <option value="All">All</option>
              <option value="AVAILABLE">Available</option>
              <option value="RENTED">Rented</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="mr-2">Sort by rental price:</label>
            <select value={priceOrder} onChange={handlePriceOrderChange} className="border-gray-300 p-2 border rounded-md">
              <option value="None">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <ul className="space-y-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          filteredRents.length > 0 ? (
            filteredRents.map((rent) => (
              <RentItem
                key={rent.id}
                rent={rent}
              />
            ))
          ) : (
            <p className="text-center text-gray-700">No rents available.</p>
          )
        )}
      </ul>
    </div>
  );
}

export default Rents;
