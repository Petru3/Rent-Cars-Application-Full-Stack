import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from '../assets/logo.png';

function NavBar() {
  const [role, setRole] = useState(null);
  const [hasToken, setHasToken] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to manage the mobile menu

  useEffect(() => {
    const fetchTokenData = () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log('Decoded token:', decodedToken);
          setRole(decodedToken.role);
          setHasToken(true);
        } catch (error) {
          console.error('Token invalid sau eroare la decodificare:', error);
          setRole(null);
          setHasToken(false);
        }
      } else {
        setHasToken(false);
      }
    };

    fetchTokenData();
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    setRole(null);
    setHasToken(false);
    window.location.href = '/signin';
  }

  return (
    <nav className="top-0 z-50 fixed flex flex-wrap justify-between items-center bg-white shadow-md p-4 w-full">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-32 h-auto" />
        </Link>
        {/* Hamburger menu for mobile */}
        <div className="block md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Navigation Links */}
      <div className={`flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mt-4 md:mt-0 w-full md:w-auto ${isOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="flex md:flex-row flex-col items-center md:space-x-4 space-y-2 md:space-y-0">
          <li className="text-gray-800">
            <Link to="/">Home</Link>
          </li>
          <li className="text-gray-800">
            <Link to="/rents">Rent Cars</Link>
          </li>
          {role !== 'OWNER' && (
            <>
              <li className="text-gray-800">
                <Link to="/about-us">About Us</Link>
              </li>
              <li className="text-gray-800">
                <Link to="/booking">Booking</Link>
              </li>
            </>
          )}
          {hasToken && role === 'OWNER' && (
            <li className="text-gray-800">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>
      </div>

      {hasToken && (
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-white transition duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
